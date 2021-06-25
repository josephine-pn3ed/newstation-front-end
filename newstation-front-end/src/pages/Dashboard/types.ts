type Status = "Active" | "Inactive";

export interface State {
  id: string;
  company_name: string,
  user_id: string;
  user_first_name: string,
  user_middle_name: string;
  user_last_name: string;
  news_topic: string;
  news_body: string;
  news_image: any | null;
  news_status: Status;
  created_at: string;
  updated_at: string;
}
