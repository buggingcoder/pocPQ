export interface tasks {
  user_id: string;
  user_name: string;
  item_id: string;
  item_request_id: string;
  destination_name: string;
  destination_urn: string;
  source_name: string;
  source_urn: string;
  start_time: string;
  created_time: string;
  end_time?: string;
  task_name: string;
  status: string;
  status_message?: string;
  dbError: boolean;
  keep_subscription: boolean;
  old_manifest_id: string;
  container_type: string;
  container_name: string;
}
