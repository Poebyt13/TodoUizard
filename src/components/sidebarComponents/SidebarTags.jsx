import { Plus, SendHorizonal } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useForm } from "react-hook-form";

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { capitalizeFirstLetter } from "@/lib/Capitalize";
import useTagStore from "@/store/useTagStore";

const schema = z.object({
  title: z.string().min(1, "Tag name is required").max(10, "Tag name is too long"),
  color: z.string().min(1),
})

function SidebarTags({ tagsSettings }) {
  const { showTagForm, setShowTagForm } = tagsSettings;

  const tags = useTagStore((state) => state.tags);
  const colors = useTagStore((state) => state.colors);
  const addTag = useTagStore((state) => state.addTag);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      color: "bg-red-100",
    },
  });

  const handleShow = () => {
    setShowTagForm(!showTagForm);
  }

  return (
    <>
      <SidebarMenu className="flex flex-row flex-wrap gap-2">
        {tags.map((item, idx) => (
          <SidebarMenuItem
            key={item.title + idx}
            className={`rounded-sm ${item.color}`}
          >
            <SidebarMenuButton asChild className={"hover:bg-transparent px-3"}>
              <a
                className="font-semibold text-[.7rem] whitespace-nowrap"
                href=""
              >
                {item.title}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem className="flex bg-gray-100 rounded-sm px-3">
          <button
            onClick={handleShow}
            className="h-8 cursor-pointer flex flex-row items-center justify-center"
            type="button"
            aria-label="Add Tag"
          >
            <span>
              <Plus strokeWidth={4} className="w-4 h-4 mr-2 text-[#7C7C7C]" />
            </span>
            <p className="whitespace-nowrap">Add Tag</p>
          </button>
        </SidebarMenuItem>
      </SidebarMenu>
      {showTagForm && (
        <div className="mt-4">
          <form className="flex flex-col gap-4 border-2 p-4 rounded-sm" onSubmit={form.handleSubmit((data)=>{

            const colorController = colors.find((color) => color.color === data.color);

            if (colorController.isUsed){
              form.setError('title', {
                type: 'manual',
                message: 'Color is already used',
              })
              return;
            }
            
            addTag({
              title: capitalizeFirstLetter(data.title),
              color: data.color,
            });

            form.reset();
            setShowTagForm(false);
          })}>
            <div className={`w-full gap-2 flex p-2 border rounded items-center ${form.formState.errors.title ? 'border-2 border-red-300' : ''}`}>
              <span className={`w-4 h-4 rounded-sm ${form.watch("color")}`}>
                <div className="w-4 h-4"></div>
              </span>
              <input
                type="text"
                placeholder=" Tag name"
                className="w-full outline-none"
                { ...form.register("title") }
              />
              <button
                type="submit"
                className="cursor-pointer text-[#7C7C7C] hover:text-black duration-300"
              >
                <SendHorizonal className="w-4" />
              </button>
            </div>
            {
              form.formState.errors.title && (
                <p className="text-xs text-red-500">
                {form.formState.errors.title.message}
               </p>
              )
            }
            <ul className="flex w-full justify-between">
              {colors.map((color) => (
                <li key={color.color} className="flex items-center">
                  <button
                    className={`w-4 h-4 rounded-sm cursor-pointer ${color.color}`}
                    onClick={()=>{ form.setValue('color', color.color) }}
                    type="button"
                    aria-label={`Select color ${color.color}`}
                  ></button>
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}
    </>
  );
}

export default SidebarTags;
