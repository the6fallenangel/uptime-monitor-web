import { api } from "@/lib/api";
import type { Check, Monitor } from "@/lib/types";

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

export function getChecks(monitorId: number, limit = 50) {
  return api.get<Check[]>(`/monitors/${monitorId}/checks?limit=${limit}`);
}
