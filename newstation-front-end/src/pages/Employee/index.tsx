import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RestoreIcon from "@material-ui/icons/Restore";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
import EmployeesTable from "../../components/EmployeesTable";
import useStyles from "../../styles/_Employee";
import { logout, getCompanyId, displayConfirmation } from "../../utils";
import { Employee } from "./types";
import EmployeesForm from "../../components/EmployeesForm";
import { ToastContainer, toast } from "react-toastify";

const Employees = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [employees, setEmployees] = useState<string[][]>([]);
  const [formLoaded, setFormLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  const [employeesLoaded, setEmployeesLoaded] = useState<boolean>(false);

  const [errorRegister, setErrorRegister] = useState<boolean>(false);

  const [addForm, setAddForm] = useState<boolean>(false);

  const [employee, setEmployee] = useState<Employee>({
    id: "",
    company_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    password: "",
    confirm_password: "",
    address: "",
    position: "",
    contact_number: "",
    status: "Active",
    created_at: "",
    updated_at: "",
  });

  const handleFormLoaded = (open: boolean) => {
    setError([]);
    setEmployee({
      id: "",
      company_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email_address: "",
      password: "",
      confirm_password: "",
      address: "",
      position: "",
      contact_number: "",
      status: "Active",
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
    setError([]);
    setFormLoaded(false);
  };

  const handleEditButton = async (id: string) => {
    setError([]);
    try {
      const response = await axios.get("/employee/" + id);
      const { data } = response;

      if (data === "Database down!" || data === "No employee found!")
        throw data;
      setEmployee(data);
      setFormLoaded(true);
      setAddForm(false);
    } catch (error) {
      if (error === "No employee found!") {
        toast(error, {
          type: "error",
        });
      } else {
        toast("Internal Server Error!", {
          type: "error",
        });
      }
    }
  };

  const handleUpdateEmployee = async () => {
    const { first_name, last_name, position } = employee;
    let errors: string[] = [];

    !first_name && errors.push("first_name");
    !last_name && errors.push("last_name");
    !position && errors.push("position");

    setError(errors);

    if (!errors.length) {
      try {
        const { id } = employee;
        const response = await axios.put("/employee/" + id, employee);
        const { data } = response;

        if (data === "Database down!" || data === "Employee not updated!")
          throw data;
        toast("Employee updated successfully!", {
          type: "success",
        });
        getEmployees();
        handleCloseEdit();
      } catch (error) {
        if (error === "Employee not updated!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const handleEmployeeRegister = async () => {
    const {
      email_address,
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      position,
    } = employee;
    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    !first_name && errors.push("first_name");
    !last_name && errors.push("last_name");
    !email_address && errors.push("email_address");
    !position && errors.push("position");
    !validateEmail.test(email_address) && errors.push("email_address");

    setError(errors);

    if (!errors.length) {
      try {
        const result = await axios.post("/employee", {
          company_id: getCompanyId(),
          email_address: email_address.toLowerCase(),
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          position: position,
          contact_number: contact_number,
          address: address,
        });

        const { data } = result;

        if (data === "Database down!" || data === "Employee not added!")
          throw data;
        if (data === "Email address has already been taken.") {
          setErrorRegister(true);
        }
        if (data === "Employee added successfully!") {
          toast(data, {
            type: "success",
          });
          setFormLoaded(false);
          getEmployees();
        }
      } catch (error) {
        if (error === "Employee not added!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const handleDeleteButton = async (id: string) => {
    const result = await displayConfirmation("delete", "employee");
    if (result) {
      try {
        const response = await axios.delete("/employee/" + id);
        const { data } = response;

        if (data === "Database down!" || data === "Employee not deleted!")
          throw data;
        toast("Employee deleted successfully!", {
          type: "success",
        });

        getEmployees();
      } catch (error) {
        if (error === "Employee not deleted!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const handleEmployeeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setEmployee({ ...employee, [name]: value });
  };

  const handleRestoreEmployee = async (id: string) => {
    const result = await displayConfirmation("employee", "restore");
    if (result) {
      try {
        const response = await axios.put("/employee/restore/" + id);
        const { data } = response;

        if (data === "Database down!" || data === "Employee not restored!")
          throw data;

        toast("Employee restored successfully!", {
          type: "success",
        });

        getEmployees();
      } catch (error) {
        if (error === "Employee not restored!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const getEmployees = async () => {
    setEmployeesLoaded(false);
    try {
      const response = await axios.get("/employee/company/" + getCompanyId());
      const { data } = response;

      if (data === "Database down!" || data === "No employee found!")
        throw data;
      employeesPushToHooks(data);
    } catch (error) {
      if (error === "No employee found!") {
        toast(error, {
          type: "error",
        });
      } else {
        toast("Internal Server Error!", {
          type: "error",
        });
      }
    }
  };

  const employeesPushToHooks = (data: Employee[]) => {
    const all_employees = data.reduce((array_employees: any, curr: any) => {
      const {
        id,
        first_name,
        middle_name,
        last_name,
        email_address,
        password,
        contact_number,
        position,
        status,
      } = curr;

      const employee = [
        `${first_name} ${middle_name} ${last_name}`,
        email_address,
        password,
        contact_number,
        position,
        actionButtons(id, status),
      ];

      if (status === "Active") {
        array_employees.unshift(employee);
        return array_employees;
      }
      array_employees.push(employee);
      return array_employees;
    }, []);

    setEmployees(all_employees);
    setEmployeesLoaded(true);
  };

  const actionButtons = (id: string, status: string) => {
    return (
      <div>
        {status === "Active" ? (
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
            <Tooltip color="default" title="Diabled">
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <ToastContainer />
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
