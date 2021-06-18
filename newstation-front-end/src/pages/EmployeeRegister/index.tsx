import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import EmployeeRegistrationForm from '../../components/EmployeeRegistrationForm';
import useStyles from '../../styles/_Dashboard';
import { logout, removeCompanyId, getCompanyId } from '../../utils';
import { State } from './types';

const EmployeeRegistration = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);

  const [employee, setEmployee] = useState<State>({
    id: "",
    company_id: "",
    employee_first_name: "",
    employee_middle_name: "",
    employee_last_name: "",
    employee_email_address: "",
    employee_password: "",
    employee_confirm_password: "",
    employee_address: "",
    employee_position: "",
    employee_contact_number: "",
    employee_image: "",
    employee_status: "Active",
    created_at: "",
    updated_at: ""
  })

  const handleLogoutButton = () => {
    logout();
    removeCompanyId();
    history.push('/login');
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEmployeeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setEmployee({ ...employee, [name]: value });
  };


  const handleEmployeeRegister = async () => {
    const { id, employee_password, employee_confirm_password, employee_email_address, employee_first_name, employee_middle_name, employee_last_name,
      employee_contact_number, employee_address, employee_position } = employee;
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    try {
      !id && errors.push('id');
      !employee_first_name && errors.push('employee_first_name');
      !employee_middle_name && errors.push('employee_middle_name');
      !employee_last_name && errors.push('employee_last_name');
      !employee_email_address && errors.push('employee_email_address');
      !employee_position && errors.push('employee_position');
      !validateEmail.test(employee_email_address) && errors.push('employee_email_address');

      (employee_confirm_password !== employee_password) && errors.push('company_confirm_password');

      setError(errors);

      if (!errors.length) {
        const result = await axios.post('/employee', {
          id: id,
          company_id: getCompanyId(),
          employee_email_address: employee_email_address.toLowerCase(),
          employee_password: employee_first_name.charAt(0).toUpperCase() + employee_last_name.charAt(0).toUpperCase() + employee_last_name.slice(1) + '@' + id,
          employee_first_name: employee_first_name,
          employee_middle_name: employee_middle_name,
          employee_last_name: employee_last_name,
          employee_position: employee_position,
          employee_contact_number: employee_contact_number,
          employee_address: employee_address
        })

        const { success } = result.data;
        console.log(success);

        if (!success) throw Error;
        else if (success) {
          history.push('/employees');
        }

      }
    } catch (error) {
      alert('An error occurred while registering an employee!');
    }
  }

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <EmployeeRegistrationForm
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleEmployeeInputChange={handleEmployeeInputChange}
        handleEmployeeRegister={handleEmployeeRegister}
        error={error}
        employee={employee}
        errorRegister={errorRegister}
      />
    </div>
  )
}

export default EmployeeRegistration;