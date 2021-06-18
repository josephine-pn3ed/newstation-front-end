import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import DashboardContent from '../../components/DashboardContent';
import useStyles from '../../styles/_Dashboard';
import { logout, removeCompanyId } from '../../utils';

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(true);

  const handleLogoutButton = () => {
    logout();
    removeCompanyId();
    history.push('/login');
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
      <DashboardContent />
    </div>
  )
}

export default Dashboard;