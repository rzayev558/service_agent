import { Job } from "../../schemas/job.js";
import { scheduleOrExecuteJob } from "../../services/agent.js";
export async function postJob(req, res) {
  try {
    const job = new Job(req.body);
    const savedjob = await job.save();
    res.status(201).json(job);
    scheduleOrExecuteJob(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getJobs(req, res) {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
