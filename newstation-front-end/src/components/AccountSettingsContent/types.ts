export interface Props {
    handleEditAccountInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleUpdateAccount: () => void;
    handleDeleteAccount: () => void;
    editedAccount: Employee,
    error: string[],
}

type Status = "Active" | "Inactive";

interface Employee {
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
