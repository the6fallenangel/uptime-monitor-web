"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Activity, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { title: "Monitors", url: "/monitors", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar(){
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="px-4 py-3">
                <div className="flex items-center gap-2 font-semibold">
                    <Activity className="size-5"/>
                    <span className="group-data-[collapsible=icon]:hidden">
                        Uptime Monitor
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item)=>(
                                <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton render={<Link href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>} isActive={pathname.startsWith(item.url)} tooltip={item.title}/>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}