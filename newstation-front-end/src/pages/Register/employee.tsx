import Navbar from '../../components/Navbar';
import AddEmployeeForm from '../../components/AddEmployeeForm';
import { Props } from '../../components/AddEmployeeForm/types';

const Register = (props: Props) => {
    const {
        showPassword,
        showConfirmPassword,
        handleEmployeeInputChange,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleEmployeeRegister,
        handleClickShowConfirmPassword,
        employee,
        error,
        errorRegister
    } = props;

    return (
        <div>
            <AddEmployeeForm
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                handleMouseDownPassword={handleMouseDownPassword}
                handleEmployeeInputChange={handleEmployeeInputChange}
                handleEmployeeRegister={handleEmployeeRegister}
                error={error}
                employee={employee}
                errorRegister={errorRegister}
            />
        </div>
    )
}

export default Register;