import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const navigateTo = (url) => {
    window.open(url, "_blank");
  };

  const items = [
    {
      label: "GAFI",
      command: () => navigateTo("https://www.gafi.com.mx/"),
    },
    {
      label: "Workbeat",
      command: () => navigateTo("https://login.workbeat.com/"),
    },
    {
      label: "ISO Tools",
      command: () =>
        navigateTo("https://appamx.esginnova.com/login/acceso.cfm"),
    },
  ];

  const start = (
    <a href="/" className="text-center">
      <img alt="logo" src={logo} height="50" className="mr-2" />
      Portal GAFI
    </a>
  );

  return (
    <div>
      <Menubar
        model={items}
        start={start}
        className="p-mb-4 justify-content-between flex"
        onToggle={(e) => setMenuActive(e.value)}
      />
    </div>
  );
};

export default Navbar;