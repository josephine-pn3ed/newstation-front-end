import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import DashboardContent from '../../components/DashboardContent';
import AddNewsForm from '../../components/AddNewsForm';
import useStyles from '../../styles/_Dashboard';
import { logout } from '../../utils';

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const [closeAddForm, setCloseAddForm] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);

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

  const handleCloseAddForm = () => {
    setCloseAddForm(!closeAddForm);
  }

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <DashboardContent handleCloseAddForm={handleCloseAddForm}/>
      {closeAddForm && (<AddNewsForm handleCloseAddForm={handleCloseAddForm} />)}
    </div>
  )
}

export default Dashboard;