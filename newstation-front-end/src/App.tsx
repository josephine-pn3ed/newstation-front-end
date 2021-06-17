import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { State, IEmployee } from './types';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { login, logout, setCompanyId, removeCompanyId, getCompanyId } from './utils';
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import AccountSettings from './pages/AccountSettings';
import EmployeeRegister from './pages/EmployeeRegister';

function App() {

  const [state, setState] = useState<State>({
    company: {
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
    },
    employee: {
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
    },
    news: {
      id: "",
      company_id: "",
      news_topic: "",
      news_body: "",
      news_image: "",
      news_status: "Active",
      created_at: "",
      updated_at: ""
    },
    viewer: {
      id: "",
      news_id: "",
      employee_id: "",
      viewed_at: "",
    }
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorLoginPassword, setErrorLoginPassword] = useState<boolean>(false);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [employees, setEmployees] = useState<string[][]>([]);

  useEffect(() => {
    getEmployees();
  }, [])

  const getEmployees = async () => {
    const result = await axios.get('/employee');
    const { data } = result;
    const employees: string[][] = [];
    data.map((value: IEmployee) => {
      const { id, employee_first_name, employee_middle_name, employee_last_name, employee_email_address, employee_password,
        employee_contact_number, employee_position, employee_status } = value;
      const employee: any[] = [];

      employee.push(id);
      employee.push(employee_first_name + ' ' + employee_middle_name + ' ' + employee_last_name);
      employee.push(employee_email_address);
      employee.push(employee_password);
      employee.push(employee_contact_number);
      employee.push(employee_position);
      employee.push(employee_status);
      employee.push(actionButtons());

      employees.push(employee);
    })
    setEmployees(employees);
  }

  const actionButtons = () => {
    return (
      <div>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    )
  }

  const handleCompanyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const { company } = state;

    setState({ ...state, company: { ...company, [name]: value } });
  };

  const handleCompanyRegister = async () => {
    const { company } = state;
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
          success && (Object.keys(message)) && window.location.replace("http://localhost:3000/login") && setErrorRegister(false);

      }
    } catch (error) {
      alert('An error occurred while signing up!');
    }
  }

  const handleEmployeeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const { employee } = state;

    setState({ ...state, employee: { ...employee, [name]: value } });
  };


  const handleEmployeeRegister = async () => {
    console.log(state.employee);
    const { employee } = state;
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
          window.location.replace("http://localhost:3000/employees");
        }
        // else if (success && (message === 'Email address has already been taken.')) {
        //   setErrorRegister(true);
        // }

      }
    } catch (error) {
      alert('An error occurred while registering an employee!');
    }
  }

  const handleCompanyLogin = async () => {
    const { company } = state;
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

  const handleLogoutButton = () => {
    logout();
    removeCompanyId();
    window.location.replace("http://localhost:3000/login");
  }


  const handleNewsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const { news } = state;
    setState({ ...state, news: { ...news, [name]: value } });
  };

  const handleViewerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const { viewer } = state;
    setState({ ...state, viewer: { ...viewer, [name]: value } });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(state);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    console.log(state);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/login" exact >
            <Login
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleCompanyInputChange={handleCompanyInputChange}
              handleCompanyLogin={handleCompanyLogin}
              error={error}
              company={state.company}
              errorLogin={errorLogin}
              errorLoginPassword={errorLoginPassword}
              open={!open}
              handleDrawerOpen={handleDrawerOpen}
              handleLogoutButton={handleLogoutButton}
            />
          </PublicRoute>
          <PublicRoute path="/register" exact >
            <Register
              errorRegister={errorRegister}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleCompanyInputChange={handleCompanyInputChange}
              handleCompanyRegister={handleCompanyRegister}
              error={error}
              company={state.company}
              open={!open}
              handleDrawerOpen={handleDrawerOpen}
              handleLogoutButton={handleLogoutButton}
            />
          </PublicRoute>

          <PrivateRoute path="/dashboard" exact >
            <Dashboard
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              handleLogoutButton={handleLogoutButton}
            />
          </PrivateRoute>
          <PrivateRoute path="/employees" exact >
            <Employee
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              handleLogoutButton={handleLogoutButton}
              employees={employees}
            />
          </PrivateRoute>
          <PrivateRoute path="/employee-registration-form" exact>
            <EmployeeRegister
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleEmployeeInputChange={handleEmployeeInputChange}
              handleEmployeeRegister={handleEmployeeRegister}
              error={error}
              employee={state.employee}
              errorRegister={errorRegister}
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              handleLogoutButton={handleLogoutButton}
            />
          </PrivateRoute>
          <PrivateRoute path="/account-settings" exact >
            <AccountSettings
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              handleLogoutButton={handleLogoutButton}
            />
          </PrivateRoute>
          <Redirect from="/" to="/login" exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
