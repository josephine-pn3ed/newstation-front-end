import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import AccountSettingsContent from '../../components/AccountSettingsContent';
import useStyles from '../../styles/_Dashboard';
import { logout, getUser, getCompanyId } from '../../utils';
import { State } from './types';
import axios from 'axios';

const AccountSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState<string[]>([]);
  const [errorRegister, setErrorRegister] = useState<boolean>(false);

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

  const getAccount = async () => {
    const id = getCompanyId();
    try {
      console.log("dom", id);
      const result = await axios.get('/employee/' + id);
      const { data } = result;
      console.log(data);
      setEditedAccount(data)
      console.log("getAcc", data)
      // setCloseEdit(true);
    }
    catch (error) {
      return { "message": "Invalid credentials!" };
    }
  }

  const handleUpdateAccount = async () => {
    try {
      console.log("id of edited", editedAccount)
      const { id } = editedAccount
      const result = await axios.put('/employee/' + id, editedAccount)
      //getEmployees();
      // handleCloseEdit();
    } catch (error) {
      return { "message": "Error Update!" };
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const { id } = editedAccount
      const result = await axios.delete('/employee/' + id);
      console.log(result)
      logout();
      history.push('/login');

    } catch (error) {
      return { "message": "Error Delete!" };
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  console.log("hi", editedAccount);


  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <AccountSettingsContent handleEditAccountInput={handleEditAccountInput} error={error} editedAccount={editedAccount}
        handleUpdateAccount={handleUpdateAccount} handleDeleteAccount={handleDeleteAccount} />
    </div>
  )
}

export default AccountSettings;