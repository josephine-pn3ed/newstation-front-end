import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import RegisterForm from '../../components/RegisterForm';
import { State } from './types';
import useStyles from '../../styles/_RegisterForm';
import { logout } from '../../utils';

const Register = () => {
  const { root } = useStyles();
  const history = useHistory();

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

  const [open, setOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);

  const handleCompanyRegister = async () => {
    const { company_password, company_confirm_password, company_email_address, company_name, company_contact_number, company_address } = company;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    try {
      !company_name && errors.push('company_name');
      !company_address && errors.push('company_address');
      !company_contact_number && errors.push('company_contact_number');
      !company_email_address && errors.push('company_email_address');
      !company_password && errors.push('company_password');
      !validateEmail.test(company_email_address) && errors.push('company_email_address');
      !strongRegex.test(company_password) && errors.push('company_password');
      !strongRegex.test(company_confirm_password) && errors.push('company_confirm_password');

      (company_confirm_password !== company_password) && errors.push('company_confirm_password');

      setError(errors);

      if (!errors.length) {
        const result = await axios.post('/company', {
          company_email_address: company_email_address.toLowerCase(),
          company_password: company_password,
          company_name: company_name,
          company_contact_number: company_contact_number,
          company_address: company_address
        })

        const { success, message } = result.data;

        if (!success) throw Error;

        success && (message === 'Email address has already been taken.') ?
          setErrorRegister(true) :
          success && (Object.keys(message)) && history.push('/login');;
      }
    } catch (error) {
      alert('An error occurred while signing up!');
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleCompanyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setCompany({ ...company, [name]: value });
  };

  const handleLogoutButton = () => {
    logout();
    history.push('/login');
  }

  return (
    <div className={root}>
      <Navbar open={!open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <RegisterForm
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleCompanyInputChange={handleCompanyInputChange}
        handleCompanyRegister={handleCompanyRegister}
        error={error}
        company={company}
        errorRegister={errorRegister}

      />
    </div>
  )
}

export default Register;