const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DB = "data.json";

// Read database
function readDB() {
    if (!fs.existsSync(DB)) return [];
    return JSON.parse(fs.readFileSync(DB));
}

// Save database
function saveDB(data) {
    fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

// Test route (so you can check if server is running)
app.get("/", (req, res) => {
    res.send("🚨 Secunda Safety API is running");
});

// Get all incidents
app.get("/incidents", (req, res) => {
    res.json(readDB());
});

// Report a new incident
app.post("/report", (req, res) => {
    const data = readDB();

    const newIncident = {
    id: Date.now(),
    type: req.body.type || "Unknown",
    severity: req.body.severity || "Low",
    address: req.body.address || "",
    contact: req.body.contact || "",
    date: req.body.date || "",
    time: req.body.time || "",
    lat: req.body.lat,
    lng: req.body.lng,
    createdAt: new Date()
};

    data.push(newIncident);
    saveDB(data);

    console.log("🚨 New incident:", newIncident);

    res.json({ status: "ok", incident: newIncident });
});

// IMPORTANT: Use Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));