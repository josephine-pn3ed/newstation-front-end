import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import EmployeeList from '../../components/EmployeeList';
import { Props } from './types';
import useStyles from '../../styles/_Employee';

const Employee = (props: Props) => {
  const { open, handleDrawerOpen, handleDrawerClose, handleLogoutButton, employees } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <EmployeeList employees={employees} />
    </div>
  )
}

export default Employee;