const accessKey = "aynera.admin.accessToken";
const refreshKey = "aynera.admin.refreshToken";

export type StoredSession = {
  accessToken: string;
  refreshToken: string;
};

export function readSession(): StoredSession | null {
  const accessToken = sessionStorage.getItem(accessKey);
  const refreshToken = sessionStorage.getItem(refreshKey);
  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

export function writeSession(session: StoredSession): void {
  sessionStorage.setItem(accessKey, session.accessToken);
  sessionStorage.setItem(refreshKey, session.refreshToken);
}

export function clearSession(): void {
  sessionStorage.removeItem(accessKey);
  sessionStorage.removeItem(refreshKey);
}
