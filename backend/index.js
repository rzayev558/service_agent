import {
  getJobs,
  postJob,
  addJobToFavourites,
} from "./controllers/job/job.controller.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const router = express.Router();
const app = express();

const port = 3000;

//register and use controllers
const mongoURI = "mongodb://localhost:27017/requests_db";
router.get("/api/jobs", getJobs);
router.post("/api/jobs", postJob);
router.patch("/api/jobs/:id", addJobToFavourites);
app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
