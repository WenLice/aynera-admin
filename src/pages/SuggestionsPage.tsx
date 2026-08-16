import { useCallback } from "react";
import { listSuggestions } from "../api/inboxes";
import type { SuggestionRow } from "../types/api";
import { formatWhen, InboxPage } from "./InboxPage";

export function SuggestionsPage() {
  const load = useCallback((page: number) => listSuggestions(page), []);

  return (
    <InboxPage<SuggestionRow>
      title="Suggestions"
      lead="Product-idea submissions, newest first."
      load={load}
      columns={[
        { header: "Name", cell: (row) => <span className="cell-strong">{row.fullName}</span> },
        { header: "Email", cell: (row) => row.email },
        { header: "Phone", cell: (row) => row.phone },
        { header: "Message", cell: (row) => <span className="cell-clip">{row.message}</span> },
        { header: "Received", cell: (row) => formatWhen(row.createdAtUtc) }
      ]}
    />
  );
}
