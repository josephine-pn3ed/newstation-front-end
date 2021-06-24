import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RestoreIcon from "@material-ui/icons/Restore";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
import EmployeesTable from "../../components/EmployeesTable";
import useStyles from "../../styles/_Employee";
import { logout, getCompanyId } from "../../utils";
import { Employee } from "./types";
import EmployeesForm from "../../components/EmployeesForm";

const Employees = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [employees, setEmployees] = useState<string[][]>([]);
  const [formLoaded, setFormLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  const [employeesLoaded, setEmployeesLoaded] =
    useState<boolean>(false);

  const [errorRegister, setErrorRegister] = useState<boolean>(false);

  const [addForm, setAddForm] = useState<boolean>(false);

  const [employee, setEmployee] = useState<Employee>({
    id: "",
    company_id: "",
    user_first_name: "",
    user_middle_name: "",
    user_last_name: "",
    user_email_address: "",
    user_password: "",
    user_confirm_password: "",
    user_address: "",
    user_position: "",
    user_contact_number: "",
    user_status: "Active",
    created_at: "",
    updated_at: "",
  });

  const handleFormLoaded = (open: boolean) => {
    setEmployee({
      id: "",
      company_id: "",
      user_first_name: "",
      user_middle_name: "",
      user_last_name: "",
      user_email_address: "",
      user_password: "",
      user_confirm_password: "",
      user_address: "",
      user_position: "",
      user_contact_number: "",
      user_status: "Active",
      created_at: "",
      updated_at: "",
    });
    setAddForm(true);
    setFormLoaded(open);
  };

  const handleLogoutButton = () => {
    logout();
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setFormLoaded(false);
  };

  const handleEditButton = async (id: string) => {
    try {
      const response = await axios.get("/employee/" + id);
      const { result, success } = response.data;

      if (!success) throw Error;
      setEmployee(result);
      setFormLoaded(true);
      setAddForm(false);
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleUpdateEmployee = async () => {
    const {
      user_first_name,
      user_last_name,
      user_position,
    } = employee;
    let errors: string[] = [];

    !user_first_name && errors.push("user_first_name");
    !user_last_name && errors.push("user_last_name");
    !user_position && errors.push("user_position");

    setError(errors);

    try {
      if (!errors.length) {
        const { id } = employee;
        const response = await axios.put("/employee/" + id, employee);
        const { success } = response.data;

        if (!success) throw Error;
        Swal.fire(
          "Updated!",
          "Employee information updated successfully!",
          "success"
        );
        getEmployees();
        handleCloseEdit();
      }
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleEmployeeRegister = async () => {
    const {
      user_email_address,
      user_first_name,
      user_middle_name,
      user_last_name,
      user_contact_number,
      user_address,
      user_position,
    } = employee;
    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    !user_first_name && errors.push("user_first_name");
    !user_last_name && errors.push("user_last_name");
    !user_email_address && errors.push("user_email_address");
    !user_position && errors.push("user_position");
    !validateEmail.test(user_email_address) &&
      errors.push("user_email_address");

    setError(errors);

    try {
      if (!errors.length) {
        const result = await axios.post("/employee", {
          company_id: getCompanyId(),
          user_email_address: user_email_address.toLowerCase(),
          user_first_name: user_first_name,
          user_middle_name: user_middle_name,
          user_last_name: user_last_name,
          user_position: user_position,
          user_contact_number: user_contact_number,
          user_address: user_address,
        });

        const { success, message } = result.data;

        if (!success) throw Error;
        if (message === "Employee added successfully!") {
          Swal.fire("Added!", "Employee added successfully!", "success");
          setFormLoaded(false);
          getEmployees();
        } else {
          setErrorRegister(true);
        }
      }
    } catch (error) {
      Swal.fire("An error occurred while registering an employee!");
    }
  };

  const handleDeleteButton = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This employee information will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete("/employee/" + id);

          Swal.fire(
            "Deleted!",
            "Employee information has been deleted.",
            "success"
          );

          getEmployees();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Cancelled",
            "Deleting employee information has been cancelled.",
            "error"
          );
        }
      });
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleEmployeeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setEmployee({ ...employee, [name]: value });
  };

  const handleRestoreEmployee = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This employee information will be restored.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, restore it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.put("/employee/restore/" + id);

          Swal.fire(
            "Restored!",
            "Employee information has been restored.",
            "success"
          );

          getEmployees();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Cancelled",
            "Restoring employee information has been cancelled.",
            "error"
          );
        }
      });
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const getEmployees = async () => {
    setEmployeesLoaded(false);
    try {
      const response = await axios.get("/employees/" + getCompanyId());
      const { result, success } = response.data;
      
      if (!success) throw Error;
      employeesToPushToHooks(result);
    } catch (error) {
      Swal.fire("There is an error while getting employees!");
    }
  };

  const employeesToPushToHooks = (data: Employee[]) => {
    const active_employees: string[][] = [];
    const inactive_employees: string[][] = [];

    data.map((value: Employee) => {
      const {
        id,
        user_first_name,
        user_middle_name,
        user_last_name,
        user_email_address,
        user_password,
        user_contact_number,
        user_position,
        user_status,
      } = value;

      const employee: any[] = [];

      employee.push(
        user_first_name + " " + user_middle_name + " " + user_last_name
      );
      employee.push(user_email_address);
      employee.push(user_password);
      employee.push(user_contact_number);
      employee.push(user_position);

      employee.push(actionButtons(id, user_status));

      user_status === "Active" && active_employees.push(employee);
      user_status === "Inactive" && inactive_employees.push(employee);
    });

    const employees: string[][] = [];

    active_employees.map((value: string[]) => {
      employees.push(value);
    });

    inactive_employees.map((value: string[]) => {
      employees.push(value);
    });

    setEmployees(employees);
    setEmployeesLoaded(true);
  };

  const actionButtons = (id: string, employee_status: string) => {
    return (
      <div>
        {employee_status === "Active" ? (
          <div>
            <Tooltip
              color="primary"
              title="Edit"
              onClick={() => handleEditButton(id)}
            >
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              color="secondary"
              title="Delete"
              onClick={() => handleDeleteButton(id)}
            >
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip color="disabled" title="Diabled">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              color="primary"
              title="Restore"
              onClick={() => handleRestoreEmployee(id)}
            >
              <IconButton>
                <RestoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className={classes.root}>
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleLogoutButton={handleLogoutButton}
      />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      {!employeesLoaded ? (
        <div style={{ margin: "400px 800px" }}>
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <EmployeesTable
          employees={employees}
          handleFormLoaded={handleFormLoaded}
          formLoaded={formLoaded}
        />
      )}
      {formLoaded && (
        <EmployeesForm
          handleEmployeeInputChange={handleEmployeeInputChange}
          handleEmployeeRegister={handleEmployeeRegister}
          handleUpdateEmployee={handleUpdateEmployee}
          handleFormLoaded={handleFormLoaded}
          error={error}
          addForm={addForm}
          employee={employee}
          errorRegister={errorRegister}
        />
      )}
    </div>
  );
};

export default Employees;
