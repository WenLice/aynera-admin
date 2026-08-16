import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { getAdminMe, loginWithPassword, logout as logoutRequest } from "../api/auth";
import { ApiError } from "../api/errors";
import type { AuthAccount, TokenPayload } from "../types/api";
import { clearSession, readSession, writeSession } from "./session";

type AuthContextValue = {
  account: AuthAccount | null;
  ready: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  completeLogin: (tokens: TokenPayload) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AuthAccount | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      if (!readSession()) {
        if (!cancelled) {
          setReady(true);
        }
        return;
      }

      try {
        const me = await getAdminMe();
        if (!cancelled) {
          setAccount(me);
        }
      } catch {
        clearSession();
        if (!cancelled) {
          setAccount(null);
        }
      } finally {
        if (!cancelled) {
          setReady(true);
        }
      }
    }

    void restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const completeLogin = useCallback((tokens: TokenPayload) => {
    writeSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
    setAccount(tokens.account);
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    completeLogin(await loginWithPassword(identifier.trim(), password));
  }, [completeLogin]);

  const logout = useCallback(async () => {
    const session = readSession();
    clearSession();
    setAccount(null);
    if (!session) {
      return;
    }

    try {
      await logoutRequest(session.refreshToken);
    } catch (error) {
      if (!(error instanceof ApiError)) {
        throw error;
      }
    }
  }, []);

  const value = useMemo(
    () => ({ account, ready, login, completeLogin, logout }),
    [account, ready, login, completeLogin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return value;
}
