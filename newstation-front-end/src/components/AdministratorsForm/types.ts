export interface Props {
  handleAdministratorInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFormLoaded: (open: boolean) => void;
  handleAdministratorRegister: () => void;
  handleUpdateAdministrator: () => void;
  administrator: Administrator;
  error: string[];
  errorRegister: boolean;
  addForm: boolean;
}

type Status = "Active" | "Inactive";

interface Administrator {
  id: string;
  company_id: string;
  user_first_name: string;
  user_middle_name: string;
  user_last_name: string;
  user_email_address: string;
  user_password: string;
  user_confirm_password: string;
  user_address: string;
  user_position: string;
  user_contact_number: string;
  user_status: Status;
  created_at: string;
  updated_at: string;
}
