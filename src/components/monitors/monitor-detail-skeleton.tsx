import { Skeleton } from "@/components/ui/skeleton";

export function MonitorDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
