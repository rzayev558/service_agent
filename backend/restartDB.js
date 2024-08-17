const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/requests_db";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async () => {
  console.log("Connected to MongoDB");

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

  try {
    await Request.deleteMany({});
    console.log("All entries deleted successfully");
  } catch (error) {
    console.error("Error deleting entries:", error);
  } finally {
    db.close(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  }
});
