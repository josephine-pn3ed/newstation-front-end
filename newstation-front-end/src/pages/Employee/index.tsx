import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RestoreIcon from '@material-ui/icons/Restore';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import EmployeeTable from '../../components/EmployeeTable';
import useStyles from '../../styles/_Employee';
import { logout, getCompanyId } from '../../utils';
import { State } from './types';
import EmployeeUpdateForm from '../../components/EmployeeUpdateForm';

const Employee = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [employees, setEmployees] = useState<string[][]>([])
  const [closeEdit, setCloseEdit] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);
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
      const result = await axios.get('/employee/' + id);
      const { data } = result;

      setEditedEmployee(data)
      setCloseEdit(true);
    } catch (error) {
      Swal.fire('Oops...', 'Something went wrong!', 'error')
    }
  }

  const handleUpdateEmployee = async () => {
    try {
      const { id } = editedEmployee
      const response = await axios.put('/employee/' + id, editedEmployee)
      const { success } = response.data;

      if (!success) throw Error;
      Swal.fire('Updated!', 'Employee information updated successfully!', 'success')
      getEmployees();
      handleCloseEdit();
    } catch (error) {
      Swal.fire('Oops...', 'Something went wrong!', 'error')
    }
  }


  const handleDeleteButton = (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "This employee information will be deleted.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete('/employee/' + id);

          Swal.fire(
            'Deleted!',
            'Employee information has been deleted.',
            'success'
          )

          getEmployees();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Deleting employee information has been cancelled.',
            'error'
          )
        }
      })
    } catch (error) {
      Swal.fire('Oops...', 'Something went wrong!', 'error')
    }
  }

  const handleRestoreEmployee = (id: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "This employee information will be restored.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Yes, restore it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.put('/employee/restore/' + id);

          Swal.fire(
            'Restored!',
            'Employee information has been restored.',
            'success'
          )

          getEmployees();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Restoring employee information has been cancelled.',
            'error'
          )
        }
      })
    } catch (error) {
      Swal.fire('Oops...', 'Something went wrong!', 'error')
    }
  }

  const getEmployees = async () => {
    try {
      const result = await axios.get('/employees/' + getCompanyId());
      const { data } = result;

      employeesToPushToHooks(data);
    } catch (error) {
      Swal.fire('There is an error while getting employees!')
    }
  }

  const employeesToPushToHooks = (data: State[]) => {
    const active_employees: string[][] = [];
    const inactive_employees: string[][] = [];

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

      (employee_status === 'Active') && active_employees.push(employee);
      (employee_status === 'Inactive') && inactive_employees.push(employee);
    })

    const employees: string[][] = [];

    active_employees.map((value: string[]) => {
      employees.push(value);
    })

    inactive_employees.map((value: string[]) => {
      employees.push(value);
    })

    setEmployees(employees);
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
          </Tooltip>
        }


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
      {closeEdit && (<EmployeeUpdateForm handleEditEmployee={handleEditEmployee} handleCloseEdit={handleCloseEdit}
        handleUpdateEmployee={handleUpdateEmployee} error={error} editedEmployee={editedEmployee} />)}
    </div>
  )
}

export default Employee;