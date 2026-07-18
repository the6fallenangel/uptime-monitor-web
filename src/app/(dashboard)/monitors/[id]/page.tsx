"use client";

import { useParams } from "next/navigation";
import { useMonitor, useChecks } from "@/hooks/use-monitors";
import { MonitorDetailSkeleton } from "@/components/monitors/monitor-detail-skeleton";
import { UptimeTimeline } from "@/components/monitors/uptime-timeline";
import { ChecksTable } from "@/components/monitors/checks-table";
import { Badge } from "@/components/ui/badge";
import { formatInterval } from "@/lib/format";
import { MonitorBreadcrumb } from "@/components/monitors/monitor-breadcrumb";
import { useState } from "react";
import { ChecksPagination } from "@/components/monitors/checks-pagination";

export default function MonitorDetailPage() {
  const params = useParams<{ id: string }>();
  const monitorId = Number(params.id);
  const [page, setPage] = useState(1);

  const { data: monitor, isLoading: monitorLoading } = useMonitor(monitorId);
  const { data: checksData, isLoading: checksLoading } = useChecks(
    monitorId,
    page,
  );

  if (monitorLoading || checksLoading) {
    return <MonitorDetailSkeleton />;
  }

  if (!monitor) {
    return <p className="text-muted-foreground">Monitor not found.</p>;
  }

  return (
    <div className="space-y-6">
      <MonitorBreadcrumb monitorName={monitor.name} />
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{monitor.name}</h1>
          <Badge variant="outline" className="font-mono text-xs">
            every {formatInterval(monitor.interval)}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1">{monitor.url}</p>
      </div>

      <UptimeTimeline checks={checksData?.checks ?? []} />

      <ChecksTable checks={checksData?.checks ?? []} />

      {checksData && (
        <ChecksPagination
          page={checksData.page}
          totalPages={checksData.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
