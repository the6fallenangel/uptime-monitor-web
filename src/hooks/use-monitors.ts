import {
  createMonitor,
  deleteMonitor,
  getChecks,
  getMonitor,
  getMonitors,
  updateMonitor,
} from "@/lib/monitors";
import type { Monitor } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMonitors() {
  return useQuery({
    queryKey: ["monitors"],
    queryFn: getMonitors,
  });
}

export function useCreateMonitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMonitor,
    onSuccess: (newMonitor) => {
      queryClient.setQueryData<Monitor[]>(["monitors"], (old) =>
        old ? [...old, newMonitor] : [newMonitor],
      );
    },
  });
}

export function useUpdateMonitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { name: string; interval: string };
    }) => updateMonitor(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<Monitor[]>(["monitors"], (old) =>
        old ? old.map((m) => (m.id === updated.id ? updated : m)) : [updated],
      );
      queryClient.setQueryData(["monitors", updated.id], updated);
    },
  });
}

export function useDeleteMonitor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMonitor,
    onSuccess: (_data, deletedId) => {
      queryClient.setQueryData<Monitor[]>(["monitors"], (old) =>
        old ? old.filter((m) => m.id !== deletedId) : [],
      );
    },
  });
}

export function useLatestCheck(monitorId: number) {
  return useQuery({
    queryKey: ["checks", monitorId, "latest"],
    queryFn: () => getChecks(monitorId, 1),
    select: (checks) => checks[0] ?? null,
    refetchInterval: 15_000,
  });
}

export function useMonitor(id: number) {
  return useQuery({
    queryKey: ["monitors", id],
    queryFn: () => getMonitor(id),
  });
}

export function useChecks(monitorId: number, limit = 50) {
  return useQuery({
    queryKey: ["checks", monitorId, limit],
    queryFn: () => getChecks(monitorId, limit),
    refetchInterval: 15_000,
  });
}
