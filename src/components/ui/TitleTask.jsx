import React from 'react'

function TitleTask({ name, num_tasks }) {
  return (
    <div className="flex justify-start items-center gap-6 mb-4">
      <h1 className="text-4xl font-bold">{name}</h1>
      <span
        className={`border-[1px] text-2xl p-[.2rem] px-[.5rem] font-semibold rounded-sm ${
          typeof num_tasks === "number" ? "" : "hidden"
        }`}
        style={
          typeof num_tasks === "number"
            ? { visibility: "visible", opacity: 1 }
            : { visibility: "hidden", opacity: 0 }
        }
      >
        {typeof num_tasks === "number" ? num_tasks : ""}
      </span>
    </div>
  )
}

export default TitleTask