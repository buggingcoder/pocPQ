import { Injectable } from '@nestjs/common';
import { Task } from './task.class';
import { PriorityQueue } from '@datastructures-js/priority-queue';
import PQueue from 'p-queue';

@Injectable()
export class TasksService {
  private queue: PriorityQueue<Task>;
  private pqueue = new PQueue({ concurrency: 1 });
  private activeUsers = new Set<number>();
  private activeTasks = 0;

  constructor() {
    this.queue = new PriorityQueue<Task>((a, b) => b.id - a.id);
    console.log(`this.queue in constructor ...${JSON.stringify(this.queue)}`);
    console.log(`this.pqueue in constructor ...${JSON.stringify(this.pqueue)}`);
  }

  // this method initializes the priority queue with the incoming tasks array
  addTasks(tasks: Task[]) {
    if (!tasks) throw new Error(`No task found.`);

    // const taskPQueue = this.pqueue.addAll(async() => {

    // });

    // const taskPriorityQueue = PriorityQueue.fromArray<Task>(
    //   tasks,
    //   (a, b) => a.userId - b.userId,
    // );

    tasks.forEach((task) => this.addTask(task));
    console.log(`value of queue after addTasks .. ${JSON.stringify(tasks)}`);
  }

  addTask(task: Task) {
    this.queue.enqueue(task);
    console.log(`Added task ${task.id} for user ${task.userId}`);
    this.processTasks();
  }

  private processTasks() {
    while (this.activeTasks < 3 && this.queue.size() > 0) {
      const task: Task | null = this.queue.dequeue();

      if (!task) {
        console.log('No task found in the queue.');
        continue;
      }

      if (this.activeUsers.has(task?.userId)) {
        console.log(
          `Waiting for user ${task?.userId} to complete their tasks...`,
        );
        continue;
      }

      this.activeUsers.add(task?.userId);
      this.activeTasks++;

      console.log(
        `Processing task with id ${task?.id} for user ${task?.userId}...`,
      );

      setTimeout(() => {
        console.log(`Completed task ${task?.id} for user ${task?.userId}.`);
        this.activeTasks--;
        this.activeUsers.delete(task?.userId);
        this.processTasks();
      }, 50000);
    }
  }

  getQueueSize(): number {
    return this.queue.size();
  }

  taskPriority() {
    return `tasks are being handled`;
  }
}
