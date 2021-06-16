import MUIDataTable from "mui-datatables";
import { CssBaseline, Container } from "@material-ui/core"
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import { Props } from './types';
import useStyles from '../../styles/_Dashboard';

const Dashboard = (props: Props) => {
  const { open, handleDrawerOpen, handleDrawerClose, handleLogoutButton } = props;
  const columns = ["Name", "Company", "City", "State"];
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

      </main>
    </div>
  )
}

export default Dashboard;