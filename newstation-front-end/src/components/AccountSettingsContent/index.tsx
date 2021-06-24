import {
  TextField,
  Link,
  Grid,
  Container,
  Button
} from '@material-ui/core';
import useStyles from '../../styles/_EmployeeCard'
import { useHistory } from 'react-router-dom';
import { Props } from './types';
import { getUserEmail, getUser, getEmployeeId } from '../../utils';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

const AccountSettingsContent = (props: Props) => {
  const classesEmployees = useStyles();
  const history = useHistory();
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { handleEditAccountInput, handleUpdateAccount, handleDeleteAccount, editedAccount, error } = props;
  const { employee_first_name, employee_middle_name, employee_last_name, id, employee_email_address,
    employee_password, employee_address, employee_position, employee_contact_number } = editedAccount
  const employee = getUserEmail();
  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }


  return (
    <main className={classesEmployees.content}>
      <div className={classesEmployees.appBarSpacer} />
      <Container maxWidth="lg" className={classesEmployees.container} >
        {(!openEdit) && (
          <Card className={classesEmployees.root} variant="outlined">
            <CardContent>
              <Typography className={classesEmployees.title} color="textSecondary" gutterBottom>
                Employee Account Information
              </Typography>
              <Typography variant="h2" component="h2">
                {employee_first_name} {employee_middle_name} {employee_last_name}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Complete Name
              </Typography>
              <Typography variant="h5" component="h2">
                {getEmployeeId()}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Employee ID
              </Typography>
              <Typography variant="h5" component="h2">
                {employee_address}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Address
              </Typography>
              <Typography variant="h5" component="h2">
                {employee_email_address}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Email Address
              </Typography>
              <Typography variant="h5" component="h2">
                {employee_contact_number}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Contact Number
              </Typography>
              <Typography variant="h5" component="h2">
                {employee_password}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Password
              </Typography>
              <Typography variant="h5" component="h2">
                {employee_position}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Position
              </Typography>
            </CardContent>
            {employee_first_name && (<CardActions>
              <Button size="large" color="primary" variant="contained" onClick={handleOpenEdit}>EDIT ACCOUNT</Button>
              <Button size="large" color="secondary" variant="contained" onClick={handleDeleteAccount}>DELETE ACCOUNT</Button>
            </CardActions>)}
          </Card>
        )
        }

        {(openEdit && employee_first_name) && (<div className={classesEmployees.paperCenter}>
          <Container maxWidth='sm' className={classesEmployees.paper}>
            <Typography className={classesEmployees.title} variant="h5" component="h2"> Account Management Settings</Typography>
            {<h3> <i> {getUserEmail()} </i></h3>}
            <label>{getUser()} ID : {getEmployeeId()} </label>
            <form className={classesEmployees.form} noValidate>
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
                    error={error.includes('employee_password')}
                    name="employee_password"
                    value={employee_password}
                    variant="outlined"
                    fullWidth

                    label="Password"
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
                className={classesEmployees.submit}
                onClick={handleUpdateAccount}
              >
                Update User Information
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classesEmployees.submit}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                className={classesEmployees.submit}
                onClick={handleCloseEdit}
              >
                BACK
              </Button>
            </form>
          </Container>
        </div>)
        }
      </Container>
    </main >

  )
}

export default AccountSettingsContent;
