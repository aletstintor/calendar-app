import useICalWatcher from "../hooks/useICalWatcher";
import EventManager from "../components/EventManager";

const Home = () => {
  const events = useICalWatcher();

  return (
    <div className="flex flex-column align-content-center">
      <EventManager />
    </div>
  );
};

export default Home;
