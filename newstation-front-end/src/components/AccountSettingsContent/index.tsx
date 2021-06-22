import {
  TextField,
  Link,
  Grid,
  Container,
  Button
} from '@material-ui/core';
import useStyles from '../../styles/_RegisterForm';
import { useHistory } from 'react-router-dom';
import { Props } from './types';



const AccountSettingsContent = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const { handleEditAccountInput, handleUpdateAccount, handleDeleteAccount, editedAccount, error } = props;
  //handleEditAccountButton();
  const { employee_first_name, employee_middle_name, employee_last_name, id, employee_email_address,
    employee_password, employee_address, employee_position, employee_contact_number } = editedAccount
  console.log("Acct settings", editedAccount)
  console.log("Acct settings", employee_first_name)

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
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

                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('id')}
                  variant="outlined"
                  fullWidth
                  label="Employee ID"
                  name="id"
                  value={id}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //error={error.includes('employee_email_address') || errorRegister}
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  name="employee_email_address"
                  autoComplete="email"
                  type="email"
                  value={employee_email_address}
                  // helperText={errorRegister && 'Email address has already been taken'}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUpdateAccount}
            >
              Update User Information
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => history.push('/')}>
                  BACK
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </main>
  )
}

export default AccountSettingsContent;