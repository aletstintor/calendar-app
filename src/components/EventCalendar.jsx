import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { Tooltip } from "primereact/tooltip";
import { addLocale } from 'primereact/api';
import { fetchEventsFromICal } from "../utils/icalParser";
import "../styles/EventCalendar.css";

const EventCalendar = ({ onSelectDate }) => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            const icalEvents = await fetchEventsFromICal();
            setEvents(icalEvents);
        };
        loadEvents();
    }, []);

    const handleDateSelect = (e) => {
        const selectedDate = new Date(e.value);
        setDate(selectedDate);
        if (onSelectDate) {
            onSelectDate(selectedDate);
        }
    };

    const hasFutureEvents = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return events.some(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.toDateString() === new Date(date.year, date.month, date.day).toDateString() 
                   && eventDate >= today;
        });
    };

    const getEventsForDate = (date) => {
        return events
            .filter(event => new Date(event.date).toDateString() === new Date(date.year, date.month, date.day).toDateString())
            .map(event => event.title)
            .join(", ");
    };

    addLocale('es', {
        firstDayOfWeek: 0,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    return (
        <div className="flex justify-content-center align-items-center">
            <Calendar
                value={date}
                onChange={handleDateSelect}
                inline
                showButtonBar
                locale="es"
                className="custom-calendar"
                dateTemplate={(date) => {
                    const eventTooltip = getEventsForDate(date);
                    const formattedDate = date.day;

                    return (
                        <div className="day-container" id={`day-${formattedDate}`}>
                            {formattedDate}
                            {hasFutureEvents(date) && <span className="event-dot"></span>}
                            {eventTooltip && <Tooltip target={`#day-${formattedDate}`} content={eventTooltip} />}
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default EventCalendar;