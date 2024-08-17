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

export async function addJobToFavourites(req, res) {
  try {
    const jobId = req.params.id;
    console.log("Job ID:", jobId);

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    job.favorite = !job.favorite;
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
