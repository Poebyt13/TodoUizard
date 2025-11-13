
import { create } from 'zustand'

const useTagStore = create((set)=>({
    tags: [
        { title: "Tag 1", color: "bg-cyan-100" },
        { title: "Tag 2", color: "bg-red-100" },
    ],
    colors: [
        { color: "bg-red-100", isUsed: true },
        { color: "bg-pink-100", isUsed: false },
        { color: "bg-purple-100", isUsed: false },
        { color: "bg-blue-100", isUsed: false },
        { color: "bg-cyan-100", isUsed: true },
        { color: "bg-green-100", isUsed: false },
        { color: "bg-yellow-100", isUsed: false },
        { color: "bg-orange-100", isUsed: false },
    ],
    addTag: (newTag) => set((state) => ({
        tags: [...state.tags, newTag],
        colors: state.colors.map((color) =>
            color.color === newTag.color ? { ...color, isUsed: true } : color
        ),
    })),
}))

export default useTagStore