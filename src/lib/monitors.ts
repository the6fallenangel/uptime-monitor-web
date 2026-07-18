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

export function deleteMonitor(id: number) {
  return api.delete<void>(`/monitors/${id}`);
}

export function getChecks(monitorId: number, limit = 50) {
  return api.get<Check[]>(`/monitors/${monitorId}/checks?limit=${limit}`);
}
