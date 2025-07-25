import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { Sidebar } from "lucide-react";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <DashboardSidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <DashboardNavbar />
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
    )
}

export default Layout;