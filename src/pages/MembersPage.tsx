import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listMembers, type MemberListFilters } from "../api/members";
import { ApiError } from "../api/errors";
import type { MemberAdminRow, PagedResult } from "../types/api";
import { formatWhen } from "./InboxPage";

function displayName(row: MemberAdminRow): string {
  const name = [row.firstName, row.lastName].filter(Boolean).join(" ").trim();
  return name.length > 0 ? name : "—";
}

type ActiveFilter = "" | "true" | "false";

export function MembersPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("");
  const [result, setResult] = useState<PagedResult<MemberAdminRow> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const filters: MemberListFilters = {
    search: search.trim() || undefined,
    isActive: activeFilter === "" ? undefined : activeFilter === "true"
  };

  const load = useCallback(
    async (nextPage: number) => {
      setLoading(true);
      setError(null);
      try {
        setResult(await listMembers(nextPage, 15, filters));
      } catch (cause) {
        setError(cause instanceof ApiError ? cause.message : "Could not load members.");
      } finally {
        setLoading(false);
      }
    },
    [search, activeFilter]
  );

  useEffect(() => {
    void load(page);
  }, [load, page]);

  function onApply(event: FormEvent) {
    event.preventDefault();
    setSearch(searchDraft.trim());
    setPage(1);
  }

  function onClear() {
    setSearchDraft("");
    setSearch("");
    setActiveFilter("");
    setPage(1);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Members</h1>
          <p>Search by email, phone, or name. Restricted members are listed under Restricted.</p>
        </div>
        {result ? <span className="chip">{result.totalCount} total</span> : null}
      </div>
      {error ? <div className="banner error">{error}</div> : null}

      <section className="panel panel-pad" style={{ marginBottom: 16 }}>
        <form className="filters" onSubmit={onApply} style={{ marginBottom: 0 }}>
          <div className="field" style={{ flex: "1 1 220px" }}>
            <label htmlFor="member-search">Search</label>
            <input
              id="member-search"
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              placeholder="Email, phone, or name"
            />
          </div>
          <div className="field">
            <label htmlFor="member-active">Active</label>
            <select
              id="member-active"
              value={activeFilter}
              onChange={(event) => {
                setActiveFilter(event.target.value as ActiveFilter);
                setPage(1);
              }}
            >
              <option value="">Any</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Search
          </button>
          <button className="btn btn-secondary" type="button" disabled={loading} onClick={onClear}>
            Clear
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>City</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Restricted</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {result?.items.map((row) => (
                <tr
                  key={row.id}
                  className="clickable"
                  onClick={() => navigate(`/members/${row.id}`)}
                >
                  <td className="cell-strong">{displayName(row)}</td>
                  <td>{row.gender ?? "—"}</td>
                  <td>{row.city ?? "—"}</td>
                  <td>{row.email ?? "—"}</td>
                  <td>{row.phone ?? "—"}</td>
                  <td>
                    <span className={row.phoneConfirmed ? "chip core" : "chip"}>
                      {row.phoneConfirmed ? "Phone" : "Phone pending"}
                    </span>{" "}
                    <span className={row.emailConfirmed ? "chip core" : "chip"}>
                      {row.emailConfirmed ? "Email" : "Email pending"}
                    </span>
                  </td>
                  <td>
                    <span className={row.isActive ? "chip core" : "chip"}>
                      {row.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    {row.isRestricted ? (
                      <span className="chip warning">Yes</span>
                    ) : (
                      <span className="chip">No</span>
                    )}
                  </td>
                  <td>{formatWhen(row.createdAtUtc)}</td>
                </tr>
              ))}
              {!loading && result && result.items.length === 0 ? (
                <tr>
                  <td className="cell-muted" colSpan={9}>
                    No members match these filters.
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
