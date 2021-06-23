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
import AdministratorsTable from "../../components/AdministratorsTable";
import useStyles from "../../styles/_Administrator";
import { logout, getCompanyId } from "../../utils";
import { Administrator } from "./types";
import AdministratorsForm from "../../components/AdministratorsForm";

const Administrators = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);
  const [administrators, setAdministrators] = useState<string[][]>([]);
  const [formLoaded, setFormLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string[]>([]);

  const [administratorsLoaded, setAdministratorsLoaded] =
    useState<boolean>(false);

  const [errorRegister, setErrorRegister] = useState<boolean>(false);

  const [addForm, setAddForm] = useState<boolean>(false);

  const [administrator, setAdministrator] = useState<Administrator>({
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
    setAdministrator({
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
      const response = await axios.get("/administrator/" + id);
      const { result, success } = response.data;

      if (!success) throw Error;
      setAdministrator(result);
      setFormLoaded(true);
      setAddForm(false);
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleUpdateAdministrator = async () => {
    const {
      user_first_name,
      user_middle_name,
      user_last_name,
      user_contact_number,
      user_address,
      user_position,
    } = administrator;
    let errors: string[] = [];

    !user_first_name && errors.push("user_first_name");
    !user_last_name && errors.push("user_last_name");
    !user_position && errors.push("user_position");

    setError(errors);

    try {
      if (!errors.length) {
        const { id } = administrator;
        const response = await axios.put("/administrator/" + id, administrator);
        const { success } = response.data;

        if (!success) throw Error;
        Swal.fire(
          "Updated!",
          "Administrator information updated successfully!",
          "success"
        );
        getAdministrators();
        handleCloseEdit();
      }
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleAdministratorRegister = async () => {
    const {
      user_email_address,
      user_first_name,
      user_middle_name,
      user_last_name,
      user_contact_number,
      user_address,
      user_position,
    } = administrator;
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
        const result = await axios.post("/administrator", {
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
        if (message === "Administrator added successfully!") {
          Swal.fire("Added!", "Administrator added successfully!", "success");
          setFormLoaded(false);
          getAdministrators();
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
        text: "This administrator information will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete("/administrator/" + id);

          Swal.fire(
            "Deleted!",
            "Administrator information has been deleted.",
            "success"
          );

          getAdministrators();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Cancelled",
            "Deleting administrator information has been cancelled.",
            "error"
          );
        }
      });
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleAdministratorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setAdministrator({ ...administrator, [name]: value });
  };

  const handleRestoreAdministrator = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This administrator information will be restored.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, restore it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.put("/administrator/restore/" + id);

          Swal.fire(
            "Restored!",
            "Administrator information has been restored.",
            "success"
          );

          getAdministrators();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Cancelled",
            "Restoring administrator information has been cancelled.",
            "error"
          );
        }
      });
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const getAdministrators = async () => {
    setAdministratorsLoaded(false);
    try {
      const response = await axios.get("/administrators/" + getCompanyId());
      const { result, success } = response.data;

      if (!success) throw Error;
      administratorsToPushToHooks(result);
    } catch (error) {
      Swal.fire("There is an error while getting administrators!");
    }
  };

  const administratorsToPushToHooks = (data: Administrator[]) => {
    const active_administrators: string[][] = [];
    const inactive_administrators: string[][] = [];

    data.map((value: Administrator) => {
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

      console.log(value);
      const administrator: any[] = [];

      administrator.push(
        user_first_name + " " + user_middle_name + " " + user_last_name
      );
      administrator.push(user_email_address);
      administrator.push(user_password);
      administrator.push(user_contact_number);
      administrator.push(user_position);

      administrator.push(actionButtons(id, user_status));

      user_status === "Active" && active_administrators.push(administrator);
      user_status === "Inactive" && inactive_administrators.push(administrator);
    });

    const administrators: string[][] = [];

    active_administrators.map((value: string[]) => {
      administrators.push(value);
    });

    inactive_administrators.map((value: string[]) => {
      administrators.push(value);
    });

    setAdministrators(administrators);
    setAdministratorsLoaded(true);
  };

  const actionButtons = (id: string, administrator_status: string) => {
    return (
      <div>
        {administrator_status === "Active" ? (
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
              onClick={() => handleRestoreAdministrator(id)}
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
    getAdministrators();
  }, []);

  return (
    <div className={classes.root}>
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleLogoutButton={handleLogoutButton}
      />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      {!administratorsLoaded ? (
        <div style={{ margin: "400px 800px" }}>
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <AdministratorsTable
          administrators={administrators}
          handleFormLoaded={handleFormLoaded}
          formLoaded={formLoaded}
        />
      )}
      {formLoaded && (
        <AdministratorsForm
          handleAdministratorInputChange={handleAdministratorInputChange}
          handleAdministratorRegister={handleAdministratorRegister}
          handleUpdateAdministrator={handleUpdateAdministrator}
          handleFormLoaded={handleFormLoaded}
          error={error}
          addForm={addForm}
          administrator={administrator}
          errorRegister={errorRegister}
        />
      )}
    </div>
  );
};

export default Administrators;
