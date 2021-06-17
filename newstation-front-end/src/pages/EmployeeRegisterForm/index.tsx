import MUIDataTable from "mui-datatables";
import { CssBaseline, Container, Button } from "@material-ui/core"
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import { Props } from './types';
import useStyles from '../../styles/_Dashboard';
import AddEmployeeForm from '../../components/AddEmployeeForm'

const EmployeeRegisterForm = (props: Props) => {
  const { open, handleDrawerOpen, handleDrawerClose, handleLogoutButton,
    error, employee, errorRegister, showPassword,
    showConfirmPassword,
    handleEmployeeInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleEmployeeRegister,
    handleClickShowConfirmPassword,

  } = props;
  const columns = ["Name", "Company", "City", "State"];
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
        </Container>
      </main>
    </div>
  )
}

export default EmployeeRegisterForm;