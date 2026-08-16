import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/errors";
import type { PagedResult } from "../types/api";

type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
};

type InboxPageProps<T> = {
  title: string;
  lead: string;
  load: (page: number) => Promise<PagedResult<T>>;
  columns: Column<T>[];
  rowHref?: (row: T) => string;
};

export function InboxPage<T extends { id: string }>({
  title,
  lead,
  load,
  columns,
  rowHref
}: InboxPageProps<T>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PagedResult<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const next = await load(page);
        if (!cancelled) {
          setResult(next);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof ApiError ? cause.message : "Could not load this inbox.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [load, page]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
        {result ? <span className="chip">{result.totalCount} total</span> : null}
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      <section className="panel">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.header}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result?.items.map((row) => (
                <tr
                  key={row.id}
                  className={rowHref ? "clickable" : undefined}
                  onClick={rowHref ? () => navigate(rowHref(row)) : undefined}
                >
                  {columns.map((column) => (
                    <td key={column.header}>{column.cell(row)}</td>
                  ))}
                </tr>
              ))}
              {!loading && result && result.items.length === 0 ? (
                <tr>
                  <td className="cell-muted" colSpan={columns.length}>
                    No rows on this page.
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

export function formatWhen(value: string): string {
  return new Date(value).toLocaleString();
}
