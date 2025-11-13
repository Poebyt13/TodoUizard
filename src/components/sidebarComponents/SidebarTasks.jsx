import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import useTaskStore from "@/store/useTaskStore"

function SidebarTasks({ handleSelect }) {
  const tasks = useTaskStore((state) => state.tasks)

  return (
    <SidebarMenu>
      {tasks.map((item, idx) => (
        <SidebarMenuItem key={item.title + idx} onClick={() => handleSelect(item.title)}>
          <SidebarMenuButton asChild>
            <a href={item.href} className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
                <item.icon className="w-4 h-4" aria-label={item.title + " icon"} />
                <span>{item.title}</span>
              </div>
              <div>
                {item.taskCount > 0 && (
                  <span className="bg-[#EBEBEB] text-[#444444] font-bold rounded-sm inline-block text-center w-[1.5rem] py-0.5 text-xs">
                    {item.taskCount}
                  </span>
                )}
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default SidebarTasks