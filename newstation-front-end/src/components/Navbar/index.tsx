import React from 'react';
import { AppBar, Button, CssBaseline, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';

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
          {/* <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Features
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Enterprise
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Support
            </Link>
          </nav> */}
          <Button href="/register" color="primary" variant="outlined" className={classes.link}>
            Sign Up
          </Button>
          <Button href="/login" color="primary" variant="contained" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Navbar;