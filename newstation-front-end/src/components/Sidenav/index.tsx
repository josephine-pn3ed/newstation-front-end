import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import useStyles from "../../styles/_Dashboard";
import { Props } from "./types";
import { useHistory } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { AccountCircle } from "@material-ui/icons";
import { getUser, getUserEmail } from "../../utils";

const Sidenav = (props: Props) => {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component="a"
            onClick={() => history.push("/dashboard")}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {getUser() === "company" && (
            <ListItem
              button
              component="a"
              onClick={() => history.push("/employees")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>
          )}
          <ListItem
            button
            component="a"
            onClick={() => history.push("/account-settings")}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={getUserEmail()} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Sidenav;
