import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function RequireAuth() {
  const { account, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="login-page">
        <p className="login-meta">Loading session…</p>
      </div>
    );
  }

  if (!account) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
