import {
  createMonitor,
  deleteMonitor,
  getChecks,
  getMonitor,
  getMonitors,
} from "@/lib/monitors";
import type { Monitor } from "@/lib/types";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
