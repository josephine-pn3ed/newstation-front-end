import {
  TextField,
  Link,
  Grid,
  Container,
  Button
} from '@material-ui/core';
import useStyles from '../../styles/_AccountSettings';
import { useHistory } from 'react-router-dom';
import { Props } from './types';
import { getUserEmail, getUser, getCompanyId } from '../../utils';

const AccountSettingsCompany = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleEditCompanyInput, handleUpdateCompany, handleDeleteCompany, editedCompany, error } = props;
  const { company_name, company_email_address,
    company_password, company_address, company_contact_number } = editedCompany
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="md" className={classes.container}>

        <div className={classes.paper}>

          <h2> Account Management Settings</h2>
          {<h2> <i> {getUserEmail()} </i></h2>}
          <h4> {getUser()} ID : {getCompanyId()} </h4>
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

              size='small'
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
            <Button
              fullWidth
              size='medium'
              variant="outlined"
              color="inherit"
              className={classes.submit}
              onClick={() => history.push('/dashboard')}
            >
              BACK
            </Button>
          </form>
        </div>
      </Container>
    </main>

  )
}

export default AccountSettingsCompany;