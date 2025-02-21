import useICalWatcher from "../hooks/useICalWatcher";
import EventManager from "../components/EventManager";

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
      <EventManager />
    </div>
  );
};

export default Home;
