export interface Props {
  handleEditAccountInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateAccount: () => void;
  handleDeleteAccount: () => void;
  editedAccount: Employee;
  handleOpenEdit: () => void;
  handleCloseEdit: () => void;
  openEdit: boolean;
  handleInputPasswordAccount: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

type Status = "Active" | "Inactive";

interface Employee {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_address: string;
  password: string;
  address: string;
  position: string;
  contact_number: string;
  status: Status;
  updated_at: string;
  new_password: string;
  checkPassword: string;
}
