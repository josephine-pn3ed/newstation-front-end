export interface Props {
    handleCloseEdit: () => void;
}


export interface State {
    id: string,
    user_first_name: string,
    user_middle_name: string,
    user_last_name: string,
    user_email_address: string,
    user_password: string,
    user_address: string,
    user_position: string,
    user_contact_number: string,
    user_image: string,
    user_status: Status,
    updated_at: string,
    new_password: string,
    checkPassword: string,
}

export interface Company {
    id: string,
    company_name: string,
    company_address: string,
    company_contact_number: string,
    company_email_address: string,
    company_password: string,
    company_status: Status,
    new_password: string,
    checkPassword: string,

}

export interface Administrator {
    id: string;
    company_id: string;
    user_first_name: string;
    user_middle_name: string;
    user_last_name: string;
    user_email_address: string;
    user_password: string;
    user_confirm_password: string;
    user_address: string;
    user_position: string;
    user_contact_number: string;
    user_status: Status;
    created_at: string;
    updated_at: string;
}


type Status = "Active" | "Inactive";
