import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  CssBaseline,
  Button,
  AppBar,
  Typography,
  IconButton,
  Badge,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "../../styles/_Navbar";
import { isLogin } from "../../utils";
import { Props } from "./types";

const Navbar = (props: Props) => {
  const { open, handleDrawerOpen, handleLogoutButton } = props;

  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        className={clsx(
          classes.root,
          classes.appBar,
          open && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          {isLogin() && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Newstation
          </Typography>
          {isLogin() && (
            <Button
              color="primary"
              variant="contained"
              onClick={handleLogoutButton}
              className={classes.logoutButton}
            >
              Logout
            </Button>
          )}
          {!isLogin() && (
            <Button
              color="primary"
              variant="contained"
              className={classes.loginButton}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
