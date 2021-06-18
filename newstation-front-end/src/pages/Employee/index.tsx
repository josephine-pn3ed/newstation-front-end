import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect, useState } from 'react';
import { Tooltip, IconButton } from "@material-ui/core";
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import EmployeeTable from '../../components/EmployeeTable';
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

  const handleEditButton = (id: string) => {
    console.log('editing.............')
    // const result = axios.delete('/employee/' + id);
  }

  const handleDeleteButton = (id: string) => {
    const result = axios.delete('/employee/' + id);
    console.log(result)
  }

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
      employee.push(actionButtons(id));

      employees.push(employee);
    })
    setEmployees(employees);
  }

  const actionButtons = (id: string) => {
    return (
      <div>
          <Tooltip color="primary" title="Edit" onClick={() => handleEditButton(id)} >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip color="secondary" title="Delete" onClick={() => handleDeleteButton(id)} >
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
      <EmployeeTable employees={employees} />
    </div>
  )
}

export default Employee;