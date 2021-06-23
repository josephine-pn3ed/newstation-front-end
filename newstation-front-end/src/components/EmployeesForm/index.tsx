import React from "react";
import { TextField, Paper, Grid, Container, Button } from "@material-ui/core";
import { Props } from "./types";
import useStyles from "../../styles/_EmployeeForm";

const EmployeeRegistrationForm = (props: Props) => {
  const classes = useStyles();

  const {
    handleEmployeeInputChange,
    handleEmployeeRegister,
    handleFormLoaded,
    handleUpdateEmployee,
    error,
    errorRegister,
    employee,
    addForm,
  } = props;

  const {
    user_first_name,
    user_middle_name,
    user_last_name,
    user_address,
    user_email_address,
    user_contact_number,
    user_position,
  } = employee;

  return (
    <Paper elevation={3} className={classes.content}>
      <main>
        <Container component="main" maxWidth="xs">
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {addForm ? (
                  <h2>Add Employee</h2>
                ) : (
                  <h2>Update Employee</h2>
                )}
              </Grid>
            </Grid>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("user_first_name")}
                    name="user_first_name"
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    value={user_first_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEmployeeInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("user_middle_name")}
                    name="user_middle_name"
                    variant="outlined"
                    fullWidth
                    label="Middle Name"
                    value={user_middle_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEmployeeInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("user_last_name")}
                    name="user_last_name"
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    value={user_last_name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEmployeeInputChange(event)
                    }
                  />
                </Grid>
                {addForm && 
                  <Grid item xs={12}>
                    <TextField
                      error={
                        error.includes("user_email_address") || errorRegister
                      }
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      name="user_email_address"
                      autoComplete="email"
                      type="email"
                      value={user_email_address}
                      helperText={
                        errorRegister && "Email address has already been taken"
                      }
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleEmployeeInputChange(event)
                      }
                    />
                  </Grid>
                }
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("user_address")}
                    variant="outlined"
                    fullWidth
                    label="Address"
                    name="user_address"
                    value={user_address}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEmployeeInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("user_position")}
                    variant="outlined"
                    fullWidth
                    label="Position"
                    name="user_position"
                    value={user_position}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEmployeeInputChange(event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error.includes("user_contact_number")}
                    variant="outlined"
                    fullWidth
                    label="Contact Number"
                    name="user_contact_number"
                    value={user_contact_number}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleEmployeeInputChange(event)
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
                      onClick={handleEmployeeRegister}
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
                      onClick={handleUpdateEmployee}
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

export default EmployeeRegistrationForm;
