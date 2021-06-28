export interface Props {
  handleCloseAddForm: (open: boolean) => void;
  handleUpdateForm: (id: string) => void;
  handleButtonDelete: (id: string) => void;
  closeAddForm: boolean;
  news: News[];
}

export interface News {
  id: string;
  company_name: string;
  user_id: string;
  user_first_name: string;
  user_middle_name: string;
  user_last_name: string;
  news_topic: string;
  news_body: string;
  updated_at: string;
}
