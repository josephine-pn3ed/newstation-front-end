import {
  TextField,
  Link,
  Grid,
  Container,
  Button
} from '@material-ui/core';
import useStyles from '../../styles/_AccountSettings';
import useStylesEmployee from '../../styles/_EmployeeCard'
import { useHistory } from 'react-router-dom';
import { Props } from './types';
import { getUserEmail, getUser, getCompanyId } from '../../utils';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const AccountSettingsCompany = (props: Props) => {
  const classes = useStyles();
  const classesEmployees = useStylesEmployee();
  const history = useHistory();
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { handleEditCompanyInput, handleUpdateCompany, handleDeleteCompany, editedCompany, error } = props;
  const { company_name, company_email_address,
    company_password, company_address, company_contact_number } = editedCompany

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  return (
    <main className={classesEmployees.content}>
      <div className={classesEmployees.appBarSpacer} />
      <Container maxWidth="md" className={classesEmployees.container} >
        <Card className={classesEmployees.root} variant="outlined">
          <CardContent>
            <Typography className={classesEmployees.title} color="textSecondary" gutterBottom>
              Account Information
            </Typography>
            <Typography variant="h2" component="h2">
              {company_name}
            </Typography>
            <Typography className={classesEmployees.pos} color="textSecondary">
              Company
            </Typography>
            <Typography variant="h5" component="h2">
              {getCompanyId()}
            </Typography>
            <Typography className={classesEmployees.pos} color="textSecondary">
              Company ID
            </Typography>
            <Typography variant="h5" component="h2">
              {company_address}
            </Typography>
            <Typography className={classesEmployees.pos} color="textSecondary">
              Address
            </Typography>
            <Typography variant="h5" component="h2">
              {company_email_address}
            </Typography>
            <Typography className={classesEmployees.pos} color="textSecondary">
              Email Address
            </Typography>
            <Typography variant="h5" component="h2">
              {company_contact_number}
            </Typography>
            <Typography className={classesEmployees.pos} color="textSecondary">
              Contact Number
            </Typography>
            <Typography variant="h5" component="h2">
              {company_password}
            </Typography>
            <Typography className={classesEmployees.pos} color="textSecondary">
              Password
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" color="primary" variant="contained" onClick={handleOpenEdit}>EDIT ACCOUNT</Button>
            <Button size="large" color="secondary" variant="contained" onClick={handleDeleteCompany}>DELETE ACCOUNT</Button>
          </CardActions>


          {openEdit && company_name ? (<div className={classesEmployees.paper}>
            <Typography variant="h5" component="h2"> Account Management Settings</Typography>
            {<h2 > <i> {getUserEmail()} </i></h2>}
            <label > {getUser()} ID : {getCompanyId()} </label>
            <form className={classesEmployees.form} noValidate>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('company_name')}
                    name="company_name"
                    value={company_name}
                    variant="outlined"
                    fullWidth
                    label="Company Name"
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
                onClick={handleCloseEdit}
              >
                BACK
              </Button>
            </form>
          </div>
          ) : ""
          }

        </Card>

      </Container>
    </main>


  )
}

export default AccountSettingsCompany;