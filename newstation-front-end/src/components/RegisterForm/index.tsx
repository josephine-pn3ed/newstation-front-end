import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
  CssBaseline,
  TextField,
  Link, 
  Grid, 
  Box, 
  Typography, 
  Container, 
  IconButton, 
  OutlinedInput, 
  InputLabel, 
  InputAdornment, 
  FormControl, 
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Props } from './types';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1)
  },
  password_field: {
    width: '51ch'
  }
}));

const RegisterForm = (props: Props) => {
  const classes = useStyles();
  const { showPassword, showConfirmPassword, handleCompanyInputChange, handleClickShowPassword, handleMouseDownPassword, handleCompanySubmit, handleClickShowConfirmPassword, company, error } = props;
  const { company_address, company_contact_number, company_name, company_password, company_confirm_password } = company;

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
                name="company_name"
                variant="outlined"
                fullWidth
                label="Company Name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Company Address"
                name="company_address"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Company Contact Number"
                name="company_contact_number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.password_field}>
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
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.password_field}>
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={company_confirm_password}
                  name="company_confirm_password"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCompanyInputChange(event)}
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
            onClick={handleCompanySubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
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
