import Navbar from '../../components/Navbar';
import RegisterForm from '../../components/RegisterForm';
import { Props } from './types';
import useStyles from '../../styles/_RegisterForm';

const Register = (props: Props) => {
  const {
    showPassword,
    showConfirmPassword,
    handleCompanyInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleCompanyRegister,
    handleClickShowConfirmPassword,
    company,
    error,
    errorRegister,
    open,
    handleDrawerOpen,
    handleLogoutButton
  } = props;

  const { root } = useStyles();

  return (
    <div className={root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <RegisterForm
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleCompanyInputChange={handleCompanyInputChange}
        handleCompanyRegister={handleCompanyRegister}
        error={error}
        company={company}
        errorRegister={errorRegister}
      />
    </div>
  )
}

export default Register;