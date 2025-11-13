import React, { useEffect } from "react";
import TaskSection from "./Upcoming/TaskSection";
import TitleTask from "./ui/TitleTask";
import useTasksStore from "@/store/useTasksStore";
import useTaskStore from "@/store/useTaskStore";
import { getTodayISO, getTomorrowISO, getNextWeekMondayISO, isSameWeek } from "@/lib/dateHelpers";

function Upcoming({ onShowPanel }) {
  const allTasks = useTasksStore((state) => state.tasks);
  const setSidebarTaskCount = useTaskStore((state) => state.setTaskCount);

  const todayISO = getTodayISO();
  const tomorrowISO = getTomorrowISO();
  const nextWeekMondayISO = getNextWeekMondayISO();

  const todayTasks = allTasks.filter((t) => t.date === todayISO);
  const tomorrowTasks = allTasks.filter((t) => t.date === tomorrowISO);
  const nextWeekTasks = allTasks.filter(
    (t) =>
      t.date !== todayISO &&
      t.date !== tomorrowISO &&
      isSameWeek(t.date, nextWeekMondayISO)
  );

  // Aggiorna il taskCount nel sidebar ogni volta che cambia il numero di task upcoming
  useEffect(() => {
    setSidebarTaskCount(
      "Upcoming",
      todayTasks.length + tomorrowTasks.length + nextWeekTasks.length
    );
  }, [todayTasks.length, tomorrowTasks.length, nextWeekTasks.length, setSidebarTaskCount]);

  return (
    <section className="w-full h-full py-4 pr-4">
      <TitleTask name="Upcoming" num_tasks={todayTasks.length + tomorrowTasks.length + nextWeekTasks.length}/>
      <div className="flex flex-col gap-5">
        <TaskSection title="Today" tasks={todayTasks} onShowPanel={onShowPanel}/>
        <div className="flex gap-5">
          <TaskSection title="Tomorrow" tasks={tomorrowTasks} onShowPanel={onShowPanel}/>
          <TaskSection title="This Week" tasks={nextWeekTasks} onShowPanel={onShowPanel}/>
        </div>
      </div>
    </section>
  );
}

export default Upcoming;
