// src/dto/create-task.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString() user_id: string;
  @IsString() user_name: string;
  @IsString() item_id: string;
  @IsString() item_request_id: string;
  @IsString() destination_name: string;
  @IsString() destination_urn: string;
  @IsString() source_name: string;
  @IsString() source_urn: string;
  @IsString() start_time: string;
  @IsString() created_time: string;
  @IsString() task_name: string;
  @IsString() status: string;
  @IsOptional() @IsString() status_message?: string;
  @IsBoolean() dbError: boolean;
  @IsBoolean() keep_subscription: boolean;
  @IsString() old_manifest_id: string;
  @IsString() container_type: string;
  @IsString() container_name: string;
}
