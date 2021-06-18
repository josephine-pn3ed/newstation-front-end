import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
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

  // const [state, setState] = useState<State>({
  //   news: {
  //     id: "",
  //     company_id: "",
  //     news_topic: "",
  //     news_body: "",
  //     news_image: "",
  //     news_status: "Active",
  //     created_at: "",
  //     updated_at: ""
  //   },
  //   viewer: {
  //     id: "",
  //     news_id: "",
  //     employee_id: "",
  //     viewed_at: "",
  //   }
  // });

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/login" exact >
            <Login />
          </PublicRoute>
          <PublicRoute path="/register" exact >
            <Register />
          </PublicRoute>
          <PrivateRoute path="/dashboard" exact >
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/employees" exact >
            <Employee />
          </PrivateRoute>
          <PrivateRoute path="/employee-registration-form" exact>
            <EmployeeRegister />
          </PrivateRoute>
          <PrivateRoute path="/account-settings" exact >
            <AccountSettings />
          </PrivateRoute>
          <Redirect from="/" to="/login" exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
