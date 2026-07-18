"use client";

import { useParams } from "next/navigation";
import { useMonitor, useChecks } from "@/hooks/use-monitors";
import { MonitorDetailSkeleton } from "@/components/monitors/monitor-detail-skeleton";
import { UptimeTimeline } from "@/components/monitors/uptime-timeline";
import { ChecksTable } from "@/components/monitors/checks-table";
import { Badge } from "@/components/ui/badge";
import { formatInterval } from "@/lib/format";

export default function MonitorDetailPage() {
  const params = useParams<{ id: string }>();
  const monitorId = Number(params.id);

  const { data: monitor, isLoading: monitorLoading } = useMonitor(monitorId);
  const { data: checks, isLoading: checksLoading } = useChecks(monitorId, 50);

  if (monitorLoading || checksLoading) {
    return <MonitorDetailSkeleton />;
  }

  if (!monitor) {
    return <p className="text-muted-foreground">Monitor not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{monitor.name}</h1>
          <Badge variant="outline" className="font-mono text-xs">
            every {formatInterval(monitor.interval)}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1">{monitor.url}</p>
      </div>

      <UptimeTimeline checks={checks ?? []} />

      <ChecksTable checks={checks ?? []} />
    </div>
  );
}
