export interface Props {
  handleCloseAddForm: (open: boolean) => void;
  handleUpdateForm: (id: string) => void;
  handleButtonDelete: (id: string) => void;
  company: string;
  max_width: any;
  news: News[];
}

type Status = "Active" | "Inactive";

export interface News {
  id: string;
  company_id: string;
  news_topic: string;
  news_body: string;
  news_image: any | null;
  news_status: Status;
  created_at: string;
  updated_at: string;
}
