import { useCallback } from "react";
import { Link } from "react-router-dom";
import { listFeedback } from "../api/inboxes";
import type { FeedbackRow } from "../types/api";
import { formatWhen, InboxPage } from "./InboxPage";

export function FeedbackPage() {
  const load = useCallback((page: number) => listFeedback(page), []);

  return (
    <InboxPage<FeedbackRow>
      title="Feedback"
      lead="Grievance and support submissions, newest first. Open a linked member to review or restrict."
      load={load}
      columns={[
        { header: "Name", cell: (row) => <span className="cell-strong">{row.fullName}</span> },
        { header: "Email", cell: (row) => row.email },
        { header: "Phone", cell: (row) => row.phone ?? "—" },
        { header: "Message", cell: (row) => <span className="cell-clip">{row.message}</span> },
        {
          header: "Member",
          cell: (row) =>
            row.memberId ? (
              <Link className="chip success" to={`/members/${row.memberId}`} onClick={(event) => event.stopPropagation()}>
                Open
              </Link>
            ) : row.isExistingUser ? (
              <span className="chip success">Yes</span>
            ) : (
              <span className="chip">No</span>
            )
        },
        { header: "Received", cell: (row) => formatWhen(row.createdAtUtc) }
      ]}
    />
  );
}
