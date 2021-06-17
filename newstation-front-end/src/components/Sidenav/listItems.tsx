import { ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { AccountCircle } from '@material-ui/icons';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/employees">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
    <ListItem button component="a" href="/account-settings">
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItem>
  </div>
);