import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RestoreIcon from '@material-ui/icons/Restore';
import { useEffect, useState } from 'react';
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import EmployeeTable from '../../components/EmployeeTable';
import useStyles from '../../styles/_Employee';
import { logout, getUser, getCompanyId } from '../../utils';
import { State } from './types';
import EmployeeUpdateForm from '../../components/EmployeeUpdateForm';
import Alert from '@material-ui/lab/Alert';

const Employee = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [employees, setEmployees] = useState<string[][]>([])
  const [closeEdit, setCloseEdit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false)
  const [editedEmployee, setEditedEmployee] = useState<State>({
    id: "",
    company_id: "",
    employee_first_name: "",
    employee_middle_name: "",
    employee_last_name: "",
    employee_email_address: "",
    employee_password: "",
    employee_confirm_password: "",
    employee_address: "",
    employee_position: "",
    employee_contact_number: "",
    employee_image: "",
    employee_status: "Active",
    created_at: "",
    updated_at: ""
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogoutButton = () => {
    logout();
    history.push('/login');
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEditEmployee = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedEmployee({ ...editedEmployee, [name]: value })

  }


  const handleCloseEdit = () => {
    setCloseEdit(false);
  }


  const handleEditButton = async (id: string) => {
    try {
      const user = getUser();
      const result = await axios.get('/employee/' + id);
      const { data } = result;
      console.log("hi", data);
      console.log("hi", id);
      console.log("hi", user);

      setEditedEmployee(data)
      setCloseEdit(true);
    }
    catch (error) {
      return { "message": "Invalid credentials!" };
    }
  }

  const handleUpdateEmployee = async () => {
    try {
      console.log(editedEmployee)
      const { id } = editedEmployee
      const result = await axios.put('/employee/' + id, editedEmployee)
      getEmployees();
      handleCloseEdit();
    } catch (error) {
      return { "message": "Error Update!" };
    }
  }

  const handleCloseAlert = () => {
    setAlert(true);
  }

  const handleOpenAlert = () => {
    setAlert(false)
  }

  const handleDeleteButton = async (id: string) => {
    try {
      const result = await axios.delete('/employee/' + id);
      console.log(result)

      getEmployees();

    } catch (error) {
      return { "message": "Error Delete!" };
    }
  }

  const handleRestoreEmployee = async (id: string) => {
    try {
      const result = await axios.put('/employee/restore/' + id);
      getEmployees();
    } catch (error) {
      return { "message": "Invalid credentials!" };
    }
  }

  const getEmployees = async () => {
    try {
      const id = getCompanyId();
      console.log("company id", id)
      const result = await axios.get('/employees/' + id);
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

        employee.push(actionButtons(id, employee_status));

        employees.push(employee);
      })
      setEmployees(employees);
    } catch (error) {
      return { "message": "Invalid credentials!" };
    }
  }

  const actionButtons = (id: string, employee_status: string) => {
    return (
      <div>

        <Tooltip color="primary" title="Edit" onClick={() => handleEditButton(id)} >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>

        {employee_status === 'Active' ?
          <Tooltip color="secondary" title="Delete" onClick={() => handleDeleteButton(id)} >
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip> :
          <Tooltip color="default" title="Restore" onClick={() => handleRestoreEmployee(id)} >
            <IconButton>
              <RestoreIcon />
            </IconButton>
          </Tooltip>}

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

      {console.log(closeEdit)}
      {closeEdit ? (<EmployeeUpdateForm handleEditEmployee={handleEditEmployee} handleCloseEdit={handleCloseEdit}
        handleUpdateEmployee={handleUpdateEmployee} error={error} editedEmployee={editedEmployee} />) : ""}


    </div>
  )
}

export default Employee;