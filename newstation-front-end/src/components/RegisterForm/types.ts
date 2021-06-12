export interface Props {
    showPassword: boolean,
    showConfirmPassword: boolean,
    handleCompanyInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleClickShowPassword: () => void,
    handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleCompanySubmit: () => void;
    handleClickShowConfirmPassword: () => void;
    company: Company,
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