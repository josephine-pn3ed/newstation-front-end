import React from 'react';
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
  Avatar,
  Button,
  ListItemText
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Props } from './types';
import useStyles from './styles';

const LoginForm = (props: Props) => {
  const classes = useStyles();
  const {
    showPassword,
    handleCompanyInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleCompanyLogin,
    company,
    error,
    errorLogin,
    errorLoginPassword
  } = props;
  const { company_password } = company;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {errorLogin && <Grid item xs={12}>
              <ListItemText primary="Invalid credentials!" className={classes.error} />
            </Grid>}
            <Grid item xs={12}>
              <TextField
                error={error.includes('company_email_address') || errorLogin}
                variant="outlined"
                fullWidth
                label="Email Address"
                name="company_email_address"
                autoComplete="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.password_field}
                error={error.includes('company_password') || errorLoginPassword || errorLogin}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="company_password"
                  type={showPassword ? 'text' : 'password'}
                  value={company_password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
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
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCompanyLogin}
          >
            Sign in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container >
  );
}

export default LoginForm;
