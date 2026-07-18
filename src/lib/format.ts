export function formatInterval(nanoseconds: number): string {
  const seconds = nanoseconds / 1_000_000_000;

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
}

export function formatResponseTime(nanoseconds: number): string {
  const ms = nanoseconds / 1_000_000;
  return `${Math.round(ms)}ms`;
}

export function nanosecondsToValueUnit(ns: number): {
  value: number;
  unit: "s" | "m" | "h";
} {
  const seconds = ns / 1_000_000_000;
  if (seconds % 3600 === 0) return { value: seconds / 3600, unit: "h" };
  if (seconds % 60 === 0) return { value: seconds / 60, unit: "m" };
  return { value: seconds, unit: "s" };
}

export function formatRelativeTime(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 0) return "just now";
  if (diffSec < 10) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  return `${diffDay}d ago`;
}
