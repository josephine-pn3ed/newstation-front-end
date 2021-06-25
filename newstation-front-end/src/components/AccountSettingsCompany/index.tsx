import {
  TextField,
  Link,
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
import useStylesCompany from '../../styles/_CompanyCard'
import { useHistory } from 'react-router-dom';
import { Props } from './types';
import { getUserEmail, getUser, getCompanyId } from '../../utils';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Visibility, VisibilityOff } from "@material-ui/icons";


const AccountSettingsCompany = (props: Props) => {
  const classesCompany = useStylesCompany();
  const history = useHistory();
  const { handleEditCompanyInput, handleUpdateCompany, handleDeleteCompany, editedCompany, error, handleOpenEdit, handleCloseEdit, openEdit, handleInputPasswordCompany } = props;
  const { company_name, company_email_address,
    company_password, company_address, company_contact_number, checkPassword, new_password } = editedCompany
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
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClosePassword = () => {
    handleUpdateCompany();
    setChangePassword(!changePassword);
  }


  return (
    <main className={classesCompany.content}>
      <div className={classesCompany.appBarSpacer} />
      <Container maxWidth="lg" className={classesCompany.container} >
        {(!openEdit) && (
          <Card className={classesCompany.root} variant="outlined">
            <CardContent>
              <Typography className={classesCompany.title} color="primary" gutterBottom>
                Account Information
              </Typography>
              <Typography color="secondary" variant="h2" component="h2">
                {company_name}
              </Typography>
              <Typography className={classesCompany.pos} color="textSecondary">
                Company Name
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {company_address}
              </Typography>
              {company_address && <Typography className={classesCompany.pos} color="textSecondary">
                Address
              </Typography>}
              <br />
              <Typography variant="h5" component="h2">
                {getUserEmail()}
              </Typography>
              <Typography className={classesCompany.pos} color="textSecondary">
                Email Address
              </Typography>
              <br />
              <Typography variant="h5" component="h2">
                {company_contact_number}
              </Typography>
              {company_contact_number && <Typography className={classesCompany.pos} color="textSecondary">
                Contact Number
              </Typography>}
              <br />
              <TextField value={company_password} type="password" />
              <Button size="small" color="default" variant="contained" onClick={handleOpenPassword}>Change Password</Button>
              <Typography className={classesCompany.pos} color="textSecondary">
                Password
              </Typography>
              <br />

            </CardContent>
            {company_name && (<CardActions>
              <Button size="large" color="primary" variant="contained" onClick={handleOpenEdit}>EDIT ACCOUNT DETAILS</Button>
            </CardActions>)}
          </Card>
        )
        }
        {(changePassword && company_password) && (
          <Container maxWidth="md" className={classesCompany.paperPassword} >
            <Grid item xs={12}>
              <Typography className={classesCompany.title} align='center' color="primary" gutterBottom> Change Password</Typography>
              <FormControl
                variant="outlined"
                error={checkPassword !== company_password}
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Current Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="company_password"
                  type={showCurrent ? "text" : "password"}
                  value={checkPassword}
                  disabled={checkPassword === company_password}
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
                {checkPassword !== company_password && <FormHelperText>Please verify password before updating. </FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                error={!new_password || checkPassword !== company_password}
                disabled={checkPassword !== company_password}
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
                {checkPassword !== company_password ? <FormHelperText> Available once password is verified </FormHelperText>
                  : <FormHelperText> Please Enter Valid Password </FormHelperText>}
                <Button
                  fullWidth
                  disabled={(checkPassword !== (company_password))}
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
              </FormControl>
            </Grid>
          </Container>
        )}

        {(openEdit && company_name) && (<div className={classesCompany.paperCenter}>
          <Container maxWidth='sm' className={classesCompany.paper}>
            <Typography className={classesCompany.title} variant="h5" component="h2"> Account Management Settings</Typography>
            {<h3> <i> {getUserEmail()} </i></h3>}
            <form className={classesCompany.form} noValidate>
              <Grid container spacing={1}>
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
                    //error={error.includes('company_email_address') || errorRegister}
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
                  <FormControl
                    variant="outlined"
                    error={checkPassword !== company_password}
                    fullWidth
                  >

                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Current Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="company_password"
                      type={showCurrent ? "text" : "password"}
                      value={checkPassword}
                      // disabled={checkPassword === company_password}
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
                  </FormControl>
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
                disabled={(checkPassword !== (company_password))}
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
        </div>)
        }


      </Container>
    </main >
  )
}


export default AccountSettingsCompany;