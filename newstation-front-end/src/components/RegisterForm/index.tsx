import React from "react";
import {
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import useStyles from "../../styles/_RegisterForm";
import { Props } from "./types";

const RegisterForm = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    showPassword,
    showConfirmPassword,
    handleCompanyInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleCompanyRegister,
    handleClickShowConfirmPassword,
    company,
    error,
    errorRegister,
  } = props;

  const { company_password, company_confirm_password } = company;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h1" variant="h5" align="center">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error.includes("company_name")}
                  name="company_name"
                  variant="outlined"
                  fullWidth
                  label="Company Name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleCompanyInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes("company_address")}
                  variant="outlined"
                  fullWidth
                  label="Company Address"
                  name="company_address"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleCompanyInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes("company_contact_number")}
                  variant="outlined"
                  fullWidth
                  label="Company Contact Number"
                  name="company_contact_number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleCompanyInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    error.includes("company_email_address") || errorRegister
                  }
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  name="company_email_address"
                  autoComplete="email"
                  type="email"
                  helperText={
                    errorRegister && "Email address has already been taken"
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleCompanyInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.password_field}
                  error={error.includes("company_password")}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="company_password"
                    type={showPassword ? "text" : "password"}
                    value={company_password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleCompanyInputChange(event)
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
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.password_field}
                  error={error.includes("company_confirm_password")}
                >
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={company_confirm_password}
                    name="company_confirm_password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleCompanyInputChange(event)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={135}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleCompanyRegister}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => history.push("/login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Container>
      </main>
    </Container>
  );
};

export default RegisterForm;
