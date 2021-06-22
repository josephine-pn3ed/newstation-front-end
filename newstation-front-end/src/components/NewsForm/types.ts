export interface Props {
  handleCloseAddForm: (open: boolean) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonSubmit: () => void;
  handleButtonUpdate: (id: string) => void;
  news: News;
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
