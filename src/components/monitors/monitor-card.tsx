"use client";

import { EditMonitorDialog } from "@/components/monitors/edit-monitor-dialog";
import { StatusBadge } from "@/components/monitors/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMonitor } from "@/hooks/use-monitors";
import { formatInterval } from "@/lib/format";
import type { Monitor } from "@/lib/types";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MonitorCard({ monitor }: { monitor: Monitor }) {
  const deleteMonitor = useDeleteMonitor();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card className="transition-shadow hover:shadow-md relative">
        <Link
          href={`/monitors/${monitor.id}`}
          className="absolute inset-0 z-0"
          aria-label={`View ${monitor.name}`}
        />
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="min-w-0">
            <Link
              href={`/monitors/${monitor.id}`}
              className="font-medium hover:underline"
            >
              {monitor.name}
            </Link>
            <p className="truncate text-sm text-muted-foreground">
              {monitor.url}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={(props) => (
                <Button
                  {...props}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 relative z-10"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              )}
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Pencil className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => deleteMonitor.mutate(monitor.id)}
                disabled={deleteMonitor.isPending}
              >
                <Trash2 className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex relative z-10 items-center justify-between">
          <Badge variant="outline" className="font-mono text-xs">
            every {formatInterval(monitor.interval)}
          </Badge>
          <StatusBadge monitorId={monitor.id} />
        </CardContent>
      </Card>

      <EditMonitorDialog
        monitor={monitor}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}
