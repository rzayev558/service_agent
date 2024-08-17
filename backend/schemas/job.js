import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  name: String,
  submissionDate: String,
  executionDate: String,
  status: String,
  executed: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  header: Array,
  body: String,
  method: String,
  api: String,
});
export const Job = mongoose.model("Job", jobSchema);
