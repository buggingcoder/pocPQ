// src/services/task-queue.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { tasks } from './tasks.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class TaskQueueService {
  constructor(@InjectQueue('task-queue') private readonly taskQueue: Queue) {}

  private queue: Map<string, tasks[]> = new Map();
  private activeUsers: Set<string> = new Set();
  private readonly MAX_CONCURRENT_TASKS = 2;
  private logger = new Logger(TaskQueueService.name);

  async addTasks(tasks: tasks[]) {
    tasks.forEach((task) => {
      if (!this.queue.has(task.user_id)) {
        this.queue.set(task.user_id, []);
      }
      this.queue.get(task.user_id)!.push(task);
    });

    await this.processQueue();
  }

  async addTasksToQ(tasks: CreateTaskDto[]) {
    // Sort tasks by created_time for prioritization
    tasks.sort(
      (a, b) =>
        new Date(a.created_time).getTime() - new Date(b.created_time).getTime(),
    );

    for (const task of tasks) {
      await this.taskQueue.add(task.user_id, task, {
        priority: new Date(task.created_time).getTime(),
      });
    }
  }

  private async processQueue() {
    while (this.activeUsers.size < this.MAX_CONCURRENT_TASKS) {
      const nextUser = this.getNextAvailableUser();
      if (!nextUser) break;

      this.activeUsers.add(nextUser);
      await this.processUserTasks(nextUser).finally(() => {
        this.activeUsers.delete(nextUser);
        void this.processQueue();
      });
    }
  }

  private getNextAvailableUser(): string | null {
    for (const [user_id, tasks] of this.queue.entries()) {
      if (!this.activeUsers.has(user_id) && tasks.length > 0) {
        return user_id;
      }
    }
    return null;
  }

  private async processUserTasks(user_id: string) {
    const tasks = this.queue.get(user_id);
    if (!tasks) return;

    while (tasks.length > 0) {
      const task = tasks.shift();
      this.logger.log(
        `Processing task ${task?.item_request_id} for user ${user_id}`,
      );
      if (task) {
        await this.executeTask(task);
      }
    }

    this.queue.delete(user_id);
  }

  private async executeTask(task: tasks) {
    try {
      this.logger.log(`Executing: ${task.task_name} for user ${task.user_id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate task execution
      this.logger.log(`Completed: ${task.task_name} for user ${task.user_id}`);
    } catch (error) {
      this.logger.error(
        `Task failed: ${task.item_request_id} - ${(error as Error).message}`,
      );
    }
  }
}
