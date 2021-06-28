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
  user_first_name: string;
  user_middle_name: string;
  user_last_name: string;
  user_email_address: string;
  user_password: string;
  user_address: string;
  user_position: string;
  user_contact_number: string;
  user_image: string;
  user_status: Status;
  updated_at: string;
  new_password: string;
  checkPassword: string;
}
