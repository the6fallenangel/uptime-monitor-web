"use client";

import { CreateMonitorDialog } from "@/components/monitors/create-monitor-dialog";
import { MonitorCard } from "@/components/monitors/monitor-card";
import { MonitorCardSkeleton } from "@/components/monitors/monitor-card-skeleton";
import { useMonitors } from "@/hooks/use-monitors";
import { Activity } from "lucide-react";
import { useEffect } from "react";

export default function MonitorsPage() {
  const { data: monitors, isLoading, isError } = useMonitors();

  return (
    <div>
      <div className="mb-6 flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Monitors</h1>
          <p className="text-muted-foreground mt-1">
            Track uptime for your websites and APIs.
          </p>
        </div>
        <CreateMonitorDialog />
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <MonitorCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">
          Failed to load monitors. Try refreshing the page.
        </p>
      )}

      {monitors && monitors.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center bg-muted/30">
          <Activity className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No monitors yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first monitor to start tracking uptime.
          </p>
        </div>
      )}

      {monitors && monitors.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {monitors.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>
      )}
    </div>
  );
}
