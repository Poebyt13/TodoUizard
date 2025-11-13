import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import CheckboxWithText from "@/components/ui/CheckboxWithText";
import { Separator } from "@/components/ui/separator";
import TitleTask from "./ui/TitleTask";
import useTasksStore from "@/store/useTasksStore";
import useTaskStore from "@/store/useTaskStore";
import { getTodayISO, getTomorrowISO, getNextWeekMondayISO, isSameWeek } from "@/lib/dateHelpers";

function Today({ onShowPanel }) {
  const [input, setInput] = useState("");
  const today = getTodayISO();

  const allTasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);

  const setSidebarTaskCount = useTaskStore((state) => state.setTaskCount);

  const tasks = allTasks.filter((t) => t.date === today);

  useEffect(() => {
    setSidebarTaskCount("Today", tasks.length);

    const tomorrowISO = getTomorrowISO();
    const nextWeekMondayISO = getNextWeekMondayISO();

    const tomorrowTasks = allTasks.filter((t) => t.date === tomorrowISO);
    const nextWeekTasks = allTasks.filter(
      (t) =>
        t.date !== today &&
        t.date !== tomorrowISO &&
        isSameWeek(t.date, nextWeekMondayISO)
    );

    setSidebarTaskCount(
      "Upcoming",
      tasks.length + tomorrowTasks.length + nextWeekTasks.length
    );
  }, [tasks.length, allTasks, setSidebarTaskCount, today]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input.trim(), today);
      setInput("");
    }
  };

  return (
    <section className="w-full h-full py-4 pr-4">
      <TitleTask name="Today" num_tasks={tasks.length} />
      <div className="mt-8">
        <form
          className="mb-3 focus-within:outline-1 flex px-4 gap-1 py-3 border rounded items-center"
          onSubmit={handleAddTask}
        >
          <span>
            <Plus strokeWidth={3} className="w-4 h-4 mr-2 text-[#7C7C7C]" />
          </span>
          <input
            type="text"
            className="outline-none w-full text-[#444444] font-semibold text-[.8rem]"
            placeholder="Add New Task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
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
      </div>
    </section>
  );
}

export default Today;
