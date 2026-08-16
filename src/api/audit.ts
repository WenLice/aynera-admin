import { request } from "./client";
import type { AuditEventRow, PagedResult } from "../types/api";

export type AuditListFilters = {
  action?: string;
  memberId?: string;
  subjectType?: string;
  subjectId?: string;
};

export function listAuditEvents(
  page: number,
  pageSize = 30,
  filters: AuditListFilters = {}
): Promise<PagedResult<AuditEventRow>> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize)
  });
  if (filters.action?.trim()) {
    query.set("action", filters.action.trim());
  }
  if (filters.memberId?.trim()) {
    query.set("memberId", filters.memberId.trim());
  }
  if (filters.subjectType?.trim()) {
    query.set("subjectType", filters.subjectType.trim());
  }
  if (filters.subjectId?.trim()) {
    query.set("subjectId", filters.subjectId.trim());
  }
  return request<PagedResult<AuditEventRow>>(`/admin/audit/events?${query.toString()}`);
}
