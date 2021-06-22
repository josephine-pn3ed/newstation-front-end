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
import { getUser } from '../../utils';

const AccountSettingsCompany = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleEditCompanyInput, handleUpdateCompany, handleDeleteCompany, editedCompany, error } = props;
  const { company_name, company_email_address,
    company_password, company_address, company_contact_number } = editedCompany
  console.log("Acct settings", editedCompany)


  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <h1>{company_name}'s Account Management Settings</h1>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('company_name')}
                  name="company_name"
                  value={company_name}
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditCompanyInput(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //error={error.includes('employee_email_address') || errorRegister}
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  name="company_email_address"
                  autoComplete="email"
                  type="email"
                  value={company_email_address}
                  // helperText={errorRegister && 'Email address has already been taken'}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditCompanyInput(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('company_address')}
                  variant="outlined"
                  fullWidth
                  label="Address"
                  name="company_address"
                  value={company_address}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditCompanyInput(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('company_password')}
                  variant="outlined"
                  fullWidth
                  label="Password"
                  name="company_password"
                  value={company_password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditCompanyInput(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes('company_contact_number')}
                  variant="outlined"
                  fullWidth
                  label="Contact Number"
                  name="company_contact_number"
                  value={company_contact_number}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditCompanyInput(event)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUpdateCompany}
            >
              Update User Information
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleDeleteCompany}
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

export default AccountSettingsCompany;