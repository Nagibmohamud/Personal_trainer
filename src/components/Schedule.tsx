import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewWeek,
  createViewMonthGrid,
  createViewDay,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";

function Calendar() {
  const calendarApp = useCalendarApp({
    views: [
      createViewWeek(),
      createViewMonthGrid(),
      createViewDay(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        start: "2025-05-01 10:00",
        end: "2025-05-01 11:00",
        title: "Meeting with John",
        description: "Discuss project updates",
        draggable: true,
      },
    ],

    selectedDate: "2025-05-01",
  });

  return (
    <>
      <ScheduleXCalendar calendarApp={calendarApp} />
    </>
  );
}
export default Calendar;
