import React, { useState, useEffect } from "react";
import EventCalendar from "./EventCalendar";
import EventAgenda from "./EventAgenda";
import { fetchEventsFromICal } from "../utils/icalParser";
import "primeflex/primeflex.css";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Fecha actual por defecto

  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchEventsFromICal();
      console.log("Eventos obtenidos en EventManager:", fetchedEvents);
      setEvents(fetchedEvents);

      // Filtrar eventos para la fecha actual al cargar
      const formattedDate = new Date().toDateString();
      const eventsOnDate = fetchedEvents.filter(
        (event) => new Date(event.date).toDateString() === formattedDate
      );
      setSelectedEvents(eventsOnDate);
    };
    getEvents();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = new Date(date).toDateString();
    const eventsOnDate = events.filter(
      (event) => new Date(event.date).toDateString() === formattedDate
    );
    console.log("Eventos filtrados para la fecha seleccionada:", eventsOnDate);
    setSelectedEvents(eventsOnDate);
  };

  return (
    <div className="grid">
      {/* Calendario en el lado izquierdo */}
      <div className="col-8">
        <EventCalendar selectedDate={selectedDate} onSelectDate={handleDateSelect} />
      </div>

      {/* Agenda en el lado derecho */}
      <div className="col-4">
        <EventAgenda events={selectedEvents} />
      </div>
    </div>
  );
};

export default EventManager;
