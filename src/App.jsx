import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
