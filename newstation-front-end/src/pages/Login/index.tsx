import { useState } from 'react';
import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';
import useStyles from '../../styles/_LoginForm';
import { State } from './types';
import axios from 'axios';
import { login, logout, setCompanyId, removeCompanyId } from '../../utils';

const Login = () => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorLoginPassword, setErrorLoginPassword] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [company, setCompany] = useState<State>({
    id: "",
    company_name: "",
    company_image: "",
    company_address: "",
    company_contact_number: "",
    company_email_address: "",
    company_password: "",
    company_confirm_password: "",
    company_status: "Active",
    created_at: "",
    updated_at: ""
  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogoutButton = () => {
    logout();
    removeCompanyId();
    window.location.replace("http://localhost:3000/login");
  }

  const handleCompanyLogin = async () => {
    const { company_email_address, company_password } = company;
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    try {
      !(company_email_address) && errors.push('company_email_address');
      !(company_password) && errors.push('company_password');
      !validateEmail.test(company_email_address) && errors.push('company_email_address');

      setError(errors);

      if (!errors.length) {
        const result = await axios.post('/login', {
          company_email_address: company_email_address.toLowerCase(),
          company_password: company_password
        })

        const { success, message } = result.data;

        if (!success) throw Error
        else {
          if (message === "Wrong password.") {
            setErrorLoginPassword(true)
            setErrorLogin(false)
          } else if (message === "Invalid credentials!") {
            setErrorLogin(true)
          } else {
            setErrorLoginPassword(false)
            setErrorLogin(false)
            login();
            setCompanyId(message);
            window.location.replace("http://localhost:3000/dashboard");
          }
        }
      }
    } catch (error) {
      alert('An error occurred while logging in!');
    }
  }


  const handleCompanyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setCompany({ ...company, [name]: value });
  };

  return (
    <div className={classes.root}>
      <Navbar open={!open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <LoginForm
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleCompanyInputChange={handleCompanyInputChange}
        handleCompanyLogin={handleCompanyLogin}
        error={error}
        company={company}
        errorLogin={errorLogin}
        errorLoginPassword={errorLoginPassword}
      />
    </div>
  )
}

export default Login;