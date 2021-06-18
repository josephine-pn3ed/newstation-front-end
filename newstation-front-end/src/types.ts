export interface State {
  news: News,
  viewer: Viewer
}

type Status = "Active" | "Inactive";

interface News {
  id: string,
  company_id: string,
  news_topic: string,
  news_body: string,
  news_image: string,
  news_status: Status,
  created_at: string,
  updated_at: string
}

interface Viewer {
  id: string,
  news_id: string,
  employee_id: string,
  viewed_at: string,
}