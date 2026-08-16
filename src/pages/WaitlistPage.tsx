import { useCallback } from "react";
import { listWaitlist } from "../api/inboxes";
import type { WaitlistRow } from "../types/api";
import { formatWhen, InboxPage } from "./InboxPage";

export function WaitlistPage() {
  const load = useCallback((page: number) => listWaitlist(page), []);

  return (
    <InboxPage<WaitlistRow>
      title="Waitlist"
      lead="Early-access signups, newest first."
      load={load}
      columns={[
        { header: "Name", cell: (row) => <span className="cell-strong">{row.fullName}</span> },
        { header: "Email", cell: (row) => row.email },
        { header: "Phone", cell: (row) => row.phone ?? "—" },
        { header: "City", cell: (row) => row.city },
        {
          header: "Interest",
          cell: (row) => (
            <span className={row.interest.includes("Professional") ? "chip pro" : "chip core"}>
              {row.interest}
            </span>
          )
        },
        { header: "Joined", cell: (row) => formatWhen(row.createdAtUtc) }
      ]}
    />
  );
}
