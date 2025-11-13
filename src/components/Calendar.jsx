import React from "react";
import TitleTask from "./ui/TitleTask";

import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import it from "date-fns/locale/it";
import '../style/CustomCalendar.css';

const locales = {
  it: it,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Eventi di esempio
const events = [
  {
    title: "Sessione: Marketing Sprint",
    start: new Date(2025, 1, 14, 9, 0),
    end: new Date(2025, 1, 14, 10, 0),
  },
  {
    title: "Sales Catch-up",
    start: new Date(2025, 1, 14, 10, 0),
    end: new Date(2025, 1, 14, 11, 0),
  },
  {
    title: "Business Lunch",
    start: new Date(2025, 1, 16, 12, 0),
    end: new Date(2025, 1, 16, 13, 30),
  },
];

function Calendar() {
  return (
    <section className="w-full h-full py-4 pr-4">
      <TitleTask name="Calendar" />
      <div className="h-[87vh]">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={["day", "week", "month"]}
          style={{ height: "100%" }}
          min={new Date(2025, 0, 1, 9, 0)} // Mostra da 08:00
          max={new Date(2025, 0, 1, 15, 0)} // Fino alle 18:00
          eventPropGetter={(event) => {
            let backgroundColor = "#f0f0f0";
            if (event.title.includes("Marketing")) backgroundColor = "#d1f5f8";
            else if (event.title.includes("Sales")) backgroundColor = "#cce5ff";
            else if (event.title.includes("Lunch")) backgroundColor = "#fff8b3";
            return {
              style: {
                backgroundColor,
                borderRadius: "8px",
                padding: "4px",
                color: "#000",
                fontWeight: "500",
              },
            };
          }}
        />
      </div>
    </section>
  );
}

export default Calendar;
