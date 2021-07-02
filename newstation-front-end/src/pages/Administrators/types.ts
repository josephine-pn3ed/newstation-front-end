export interface Administrator {
  id: string;
  company_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  password: string;
  confirm_password: string;
  address: string;
  position: string;
  contact_number: string;
  status: Status;
  created_at: string;
  updated_at: string;
}

type Status = "Active" | "Inactive";
