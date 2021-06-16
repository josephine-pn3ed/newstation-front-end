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
  Button
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Props } from './types';
import useStyles from '../../styles/_RegisterForm';

const RegisterForm = (props: Props) => {
  const classes = useStyles();
  const {
    showPassword,
    showConfirmPassword,
    handleEmployeeInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleEmployeeRegister,
    handleClickShowConfirmPassword,
    employee,
    error,
    errorRegister
  } = props;
  const { employee_address, employee_contact_number, employee_first_name, employee_middle_name, employee_last_name, employee_password, employee_confirm_password } = employee;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_first_name')}
                name="employee_first_name"
                variant="outlined"
                fullWidth
                label="First Name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_middle_name')}
                name="employee_middle_name"
                variant="outlined"
                fullWidth
                label="Middle Name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_last_name')}
                name="employee_last_name"
                variant="outlined"
                fullWidth
                label="Last Name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_address')}
                variant="outlined"
                fullWidth
                label="Employee Address"
                name="employee_address"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_position')}
                variant="outlined"
                fullWidth
                label="Employee Position"
                name="employee_position"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_contact_number')}
                variant="outlined"
                fullWidth
                label="Employee Contact Number"
                name="employee_contact_number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.includes('employee_email_address') || errorRegister}
                variant="outlined"
                fullWidth
                label="Email Address"
                name="employee_email_address"
                autoComplete="email"
                type="email"
                helperText={errorRegister && 'Email address has already been taken'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                className={classes.password_field}
                error={error.includes('employee_password')}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="employee_password"
                  type={showPassword ? 'text' : 'password'}
                  value={employee_password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
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
                error={error.includes('employee_confirm_password')}>
                <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={employee_confirm_password}
                  name="employee_confirm_password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={135}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEmployeeRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container >
  );
}

export default RegisterForm;
