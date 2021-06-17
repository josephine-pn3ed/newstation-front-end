
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import DashboardContent from '../../components/DashboardContent';
import useStyles from '../../styles/_Dashboard';
import { Props } from './types';

const Dashboard = (props: Props) => {
  const { open, handleDrawerOpen, handleDrawerClose, handleLogoutButton } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <DashboardContent />
    </div>
  )
}

export default Dashboard;