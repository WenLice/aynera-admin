import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function initials(accountEmail: string | null): string {
  const local = accountEmail?.split("@")[0] ?? "A";
  return local.slice(0, 2).toUpperCase();
}

export function AppShell() {
  const { account, logout } = useAuth();

  return (
    <div className="app">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="Aynera home">
          <img className="brand-logo" src="/logo-mark.svg" alt="" width={32} height={32} />
          <div className="brand-text">
            <div className="brand-name">
              <span className="ay">Ay</span>
              <span className="nera">Nera</span>
            </div>
            <div className="brand-sub">The Era of Togetherness.</div>
          </div>
        </Link>
        <nav className="nav">
          <div className="nav-section">Growth</div>
          <NavLink to="/waitlist">
            <span className="nav-icon">◌</span> Waitlist
          </NavLink>
          <NavLink to="/members">
            <span className="nav-icon">◎</span> Members
          </NavLink>
          <NavLink to="/restricted">
            <span className="nav-icon">⊘</span> Restricted
          </NavLink>
          <NavLink to="/cities">
            <span className="nav-icon">▣</span> Cities
          </NavLink>
          <NavLink to="/venues">
            <span className="nav-icon">◈</span> Venues
          </NavLink>
          <div className="nav-section">Inboxes</div>
          <NavLink to="/suggestions">
            <span className="nav-icon">✎</span> Suggestions
          </NavLink>
          <NavLink to="/feedback">
            <span className="nav-icon">✉</span> Feedback
          </NavLink>
          {account?.isSuperAdmin ? (
            <>
              <div className="nav-section">Ops</div>
              <NavLink to="/admins">
                <span className="nav-icon">♟</span> Admins
              </NavLink>
            </>
          ) : null}
        </nav>
        <div className="sidebar-foot">
          <button type="button" onClick={() => void logout()}>
            Sign out
          </button>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="breadcrumb">
            Aynera / <strong>Admin</strong>
          </div>
          <div className="topbar-actions">
            <div className="admin-chip">
              <span className="admin-avatar">{initials(account?.email ?? null)}</span>
              {account?.email ?? "Admin"}
            </div>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
