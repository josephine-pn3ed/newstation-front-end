export interface Props {
  handleCloseAddForm: (open: boolean) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonSubmit: () => void;
  handleButtonUpdate: (id: string) => void;
  addForm: boolean;
  news: News;
  error: string[];
}

type Status = "Active" | "Inactive";

interface News {
  id: string;
  company_name: string,
  user_id: string;
  user_first_name: string,
  user_middle_name: string;
  user_last_name: string;
  news_topic: string;
  news_body: string;
  updated_at: string;
}
