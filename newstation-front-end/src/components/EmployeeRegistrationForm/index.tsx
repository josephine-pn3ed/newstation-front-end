import React from 'react';
import {
  TextField,
  Link,
  Grid,
  Container,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Props } from './types';
import useStyles from '../../styles/_RegisterForm';

const EmployeeRegistrationForm = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    handleEmployeeInputChange,
    handleEmployeeRegister,
    error,
    errorRegister
  } = props;

  return (
    <main className={classes.content} >
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
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
                  error={error.includes('id')}
                  variant="outlined"
                  fullWidth
                  label="Employee ID"
                  name="id"
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
                <TextField
                  error={error.includes('employee_address')}
                  variant="outlined"
                  fullWidth
                  label="Address"
                  name="employee_address"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_position')}
                  variant="outlined"
                  fullWidth
                  label="Position"
                  name="employee_position"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_contact_number')}
                  variant="outlined"
                  fullWidth
                  label="Contact Number"
                  name="employee_contact_number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEmployeeInputChange(event)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleEmployeeRegister}
            >
              Add Employee
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => history.push('/employees')}>
                  BACK
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container >
    </main>
  );
}

export default EmployeeRegistrationForm;
