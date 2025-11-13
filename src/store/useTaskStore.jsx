import { create } from 'zustand'
import { ChevronsRight, ListTodo, CalendarRange, StickyNote } from "lucide-react"

const useTaskStore = create((set) => ({
    tasks : [
        { title: "Upcoming", icon: ChevronsRight, href: "#", taskCount: 0 }, // taskCount inizializzato a 0
        { title: "Today", icon: ListTodo, href: "#", taskCount: 0 },
        { title: "Calendar", icon: CalendarRange, href: "#" },
        { title: "Sticky Wall", icon: StickyNote, href: "#" },
    ],
    setTaskCount: (title, count) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.title === title ? { ...t, taskCount: count } : t
            ),
        })),
}))

export default useTaskStore