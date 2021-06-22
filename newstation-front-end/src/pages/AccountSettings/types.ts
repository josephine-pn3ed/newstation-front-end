export interface Props {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    handleLogoutButton: () => void;
}


export interface State {
    id: string,
    employee_first_name: string,
    employee_middle_name: string,
    employee_last_name: string,
    employee_email_address: string,
    employee_password: string,
    employee_address: string,
    employee_position: string,
    employee_contact_number: string,
    employee_image: string,
    employee_status: Status,
    updated_at: string
}

export interface Company {
    id: string,
    company_name: string,
    company_address: string,
    company_contact_number: string,
    company_email_address: string,
    company_password: string,
    company_status: Status,

}

type Status = "Active" | "Inactive";