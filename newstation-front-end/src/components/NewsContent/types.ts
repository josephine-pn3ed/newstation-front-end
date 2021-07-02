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
  first_name: string;
  middle_name: string;
  last_name: string;
  topic: string;
  body: string;
  updated_at: string;
}
