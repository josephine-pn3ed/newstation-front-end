import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
import AccountSettingsContent from "../../components/AccountSettingsContent";
import AccountSettingsCompany from "../../components/AccountSettingsCompany";
import useStyles from "../../styles/_Dashboard";
import { logout, getUser, getCompanyId, getUserId } from "../../utils";
import { State, Company } from "./types";
import axios from "axios";
import Swal from "sweetalert2";
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
    user_first_name: "",
    user_middle_name: "",
    user_last_name: "",
    user_email_address: "",
    user_password: "",
    user_address: "",
    user_position: "",
    user_contact_number: "",
    user_image: "",
    user_status: "Active",
    new_password: "",
    checkPassword: "",
    updated_at: "",
  });

  const [editedCompany, setEditedCompany] = useState<Company>({
    id: "",
    company_name: "",
    company_address: "",
    company_contact_number: "",
    company_email_address: "",
    company_password: "",
    company_status: "Active",
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
      const { result } = response.data;
      setEditedAccount(result);
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const getAccountCompany = async () => {
    try {
      const id = getCompanyId();
      const response = await axios.get("/company/" + id);
      const { result } = response.data;
      setEditedCompany(result);
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleUpdateAccount = () => {
    try {
      const { new_password } = editedAccount;
      Swal.fire({
        title: "Are you sure?",
        text: "This Employee will be Updated!.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const id = getUserId();
          await axios.put("/employee/" + id, {
            ...editedAccount,
            user_password: new_password,
            checkPassword: "",
          });
          toast("Password updated successfully!", {
            type: "success",
          });
          setOpenEdit(false);
          getAccount();
        } 
      });
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleUpdateCompany = () => {
    try {
      const { new_password } = editedCompany;
      Swal.fire({
        title: "Are you sure?",
        text: "This Company will be Updated!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const id = getCompanyId();
          await axios.put("/company/" + id, {
            ...editedCompany,
            company_password: new_password,
            checkPassword: "",
          });
          toast("Company updated successfully!", {
            type: "success",
          });
          setOpenEdit(false);
          getAccount();
        }
      });
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleDeleteAccount = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Your account will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const id = getUserId();
          await axios.delete("/employee/" + id);

          toast("Account deleted successfully!", {
            type: "success",
          });

          logout();
          history.push("/login");
        }
      });
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
    }
  };

  const handleDeleteCompany = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This Company will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const id = getCompanyId();
          await axios.delete("/company/" + id);

          toast("Company deleted successfully!", {
            type: "success",
          });
          logout();
          history.push("/login");
        } 
      });
    } catch (error) {
      toast("Internal Server Error!", {
        type: "error",
      });
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
