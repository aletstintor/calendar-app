import React, { useState, useMemo, useCallback } from "react";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";
import "../styles/EventAgenda.css";

const EventAgenda = ({ events }) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(2);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [events]);

  const onPageChange = useCallback((event) => {
    setFirst(event.first);
    setRows(event.rows);
  }, []);

  const paginatedEvents = useMemo(() => {
    return sortedEvents.slice(first, first + rows);
  }, [sortedEvents, first, rows]);

  const isEventExpired = useCallback((eventDate, eventTime) => {
    const eventDateTime = new Date(`${eventDate}T${eventTime}`);
    return new Date() > eventDateTime;
  }, []);

  return (
    <div>
      <h2>Agenda</h2>

      {paginatedEvents.length > 0 ? (
        <div className="p-grid">
          {paginatedEvents.map((event) => (
            <div key={event.id} className="p-col-12 p-md-6 p-lg-4">
              <Card className="mb-3 p-shadow-2" title={event.title}>
                <p className="m-1">
                  <strong>Fecha:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="m-1">
                  <strong>Hora:</strong> {event.time}
                </p>
                <p className="m-1">
                  <strong>Lugar:</strong> {event.place}
                </p>
                <p className="m-1">
                  <strong>Enlace:</strong>{" "}
                  {isEventExpired(event.date, event.time) ? (
                    <span>Expirado</span>
                  ) : (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.link !== "#" ? "Enlace del evento" : "Sin enlace"}
                    </a>
                  )}
                </p>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay eventos para este día.</p>
      )}

      <Paginator
        first={first}
        rows={rows}
        totalRecords={sortedEvents.length}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default EventAgenda;
