import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import { Props } from './types';

const Dashboard = (props: Props) => {
  const { open, handleDrawerOpen, handleDrawerClose, handleLogoutButton } = props;
  
  return (
    <div>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
    </div>
  )
}

export default Dashboard;