import express from "express";
import ical from "node-ical";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Permite manejar JSON en el servidor

app.get("/api/events", async (req, res) => {
  try {
    const url = process.env.ICAL_URL; // Asegúrate de definir ICAL_URL en tu .env
    if (!url) {
      return res.status(400).json({ error: "ICAL_URL no está definida" });
    }

    const events = await ical.async.fromURL(url);

    const parsedEvents = Object.values(events)
      .filter(event => event.type === "VEVENT" && event.start)
      .map(event => ({
        id: event.uid,
        title: event.summary || "Sin título",
        date: event.start.toISOString(),
        time: `${event.start.toLocaleTimeString()} - ${event.end?.toLocaleTimeString() || "Sin hora"}`,
        place: event.location || "Sin lugar",
        link: event.description && event.description.match(/https?:\/\/[^\s]+/) 
          ? event.description.match(/https?:\/\/[^\s]+/)[0] 
          : "#",
      }));

    res.json(parsedEvents);
  } catch (error) {
    console.error("Error al obtener eventos iCal:", error);
    res.status(500).json({ error: "Error obteniendo los eventos", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
