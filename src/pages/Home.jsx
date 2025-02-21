import { useRef } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import EventCalendar from "../components/EventCalendar";
import EventAgenda from "../components/EventAgenda";
import useICalWatcher from "../hooks/useICalWatcher";

const Home = () => {
  const events = useICalWatcher();
  const getGreeting = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
      return "¡Buenos días!";
    } else if (hour >= 12 && hour < 19) {
      return "¡Buenas tardes!";
    } else {
      return "¡Buenas noches!";
    }
  };

  return (
    <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
      <h1>{getGreeting()}</h1>
      <div className="grid">
        <EventCalendar events={events} />
        <EventAgenda events={events} />
      </div>
    </div>
  );
};

export default Home;
