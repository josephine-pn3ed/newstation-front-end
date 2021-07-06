import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import {
  Login,
  Dashboard,
  Employee,
  AccountSettings,
  Administrators,
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
        <PrivateRoute path="/employee">
          <Employee />
        </PrivateRoute>
        <PrivateRoute path="/account-settings">
          <AccountSettings />
        </PrivateRoute>
        <PrivateRoute path="/administrator">
          <Administrators />
        </PrivateRoute>
        <Redirect to="/login" from="/" exact/>
        <Route path="/">
          <div style={{ textAlign: "center", color: 'red' }}>
            <h1 style={{ fontSize: "150px" }}>404</h1>
            <h1>Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
