import { FormEvent, useCallback, useEffect, useState } from "react";
import { activateAdmin, createAdmin, deactivateAdmin, listAdmins } from "../api/admins";
import { ApiError } from "../api/errors";
import { useAuth } from "../auth/AuthContext";
import type { AuthAccount, PagedResult } from "../types/api";

export function AdminsPage() {
  const { account } = useAuth();
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PagedResult<AuthAccount> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async (nextPage: number) => {
    setLoading(true);
    setError(null);
    try {
      setResult(await listAdmins(nextPage));
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not load admins.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(page);
  }, [load, page]);

  if (!account?.isSuperAdmin) {
    return (
      <div className="page-head">
        <div>
          <h1>Admins</h1>
          <p>Only a super-admin can manage admins.</p>
        </div>
      </div>
    );
  }

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setCreating(true);
    try {
      const created = await createAdmin(email.trim(), password, phone);
      setEmail("");
      setPassword("");
      setPhone("");
      setInfo(`Created ${created.email}.`);
      setPage(1);
      await load(1);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not create that admin.");
    } finally {
      setCreating(false);
    }
  }

  async function onToggle(row: AuthAccount) {
    setError(null);
    setInfo(null);
    setBusyId(row.id);
    try {
      const updated = row.isActive
        ? await deactivateAdmin(row.id)
        : await activateAdmin(row.id);
      setInfo(`${updated.email} is now ${updated.isActive ? "active" : "inactive"}.`);
      await load(page);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not update that admin.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Admins</h1>
          <p>Create admins and deactivate accounts. Super-admin is set by the first seed account.</p>
        </div>
        {result ? <span className="chip">{result.totalCount} total</span> : null}
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      {info ? <div className="banner info">{info}</div> : null}

      <section className="panel panel-pad" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: "0 0 12px", fontSize: 14 }}>Create admin</h2>
        <form className="filters" onSubmit={(event) => void onCreate(event)} style={{ marginBottom: 0 }}>
          <div className="field">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="admin-phone">Phone (optional)</label>
            <input
              id="admin-phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={creating}>
            {creating ? "Creating…" : "Create"}
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Super</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {result?.items.map((row) => (
                <tr key={row.id}>
                  <td className="cell-strong">{row.email ?? "—"}</td>
                  <td>{row.phone ?? "—"}</td>
                  <td>
                    <span className={row.isActive ? "chip success" : "chip warning"}>
                      {row.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{row.isSuperAdmin ? <span className="chip">Yes</span> : "—"}</td>
                  <td>
                    {row.id === account.id ? (
                      <span className="cell-muted">You</span>
                    ) : (
                      <button
                        className={row.isActive ? "btn btn-danger btn-sm" : "btn btn-secondary btn-sm"}
                        type="button"
                        disabled={busyId === row.id || loading}
                        onClick={() => void onToggle(row)}
                      >
                        {row.isActive ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && result && result.items.length === 0 ? (
                <tr>
                  <td className="cell-muted" colSpan={5}>
                    No admins on this page.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        {result ? (
          <div className="pager">
            <span className="pager-meta">
              Page {result.page} of {Math.max(result.totalPages, 1)}
            </span>
            <div className="page-actions">
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                disabled={!result.hasPreviousPage || loading}
                onClick={() => setPage((current) => current - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                disabled={!result.hasNextPage || loading}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
