type Status = "Active" | "Inactive";

export interface State {
  id: string;
  company_name: string,
  user_id: string;
  first_name: string,
  middle_name: string;
  last_name: string;
  topic: string;
  body: string;
  status: Status;
  created_at: string;
  updated_at: string;
}
