

import { Search } from "lucide-react"
import { SidebarMenuItem } from "@/components/ui/sidebar"

function SidebarSearch() {
  return (
    <SidebarMenuItem>
    <div className="flex p-2 border rounded items-center">
      <span>
        <Search
          strokeWidth={3}
          className="w-4 h-4 mr-2 text-[#7C7C7C]"
        />
      </span>
      <input
        type="text"
        className="outline-none w-full"
        placeholder="Search"
      />
    </div>
  </SidebarMenuItem>
  )
}

export default SidebarSearch