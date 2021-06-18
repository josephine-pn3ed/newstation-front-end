

type Status = "Active" | "Inactive";

export interface State {
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