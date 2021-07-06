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
import useStylesCompany from "../../styles/_CompanyCard";
import { Props } from "./types";
import { getUserEmail } from "../../utils";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { getUser } from '../../utils';

const AccountSettingsCompany = (props: Props) => {
  const classesCompany = useStylesCompany();
  const {
    handleEditCompanyInput,
    handleUpdateCompany,
    handleDeleteCompany,
    editedCompany,
    handleOpenEdit,
    handleCloseEdit,
    openEdit,
    handleInputPasswordCompany,
    handleUpdateCompanyPassword
  } = props;
  const {
    name,
    password,
    address,
    contact_number,
    checkPassword,
    new_password,
  } = editedCompany;
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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClosePassword = () => {
    handleUpdateCompanyPassword();
    setChangePassword(!changePassword);
  };

  return (
    <main className={classesCompany.content}>
      <div className={classesCompany.appBarSpacer} />
      <Container maxWidth="lg" className={classesCompany.container}>
        {!openEdit && (
          <Card className={classesCompany.root} variant="outlined">
            <CardContent>
              <Typography
                className={classesCompany.title}
                color="primary"
                gutterBottom
              >
                Account Information
              </Typography>
              <Typography variant="h2" component="h2">
                {name}
              </Typography>
              <Typography className={classesCompany.pos} color="textSecondary">
                Company Name
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {address}
              </Typography>
              {address && (
                <Typography
                  className={classesCompany.pos}
                  color="textSecondary"
                >
                  Address
                </Typography>
              )}
              <br />
              <Typography variant="h5" component="h2">
                {getUserEmail()}
              </Typography>
              <Typography className={classesCompany.pos} color="textSecondary">
                Email Address
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {contact_number}
              </Typography>
              {contact_number && (
                <Typography
                  className={classesCompany.pos}
                  color="textSecondary"
                >
                  Contact Number
                </Typography>
              )}
              <br />
              <TextField value={password} type="password" />
              <Button
                size="small"
                color="default"
                variant="contained"
                onClick={handleOpenPassword}
              >
                Change Password
              </Button>
              <Typography className={classesCompany.pos} color="textSecondary">
                Password
              </Typography>
              <br />
            </CardContent>
            {name && (
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
                    onClick={handleDeleteCompany}
                  >
                    DELETE ACCOUNT
                  </Button>
                )}
              </CardActions>
            )}
          </Card>
        )}
        {(changePassword && password) && (
          <Container maxWidth="sm" className={classesCompany.paperPassword} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className={classesCompany.title} align='center' color="primary" gutterBottom> Change Password</Typography>
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputPasswordCompany(event)
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
                  {checkPassword !== password && <FormHelperText>Please verify password before updating. </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {checkPassword === password && <FormControl
                  variant="outlined"
                  error={(!new_password || checkPassword !== password) && checkPassword === password}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleEditCompanyInput(event)
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
                  {checkPassword !== password ? <FormHelperText> Available once password is verified </FormHelperText>
                    : <FormHelperText> Please Enter Valid Password </FormHelperText>}
                </FormControl>}

                <Button
                  fullWidth
                  disabled={(checkPassword !== (password))}
                  variant="contained"
                  color="primary"
                  className={classesCompany.submit}
                  onClick={handleClosePassword}
                >
                  Update Password
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  className={classesCompany.submit}
                  onClick={handleOpenPassword}
                >
                  BACK
                </Button>

              </Grid>
            </Grid>
          </Container>
        )}

        {openEdit && name && (
          <div className={classesCompany.paperCenter}>
            <Container maxWidth="sm" className={classesCompany.paper}>
              <Typography
                className={classesCompany.title}
                variant="h5"
                component="h2"
              >
                {" "}
                Account Management Settings
              </Typography> 

              <form className={classesCompany.form} noValidate>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      error={!name}
                      name="name"
                      value={name}
                      variant="outlined"
                      fullWidth
                      label="Company Name"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEditCompanyInput(event)
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
                        ) => handleInputPasswordCompany(event)}
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
                        handleEditCompanyInput(event)
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
                        handleEditCompanyInput(event)
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  disabled={checkPassword !== password || !name || !address || !contact_number}
                  variant="contained"
                  color="primary"
                  className={classesCompany.submit}
                  onClick={handleUpdateCompany}
                >
                  Update User Information
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  className={classesCompany.submit}
                  onClick={handleCloseEdit}
                >
                  BACK
                </Button>
              </form>
            </Container>
          </div>
        )}
      </Container>
    </main >
  );
};

export default AccountSettingsCompany;