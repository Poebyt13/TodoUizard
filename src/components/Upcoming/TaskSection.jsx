import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CheckboxWithText from "../ui/CheckboxWithText";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useTasksStore from "@/store/useTasksStore";
import useTaskStore from "@/store/useTaskStore";
import { getTodayISO, getTomorrowISO, getNextWeekMondayISO, isSameWeek } from "@/lib/dateHelpers";

const schema = z.object({
  title: z
    .string()
    .min(1, "Task name is required")
    .max(50, "Task name is too long"),
});

function TaskSection({ title, tasks, onShowPanel }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const addTask = useTasksStore((state) => state.addTask);
  const setSidebarTaskCount = useTaskStore((state) => state.setTaskCount);

  const getDateForSection = () => {
    if (title === "Today") {
      return getTodayISO();
    }
    if (title === "Tomorrow") {
      return getTomorrowISO();
    }
    if (title === "This Week") {
      const today = new Date();
      const afterTomorrow = new Date();
      afterTomorrow.setDate(today.getDate() + 2);
      const nextWeekMondayISO = getNextWeekMondayISO();
      if (isSameWeek(afterTomorrow.toISOString().slice(0, 10), nextWeekMondayISO)) {
        return afterTomorrow.toISOString().slice(0, 10);
      }
      return nextWeekMondayISO;
    }
    return getTodayISO();
  };

  const handleAddTask = (data) => {
    const date = getDateForSection();
    addTask(data.title, date);
    form.reset();
  };

  useEffect(() => {
    const updatedTasks = useTasksStore.getState().tasks;
    const todayISO = getTodayISO();
    const tomorrowISO = getTomorrowISO();
    const nextWeekMondayISO = getNextWeekMondayISO();

    const todayTasks = updatedTasks.filter((t) => t.date === todayISO);
    const tomorrowTasks = updatedTasks.filter((t) => t.date === tomorrowISO);
    const nextWeekTasks = updatedTasks.filter(
      (t) =>
        t.date !== todayISO &&
        t.date !== tomorrowISO &&
        isSameWeek(t.date, nextWeekMondayISO)
    );

    setSidebarTaskCount("Today", todayTasks.length);
    setSidebarTaskCount(
      "Upcoming",
      todayTasks.length + tomorrowTasks.length + nextWeekTasks.length
    );
  }, [tasks, setSidebarTaskCount]);

  return (
    <Card className="w-full h-[42vh] gap-1 shadow-none relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-[1.30rem] font-bold">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          className="focus-within:outline-1 flex px-4 gap-1 py-3 border rounded items-center mb-2"
          onSubmit={form.handleSubmit(handleAddTask)}
        >
          <span>
            <Plus strokeWidth={3} className="w-4 h-4 mr-2 text-[#7C7C7C]" />
          </span>
          <input
            type="text"
            className="outline-none w-full text-[#444444] font-semibold text-[.8rem]"
            placeholder="Add New Task"
            {...form.register("title")}
          />
        </form>
        <div className="relative mt-2 h-full max-h-50 overflow-hidden">
          <div className="flex flex-col gap-2 text-[#444444]">
            {tasks.map((task, idx) => (
              <React.Fragment key={task.id}>
                <CheckboxWithText
                  uniqueId={task.id}
                  label={task.label}
                  date={task.date}
                  subtasks={task.subtasks}
                  list={task.list}
                  onShowPanel={onShowPanel}
                />
                {idx < tasks.length - 1 && <Separator className="h-[.01rem]!" />}
              </React.Fragment>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/85 to-transparent flex justify-center items-end pointer-events-none">
            <button className="text-[#444444] text-[.8rem] font-semibold mb-3 pointer-events-auto hover:underline" type="button">
              View All
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskSection;
