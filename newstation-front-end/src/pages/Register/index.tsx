import Navbar from '../../components/Navbar';
import RegisterForm from '../../components/RegisterForm';
import { Props } from '../../components/RegisterForm/types';

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
      errorRegister
    } = props;

    return (
        <div>
            <Navbar />
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