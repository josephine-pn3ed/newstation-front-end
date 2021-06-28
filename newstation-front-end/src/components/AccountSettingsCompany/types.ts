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
  company_name: string;
  company_address: string;
  company_contact_number: string;
  company_email_address: string;
  company_password: string;
  company_status: Status;
  new_password: string;
  checkPassword: string;
}
