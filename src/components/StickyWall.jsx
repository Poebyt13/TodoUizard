import React from "react";
import TitleTask from "./ui/TitleTask";
import CardComponent from "./StickyWall/CardComponent";
import CardAdd from "./StickyWall/CardAdd";
import useStickyWall from "@/store/useStickyWall";

function StickyWall({ onShowPanel }) {
  const { cards, addCard, removeCard } = useStickyWall();

  return (
    <section className="w-full h-full py-4 pr-4">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md pb-2">
        <TitleTask name="Sticky Wall" />
      </div>
      <div className=" h-[85vh] gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm overflow-y-auto">
        <div className="grid auto-rows-[18rem] grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-6">
          {cards.map((card, idx) => (
            <CardComponent
              key={idx}
              title={card.title}
              description={card.description}
              color={card.color}
              onRemove={() => removeCard(idx)}
            />
          ))}
          <CardAdd onAdd={addCard} />
        </div>
      </div>
    </section>
  );
}

export default StickyWall;
