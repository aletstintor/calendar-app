import { useState, useEffect } from "react";
import { fetchEventsFromICal } from "../utils/icalParser";

const useICalWatcher = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const newEvents = await fetchEventsFromICal();
        if (JSON.stringify(events) !== JSON.stringify(newEvents)) {
          console.log("Nuevos eventos detectados en iCal");
          setEvents(newEvents);
        }
      } catch (error) {
        console.error("Error al sincronizar iCal:", error);
      }
    };

    const interval = setInterval(fetchEvents, 5000);
    
    fetchEvents();
    return () => clearInterval(interval);
  }, [events]);

  return events;
};

export default useICalWatcher;