import { request } from "./client";
import type { AuthAccount, PagedResult } from "../types/api";

export function listAdmins(page: number, pageSize = 15): Promise<PagedResult<AuthAccount>> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize)
  });
  return request<PagedResult<AuthAccount>>(`/admin/admins?${query.toString()}`);
}

export function createAdmin(
  email: string,
  password: string,
  phone?: string
): Promise<AuthAccount> {
  return request<AuthAccount>("/admin/admins", {
    method: "POST",
    body: { email, password, phone: phone?.trim() ? phone.trim() : null }
  });
}

export function deactivateAdmin(id: string): Promise<AuthAccount> {
  return request<AuthAccount>(`/admin/admins/${id}/deactivate`, { method: "POST" });
}

export function activateAdmin(id: string): Promise<AuthAccount> {
  return request<AuthAccount>(`/admin/admins/${id}/activate`, { method: "POST" });
}
