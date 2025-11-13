import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, CalendarRange } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";

function CheckboxWithText({ uniqueId, details, onShowPanel, label, date, subtasks = [], list }) {
  // Format date as DD-MM-YYYY
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("it-IT");
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center px-4 py-0.5">
        <div className="flex gap-4">
          <Checkbox id={uniqueId} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={uniqueId}
              className="translate-y-[.05rem] text-[.95rem] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label || "Accept terms and conditions"}
            </label>
          </div>
        </div>
        <button
          className="cursor-pointer flex justify-center items-center text-[#7C7C7C] hover:text-[#444444]"
          onClick={() =>
            onShowPanel?.({
              uniqueId,
              label: label || "Accept terms and conditions",
              date,
              subtasks,
              list,
            })
          }
          type="button"
          aria-label="Show task details"
        >
          <ChevronRight />
        </button>
      </div>
      {details ?? (
        <div className="mt-2 pl-12 flex flex-row gap-2 text-[.8rem] mb-1 items-center">
          <div className="flex items-center gap-2">
            <CalendarRange size={17} />
            {formatDate(date)}
          </div>
          <Separator orientation="vertical" className="h-4! w-[.05rem]!" />
          <div className="flex items-center gap-2">
            <span className="bg-[#EBEBEB] text-[#444444] w-[1.5rem] py-0.5 text-xs font-medium text-center rounded-[5px]">
              {subtasks.length}
            </span>
            <p>Subtasks</p>
          </div>
          <Separator orientation="vertical" className="h-4! w-[.05rem]!" />
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-300 rounded-[5px]"></span>
            <p>{list || "Personal"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckboxWithText;
