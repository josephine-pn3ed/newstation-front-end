import React from "react";
import { TextField, Paper, Grid, Container, Button } from "@material-ui/core";
import { Props } from "./types";
import useStyles from "../../styles/_AdministratorForm";

const AdministratorRegistrationForm = (props: Props) => {
  const classes = useStyles();

  const {
    handleAdministratorInputChange,
    handleAdministratorRegister,
    handleFormLoaded,
    handleUpdateAdministrator,
    error,
    errorRegister,
    administrator,
    addForm,
  } = props;

  const {
    first_name,
    middle_name,
    last_name,
    address,
    email_address,
    contact_number,
    position,
  } = administrator;

  return (
    <Paper elevation={3} className={classes.content}>
      <main>
        <Container component="main" maxWidth="xs">
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {addForm ? (
                  <h2>Add Administrator</h2>
                ) : (
                  <h2>Update Administrator</h2>
                )}
              </Grid>
            </Grid>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("first_name")}
                    name="first_name"
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    value={first_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAdministratorInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("middle_name")}
                    name="middle_name"
                    variant="outlined"
                    fullWidth
                    label="Middle Name"
                    value={middle_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAdministratorInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("last_name")}
                    name="last_name"
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    value={last_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAdministratorInputChange(event)
                    }
                  />
                </Grid>
                {addForm && 
                  <Grid item xs={12}>
                    <TextField
                      error={
                        error.includes("email_address") || errorRegister
                      }
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      name="email_address"
                      autoComplete="email"
                      type="email"
                      value={email_address}
                      helperText={
                        errorRegister && "Email address has already been taken"
                      }
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleAdministratorInputChange(event)
                      }
                    />
                  </Grid>
                }
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("address")}
                    variant="outlined"
                    fullWidth
                    label="Address"
                    name="address"
                    value={address}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAdministratorInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("position")}
                    variant="outlined"
                    fullWidth
                    label="Position"
                    name="position"
                    value={position}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAdministratorInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("contact_number")}
                    variant="outlined"
                    fullWidth
                    label="Contact Number"
                    name="contact_number"
                    value={contact_number}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleAdministratorInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => handleFormLoaded(false)}
                  >
                    Close
                  </Button>
                </Grid>
                {addForm ? (
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleAdministratorRegister}
                    >
                      Add
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleUpdateAdministrator}
                    >
                      Update
                    </Button>
                  </Grid>
                )}
              </Grid>
            </form>
          </div>
        </Container>
      </main>
    </Paper>
  );
};

export default AdministratorRegistrationForm;
