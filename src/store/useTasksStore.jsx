import { create } from "zustand";

// Dati reali da useListStore e useTagStore:
// lists: [{ title: "Personal", ... }]
// tags: [{ title: "Tag 1", ... }, { title: "Tag 2", ... }]

const useTasksStore = create((set) => ({
  tasks: [
    {
      id: 1,
      label: "Task for Today",
      date: "2025-05-25", // oggi
      list: "Personal", // deve esistere in useListStore
      subtasks: [
        { id: 1, label: "Read terms", completed: false },
        { id: 2, label: "Accept", completed: false },
      ],
      tags: ["Tag 1", "Tag 2"], // devono esistere in useTagStore
    },
    {
      id: 2,
      label: "Task for Tomorrow",
      date: "2025-05-26", // domani
      list: "Personal",
      subtasks: [],
      tags: [],
    },
    {
      id: 3,
      label: "Task for Next Week",
      date: "2025-05-31",
      list: "Personal",
      subtasks: [
        { id: 1, label: "Step 1", completed: true }
      ],
      tags: ["Tag 1"], // solo tag esistenti
    },
    {
      id: 4,
      label: "Task for Study",
      date: "2025-05-22",
      list: "Personal",
      subtasks: [],
      tags: [],
    },
  ],
  addTask: (label, date, list = "Personal") =>
    set((state) => ({
      tasks: [
        {
          id: Date.now(),
          label,
          date,
          list,
          subtasks: [],
          tags: [],
        },
        ...state.tasks,
      ],
    })),
}));

export default useTasksStore;
