import { create } from "zustand";

const useStickyWall = create((set) => ({
  cards: [
    {
      title: "Home",
      description: "ciao come va tutto bene?",
      color: "bg-red-100 shadow-md",
    },
    {
      title: "Work",
      description: "ciao come va tutto bene?",
      color: "bg-blue-100 shadow-md",
    },
    {
      title: "Personal",
      description: "ciao come va tutto bene?",
      color: "bg-green-100 shadow-md",
    },
    {
      title: "Study",
      description: "ciao come va tutto bene?",
      color: "bg-yellow-100 shadow-md",
    },
  ],
  addCard: (data) =>
    set((state) => ({
      cards: [
        ...state.cards,
        {
          title: data.title,
          description: data.description,
          color: `${data.color} shadow-md`,
        },
      ],
    })),
  removeCard: (idx) =>
    set((state) => ({
      cards: state.cards.filter((_, i) => i !== idx),
    })),
}));

export default useStickyWall;
