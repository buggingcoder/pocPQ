import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskQueueService } from './TaskQueueService.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'task-queue',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskQueueService],
})
export class TasksModule {}
