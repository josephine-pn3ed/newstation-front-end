export interface Props {
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleAdministratorInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleAdministratorRegister: () => void;
  handleClickShowConfirmPassword: () => void;
  administrator: Administrator;
  error: string[];
  errorRegister: boolean;
  handleFormLoaded: (open: boolean) => void;
  addForm: boolean;
  handleUpdateAdministrator: () => void;
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
  user_image: string;
  user_status: Status;
  created_at: string;
  updated_at: string;
}
