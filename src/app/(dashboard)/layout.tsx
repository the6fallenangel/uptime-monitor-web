import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react"

export default function DashboardLayout({children}: {children: ReactNode}){
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="flex flex-1 flex-col">
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger/>
                    <Separator orientation="vertical" className="h-6"/>
                    <div className="flex-1"/>
                    <ThemeToggle/>
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </SidebarProvider>
    );
}