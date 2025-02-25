import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/icons-portal.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "¡Buenos días!";
    if (hour >= 12 && hour < 19) return "¡Buenas tardes!";
    return "¡Buenas noches!";
  };

  const getTodayDate = () => {
    const today = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return today.toLocaleDateString("es-ES", options);
  };

  const start = (
    location.pathname === "/calendar" ? (
      <button
        onClick={() => navigate("/")}
        className="p-button p-button-text"
        title="Regresar al inicio"
      >
        <i className="pi pi-arrow-left" style={{ fontSize: "1.5rem" }}></i>
      </button>
    ) : (
    <div className="flex align-content-center flex-wrap">
      <div className="flex align-items-center justify-content-center">
        <span className="custom-icon icon-gafi text-7xl p-mr-2"></span>
        <h2 className="p-m-0">Portal GAFI</h2>
      </div>
    </div>)
  );

  const end =
    (
      <div className="flex flex-column">
        <p className="m-2">{getGreeting()}</p>
        <small className="m-2">{getTodayDate()}</small>
      </div>
    );

  return (
    <Menubar
      start={start}
      end={end}
      className="justify-content-around"
    />
  );
};

export default Navbar;
