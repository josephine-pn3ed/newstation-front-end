import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';
import { Props } from '../../components/LoginForm/types';

const Login = (props: Props) => {
  const {
    showPassword,
    handleCompanyInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleCompanyLogin,
    company,
    error,
    errorLogin,
    errorLoginPassword
  } = props;

  return (
    <div>
      <Navbar />
      <LoginForm
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleCompanyInputChange={handleCompanyInputChange}
        handleCompanyLogin={handleCompanyLogin}
        error={error}
        company={company}
        errorLogin={errorLogin}
        errorLoginPassword={errorLoginPassword}
      />
    </div>
  )
}

export default Login;