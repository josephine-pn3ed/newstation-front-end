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
import { ToastContainer, toast } from "react-toastify";

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
    setAdministrator({
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
    setFormLoaded(false);
  };

  const handleEditButton = async (id: string) => {
    setError([]);
    try {
      const response = await axios.get("/administrator/" + id);
      const { result, success } = response.data;

      if (!success) throw Error;
      setAdministrator(result);
      setFormLoaded(true);
      setAddForm(false);
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleUpdateAdministrator = async () => {
    const { first_name, last_name, position } = administrator;
    let errors: string[] = [];

    !first_name && errors.push("first_name");
    !last_name && errors.push("last_name");
    !position && errors.push("position");

    setError(errors);

    try {
      if (!errors.length) {
        const { id } = administrator;
        const response = await axios.put("/administrator/" + id, administrator);
        const { success } = response.data;

        if (!success) throw Error;
        toast("Administrator updated successfully!", {
          type: "success",
        });
        getAdministrators();
        handleCloseEdit();
      }
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleAdministratorRegister = async () => {
    const {
      email_address,
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      position,
    } = administrator;
    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors: string[] = [];

    !first_name && errors.push("first_name");
    !last_name && errors.push("last_name");
    !email_address && errors.push("email_address");
    !position && errors.push("position");
    !validateEmail.test(email_address) &&
      errors.push("email_address");

    setError(errors);

    try {
      if (!errors.length) {
        const result = await axios.post("/administrator", {
          company_id: getCompanyId(),
          email_address: email_address.toLowerCase(),
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          position: position,
          contact_number: contact_number,
          address: address,
        });

        const { success, message } = result.data;

        if (!success) throw Error;
        if (message === "Administrator added successfully!") {
          toast("Administrator added successfully!", {
            type: "success",
          });
          setFormLoaded(false);
          getAdministrators();
        } else {
          setErrorRegister(true);
        }
      }
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
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

          toast("Administrator deleted successfully!", {
            type: "success",
          });

          getAdministrators();
        }
      });
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleAdministratorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setAdministrator((administrator) => ({ ...administrator, [name]: value }));
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

          toast("Administrator restored successfully!", {
            type: "success",
          });

          getAdministrators();
        }
      });
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const getAdministrators = async () => {
    setAdministratorsLoaded(false);
    try {
      const response = await axios.get("/administrators/" + getCompanyId());
      const { result, success } = response.data;

      if (!success) throw Error;
      administratorsPushToHooks(result);
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const administratorsPushToHooks = (data: Administrator[]) => {
    const res = data.reduce((acc: any, curr: any) => {
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

      const administrator = [
        `${first_name} ${middle_name} ${last_name}`,
        email_address,
        password,
        contact_number,
        position,
        actionButtons(id, status),
      ];

      if (status === "Active") {
        acc.unshift(administrator);
        return acc;
      }
      acc.push(administrator);
      return acc;
    }, []);

    setAdministrators(res);
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
            <Tooltip color="default" title="Disabled">
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
