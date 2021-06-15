import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { State } from './types';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { login } from './utils';

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
      employee_email: "",
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

  useEffect(() => {

  }, [])

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
          } else if (message === "Login successfully.") {
            setErrorLoginPassword(false)
            setErrorLogin(false)
            login();
            window.location.replace("http://localhost:3000/dashboard");
          }
        }
      }
    } catch (error) {
      alert('An error occurred while logging in!');
    }
  }

  const handleEmployeeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const { employee } = state;

    setState({ ...state, employee: { ...employee, [name]: value } });
  };

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

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <PublicRoute path="/login" exact >
            <LoginForm
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleCompanyInputChange={handleCompanyInputChange}
              handleCompanyLogin={handleCompanyLogin}
              error={error}
              company={state.company}
              errorLogin={errorLogin}
              errorLoginPassword={errorLoginPassword}
            />
          </PublicRoute>
          <PublicRoute path="/register" exact >
            <RegisterForm
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleCompanyInputChange={handleCompanyInputChange}
              handleCompanyRegister={handleCompanyRegister}
              error={error}
              company={state.company}
              errorRegister={errorRegister}
            />
          </PublicRoute>
          {/* <Route path="/dashboard">
            <Navbar />
            <Dashboard />
          </Route> */}
          <PrivateRoute path="/dashboard" exact >
            <Dashboard />
          </PrivateRoute>
          <Redirect from="/" to="/login" exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
