const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const mongoURI = "mongodb://localhost:27017/requests_db";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a schema and model for requests
const requestSchema = new mongoose.Schema({
  name: String,
  method: String,
  api: String,
  headers: Object,
  body: String,
  execution: String,
  date: String,
  time: String,
});

const Request = mongoose.model("Request", requestSchema);

// API Endpoint to handle POST requests
app.post("/api/requests", async (req, res) => {
  try {
    const request = new Request(req.body);
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Endpoint to retrieve all requests
app.get("/api/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
