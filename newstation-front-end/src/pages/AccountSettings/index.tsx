import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import AccountSettingsContent from '../../components/AccountSettingsContent';
import { Props } from './types';
import useStyles from '../../styles/_Dashboard';

const AccountSettings = (props: Props) => {
  const { open, handleDrawerOpen, handleDrawerClose, handleLogoutButton } = props;
  const columns = ["Name", "Company", "City", "State"];
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <AccountSettingsContent />
    </div>
  )
}

export default AccountSettings;