import { useCallback } from "react";
import { listMembers } from "../api/members";
import type { MemberAdminRow } from "../types/api";
import { formatWhen, InboxPage } from "./InboxPage";

function displayName(row: MemberAdminRow): string {
  const name = (row.name ?? "").trim();
  return name.length > 0 ? name : "—";
}

export function RestrictedPage() {
  const load = useCallback((page: number) => listMembers(page, 15, { isRestricted: true }), []);

  return (
    <InboxPage<MemberAdminRow>
      title="Restricted"
      lead="Members currently restricted by a super-admin. Open a row to review or unrestrict."
      load={load}
      rowHref={(row) => `/members/${row.id}`}
      columns={[
        { header: "Name", cell: (row) => <span className="cell-strong">{displayName(row)}</span> },
        { header: "City", cell: (row) => row.city ?? "—" },
        { header: "Email", cell: (row) => row.email ?? "—" },
        { header: "Phone", cell: (row) => row.phone ?? "—" },
        {
          header: "Active",
          cell: (row) => (
            <span className={row.isActive ? "chip core" : "chip"}>
              {row.isActive ? "Active" : "Inactive"}
            </span>
          )
        },
        {
          header: "Status",
          cell: () => <span className="chip warning">Restricted</span>
        },
        { header: "Joined", cell: (row) => formatWhen(row.createdAtUtc) }
      ]}
    />
  );
}
