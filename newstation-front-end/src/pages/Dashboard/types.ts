export interface State {
  id: string,
  company_id: string,
  company_name: string,
  news_topic: string,
  news_body: string,
  news_image: any | null,
  news_status: Status,
  created_at: string,
  updated_at: string
}

type Status = "Active" | "Inactive";

