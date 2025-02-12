import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('task-queue')
export class TaskProcessor extends WorkerHost {
  private activeUsers: Set<string> = new Set();
  private maxConcurrency = 2;

  async process(job: Job<any, any, string>): Promise<void> {
    const userId = job.name;

    // If another user's tasks are active, wait
    if (
      this.activeUsers.size >= this.maxConcurrency &&
      !this.activeUsers.has(userId)
    ) {
      await job.moveToDelayed(Date.now() + 1000); // Retry in 1 second
      return;
    }

    // Register user as active
    this.activeUsers.add(userId);
    console.log(`Processing task for user: ${userId}`, job.data);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Complete the task and release the user
    console.log(`Completed task for user: ${userId}`);
    this.activeUsers.delete(userId);
  }
}
