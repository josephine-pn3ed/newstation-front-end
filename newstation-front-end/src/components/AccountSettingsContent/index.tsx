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
} from "@material-ui/core";
import useStyles from "../../styles/_EmployeeCard";
import { Props } from "./types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";
import { getUser } from "../../utils";

const AccountSettingsContent = (props: Props) => {
  const classesEmployees = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCurrent = () => {
    setShowCurrent(!showCurrent);
  };

  const handleOpenPassword = () => {
    setChangePassword(!changePassword);
    handleCloseEdit();
  };

  const handleClosePassword = () => {
    handleUpdateAccountPassword();
    setChangePassword(!changePassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    handleEditAccountInput,
    handleUpdateAccount,
    handleDeleteAccount,
    editedAccount,
    handleOpenEdit,
    handleCloseEdit,
    openEdit,
    handleInputPasswordAccount,
    handleUpdateAccountPassword
  } = props;

  const {
    first_name,
    middle_name,
    last_name,
    password,
    address,
    position,
    contact_number,
    new_password,
    checkPassword,
  } = editedAccount;

  return (
    <main className={classesEmployees.content}>
      <div className={classesEmployees.appBarSpacer} />
      <Container maxWidth="lg" className={classesEmployees.container}>
        {!openEdit && (
          <Card className={classesEmployees.root} variant="outlined">
            <CardContent>
              <Typography
                className={classesEmployees.title}
                color="primary"
                gutterBottom
              >
                Account Information
              </Typography>
              <Typography variant="h2" component="h2">
                {first_name} {middle_name} {last_name}
              </Typography>
              <Typography
                className={classesEmployees.pos}
                color="textSecondary"
              >
                Complete Name
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {address}
              </Typography>
              {address && (
                <Typography
                  className={classesEmployees.pos}
                  color="textSecondary"
                >
                  Address
                </Typography>
              )}
              <br />
              <br />
              <Typography variant="h5" component="h2">
                {contact_number}
              </Typography>
              {contact_number && (
                <Typography
                  className={classesEmployees.pos}
                  color="textSecondary"
                >
                  Contact Number
                </Typography>
              )}
              <br />
              <TextField value={password} type="password" />
              <Button
                size="small"
                color="inherit"
                variant="contained"
                onClick={handleOpenPassword}
              >
                Change Password
              </Button>
              <Typography
                className={classesEmployees.pos}
                color="textSecondary"
              >
                Password
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {position}
              </Typography>
              <Typography
                className={classesEmployees.pos}
                color="textSecondary"
              >
                Job Title
              </Typography>
              <br />
            </CardContent>
            {first_name && (
              <CardActions>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={handleOpenEdit}
                >
                  EDIT ACCOUNT DETAILS
                </Button>
                {getUser() !== "company" && (
                  <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    onClick={handleDeleteAccount}
                  >
                    DELETE ACCOUNT
                  </Button>
                )}
              </CardActions>
            )}
          </Card>
        )}
        {changePassword && password && (
          <Container maxWidth="sm" className={classesEmployees.paperPassword}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className={classesEmployees.title}
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  {" "}
                  Change Password
                </Typography>
                <FormControl
                  variant="outlined"
                  error={checkPassword !== password}
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Current Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={showCurrent ? "text" : "password"}
                    value={checkPassword}
                    disabled={checkPassword === password}
                    label="Confirm Current Password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputPasswordAccount(event)
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
                  {checkPassword !== password && (
                    <FormHelperText>
                      Please verify password before updating.{" "}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {checkPassword === password && <FormControl
                  variant="outlined"
                  error={
                    (!new_password || checkPassword !== password) &&
                    checkPassword === password
                  }
                  disabled={checkPassword !== password}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEditAccountInput(event)
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
                </FormControl>
                }
                {checkPassword !== password ? (
                  <FormHelperText>
                    {" "}
                    Available once password is verified{" "}
                  </FormHelperText>
                ) : (
                  <FormHelperText>
                    {" "}
                    Please Enter Valid Password{" "}
                  </FormHelperText>
                )}
                <Button
                  fullWidth
                  disabled={checkPassword !== password}
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


              </Grid>
            </Grid>
          </Container>
        )}

        {openEdit && first_name && (
          <div className={classesEmployees.paperCenter}>
            <Container maxWidth="sm" className={classesEmployees.paper}>
              <Typography
                className={classesEmployees.title}
                variant="h5"
                component="h2"
              >
                {" "}
                Account Management Settings
              </Typography>
              <form className={classesEmployees.form} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      error={!first_name}
                      name="first_name"
                      value={first_name}
                      variant="outlined"
                      fullWidth
                      label="First Name"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditAccountInput(event)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!middle_name}
                      name="middle_name"
                      value={middle_name}
                      variant="outlined"
                      fullWidth
                      label="Middle Name"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditAccountInput(event)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!last_name}
                      name="last_name"
                      value={last_name}
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditAccountInput(event)
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      error={checkPassword !== password}
                      fullWidth
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Current Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        type={showCurrent ? "text" : "password"}
                        value={checkPassword}
                        label="Confirm Current Password"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => handleInputPasswordAccount(event)}
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
                      {checkPassword !== password && (
                        <FormHelperText>
                          Please verify password before updating.{" "}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!address}
                      variant="outlined"
                      fullWidth
                      label="Address"
                      name="address"
                      value={address}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditAccountInput(event)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!position}
                      variant="outlined"
                      fullWidth
                      label="Job Title"
                      name="position"
                      value={position}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditAccountInput(event)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={!contact_number}
                      variant="outlined"
                      fullWidth
                      label="Contact Number"
                      name="contact_number"
                      value={contact_number}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditAccountInput(event)
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  disabled={checkPassword !== password || !first_name || !middle_name || !last_name || !address || !position || !contact_number}
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
          </div>
        )}
      </Container>
    </main>
  );
};

export default AccountSettingsContent;