import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import AccountSettingsContent from '../../components/AccountSettingsContent';
import AccountSettingsCompany from '../../components/AccountSettingsCompany';
import useStyles from '../../styles/_Dashboard';
import { logout, getUser, getCompanyId, getEmployeeId } from '../../utils';
import { State, Company } from './types';
import axios from 'axios';

const AccountSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<string[]>([]);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);
  let type: string;
  (getUser() === 'company' ? type = 'company' : type = 'employee')

  const [editedAccount, setEditedAccount] = useState<State>({
    id: "",
    employee_first_name: "",
    employee_middle_name: "",
    employee_last_name: "",
    employee_email_address: "",
    employee_password: "",
    employee_address: "",
    employee_position: "",
    employee_contact_number: "",
    employee_image: "",
    employee_status: "Active",
    updated_at: ""
  })

  const [editedCompany, setEditedCompany] = useState<Company>({
    id: "",
    company_name: "",
    company_address: "",
    company_contact_number: "",
    company_email_address: "",
    company_password: "",
    company_status: "Active",
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

  const handleEditAccountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedAccount({ ...editedAccount, [name]: value })

  }

  const handleEditCompanyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCompany({ ...editedCompany, [name]: value })

  }

  const getAccount = async () => {
    type == 'company' ? getAccountCompany() : getAccountEmployee()
  }

  const getAccountEmployee = async () => {
    const id = getEmployeeId();
    const response = await axios.get("/employee/" + id);
    const { data } = response;
    setEditedAccount(data)
  }

  const getAccountCompany = async () => {
    const id = getCompanyId();
    const response = await axios.get("/company/" + id);
    const { result } = response.data
    setEditedCompany(result)
  }

  const handleUpdateAccount = async () => {
    try {
      const { id } = editedAccount
      const result = await axios.put('/employee/' + id, editedAccount)
    } catch (error) {
      return { "message": "Error Update!" };
    }
  }

  const handleUpdateCompany = async () => {
    try {
      const { id } = editedAccount
      const result = await axios.put('/company/' + id, editedAccount)
    } catch (error) {
      return { "message": "Error Update!" };
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const { id } = editedAccount
      const result = await axios.delete('/employee/' + id);
      logout();
      history.push('/login');

    } catch (error) {
      return { "message": "Error Delete!" };
    }
  }

  const handleDeleteCompany = async () => {
    try {
      const { id } = editedCompany
      const result = await axios.delete('/company/' + id);
      logout();
      history.push('/login');

    } catch (error) {
      return { "message": "Error Delete!" };
    }
  }
  useEffect(() => {
    getAccount();
  }, [])

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      {type === "company" ? <AccountSettingsCompany editedCompany={editedCompany} handleEditCompanyInput={handleEditCompanyInput} error={error}
        handleDeleteCompany={handleDeleteCompany} handleUpdateCompany={handleUpdateCompany} /> :
        <AccountSettingsContent handleEditAccountInput={handleEditAccountInput} error={error} editedAccount={editedAccount}
          handleUpdateAccount={handleUpdateAccount} handleDeleteAccount={handleDeleteAccount} />}

    </div>
  )
}

export default AccountSettings;