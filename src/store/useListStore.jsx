import { create } from "zustand";

const useListStore = create((set) => ({
  lists: [{ title: "Personal", color: "bg-red-500", href: "#", listCount: 2 }],
  colors: [
    { color: "bg-red-500", isUsed: true },
    { color: "bg-pink-500", isUsed: false },
    { color: "bg-purple-500", isUsed: false },
    { color: "bg-blue-500", isUsed: false },
    { color: "bg-cyan-500", isUsed: true },
    { color: "bg-green-500", isUsed: false },
    { color: "bg-yellow-500", isUsed: false },
    { color: "bg-orange-500", isUsed: false },
  ],
  addList: (newList) =>
    set((state) => ({
      lists: [...state.lists, newList],
      colors: state.colors.map((color) =>
        color.color === newList.color ? { ...color, isUsed: true } : color
      ),
    })),
}));

export default useListStore;
