import { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import EmployeeList from '../../components/EmployeeList';
import useStyles from '../../styles/_Employee';
import { logout, removeCompanyId } from '../../utils';
import { State } from './types';

const Employee = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(true);
  const [employees, setEmployees] = useState<string[][]>([])

  const handleLogoutButton = () => {
    logout();
    removeCompanyId();
    window.location.replace("http://localhost:3000/login");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getEmployees = async () => {
    const result = await axios.get('/employee');
    const { data } = result;
    const employees: string[][] = [];
    data.map((value: State) => {
      const { id, employee_first_name, employee_middle_name, employee_last_name, employee_email_address, employee_password,
        employee_contact_number, employee_position, employee_status } = value;
      const employee: any[] = [];

      employee.push(id);
      employee.push(employee_first_name + ' ' + employee_middle_name + ' ' + employee_last_name);
      employee.push(employee_email_address);
      employee.push(employee_password);
      employee.push(employee_contact_number);
      employee.push(employee_position);
      employee.push(employee_status);
      employee.push(actionButtons());

      employees.push(employee);
    })
    setEmployees(employees);
  }

  const actionButtons = () => {
    return (
      <div>
        <Tooltip title="Edit">
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    )
  }

  useEffect(() => {
    getEmployees();
  }, [])

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <EmployeeList employees={employees} />
    </div>
  )
}

export default Employee;