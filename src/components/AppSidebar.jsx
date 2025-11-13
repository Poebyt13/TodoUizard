import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";

import SidebarSearch from "./sidebarComponents/SidebarSearch";
import SidebarTasks from "./sidebarComponents/SidebarTasks";
import SidebarLists from "./sidebarComponents/SidebarLists";
import SidebarTags from "./sidebarComponents/SidebarTags";
import SidebarSettings from "./sidebarComponents/SidebarSettings";

import { useState } from "react";

function AppSidebar({ handleSelect }) {
  const [showListForm, setShowListForm] = useState(false);
  const [showTagForm, setShowTagForm] = useState(false);

  return (
    <Sidebar className="border-r">
      <SidebarContent className={"p-2 text-[#444444]"}>
        <SidebarGroup>
          <SidebarGroupLabel className="pl-0 text-2xl font-bold mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarSearch />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-[.7rem]">
            TASKS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarTasks handleSelect={handleSelect}/>
          </SidebarGroupContent>
        </SidebarGroup>

        {!showTagForm && (
          <SidebarGroup className="border-t">
            <SidebarGroupLabel className="font-semibold text-[.7rem]">
              LISTS
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarLists listsSettings={{ showListForm, setShowListForm }} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {!showListForm && (
          <SidebarGroup className="border-t">
            <SidebarGroupLabel className="font-semibold text-[.7rem]">
              TAGS
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarTags tagsSettings={{ showTagForm, setShowTagForm }} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-4 text-[#444444]">
        <SidebarSettings />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
