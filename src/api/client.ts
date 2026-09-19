import { clearSession, readSession, writeSession } from "../auth/session";
import type { ApiResponse, TokenPayload } from "../types/api";
import { ApiError } from "./errors";

const defaultApiBase = "http://localhost:5057";

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_AYNERA_API_BASE_URL?.trim();
  return (raw && raw.length > 0 ? raw : defaultApiBase).replace(/\/+$/, "");
}

function newCorrelationId(): string {
  return crypto.randomUUID();
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
};

let refreshInFlight: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    const session = readSession();
    if (!session) {
      return false;
    }

    try {
      const tokens = await request<TokenPayload>("/auth/refresh", {
        method: "POST",
        body: { refreshToken: session.refreshToken },
        auth: false,
        retryOnUnauthorized: false
      });
      writeSession({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
      return true;
    } catch {
      clearSession();
      return false;
    }
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    body,
    auth = true,
    retryOnUnauthorized = true
  } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Correlation-Id": newCorrelationId()
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const session = readSession();
    if (session) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshed = await refreshSession();
    if (refreshed) {
      return request<T>(path, { ...options, retryOnUnauthorized: false });
    }
  }

  let envelope: ApiResponse<T> | null = null;
  const text = await response.text();
  if (text.length > 0) {
    try {
      envelope = JSON.parse(text) as ApiResponse<T>;
    } catch {
      envelope = null;
    }
  }

  if (!response.ok || envelope?.success === false) {
    throw new ApiError(
      envelope?.errorCode ?? "request_failed",
      envelope?.statusCode ?? response.status,
      envelope?.errors ?? null,
      envelope?.correlationId ?? null
    );
  }

  if (envelope && "data" in envelope) {
    return envelope.data as T;
  }

  return undefined as T;
}

export async function requestBlob(path: string): Promise<Blob> {
  const session = readSession();
  const headers: Record<string, string> = {
    "X-Correlation-Id": newCorrelationId()
  };
  if (session) {
    headers.Authorization = `Bearer ${session.accessToken}`;
  }

  let response = await fetch(`${getApiBaseUrl()}${path}`, { headers });
  if (response.status === 401 && session) {
    const refreshed = await refreshSession();
    if (refreshed) {
      const retry = readSession();
      if (retry) {
        headers.Authorization = `Bearer ${retry.accessToken}`;
      }
      response = await fetch(`${getApiBaseUrl()}${path}`, { headers });
    }
  }

  if (!response.ok) {
    throw new ApiError("request_failed", response.status, null, null);
  }

  return response.blob();
}
