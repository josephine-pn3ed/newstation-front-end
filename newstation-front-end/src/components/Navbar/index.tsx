import React from 'react';
import { AppBar, Button, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import useStyles from '../../styles/_Navbar';
import { isLogin } from '../../utils';

const Navbar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Newstation
          </Typography>
          {!isLogin() &&
            <Button href="/register" color="primary" variant="outlined" className={classes.link}>
              Sign Up
            </Button>
          }
          {!isLogin() &&
            <Button href="/login" color="primary" variant="contained" className={classes.link}>
              Login
            </Button>
          }
          {isLogin() &&
            <Button href="/login" color="primary" variant="contained" className={classes.link}>
              Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;