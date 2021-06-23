export interface Props {
  showPassword: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleLogin: () => void;
  credentials: Credentials;
  error: string[];
  errorLogin: boolean;
  errorLoginPassword: boolean;
}

type Status = "Active" | "Inactive";

interface Credentials {
  email_address: string;
  password: string;
}
