import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Upcoming from "@/components/Upcoming";
import Today from '@/components/Today';
import StickyWall from "@/components/StickyWall";
import Calendar from "@/components/Calendar";
import useTasksStore from "@/store/useTasksStore";
import useTaskStore from "@/store/useTaskStore";
import useListStore from "@/store/useListStore";
import useTagStore from "@/store/useTagStore";
import { getTodayISO, getTomorrowISO, getNextWeekMondayISO, isSameWeek } from "@/lib/dateHelpers";
import { Check } from "lucide-react";

function Home() {
  const [selected, setSelected] = useState("Today");
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [taskPanelData, setTaskPanelData] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtaskChecked, setSubtaskChecked] = useState([]);

  const lists = useListStore((state) => state.lists);
  const tags = useTagStore((state) => state.tags);
  const allTasks = useTasksStore((state) => state.tasks);

  // Quando apro il pannello task, popola i dati con quelli della task selezionata
  useEffect(() => {
    if (showTaskPanel && taskPanelData && taskPanelData.id) {
      const found = allTasks.find(t => t.id === taskPanelData.id);
      if (found) {
        // Solo tag che esistono in useTagStore
        const validTags = (found.tags || []).filter(tag =>
          tags.some(t => t.title === tag)
        );
        setSelectedTags(validTags);

        // Solo lista che esiste in useListStore
        const validList = lists.some(l => l.title === found.list)
          ? found.list
          : (lists[0]?.title || "");
        setSelectedList(validList);

        // Subtasks: array di oggetti { label, completed }
        setSubtasks(found.subtasks?.map(st => ({ label: st.label, completed: !!st.completed })) || []);
        setSubtaskChecked(found.subtasks?.map(st => !!st.completed) || []);
      } else {
        setSelectedTags([]);
        setSelectedList(lists[0]?.title || "");
        setSubtasks([]);
        setSubtaskChecked([]);
      }
      setSubtaskInput("");
    }
    if (!showTaskPanel) {
      setSelectedTags([]);
      setSelectedList(lists[0]?.title || "");
      setSubtasks([]);
      setSubtaskChecked([]);
      setSubtaskInput("");
    }
    // eslint-disable-next-line
  }, [showTaskPanel, taskPanelData, allTasks, tags, lists]);

  const handleSelect = (value) => {
    setSelected(value);
    setShowTaskPanel(false);
  };

  React.useEffect(() => {
    const allTasks = useTasksStore.getState().tasks;
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

    const setSidebarTaskCount = useTaskStore.getState().setTaskCount;
    setSidebarTaskCount("Today", todayTasks.length);
    setSidebarTaskCount(
      "Upcoming",
      todayTasks.length + tomorrowTasks.length + nextWeekTasks.length
    );
  }, []);

  // Aggiorna handleAddSubtask per aggiungere oggetti con completed: false
  const handleAddSubtask = (e) => {
    e.preventDefault();
    const trimmed = subtaskInput.trim();
    if (trimmed.length > 0 && trimmed.length <= 20) {
      setSubtasks((prev) => [...prev, { label: trimmed, completed: false }]);
      setSubtaskChecked((prev) => [...prev, false]);
      setSubtaskInput("");
    }
  };

  // Aggiorna handleRemoveSubtask per lavorare su oggetti
  const handleRemoveSubtask = (idx) => {
    setSubtasks((prev) => prev.filter((_, i) => i !== idx));
    setSubtaskChecked((prev) => prev.filter((_, i) => i !== idx));
  };

  // Aggiorna handleToggleSubtask per lavorare su oggetti
  const handleToggleSubtask = (idx) => {
    setSubtaskChecked((prev) =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
    setSubtasks((prev) =>
      prev.map((st, i) =>
        i === idx ? { ...st, completed: !st.completed } : st
      )
    );
  };

  // Gestione selezione multipla tags
  const handleToggleTag = (tagTitle) => {
    setSelectedTags((prev) =>
      prev.includes(tagTitle)
        ? prev.filter((t) => t !== tagTitle)
        : [...prev, tagTitle]
    );
  };

  const renderTasks = () => {
    const panelProps = {
      onShowPanel: (data) => {
        setTaskPanelData(data);
        setShowTaskPanel(true);
      }
    };
    switch (selected) {
      case "Today":
        return <Today {...panelProps} />;
      case "Upcoming":
        return <Upcoming {...panelProps} />;
      case "Calendar":
        return <Calendar {...panelProps} />;
      case "Sticky Wall":
        return <StickyWall {...panelProps} />;
      default:
        return <Today {...panelProps} />;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row items-stretch overflow-hidden">
      <SidebarProvider className="w-fit">
        <AppSidebar handleSelect={handleSelect} />
      </SidebarProvider>
      <div className={`flex-1 flex transition-all duration-200 overflow-hidden ${showTaskPanel ? "pr-0" : ""}`}>
        <main className={`flex-1 flex justify-center items-center p-4 pl-8 transition-all duration-200 overflow-y-auto overflow-x-hidden ${showTaskPanel ? "max-w-[calc(100vw-16rem-380px)]" : ""}`}>
          {renderTasks()}
        </main>
        {showTaskPanel && (
          <aside
            className="relative h-full flex flex-col bg-white rounded-xl border p-0 w-[400px] max-w-[95vw] my-8 mr-8 transition-all duration-200 overflow-y-auto overflow-x-hidden"
            style={{
              minWidth: 340,
              maxHeight: "calc(100vh - 4rem)",
              alignSelf: "center",
            }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black z-20"
              onClick={() => setShowTaskPanel(false)}
              type="button"
              aria-label="Close panel"
            >
              ×
            </button>
            <div className="px-6 pt-6 pb-2 flex items-center gap-2">
              <span className="text-2xl font-extrabold">Task:</span>
            </div>
            <form className="flex flex-col gap-3 px-6 pb-4 flex-1">
              <input
                type="text"
                defaultValue={taskPanelData?.label || ""}
                placeholder="Title"
                className="border rounded px-2 py-1 text-base focus:outline-none"
              />
              <textarea
                defaultValue={taskPanelData?.description || ""}
                placeholder="Description"
                className="border rounded px-2 py-1 text-base focus:outline-none resize-none"
                rows={2}
              />
              <div className="flex flex-col gap-3 mt-2">
                {/* List: solo liste esistenti */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 font-semibold w-24">List:</label>
                  <select
                    className="border rounded px-2 py-1 w-full text-sm"
                    value={selectedList}
                    onChange={e => setSelectedList(e.target.value)}
                  >
                    {lists.map((l) => (
                      <option key={l.title} value={l.title}>{l.title}</option>
                    ))}
                  </select>
                </div>
                {/* Due Date */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 font-semibold w-24">Due date:</label>
                  <input type="date" className="border rounded px-2 py-1 w-full text-sm" defaultValue={taskPanelData?.date || ""} />
                </div>
                {/* Tags: multipli selezionabili, pill evidenziata se attiva */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 font-semibold w-24">Tags:</label>
                  <div className="flex gap-2 flex-wrap w-full">
                    {tags.map((tag) => {
                      const checked = selectedTags.includes(tag.title);
                      return (
                        <label
                          key={tag.title}
                          className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all
                            ${checked ? `ring-2 ring-yellow-400 ${tag.color} font-bold` : `${tag.color} opacity-70 hover:opacity-100`}`}
                          style={{ userSelect: "none" }}
                        >
                          <input
                            type="checkbox"
                            name="task-panel-tags"
                            value={tag.title}
                            checked={checked}
                            onChange={() => handleToggleTag(tag.title)}
                            className="hidden"
                          />
                          {tag.title}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="font-extrabold text-lg mb-2">Subtasks:</div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={subtaskInput}
                    onChange={e => setSubtaskInput(e.target.value.slice(0, 20))}
                    placeholder="Add subtask (max 20 chars)"
                    className="border rounded px-2 py-1 text-sm flex-1"
                    maxLength={20}
                  />
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black border px-2 py-1 rounded"
                    aria-label="Add subtask"
                    onClick={handleAddSubtask}
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {subtasks.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-yellow-400"
                        checked={subtaskChecked[idx] || false}
                        onChange={() => handleToggleSubtask(idx)}
                      />
                      <span className="text-sm">{sub.label}</span>
                      {subtaskChecked[idx] ? (
                        <Check className="text-green-500 w-4 h-4 ml-2" />
                      ) : (
                        <button
                          type="button"
                          className="text-red-500 text-xs ml-2"
                          onClick={() => handleRemoveSubtask(idx)}
                          aria-label="Remove subtask"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1" />
              <div className="flex gap-2 mt-4 mb-2">
                <button
                  type="button"
                  className="flex-1 border border-black bg-white text-black rounded px-2 py-1.5 text-base font-medium hover:bg-gray-100 transition"
                >
                  Delete Task
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-300 text-black rounded px-2 py-1.5 text-base font-medium hover:bg-yellow-400 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Home;
