import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from 'primereact/api';
import { fetchEventsFromICal } from "../utils/icalParser";

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
        <div className="col">
            <h2>Calendario</h2>
            <Calendar
                value={date}
                onChange={handleDateSelect}
                inline
                showButtonBar
                locale="es"
            />
        </div>
    );
};

export default EventCalendar;
