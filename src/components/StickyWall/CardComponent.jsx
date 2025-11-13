import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

// Funzione per calcolare una variante più scura del colore sticky (restituisce un colore HEX)
function getTriangleColor(bgClass) {
  if (bgClass.includes("red-100")) return "#fecaca";      // Tailwind red-200
  if (bgClass.includes("blue-100")) return "#bfdbfe";     // Tailwind blue-200
  if (bgClass.includes("green-100")) return "#bbf7d0";    // Tailwind green-200
  if (bgClass.includes("yellow-100")) return "#fef08a";   // Tailwind yellow-200
  if (bgClass.includes("purple-100")) return "#ddd6fe";   // Tailwind purple-200
  return "#e5e7eb"; // gray-200 fallback
}

function CardComponent({ title, description, color, onRemove }) {
  const triangleColor = getTriangleColor(color);

  return (
    <div className={`relative group`}>
      <div className={`rounded-md gap-0 ${color} border-none overflow-hidden h-full flex flex-col`}>
        {/* Triangolo sticky in alto a destra */}
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-0 right-0 w-10 h-10 p-0 m-0 bg-transparent border-none outline-none z-10 group-hover:opacity-100 opacity-0 transition-opacity"
          tabIndex={-1}
          aria-label="Remove sticky"
        >
          {/* Triangolo SVG con colore simile ma leggermente diverso */}
          <svg width="40" height="40" className="absolute top-0 right-0 pointer-events-none" style={{zIndex:1}}>
            <polygon points="40,0 40,40 0,0" fill={triangleColor} />
          </svg>
          {/* X per la rimozione */}
          <span className="absolute top-1 right-1 text-gray-700 z-10 pointer-events-none">
            <X size={16} />
          </span>
        </button>
        <div>
          <div className="px-6 pt-6 pb-2">
            <h3 className="text-[#262626] text-[1.5rem] font-semibold">{title}</h3>
          </div>
          <div className="px-6 pb-6 text-[#444444] font-normal text-[1rem]">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent