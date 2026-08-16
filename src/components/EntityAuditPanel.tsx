import { useEffect, useState } from "react";
import { listAuditEvents, type AuditListFilters } from "../api/audit";
import { ApiError } from "../api/errors";
import type { AuditEventRow } from "../types/api";
import { formatWhen } from "../pages/InboxPage";

function actionLabel(action: string): string {
  return action
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

type EntityAuditPanelProps = {
  title?: string;
  filters: AuditListFilters;
  /** Bump to reload after a mutation (e.g. restrict). */
  refreshKey?: number;
};

export function EntityAuditPanel({
  title = "Audit trail",
  filters,
  refreshKey = 0
}: EntityAuditPanelProps) {
  const [events, setEvents] = useState<AuditEventRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!filters.memberId && !filters.subjectId) {
        setEvents([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const page = await listAuditEvents(1, 40, filters);
        if (!cancelled) {
          setEvents(page.items);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof ApiError ? cause.message : "Could not load audit trail.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [filters.memberId, filters.subjectId, filters.subjectType, filters.action, refreshKey]);

  return (
    <section className="panel panel-pad audit-panel">
      <h3 className="member-section-title">{title}</h3>
      {error ? <div className="banner error">{error}</div> : null}
      {loading ? <p className="cell-muted">Loading audit…</p> : null}
      {!loading && events.length === 0 ? (
        <p className="cell-muted">No audit events for this record yet.</p>
      ) : null}
      {!loading && events.length > 0 ? (
        <ul className="audit-trail">
          {events.map((event) => (
            <li key={event.id}>
              <div className="audit-trail-head">
                <span
                  className={
                    event.action.includes("restrict") && !event.action.includes("unrestrict")
                      ? "chip warning"
                      : "chip"
                  }
                >
                  {actionLabel(event.action)}
                </span>
                <span className="audit-trail-meta">{formatWhen(event.occurredAtUtc)}</span>
              </div>
              <p className="tiny muted">{event.message}</p>
              {event.actorUserId ? (
                <p className="tiny muted">Actor {event.actorUserId.slice(0, 8)}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
