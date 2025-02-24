export const fetchEventsFromICal = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/events");
    if (!response.ok) {
      throw new Error("Error fetching events");
    }

    const events = await response.json();
    if (!Array.isArray(events) || events.length === 0) {
      return [];
    }

    return events;
  } catch (error) {
    return [];
  }
};