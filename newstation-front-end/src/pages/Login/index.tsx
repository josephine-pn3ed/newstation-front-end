import Navbar from '../../components/Navbar';
import LoginForm from '../../components/LoginForm';
import { Props } from './types';
import useStyles from '../../styles/_LoginForm';

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
    errorLoginPassword,
    open,
    handleDrawerOpen,
    handleLogoutButton
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
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