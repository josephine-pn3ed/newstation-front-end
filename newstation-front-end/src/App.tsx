import './App.css';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { Login, Register, Dashboard, Employee, AccountSettings, EmployeeRegister } from './pages';
import { getUser } from './utils';

function App() {

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
