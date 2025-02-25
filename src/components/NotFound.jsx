import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="surface-section px-4 py-4">
      <div className="flex flex-column lg:flex-row justify-content-center align-items-center gap-7">
        <div className="text-center lg:text-right">
          <div className="mt-6 mb-3 font-bold text-6xl text-900">Perdido?</div>
          <p className="text-700 text-3xl mt-0 mb-6">
            No podemos encontrar ésta página.
          </p>
          <Button
            type="button"
            label="Volver al Inicio"
            icon="pi pi-home"
            className="p-button-outlined"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <img
            src="../src/assets/notfound.png"
            alt="NotFound"
            className="w-full md:w-18rem"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
