import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import AccountSettingsContent from '../../components/AccountSettingsContent';
import useStyles from '../../styles/_Dashboard';
import { logout, removeCompanyId } from '../../utils';

const AccountSettings = () => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(true);

  const handleLogoutButton = () => {
    logout();
    removeCompanyId();
    window.location.replace("http://localhost:3000/login");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <AccountSettingsContent />
    </div>
  )
}

export default AccountSettings;