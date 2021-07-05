import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
import AccountSettingsContent from "../../components/AccountSettingsContent";
import AccountSettingsCompany from "../../components/AccountSettingsCompany";
import useStyles from "../../styles/_Dashboard";
import {
  logout,
  getUser,
  getCompanyId,
  getUserId,
  displayConfirmation,
} from "../../utils";
import { State, Company } from "./types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AccountSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(true);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  let type: string;
  getUser() === "company" ? (type = "company") : (type = "employee");

  const [editedAccount, setEditedAccount] = useState<State>({
    id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    password: "",
    address: "",
    position: "",
    contact_number: "",
    status: "Active",
    new_password: "",
    checkPassword: "",
    updated_at: "",
  });

  const [editedCompany, setEditedCompany] = useState<Company>({
    id: "",
    name: "",
    address: "",
    contact_number: "",
    email_address: "",
    password: "",
    status: "Active",
    new_password: "",
    checkPassword: "",
  });

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

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };
  const handleCloseEdit = () => {
    setEditedAccount((editedAccount) => ({
      ...editedAccount,
      checkPassword: "",
      new_password: "",
    }));
    setEditedCompany((editedCompany) => ({
      ...editedCompany,
      checkPassword: "",
      new_password: "",
    }));
    setOpenEdit(false);
    getAccount();
  };

  const handleEditAccountInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setEditedAccount((editedAccount) => ({ ...editedAccount, [name]: value }));
  };

  const handleEditCompanyInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setEditedCompany((editedCompany) => ({ ...editedCompany, [name]: value }));
  };

  const handleInputPasswordAccount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setEditedAccount((editedAccount) => ({
      ...editedAccount,
      checkPassword: value,
    }));
  };

  const handleInputPasswordCompany = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setEditedCompany((editedCompany) => ({
      ...editedCompany,
      checkPassword: value,
    }));
  };

  const getAccount = () => {
    type === "company" ? getAccountCompany() : getAccountEmployee();
  };

  const getAccountEmployee = async () => {
    try {
      const id = getUserId();
      const response = await axios.get("/employee/" + id);
      const { data } = response;

      if (data === "Database down!" || data === "No employee found!")
        throw data;
      setEditedAccount(data);
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

  const getAccountCompany = async () => {
    try {
      const id = getCompanyId();
      const response = await axios.get("/company/" + id);
      const { data } = response;

      if (data === "Database down!" || data === "No company found!") throw data;
      setEditedCompany(data);
    } catch (error) {
      if (error === "No company found!") {
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

  const handleUpdateAccount = async () => {
    const result = await displayConfirmation("update", "password");
    if (result) {
      try {
        const { new_password } = editedAccount;
        const id = getUserId();
        const response = await axios.put("/employee/" + id, {
          ...editedAccount,
          password: new_password,
        });
        const { data } = response;

        if (data === "Database down!" || data === "Employee not updated!")
          throw data;
        toast("Password updated successfully!", {
          type: "success",
        });
        setOpenEdit(false);
        getAccount();
      } catch (error) {
        if (error === "Employee not updated!") {
          toast("Password not updated!", {
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

  const handleUpdateCompany = async () => {
    const result = await displayConfirmation("update", "password");
    if (result) {
      try {
        const { new_password } = editedCompany;

        const id = getCompanyId();
        const response = await axios.put("/company/" + id, {
          ...editedCompany,
          password: new_password,
        });
        const { data } = response;

        if (data === "Database down!" || data === "Company not updated!")
          throw data;
        toast("Password updated successfully!", {
          type: "success",
        });
        setOpenEdit(false);
        getAccount();
      } catch (error) {
        if (error === "Company not updated!") {
          toast("Password not updated!", {
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

  const handleDeleteAccount = async () => {
    const result = await displayConfirmation("delete", "account");
    if (result) {
      try {
        const id = getUserId();
        const response = await axios.delete("/employee/" + id);
        const { data } = response;

        if (data === "Database down!" || data === "Employee not deleted!")
          throw data;

        toast("Account deleted successfully!", {
          type: "success",
        });

        logout();
        history.push("/login");
      } catch (error) {
        if (error === "Employee not deleted!") {
          toast("Account not deleted!", {
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

  const handleDeleteCompany = async () => {
    const result = await displayConfirmation("delete", "account");
    if (result) {
      try {
        const id = getCompanyId();
        const response = await axios.delete("/company/" + id);
        const { data } = response;

        if (data === "Database down!" || data === "Company not deleted!")
          throw data;
        toast("Company deleted successfully!", {
          type: "success",
        });
        logout();
        history.push("/login");
      } catch (error) {
        if (error === "Company not deleted!") {
          toast("Account not deleted!", {
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

  useEffect(() => {
    getAccount();
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
      {type === "company" ? (
        <AccountSettingsCompany
          editedCompany={editedCompany}
          handleEditCompanyInput={handleEditCompanyInput}
          handleDeleteCompany={handleDeleteCompany}
          handleUpdateCompany={handleUpdateCompany}
          handleOpenEdit={handleOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openEdit={openEdit}
          handleInputPasswordCompany={handleInputPasswordCompany}
        />
      ) : (
        <AccountSettingsContent
          handleEditAccountInput={handleEditAccountInput}
          editedAccount={editedAccount}
          handleUpdateAccount={handleUpdateAccount}
          handleDeleteAccount={handleDeleteAccount}
          handleOpenEdit={handleOpenEdit}
          handleCloseEdit={handleCloseEdit}
          openEdit={openEdit}
          handleInputPasswordAccount={handleInputPasswordAccount}
        />
      )}
    </div>
  );
};

export default AccountSettings;
