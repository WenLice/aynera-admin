import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listAdmins } from "../api/admins";
import { listCities } from "../api/cities";
import { listFeedback, listSuggestions, listWaitlist } from "../api/inboxes";
import { listMembers } from "../api/members";
import { ApiError } from "../api/errors";
import { useAuth } from "../auth/AuthContext";

type Counts = {
  waitlist: number | null;
  members: number | null;
  restricted: number | null;
  suggestions: number | null;
  feedback: number | null;
  cities: number | null;
  openCities: number | null;
  admins: number | null;
};

export function HomePage() {
  const { account } = useAuth();
  const [counts, setCounts] = useState<Counts>({
    waitlist: null,
    members: null,
    restricted: null,
    suggestions: null,
    feedback: null,
    cities: null,
    openCities: null,
    admins: null
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const isSuperAdmin = Boolean(account?.isSuperAdmin);

    async function load() {
      try {
        const [waitlist, members, restricted, suggestions, feedback, cities, admins] = await Promise.all([
          listWaitlist(1, 1),
          listMembers(1, 1),
          listMembers(1, 1, { isRestricted: true }),
          listSuggestions(1, 1),
          listFeedback(1, 1),
          listCities(),
          isSuperAdmin ? listAdmins(1, 1) : Promise.resolve(null)
        ]);
        if (!cancelled) {
          setCounts({
            waitlist: waitlist.totalCount,
            members: members.totalCount,
            restricted: restricted.totalCount,
            suggestions: suggestions.totalCount,
            feedback: feedback.totalCount,
            cities: cities.length,
            openCities: cities.filter((city) => city.isActive).length,
            admins: admins?.totalCount ?? null
          });
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof ApiError ? cause.message : "Could not load inbox counts.");
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [account?.isSuperAdmin]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Home</h1>
        </div>
      </div>
      {error ? <div className="banner error">{error}</div> : null}
      <div className="grid-3">
        <Link className="kpi" to="/waitlist">
          <span className="kpi-label">Waitlist</span>
          <span className="kpi-value">{counts.waitlist ?? "—"}</span>
          <span className="kpi-meta">Early-access signups</span>
        </Link>
        <Link className="kpi" to="/members">
          <span className="kpi-label">Members</span>
          <span className="kpi-value">{counts.members ?? "—"}</span>
          <span className="kpi-meta">Member accounts</span>
        </Link>
        <Link className="kpi" to="/restricted">
          <span className="kpi-label">Restricted</span>
          <span className="kpi-value">{counts.restricted ?? "—"}</span>
          <span className="kpi-meta">Blocked by admin</span>
        </Link>
        <Link className="kpi" to="/cities">
          <span className="kpi-label">Cities</span>
          <span className="kpi-value">{counts.openCities ?? "—"}</span>
          <span className="kpi-meta">
            {counts.cities == null ? "Open for apply" : `${counts.openCities} open of ${counts.cities}`}
          </span>
        </Link>
        <Link className="kpi" to="/suggestions">
          <span className="kpi-label">Suggestions</span>
          <span className="kpi-value">{counts.suggestions ?? "—"}</span>
          <span className="kpi-meta">Product ideas</span>
        </Link>
        <Link className="kpi" to="/feedback">
          <span className="kpi-label">Feedback</span>
          <span className="kpi-value">{counts.feedback ?? "—"}</span>
          <span className="kpi-meta">Grievances and support</span>
        </Link>
        {account?.isSuperAdmin ? (
          <Link className="kpi" to="/admins">
            <span className="kpi-label">Admins</span>
            <span className="kpi-value">{counts.admins ?? "—"}</span>
            <span className="kpi-meta">Admin accounts</span>
          </Link>
        ) : null}
      </div>
    </>
  );
}
