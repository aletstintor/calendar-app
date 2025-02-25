import React, { useState, useMemo, useCallback } from "react";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";
import { Badge } from "primereact/badge";
import "../styles/EventAgenda.css";

const isEventExpired = (eventDate, eventTime) => {
  const times = eventTime.split(" - ");
  let endTimeStr = times.length === 2 ? times[1].trim() : eventTime.trim();
  const eventEndDateTime = new Date(`${eventDate}T${endTimeStr}:00`);
  return new Date() > eventEndDateTime;
};

const isNewEvent = (eventDate) => {
  const eventDateTime = new Date(eventDate);
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  return eventDateTime >= today && eventDateTime <= sevenDaysLater;
};

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

  return (
    <div>
      {paginatedEvents.length > 0 ? (
        <div className="grid">
          {paginatedEvents.map((event) => (
            <div key={event.id} className="col-12 md-6 lg-4">
              <Card
                title={
                  <div>
                    {event.title}{" "}
                    {isNewEvent(event.date) && (
                      <Badge
                        value="Nuevo"
                        severity="success"
                        className="ml-2 vertical-align-middle"
                      />
                    )}
                  </div>
                }
              >
                <p className="m-0">
                  <strong>Fecha:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="m-0">
                  <strong>Hora:</strong> {event.time}
                </p>
                <p className="m-0">
                  <strong>Lugar:</strong> {event.place}
                </p>
                <p className="m-0">
                  <strong>Enlace:</strong>{" "}
                  {isEventExpired(event.date, event.time) ? (
                    <span>Expirado</span>
                  ) : (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        event.link !== "#" ? "p-enabled" : "p-disabled"
                      }
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