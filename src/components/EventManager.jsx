import React, { useState, useEffect } from "react";
import EventCalendar from "./EventCalendar";
import EventAgenda from "./EventAgenda";
import { fetchEventsFromICal } from "../utils/icalParser";

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const fetchedEvents = await fetchEventsFromICal();
            console.log("Eventos obtenidos en EventManager:", fetchedEvents);
            setEvents(fetchedEvents);
        };
        getEvents();
    }, []);

    const handleDateSelect = (date) => {
        const formattedDate = new Date(date).toDateString();
        const eventsOnDate = events.filter(event =>
            new Date(event.date).toDateString() === formattedDate
        );
        console.log("Eventos filtrados para la fecha seleccionada:", eventsOnDate);
        setSelectedEvents(eventsOnDate);
    };

    return (
        <div className="p-d-flex p-flex-column">
            <EventCalendar onSelectDate={handleDateSelect} />
            <EventAgenda events={selectedEvents} />
        </div>
    );
};

export default EventManager;
