import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTheme } from "../../hooks/useTheme";
import gradesData from "../../data/grades.json";

const localizer = momentLocalizer(moment);

//  Custom toolbar with responsive support
function CustomToolbar({ label, onNavigate }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const btnClasses = `px-2 py-1 rounded text-sm sm:text-base ${
    isDark
      ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
      : "bg-gray-300 hover:bg-gray-400 text-gray-900"
  }`;

  return (
    <div className="flex flex-wrap items-center justify-between p-2 gap-2">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => onNavigate("PREV")} className={btnClasses}>
          ‹ Prev
        </button>
        <button onClick={() => onNavigate("TODAY")} className={btnClasses}>
          Today
        </button>
        <button onClick={() => onNavigate("NEXT")} className={btnClasses}>
          Next ›
        </button>
      </div>
      <span className="font-semibold text-lg sm:text-xl">{label}</span>
    </div>
  );
}

export default function StudentCalendar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [date, setDate] = useState(new Date());

  const [events] = useState(
    gradesData.map((g) => ({
      title: `${g.course} - ${g.grade}`,
      start: new Date(g.deadline),
      end: new Date(g.deadline),
      allDay: true,
    }))
  );

  return (
    <div
      className={`${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen p-2 sm:p-4`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Student Calendar</h1>

      <div className="h-[calc(100vh-6rem)] sm:h-[calc(100vh-5rem)]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          views={["month", "week", "day"]}
          defaultView="month"
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          components={{ toolbar: CustomToolbar }}
          dayPropGetter={() => ({
            style: {
              backgroundColor: isDark ? "#1F2937" : "#fff",
              color: isDark ? "#E5E7EB" : "#111827",
            },
          })}
          eventPropGetter={() => ({
            style: {
              backgroundColor: isDark ? "#4F46E5" : "#7C3AED",
              color: "#fff",
              borderRadius: "6px",
              padding: "2px 4px",
              fontSize: "0.75rem",
            },
          })}
        />
      </div>
    </div>
  );
}
