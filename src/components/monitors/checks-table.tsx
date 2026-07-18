"use client";

import type { Check } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatResponseTime, formatRelativeTime } from "@/lib/format";

export function ChecksTable({ checks }: { checks: Check[] }) {
  if (checks.length === 0) return null;

  return (
    <div className="rounded-md border overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>
              Status <span className="hidden sm:flex">code</span>
            </TableHead>
            <TableHead>
              Response <span className="hidden sm:flex">time</span>
            </TableHead>
            <TableHead>Checked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checks.map((check) => (
            <TableRow key={check.id}>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    check.status === "up"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                  }
                >
                  {check.status === "up" ? "Up" : "Down"}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {check.statusCode ?? "—"}
              </TableCell>
              <TableCell className="font-mono text-sm">
                {formatResponseTime(check.responseTime)}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatRelativeTime(check.checkedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
