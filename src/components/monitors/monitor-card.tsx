"use client";

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
import { MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";

export function MonitorCard({ monitor }: { monitor: Monitor }) {
  const deleteMonitor = useDeleteMonitor();

  return (
    <Card className="transition-shadow hover:shadow-md">
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
                className="h-8 w-8 shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            )}
          />
          <DropdownMenuContent align="end">
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
      <CardContent className="flex items-center justify-between">
        <Badge variant="outline" className="font-mono text-xs">
          every {formatInterval(monitor.interval)}
        </Badge>
      </CardContent>
    </Card>
  );
}
