import { api } from "@/lib/api";
import type { Monitor, PaginatedChecks } from "@/lib/types";

export async function getMonitors() {
  const monitors = await api.get<Monitor[] | null>("/monitors");
  return monitors ?? [];
}

export function getMonitor(id: number) {
  return api.get<Monitor>(`/monitors/${id}`);
}

export function createMonitor(data: {
  name: string;
  url: string;
  interval: string;
}) {
  return api.post<Monitor>("/monitors", data);
}

export function updateMonitor(
  id: number,
  data: {
    name: string;
    interval: string;
  },
) {
  return api.patch<Monitor>(`/monitors/${id}`, data);
}

export function deleteMonitor(id: number) {
  return api.delete<void>(`/monitors/${id}`);
}

export function getChecks(monitorId: number, page = 1, limit = 20) {
  return api.get<PaginatedChecks>(
    `/monitors/${monitorId}/checks?page=${page}&limit=${limit}`,
  );
}
