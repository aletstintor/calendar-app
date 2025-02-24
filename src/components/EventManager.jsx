import React, { useState, useEffect, useCallback, useMemo } from "react";
import EventCalendar from "./EventCalendar";
import EventAgenda from "./EventAgenda";
import { fetchEventsFromICal } from "../utils/icalParser";
import "primeflex/primeflex.css";
import { Panel } from "primereact/panel";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const filteredEventsByMonth = useMemo(() => {
    return events.filter(
      (event) => new Date(event.date).getMonth() === currentMonth
    );
  }, [events, currentMonth]);

  const selectedEvents = useMemo(() => {
    const formattedDate = selectedDate.toDateString();
    return filteredEventsByMonth.filter(
      (event) => new Date(event.date).toDateString() === formattedDate
    );
  }, [filteredEventsByMonth, selectedDate]);

  const fetchAndFilterEvents = useCallback(async () => {
    try {
      const fetchedEvents = await fetchEventsFromICal();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAndFilterEvents();
    const intervalId = setInterval(fetchAndFilterEvents, 5000);
    return () => clearInterval(intervalId);
  }, [fetchAndFilterEvents]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleMonthChange = useCallback((newMonth) => {
    setCurrentMonth(newMonth);
  }, []);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 p-4">
      <div className="w-full md:w-2/3">
        <Panel header="Calendario" className="text-xl font-bold">
          <EventCalendar
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            onMonthChange={handleMonthChange}
          />
        </Panel>
      </div>

      <div className="w-full md:w-1/3">
        <Panel header="Agenda" className="text-xl font-bold">
          <EventAgenda events={selectedEvents} />
        </Panel>
      </div>
    </div>
  );
};

export default EventManager;