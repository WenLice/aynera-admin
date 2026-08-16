import { request } from "./client";
import type { FeedbackRow, PagedResult, SuggestionRow, WaitlistRow } from "../types/api";

function pageQuery(page: number, pageSize: number): string {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize)
  });
  return query.toString();
}

export function listWaitlist(page: number, pageSize = 15): Promise<PagedResult<WaitlistRow>> {
  return request<PagedResult<WaitlistRow>>(`/early-access/signups?${pageQuery(page, pageSize)}`);
}

export function listSuggestions(page: number, pageSize = 15): Promise<PagedResult<SuggestionRow>> {
  return request<PagedResult<SuggestionRow>>(`/admin/suggestions?${pageQuery(page, pageSize)}`);
}

export function listFeedback(page: number, pageSize = 15): Promise<PagedResult<FeedbackRow>> {
  return request<PagedResult<FeedbackRow>>(`/admin/feedback?${pageQuery(page, pageSize)}`);
}
