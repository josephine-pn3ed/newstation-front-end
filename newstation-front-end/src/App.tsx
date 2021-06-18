import './App.css';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { Login, Register, Dashboard, Employee, AccountSettings, EmployeeRegister } from './pages';

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
