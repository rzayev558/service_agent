export const scheduleOrExecuteJob = async (job) => {
  const now = new Date(job.submissionDate);
  const timeUntilExecution = new Date(job.executionDate) - now;
  console.log(new Date(job.executionDate));
  console.log(now);
  if (timeUntilExecution <= 0) {
    // Execute immediately if the executionTime is in the past
    await executeJob(job);
  } else {
    // Schedule the job to be executed in the future
    console.log(
      `Scheduling job: ${job.name} to execute in ${timeUntilExecution / 1000}s`
    );

    setTimeout(async () => {
      await executeJob(job);
    }, timeUntilExecution);
  }
};

async function executeJob(job) {
  console.log(`Executing scheduled job: ${job.name}`);
  job.executed = true;
  await job.save();
  console.log(job);
}
