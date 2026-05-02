const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 PUT YOUR SUPABASE DETAILS HERE
const supabase = createClient(
    "sb_publishable_L-W2lYDuYhXkynkTdhUfnw_F3vNsp77",
);

// Test route
app.get("/", (req, res) => {
    res.send("🚨 Secunda Safety API (Supabase Connected)");
});

// Get all incidents
app.get("/incidents", async (req, res) => {
    const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) return res.status(500).json(error);

    res.json(data);
});

// Report incident
app.post("/report", async (req, res) => {
    const { error } = await supabase
        .from("incidents")
        .insert([{
            type: req.body.type,
            severity: req.body.severity,
            address: req.body.address,
            contact: req.body.contact,
            date: req.body.date,
            time: req.body.time,
            lat: req.body.lat,
            lng: req.body.lng
        }]);

    if (error) return res.status(500).json(error);

    res.json({ status: "ok" });
});

// Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));