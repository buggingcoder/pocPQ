import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { TaskQueueService } from './TaskQueueService.service';
// import { tasks } from './tasks.interface';

// interface Task {
//   id: number;
//   userId: number;
//   taskName: string;
//   projectId: number;
//   urn: string;
// }

@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService,
    private taskQueueService: TaskQueueService,
  ) {}

  // this method takes in array of tasks and calls the service for further process of setting priority
  // @Post('addTask')
  // addTask(@Body() createTasksDto: CreateTasksDto) {
  //   // console.log(`logging tasks ${JSON.stringify(createTasksDto)}`);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   this.taskService.addTasks(createTasksDto.tasks);
  //   return { message: 'Task added to the queue' };
  // }

  // @Post('enqueue')
  // async enqueueTasks(@Body() body: { tasks: Task[] }): Promise<string> {
  //   await this.taskQueueService.addTasks(body.tasks);
  //   return 'Tasks have been added to the queue';
  // }

  // @Post('add')
  // async addTasks(@Body() body: CreateTasksDto) {
  //   console.log(`logging tasks ${JSON.stringify(body)}`);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //   await this.taskQueueService.addTasks(body.tasks);
  //   return { message: 'Tasks added to queue' };
  // }

  @Post('add')
  async addTasks(@Body() body: CreateTasksDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.taskQueueService.addTasksToQ(body.tasks);
    return { message: 'Tasks added to queue' };
  }

  @Get('task-priority')
  taskPriority() {
    return this.taskService.taskPriority();
  }
}
