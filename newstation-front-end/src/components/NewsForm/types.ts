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
  first_name: string,
  middle_name: string;
  last_name: string;
  topic: string;
  body: string;
  updated_at: string;
}
