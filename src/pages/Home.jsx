import React from "react";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/icons-portal.css";

const apps = [
  { name: "GAFI", url: "https://www.gafi.com.mx/", iconClass: "icon-gafi" },
  { name: "Workbeat", url: "https://login.workbeat.com/", iconClass: "icon-workbeat" },
  { name: "ISOTools", url: "https://appamx.esginnova.com/login/acceso.cfm", iconClass: "icon-isotools" },
  { name: "Calendario GAFI", url: "/calendar", iconClass: "icon-calendario" },
];

const Home = () => {
  return (
    <div className="grid">
      {apps.map((app) => (
        <div key={app.name} className="col-12 sm:col-6 md:col-3 p-2">
          {app.name === "Calendario GAFI" ? (
            <Link to={app.url} className="no-underline">
              <Card className="app-card" title={app.name}>
                <div className="flex justify-content-center align-items-center">
                  <span className={`custom-icon ${app.iconClass} text-8xl`}></span>
                </div>
              </Card>
            </Link>
          ) : (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Card className="app-card" title={app.name}>
                <div className="flex justify-content-center align-items-center flex-wrap">
                  <span className={`custom-icon ${app.iconClass} text-8xl`}></span>
                </div>
              </Card>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
