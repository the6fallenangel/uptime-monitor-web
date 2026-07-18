import Link from "next/link";
import { Activity, Bell, GitBranch, Monitor, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MockDashboardPreview } from "@/components/mock-dashboard-preview";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-semibold">
          <Monitor className="h-5 w-5" />
          Uptime Monitor
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pt-14 text-center sm:pt-20">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Know the moment something goes down.
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor your websites and APIs with concurrent checks, live status,
            and instant alerts — built for developers who want to know before
            their users do.
          </p>
        </div>

        <div className="my-7 flex justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <MockDashboardPreview />
        </div>
        <div className="flex justify-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          <Link href="/signup" className={cn(buttonVariants({ size: "lg" }))}>
            Get started
          </Link>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            I have an account
          </Link>
        </div>

        <div className="mt-20 grid max-w-3xl gap-8 pb-20 sm:grid-cols-3">
          <div className="space-y-2">
            <Activity className="mx-auto h-6 w-6" />
            <h3 className="font-medium">Concurrent checks</h3>
            <p className="text-sm text-muted-foreground">
              A worker pool checks every monitor on its own schedule, without
              blocking on slow endpoints.
            </p>
          </div>
          <div className="space-y-2">
            <Bell className="mx-auto h-6 w-6" />
            <h3 className="font-medium">Instant alerts</h3>
            <p className="text-sm text-muted-foreground">
              Get notified the moment a monitor&apos;s status actually changes —
              not on every routine check.
            </p>
          </div>
          <div className="space-y-2">
            <ShieldCheck className="mx-auto h-6 w-6" />
            <h3 className="font-medium">Private by default</h3>
            <p className="text-sm text-muted-foreground">
              Every monitor is scoped to your account. No one else can see or
              touch what you&apos;re tracking.
            </p>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center gap-4 py-6 text-sm text-muted-foreground">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex gap-4">
            <a
              href="https://github.com/the6fallenangel/uptime-monitor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <GitBranch className="size-4" />
              Go Source
            </a>
            <a
              href="https://github.com/the6fallenangel/uptime-monitor-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground"
            >
              <GitBranch className="size-4" />
              Next.js Source
            </a>
          </div>
          <small className="text-muted-foreground flex items-center gap-1">
            Built with <b className="animate-bounce flex">❤️</b> by Alireza
            Mohammadi
          </small>
        </div>
      </footer>
    </div>
  );
}
