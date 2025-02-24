import React, { useState, useEffect, useCallback } from "react";
import EventCalendar from "./EventCalendar";
import EventAgenda from "./EventAgenda";
import { fetchEventsFromICal } from "../utils/icalParser";
import "primeflex/primeflex.css";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import { ProgressSpinner } from "primereact/progressspinner";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Estado del mes actual

  // Obtener eventos del mes seleccionado
  useEffect(() => {
    const getEventsForMonth = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await fetchEventsFromICal();
        const filteredEvents = filterEventsByMonth(fetchedEvents, currentMonth);
        setEvents(filteredEvents);
        filterEventsByDate(selectedDate, filteredEvents);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      } finally {
        setLoading(false);
      }
    };
    getEventsForMonth();
  }, [currentMonth]); // Se ejecuta cuando cambia el mes

  // Filtrar eventos por mes
  const filterEventsByMonth = (eventList, month) => {
    return eventList.filter(event => new Date(event.date).getMonth() === month);
  };

  // Filtrar eventos por fecha seleccionada
  const filterEventsByDate = useCallback(
    (date, eventList = events) => {
      const formattedDate = date.toDateString();
      const eventsOnDate = eventList.filter(
        (event) => new Date(event.date).toDateString() === formattedDate
      );
      setSelectedEvents(eventsOnDate);
    },
    [events]
  );

  // Manejar cambio de fecha en el calendario
  const handleDateSelect = useCallback(
    (date) => {
      setSelectedDate(date);
      filterEventsByDate(date);
    },
    [filterEventsByDate]
  );

  // Manejar cambio de mes en el calendario
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
            {loading ? (
              <div className="flex justify-content-center p-4">
                <ProgressSpinner />
              </div>
            ) : (
              <EventAgenda events={selectedEvents} />
            )}
          </Panel>
      </div>
    </div>
  );
};

export default EventManager;