import React from 'react';
import {
  TextField,
  Grid,
  Container,
  Button
} from '@material-ui/core';
import { Props } from './types';
import useStyles from '../../styles/_RegisterForm';

const EmployeeUpdateForm = (props: Props) => {
  const classes = useStyles();

  const {
    handleEditEmployee,
    handleCloseEdit,
    handleUpdateEmployee,
    error,
    editedEmployee
  } = props;

  const { employee_first_name, employee_middle_name, employee_last_name, employee_email_address, employee_address
    , employee_position, employee_contact_number } = editedEmployee

  return (
    <main>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_first_name')}
                  name="employee_first_name"
                  value={employee_first_name}
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_middle_name')}
                  name="employee_middle_name"
                  value={employee_middle_name}
                  variant="outlined"
                  fullWidth
                  label="Middle Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_last_name')}
                  name="employee_last_name"
                  value={employee_last_name}
                  variant="outlined"
                  fullWidth
                  label="Last Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  //   error={error.includes('employee_email_address') || errorRegister}
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  name="employee_email_address"
                  value={employee_email_address}
                  autoComplete="email"
                  type="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  //  helperText={errorRegister && 'Email address has already been taken'}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_address')}
                  variant="outlined"
                  fullWidth
                  label="Address"
                  name="employee_address"
                  value={employee_address}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_position')}
                  variant="outlined"
                  fullWidth
                  label="Position"
                  name="employee_position"
                  value={employee_position}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('employee_contact_number')}
                  variant="outlined"
                  fullWidth
                  label="Contact Number"
                  name="employee_contact_number"
                  value={employee_contact_number}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditEmployee(event)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={handleCloseEdit}
                >CLOSE
            </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleUpdateEmployee}
                >UPDATE
            </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container >
    </main>
  );
}

export default EmployeeUpdateForm;
