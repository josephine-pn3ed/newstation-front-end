import React from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  Button,
  AppBar,
  Typography,
  IconButton,
  Badge,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useStyles from '../../styles/_Dashboard';
import { isLogin } from '../../utils';
import { Props } from './types';

const Navbar = (props: Props) => {
  const { open, handleDrawerOpen, handleLogoutButton } = props;
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {isLogin() &&
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
          }
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Newstation
          </Typography>
          {isLogin() &&
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          }
          {isLogin() &&
            <Button color="primary" variant="contained" onClick={handleLogoutButton} className={classes.link}>
              Logout
            </Button>
          }
          {!isLogin() &&
            <Button href="/register" color="default" variant="outlined" className={classes.link}>
              Sign Up
            </Button>
          }
          {!isLogin() &&
            <Button href="/login" color="primary" variant="contained" className={classes.link}>
              Login
            </Button>
          }
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;