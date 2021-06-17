export interface Props {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    handleLogoutButton: () => void;
    showPassword: boolean,
    showConfirmPassword: boolean,
    handleEmployeeInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleClickShowPassword: () => void,
    handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleEmployeeRegister: () => void;
    handleClickShowConfirmPassword: () => void;
    employee: Employee,
    error: string[],
    errorRegister: boolean
}


type Status = "Active" | "Inactive";

interface Employee {
    id: string,
    company_id: string,
    employee_first_name: string,
    employee_middle_name: string,
    employee_last_name: string,
    employee_email_address: string,
    employee_password: string,
    employee_confirm_password: string,
    employee_address: string,
    employee_position: string,
    employee_contact_number: string,
    employee_image: string,
    employee_status: Status,
    created_at: string,
    updated_at: string
}
