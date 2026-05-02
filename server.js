require("dotenv").config();

console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
console.log("SUPABASE_ANON_KEY =", process.env.SUPABASE_ANON_KEY);
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase setup (uses .env)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ---------------------------
// TEST ROUTE
// ---------------------------
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ---------------------------
// TEST SUPABASE CONNECTION
// ---------------------------
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("your_table_name") // <-- change this
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ---------------------------
// EXAMPLE: INSERT DATA
// ---------------------------
app.post("/add", async (req, res) => {
  const { title } = req.body;

const { data, error } = await supabase
  .from("incidents")
  .insert([{ title }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ---------------------------
// START SERVER
// ---------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});