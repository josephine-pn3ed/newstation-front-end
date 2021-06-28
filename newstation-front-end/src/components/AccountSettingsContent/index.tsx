import {
  TextField,
  Grid,
  Container,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,

} from '@material-ui/core';
import useStyles from '../../styles/_EmployeeCard'
import { Props } from './types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from 'react';

const AccountSettingsContent = (props: Props) => {
  const classesEmployees = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCurrent = () => {
    setShowCurrent(!showCurrent);
  };

  const handleOpenPassword = () => {
    setChangePassword(!changePassword);
    handleCloseEdit();
  }

  const handleClosePassword = () => {
    handleUpdateAccount();
    setChangePassword(!changePassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { handleEditAccountInput, handleUpdateAccount, handleDeleteAccount, editedAccount,
    handleOpenEdit, handleCloseEdit, openEdit, handleInputPasswordAccount } = props;

  const { user_first_name, user_middle_name, user_last_name,
    user_password, user_address, user_position, user_contact_number, new_password, checkPassword } = editedAccount

  return (
    <main className={classesEmployees.content}>
      <div className={classesEmployees.appBarSpacer} />
      <Container maxWidth="lg" className={classesEmployees.container} >
        {(!openEdit) && (
          <Card className={classesEmployees.root} variant="outlined">
            <CardContent>
              <Typography className={classesEmployees.title} color="primary" gutterBottom>
                Account Information
              </Typography>
              <Typography variant="h2" component="h2">
                {user_first_name} {user_middle_name} {user_last_name}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Complete Name
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {user_address}
              </Typography>
              {user_address && <Typography className={classesEmployees.pos} color="textSecondary">
                Address
              </Typography>}
              <br />
              <br />
              <Typography variant="h5" component="h2">
                {user_contact_number}
              </Typography>
              {user_contact_number && <Typography className={classesEmployees.pos} color="textSecondary">
                Contact Number
              </Typography>
              }
              <br />
              <TextField value={user_password} type="password" />
              <Button size="small" color="inherit" variant="contained" onClick={handleOpenPassword}>Change Password</Button>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Password
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {user_position}
              </Typography>
              <Typography className={classesEmployees.pos} color="textSecondary">
                Job Title
              </Typography>
              <br />
            </CardContent>
            {user_first_name && (<CardActions>
              <Button size="large" color="primary" variant="contained" onClick={handleOpenEdit}>EDIT ACCOUNT DETAILS</Button>
              <Button size="large" color="secondary" variant="contained" onClick={handleDeleteAccount}>DELETE ACCOUNT</Button>
            </CardActions>)}
          </Card>
        )
        }
        {(changePassword && user_password) && (
          <Container maxWidth="sm" className={classesEmployees.paperPassword} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className={classesEmployees.title} align='center' color="primary" gutterBottom> Change Password</Typography>
                <FormControl
                  variant="outlined"
                  error={checkPassword !== user_password}
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Current Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="user_password"
                    type={showCurrent ? "text" : "password"}
                    value={checkPassword}
                    disabled={checkPassword === user_password}
                    label="Confirm Current Password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputPasswordAccount(event)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCurrent}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showCurrent ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={75}
                  />
                  {checkPassword !== user_password && <FormHelperText>Please verify password before updating. </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  error={(!new_password || checkPassword !== user_password) && checkPassword === user_password}
                  disabled={checkPassword !== user_password}
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="new_password"
                    type={showPassword ? "text" : "password"}
                    value={new_password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)
                    }
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
                  {checkPassword !== user_password ? <FormHelperText> Available once password is verified </FormHelperText>
                    : <FormHelperText> Please Enter Valid Password </FormHelperText>}
                  <Button
                    fullWidth
                    disabled={(checkPassword !== (user_password))}
                    variant="contained"
                    color="primary"
                    className={classesEmployees.submit}
                    onClick={handleClosePassword}
                  >
                    Update Password
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    className={classesEmployees.submit}
                    onClick={handleOpenPassword}
                  >
                    BACK
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        )}

        {(openEdit && user_first_name) && (<div className={classesEmployees.paperCenter}>
          <Container maxWidth='sm' className={classesEmployees.paper}>
            <Typography className={classesEmployees.title} variant="h5" component="h2"> Account Management Settings</Typography>
            <form className={classesEmployees.form} noValidate>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    error={!user_first_name}
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
                    error={!user_middle_name}
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
                    error={!user_last_name}
                    name="user_last_name"
                    value={user_last_name}
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    error={checkPassword !== user_password}
                    fullWidth
                  >

                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Current Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="user_password"
                      type={showCurrent ? "text" : "password"}
                      value={checkPassword}
                      label="Confirm Current Password"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputPasswordAccount(event)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowCurrent}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showCurrent ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={75}
                    />
                    {checkPassword !== user_password && <FormHelperText>Please verify password before updating. </FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!user_address}
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
                    error={!user_position}
                    variant="outlined"
                    fullWidth
                    label="Job Title"
                    name="user_position"
                    value={user_position}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditAccountInput(event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!user_contact_number}
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
                disabled={(checkPassword !== (user_password))}
                variant="contained"
                color="primary"
                className={classesEmployees.submit}
                onClick={handleUpdateAccount}
              >
                Update User Information
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
