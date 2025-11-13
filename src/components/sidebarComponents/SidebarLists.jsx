import { Plus, SendHorizonal } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { capitalizeFirstLetter } from "@/lib/Capitalize";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useListStore from "@/store/useListStore";

const schema = z.object({
  title: z
    .string()
    .min(1, "List name is required")
    .max(10, "List name is too long"),
  color: z.string().min(1),
});


function SidebarLists({ listsSettings }) {
  const { showListForm, setShowListForm } = listsSettings;

  const lists = useListStore((state) => state.lists);
  const colors = useListStore((state) => state.colors);
  const addList = useListStore((state) => state.addList);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      color: "bg-red-500",
    },
  });

  const handleShow = () => {
    setShowListForm(!showListForm);
  };

  return (
    <SidebarMenu>
      {lists.map((item, idx) => (
        <SidebarMenuItem key={item.title + idx}>
          <SidebarMenuButton asChild>
            <a href={item.href} className="flex items-center justify-between gap-2">
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`w-4 h-4 text-transparent rounded-sm ${item.color}`}
                />
                <p>{item.title}</p>
              </div>
              <div className="">
                {item.listCount > 0 && (
                  <span className="bg-[#EBEBEB] text-[#444444] font-bold rounded-sm inline-block text-center w-[1.5rem] py-0.5 text-xs">
                    {item.listCount}
                  </span>
                )}
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <button
          onClick={handleShow}
          className="hover:bg-[#F5F5F5] cursor-pointer flex p-2 items-center w-full rounded-sm"
          type="button"
          aria-label="Add New List"
        >
          <span>
            <Plus strokeWidth={4} className="w-4 h-4 mr-2 text-[#7C7C7C]" />
          </span>
          <p>Add New List</p>
        </button>
      </SidebarMenuItem>
      {showListForm && (
        <SidebarMenuItem>
          <form
            className="flex mt-3 flex-col gap-4 border-2 p-4 rounded-sm"
            onSubmit={form.handleSubmit((data) => {
              const colorController = colors.find(
                (color) => color.color === data.color
              );
            
              if (colorController.isUsed) {
                form.setError("title", {
                  type: "manual",
                  message: "Color is already use",
                });
                return;
              }

              addList({
                ...data,
                title: capitalizeFirstLetter(data.title),
                href: "#",
                listCount: 0,
              });
            
              form.reset();
              setShowListForm(false);
            })}
          >
            <div
              className={`w-full gap-2 flex p-2 border rounded items-center ${
                form.formState.errors.title ? "border-2 border-red-300" : ""
              }`}
            >
              <span className={`w-4 h-4 rounded-sm ${form.watch("color")}`}>
                <div className="w-4 h-4"></div>
              </span>
              <input
                type="text"
                placeholder="List Name"
                className={`w-full outline-none`}
                {...form.register("title")}
              />

              <button
                type="submit"
                className="cursor-pointer text-[#7C7C7C] hover:text-black duration-300"
              >
                <SendHorizonal className="w-4" />
              </button>
            </div>
            {form.formState.errors.title && (
              <p className="text-xs text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
            <ul className="flex w-full justify-between">
              {colors.map((color) => (
                <li key={color.color} className="flex items-center">
                  <button
                    className={`w-4 h-4 rounded-sm cursor-pointer ${color.color}`}
                    onClick={() => form.setValue("color", color.color)}
                    type="button"
                    aria-label={`Select color ${color.color}`}
                  ></button>
                </li>
              ))}
            </ul>
          </form>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}

export default SidebarLists;
