
import { SlidersHorizontal, LogOut } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"

function SidebarSettings() {
  return (
    <SidebarMenu className="w-full">
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href="#" className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Settings</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href="#" className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
  )
}

export default SidebarSettings