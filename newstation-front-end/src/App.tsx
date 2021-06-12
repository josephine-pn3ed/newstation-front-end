import { useEffect, useState } from 'react';
import './App.css';
import { State } from './types';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {

  const [state, setState] = useState<State>({
    company: {
      id: "",
      company_name: "",
      company_image: "",
      company_address: "",
      company_contact_number: "",
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

  const handleCompanySubmit = () => {
    console.log(state.company);
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
    <div className="App">
      <RegisterForm
        showPassword={state.showPassword}
        showConfirmPassword={state.showConfirmPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleCompanyInputChange={handleCompanyInputChange}
        handleCompanySubmit={handleCompanySubmit}
        error={state.error}
        company={state.company}
      />
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
