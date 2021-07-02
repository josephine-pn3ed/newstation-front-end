export interface Props {
  handleEmployeeInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFormLoaded: (open: boolean) => void;
  handleEmployeeRegister: () => void;
  handleUpdateEmployee: () => void;
  employee: Employee;
  error: string[];
  errorRegister: boolean;
  addForm: boolean;
}

type Status = "Active" | "Inactive";

interface Employee {
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