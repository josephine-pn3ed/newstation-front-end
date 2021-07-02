export interface Props {
  handleEditCompanyInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateCompany: () => void;
  handleDeleteCompany: () => void;
  editedCompany: Company;
  handleOpenEdit: () => void;
  handleCloseEdit: () => void;
  openEdit: boolean;
  handleInputPasswordCompany: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

type Status = "Active" | "Inactive";

interface Company {
  id: string;
  name: string;
  address: string;
  contact_number: string;
  email_address: string;
  password: string;
  status: Status;
  new_password: string;
  checkPassword: string;
}
