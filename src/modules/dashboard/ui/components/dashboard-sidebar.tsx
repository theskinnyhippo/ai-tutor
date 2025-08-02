"use client";

import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { labelDayButton } from "react-day-picker";
import Link from "next/link"
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";

const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]
const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    }
]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar className="bg-amber-400">
            <SidebarHeader className=" text-sidebar-accent-foreground">
                <Link href="/" className="flex item-center justify-center px-4 pt-2">
                    <Image src="logo.svg" height={36} width={130} alt="AI.Tutor"/>
                    {/* <p className="text-2xl font-medium">ai-tutor</p> */}
                </Link>
            </SidebarHeader>
            <div className="px-4 p-2">
                <Separator className="opacity-30 text-[#5D6B68]"/>
            </div>
            <SidebarContent>
                
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild
                                            className={cn(
                                                // "py-3 hover:py-6",
                                                "h-10 hover:bg-linear-to-r/oklch from-sidebar-accent from-10% via-60% via-sidebar/50 to-sidebar/50",
                                                pathname === item.href && "bg-linear-to-oklch border-[#5D6B68]"
                                            )}
                                            isActive={pathname === item.href}
                                        >
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            <div className="px-4 p-2">
                <Separator className="opacity-30 text-[#5D6B68]"/>
            </div>
                
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                        asChild
                                            className={cn(
                                                // "py-3 hover:py-6",
                                                "h-10 hover:bg-linear-to-r/oklch from-sidebar-accent from-10% via-60% via-sidebar/50 to-sidebar/50",
                                                pathname === item.href && "bg-linear-to-oklch border-[#5D6B68]"
                                            )}
                                            isActive={pathname === item.href}
                                        >
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                
            </SidebarContent>

            <SidebarFooter className="text-white">
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    )
}