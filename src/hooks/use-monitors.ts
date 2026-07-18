import { createMonitor, deleteMonitor, getMonitors } from "@/lib/monitors";
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
