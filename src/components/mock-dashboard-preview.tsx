const mockMonitors = [
  { name: "api.myapp.com", status: "up" as const, latency: "142ms" },
  { name: "myapp.com", status: "up" as const, latency: "89ms" },
  { name: "checkout-service", status: "down" as const, latency: "—" },
];

const mockBars = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

export function MockDashboardPreview() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border bg-card shadow-2xl">
      <div className="flex items-center gap-1.5 border-b bg-muted/40 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-xs text-muted-foreground">Monitors</span>
      </div>

      <div className="divide-y">
        {mockMonitors.map((monitor, i) => (
          <div
            key={monitor.name}
            className="flex items-center justify-between px-4 py-3.5 gap-4 animate-in fade-in slide-in-from-bottom-2"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: "backwards",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-2 w-2 rounded-full ${
                  monitor.status === "up"
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              <div className="text-left">
                <p className="text-sm font-medium">{monitor.name}</p>
                <p className="text-xs text-muted-foreground">
                  {monitor.status === "up" ? "Operational" : "Down"} ·{" "}
                  {monitor.latency}
                </p>
              </div>
            </div>

            <div className="flex h-6 items-end gap-0.5">
              {mockBars.map((up, j) => (
                <span
                  key={j}
                  className={`w-1 rounded-sm ${
                    up ? "bg-emerald-500/70" : "bg-red-500/70"
                  }`}
                  style={{ height: up ? "100%" : "40%" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
