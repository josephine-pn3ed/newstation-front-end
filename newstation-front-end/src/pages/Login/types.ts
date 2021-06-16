export interface Props {
    showPassword: boolean,
    handleCompanyInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleClickShowPassword: () => void,
    handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleCompanyLogin: () => void;
    company: Company,
    error: string[],
    errorLogin: boolean,
    errorLoginPassword: boolean,
    open: boolean;
    handleDrawerOpen: () => void;
    handleLogoutButton: () => void;
  }
  
  type Status = "Active" | "Inactive";
  
  interface Company {
    id: string,
    company_name: string,
    company_image: string,
    company_address: string,
    company_contact_number: string,
    company_email_address: string,
    company_password: string,
    company_confirm_password: string,
    company_status: Status,
    created_at: string,
    updated_at: string
  }