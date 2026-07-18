"use client";

import type { Check } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/format";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UptimeTimeline({ checks }: { checks: Check[] }) {
  const ordered = [...checks].reverse();

  const upCount = checks.filter((c) => c.status === "up").length;
  const uptimePercent =
    checks.length > 0 ? Math.round((upCount / checks.length) * 100) : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Recent checks
        </CardTitle>
        {uptimePercent !== null && (
          <span className="text-sm font-medium">{uptimePercent}% uptime</span>
        )}
      </CardHeader>
      <CardContent>
        {ordered.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No checks recorded yet.
          </p>
        ) : (
          <div className="flex h-10 items-end gap-0.5">
            {ordered.map((check) => (
              <Tooltip key={check.id}>
                <TooltipTrigger
                  render={(props) => (
                    <div
                      {...props}
                      className={cn(
                        "h-full flex-1 rounded-sm transition-opacity hover:opacity-80",
                        check.status === "up" ? "bg-emerald-500" : "bg-red-500",
                      )}
                    />
                  )}
                />
                <TooltipContent>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <p className="font-medium">
                        {check.status === "up" ? "Up" : "Down"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(check.checkedAt)}
                      </p>
                    </div>
                    {check.error && (
                      <p className="text-xs text-muted-foreground">
                        {check.error}
                      </p>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
