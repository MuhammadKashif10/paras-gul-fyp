const ADMIN_SESSION_KEY = "bridalAdminSession";

export interface AdminSession {
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

export function getAdminSession(): AdminSession | null {
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  return raw ? (JSON.parse(raw) as AdminSession) : null;
}

export function setAdminSession(session: AdminSession) {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function getAdminToken() {
  return getAdminSession()?.token ?? "";
}
