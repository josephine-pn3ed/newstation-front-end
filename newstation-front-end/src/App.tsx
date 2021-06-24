import "./App.css";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import {
  Login,
  Dashboard,
  Employee,
  AccountSettings,
  Administrators
} from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" exact>
          <Login />
        </PublicRoute>
        <PrivateRoute path="/dashboard" exact>
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute path="/employees">
          <Employee />
        </PrivateRoute>
        <PrivateRoute path="/account-settings">
          <AccountSettings />
        </PrivateRoute>
        <PrivateRoute path="/administrators">
          <Administrators />
        </PrivateRoute>
        <Redirect from="/" to="/login" exact />
      </Switch>
    </Router>
  );
}

export default App;
