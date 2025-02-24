import { useState, useEffect, useRef } from "react";
import { fetchEventsFromICal } from "../utils/icalParser";

const useICalWatcher = () => {
  const [events, setEvents] = useState([]);
  const eventsRef = useRef([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const newEvents = await fetchEventsFromICal();
        if (JSON.stringify(eventsRef.current) !== JSON.stringify(newEvents)) {
          eventsRef.current = newEvents;
          setEvents(newEvents);
        }
      } catch (error) {
        console.error("Error al sincronizar iCal:", error);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 1000);
    return () => clearInterval(interval);
  }, []);

  return events;
};

export default useICalWatcher;