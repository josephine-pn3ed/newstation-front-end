export interface Props {
    handleCloseEdit: () => void;
}

export interface State {
    id: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    email_address: string,
    password: string,
    address: string,
    position: string,
    contact_number: string,
    status: Status,
    updated_at: string,
    new_password: string,
    checkPassword: string,
}

export interface Company {
    id: string,
    name: string,
    address: string,
    contact_number: string,
    email_address: string,
    password: string,
    status: Status,
    new_password: string,
    checkPassword: string,

}

export interface Administrator {
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

type Status = "Active" | "Inactive";
