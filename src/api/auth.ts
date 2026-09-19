import { request } from "./client";
import type { AuthAccount, TokenPayload } from "../types/api";

export function loginWithPassword(identifier: string, password: string): Promise<TokenPayload> {
  return request<TokenPayload>("/auth/admin/password", {
    method: "POST",
    body: { identifier, password },
    auth: false,
    retryOnUnauthorized: false
  });
}

export function requestAdminOtp(identifier: string): Promise<{ expiresInSeconds: number; retryAfterSeconds: number | null }> {
  return request("/auth/admin/otp/request", {
    method: "POST",
    body: { identifier },
    auth: false,
    retryOnUnauthorized: false
  });
}

export function verifyAdminOtp(identifier: string, code: string): Promise<TokenPayload> {
  return request<TokenPayload>("/auth/admin/otp/verify", {
    method: "POST",
    body: { identifier, code },
    auth: false,
    retryOnUnauthorized: false
  });
}

export function getAdminMe(): Promise<AuthAccount> {
  return request<AuthAccount>("/admins/me");
}

export function logout(refreshToken: string): Promise<null> {
  return request<null>("/auth/logout", {
    method: "POST",
    body: { refreshToken },
    auth: false,
    retryOnUnauthorized: false
  });
}
