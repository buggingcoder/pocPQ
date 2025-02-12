import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class CreateTasksDto {
  @IsArray()
  @ValidateNested({ each: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Type(() => CreateTaskDto as any)
  tasks: CreateTaskDto[];
}
