import React from 'react';
import { Divider } from 'primereact/divider';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Footer = () => {
  return (
    <footer className="flex flex-column p-4">
      <Divider />
      <p className="mt-2 text-center">
        &copy; {new Date().getFullYear()} GAFI Servicios. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;