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
  Button,
  ListItemText
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Props } from './types';
import useStyles from '../../styles/_LoginForm';

const LoginForm = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    showPassword,
    handleInputChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleLogin,
    credentials,
    error,
    errorLogin,
    errorLoginPassword
  } = props;

  const { password } = credentials;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography component="h1" variant="h5" align="center" >
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                {errorLogin && <Grid item xs={12}>
                  <ListItemText primary="Invalid credentials!" className={classes.error} />
                </Grid>}
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('email_address') || errorLogin}
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="email_address"
                    autoComplete="email"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.password_field}
                    error={error.includes('password') || errorLoginPassword || errorLogin}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
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
                onClick={handleLogin}
              >
                Sign in
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={() => history.push('/register')}>
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
        </main>
    </Container >
  );
}

export default LoginForm;
