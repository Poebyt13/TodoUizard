import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema di validazione
const schema = z.object({
  title: z.string().min(1, "Title required").max(30, "Max 30 chars"),
  description: z.string().max(120, "Max 120 chars").optional(),
  color: z.string().min(1, "Color required"),
});

const COLORS = [
  { name: "Red", value: "bg-red-100", border: "border-red-400" },
  { name: "Blue", value: "bg-blue-100", border: "border-blue-400" },
  { name: "Green", value: "bg-green-100", border: "border-green-400" },
  { name: "Yellow", value: "bg-yellow-100", border: "border-yellow-400" },
  { name: "Purple", value: "bg-purple-100", border: "border-purple-400" },
];

function CardAdd({ onAdd }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      color: COLORS[0].value,
    },
  });

  const selectedColor = watch("color");

  const onSubmit = (data) => {
    if (onAdd) onAdd(data);
    setOpen(false);
    reset();
  };

  return (
    <Card
      className={`rounded-md gap-0 bg-sidebar-accent border-none relative overflow-hidden cursor-pointer min-h-[8rem]`}
      onClick={() => !open && setOpen(true)}
    >
      {!open ? (
        <div className="flex justify-center items-center h-full w-full text-[#444444] font-semibold text-[1.5rem]">
          <Plus strokeWidth={3} className="w-12 h-12 mr-2 text-[#7C7C7C]" />
        </div>
      ) : (
        <form
          className="flex flex-col gap-3 p-4"
          onClick={e => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Title"
            maxLength={30}
            {...register("title")}
            className="border rounded px-2 py-1 text-base focus:outline-none"
          />
          {errors.title && (
            <span className="text-xs text-red-500">{errors.title.message}</span>
          )}

          <textarea
            placeholder="Description"
            maxLength={120}
            {...register("description")}
            className="border rounded px-2 py-1 text-base focus:outline-none resize-none"
            rows={3}
          />
          {errors.description && (
            <span className="text-xs text-red-500">{errors.description.message}</span>
          )}

          <div className="flex items-center gap-2">
            {COLORS.map((c) => (
              <label key={c.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={c.value}
                  {...register("color")}
                  className="hidden"
                />
                <span
                  className={`w-6 h-6 rounded-full border-2 mr-1 ${c.value} flex items-center justify-center transition-colors duration-150 ${
                    selectedColor === c.value ? c.border : "border-gray-300"
                  }`}
                >
                  {selectedColor === c.value && (
                    <span className="block w-3 h-3 rounded-full bg-gray-600 opacity-80"></span>
                  )}
                </span>
              </label>
            ))}
          </div>
          {errors.color && (
            <span className="text-xs text-red-500">{errors.color.message}</span>
          )}

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition"
            >
              Add
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-200 text-gray-700 rounded px-2 py-1 hover:bg-gray-300 transition"
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
                reset();
              }}
              aria-label="Cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </Card>
  );
}

export default CardAdd;
