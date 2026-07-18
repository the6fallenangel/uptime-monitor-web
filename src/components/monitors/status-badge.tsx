"use client";
import { Badge } from "@/components/ui/badge";
import { useLatestCheck } from "@/hooks/use-monitors";
import { cn } from "@/lib/utils";

export function StatusBadge({ monitorId }: { monitorId: number }) {
  const { data: check, isLoading } = useLatestCheck(monitorId);

  if (isLoading) {
    return (
      <Badge variant="outline" className="gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        Checking...
      </Badge>
    );
  }

  if (!check) {
    return (
      <Badge variant="outline" className="gap-1.5 text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
        Pending
      </Badge>
    );
  }

  const isUp = check.status === "up";

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5",
        isUp
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isUp ? "bg-emerald-500" : "bg-red-500",
          isUp && "animate-pulse",
        )}
      />
      {isUp ? "Up" : "Down"}
    </Badge>
  );
}
