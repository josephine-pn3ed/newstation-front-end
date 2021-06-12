export interface State {
    company: Company,
    employee: Employee,
    news: News,
    viewer: Viewer,
    showPassword: boolean,
    showConfirmPassword: boolean,
    error: string[],
}

type Status = "Active" | "Inactive";

interface Company {
    id: string,
    company_name: string,
    company_image: string,
    company_address: string,
    company_contact_number: string,
    company_password: string,
    company_confirm_password: string,
    company_status: Status,
    created_at: string,
    updated_at: string
}

interface Employee {
    id: string,
    company_id: string,
    employee_first_name: string,
    employee_middle_name: string,
    employee_last_name: string,
    employee_email: string,
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

interface News {
    id: string,
    company_id: string,
    news_topic: string,
    news_body: string,
    news_image: string,
    news_status: Status,
    created_at: string,
    updated_at: string
}

interface Viewer {
    id: string,
    news_id: string,
    employee_id: string,
    viewed_at: string,
}