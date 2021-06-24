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
  const { handleEditAccountInput, handleUpdateAccount, handleDeleteAccount, editedAccount, error, handleOpenEdit, handleCloseEdit, openEdit, handleInputPasswordAccount } = props;
  const { user_first_name, user_middle_name, user_last_name, id, user_email_address,
    user_password, user_address, user_position, user_contact_number, new_password, checkPassword } = editedAccount


  //(checkPassword === user_password && setAllowChange(true))

  return (
    <main className={classesEmployees.content}>
      <div className={classesEmployees.appBarSpacer} />
      <Container maxWidth="lg" className={classesEmployees.container} >
        {(!openEdit) && (
          <Card className={classesEmployees.root} variant="outlined">
            <CardContent>
              <Typography className={classesEmployees.title} color="textSecondary" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="h2" component="h2">
                {user_first_name} {user_middle_name} {user_last_name}
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
                {user_address}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Address
              </Typography>
              <Typography variant="h5" component="h2">
                {getUserEmail()}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Email Address
              </Typography>
              <Typography variant="h5" component="h2">
                {user_contact_number}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Contact Number
              </Typography>
              <TextField value={user_password} type="password" />
              <Typography className={classesEmployees.pos} color="textSecondary">
                Password
              </Typography>
              <Typography variant="h5" component="h2">
                {user_position}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Position
              </Typography>
            </CardContent>
            {user_first_name && (<CardActions>
              <Button size="large" color="primary" variant="contained" onClick={handleOpenEdit}>EDIT ACCOUNT</Button>
              <Button size="large" color="secondary" variant="contained" onClick={handleDeleteAccount}>DELETE ACCOUNT</Button>
            </CardActions>)}
          </Card>
        )
        }

        {(openEdit && user_first_name) && (<div className={classesEmployees.paperCenter}>
          <Container maxWidth='sm' className={classesEmployees.paper}>
            <Typography className={classesEmployees.title} variant="h5" component="h2"> Account Management Settings</Typography>
            {<h3> <i> {getUserEmail()} </i></h3>}
            <label>{getUser()} ID : {getEmployeeId()} </label>
            <form className={classesEmployees.form} noValidate>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('user_first_name')}
                    name="user_first_name"
                    value={user_first_name}
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('user_middle_name')}
                    name="user_middle_name"
                    value={user_middle_name}
                    variant="outlined"
                    fullWidth
                    label="Middle Name"

                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('user_last_name')}
                    name="user_last_name"
                    value={user_last_name}
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    //error={error.includes('user_email_address') || errorRegister}
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                    name="user_email_address"
                    autoComplete="email"
                    type="email"
                    value={user_email_address}
                    // helperText={errorRegister && 'Email address has already been taken'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={checkPassword !== user_password}
                    name="user_password"
                    value={checkPassword}
                    variant="outlined"
                    fullWidth
                    helperText={(checkPassword !== user_password) && 'Please Confirm latest Password to change!'}
                    label="Confirm Password"
                    type="password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputPasswordAccount(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!new_password}
                    variant="outlined"
                    fullWidth
                    label="New Password"
                    name="new_password"
                    value={new_password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('user_address')}
                    variant="outlined"
                    fullWidth
                    label="Address"
                    name="user_address"
                    value={user_address}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('user_position')}
                    variant="outlined"
                    fullWidth
                    label="Position"
                    name="user_position"
                    value={user_position}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes('user_contact_number')}
                    variant="outlined"
                    fullWidth
                    label="Contact Number"
                    name="user_contact_number"
                    value={user_contact_number}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                disabled={checkPassword !== user_password}
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
                disabled={checkPassword !== user_password}
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
