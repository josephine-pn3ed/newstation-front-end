import React from "react";
import {
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  Container,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  ListItemText,
  FormHelperText
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Props } from "./types";
import useStyles from "../../styles/_LoginForm";

const LoginForm = (props: Props) => {
  const classes = useStyles();

  const {
    showPassword,
    handleInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleLogin,
    credentials,
    error,
    errorLogin,
  } = props;

  const { password } = credentials;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Paper elevation={10}>
          <Container maxWidth="lg" className={classes.container}>
            <Typography component="h1" variant="h5" align="center">
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                {errorLogin && (
                  <Grid item xs={12}>
                    <ListItemText
                      primary={errorLogin}
                      className={classes.error}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("email_address")}
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email_address"
                    autoComplete="email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.password_field}
                    error={
                      error.includes("password")
                    }
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(event)
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={75}
                    />
                    {(!password &&
                      errorLogin
                    ) && <FormHelperText> Please input password. </FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
              >
                Log in
              </Button>
            </form>
          </Container>
        </Paper>
      </main>
    </Container>
  );
};

export default LoginForm;
