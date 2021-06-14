import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { State } from './types';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
    },
    showPassword: false,
    showConfirmPassword: false,
    error: [],
  });

  useEffect(() => {

  }, [])

  const handleCompanyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const { company } = state;

    setState({ ...state, company: { ...company, [name]: value } });
  };

  const handleCompanyRegister = () => {
    const { company } = state;
    const { company_password, company_confirm_password } = company;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let errors: string[] = [];

    Object.entries(company).map(([key, value]) => !value && errors.push(key));

    !strongRegex.test(company_password) && errors.push('company_password');
    !strongRegex.test(company_confirm_password) && errors.push('company_confirm_password');

    (company_confirm_password !== company_password) && errors.push('company_confirm_password');

    setState({ ...state, error: errors });

    !errors.length && window.location.replace("http://localhost:3000/login");
  }

  const handleCompanyLogin = () => {
    const { company } = state;
    const { company_email_address, company_password } = company;
    let errors: string[] = [];

    !(company_email_address) && errors.push('company_email_address');
    !(company_password) && errors.push('company_password');

    setState({ ...state, error: errors });
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
    const { news } = state;
    setState({ ...state, news: { ...news, [name]: value } });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
    console.log(state);
  };

  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showConfirmPassword: !state.showConfirmPassword });
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
          <Route path="/login" exact >
            <LoginForm
              showPassword={state.showPassword}
              showConfirmPassword={state.showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleCompanyInputChange={handleCompanyInputChange}
              handleCompanyLogin={handleCompanyLogin}
              error={state.error}
              company={state.company}
            />
          </Route>
          <Route path="/register" exact >
            <RegisterForm
              showPassword={state.showPassword}
              showConfirmPassword={state.showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleCompanyInputChange={handleCompanyInputChange}
              handleCompanyRegister={handleCompanyRegister}
              error={state.error}
              company={state.company}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
