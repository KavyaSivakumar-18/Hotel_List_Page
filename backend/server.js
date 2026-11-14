/* global require, process */

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

app.get("/", (req, res) => {
  res.send("Hotel Backend is Running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "PostgreSQL Connected Successfully",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/hotels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hotels ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/hotels/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hotels WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/hotels", async (req, res) => {
  try {
    const { title, description, latitude, longitude, price, image } = req.body;

    const result = await pool.query(
      `INSERT INTO hotels
       (title, description, latitude, longitude, price, image)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, latitude, longitude, price, image],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/hotels/:id", async (req, res) => {
  try {
    const { title, description, latitude, longitude, price, image } = req.body;

    const result = await pool.query(
      `UPDATE hotels
       SET title = $1, description = $2, latitude = $3,
           longitude = $4, price = $5, image = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, latitude, longitude, price, image, req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/hotels/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM hotels WHERE id = $1 RETURNING *",
      [req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
