import { request, requestBlob } from "./client";
import type { MemberAdminDetail, MemberAdminRow, PagedResult } from "../types/api";

export type MemberListFilters = {
  search?: string;
  isActive?: boolean;
  isRestricted?: boolean;
};

export function listMembers(
  page: number,
  pageSize = 15,
  filters: MemberListFilters = {}
): Promise<PagedResult<MemberAdminRow>> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize)
  });
  if (filters.search?.trim()) {
    query.set("search", filters.search.trim());
  }
  if (filters.isActive !== undefined) {
    query.set("isActive", String(filters.isActive));
  }
  if (filters.isRestricted !== undefined) {
    query.set("isRestricted", String(filters.isRestricted));
  }
  return request<PagedResult<MemberAdminRow>>(`/members/GetAll?${query.toString()}`);
}

export function getMember(id: string): Promise<MemberAdminDetail> {
  return request<MemberAdminDetail>(`/members/${id}`);
}

export function getMemberPhotoBlob(memberId: string, photoId: string): Promise<Blob> {
  return requestBlob(`/photos/${memberId}/${photoId}`);
}

export function getMemberVideoBlob(memberId: string): Promise<Blob> {
  return requestBlob(`/introduction-video/${memberId}/content`);
}

export function restrictMember(id: string): Promise<MemberAdminRow> {
  return request<MemberAdminRow>(`/members/${id}/restrict`, { method: "POST" });
}

export function unrestrictMember(id: string): Promise<MemberAdminRow> {
  return request<MemberAdminRow>(`/members/${id}/unrestrict`, { method: "POST" });
}
