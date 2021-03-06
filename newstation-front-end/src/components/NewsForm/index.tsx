import { TextField, Grid, Container, Button, Paper } from "@material-ui/core";
import useStyles from "../../styles/_NewsForm";
import { Props } from "./types";

const NewsForm = (props: Props) => {
  const classes = useStyles();

  const {
    handleCloseAddForm,
    handleInputChange,
    handleButtonSubmit,
    handleButtonUpdate,
    addForm,
    news,
    error,
  } = props;

  const { id, topic, body } = news;

  return (
    <Paper elevation={3} className={classes.content}>
      <Container component="main" maxWidth="xs">
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {addForm ? <h2>Add News</h2> : <h2>Update News</h2>}
            </Grid>
          </Grid>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error.includes("topic")}
                  name="topic"
                  variant="outlined"
                  fullWidth
                  label="Topic"
                  value={topic}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error.includes("body")}
                  id="outlined-multiline-static"
                  label="Message"
                  name="body"
                  multiline
                  rows={20}
                  variant="outlined"
                  className={classes.multiline}
                  value={body}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => handleCloseAddForm(false)}
                >
                  Close
                </Button>
              </Grid>
              {!id ? (
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleButtonSubmit}
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
                    onClick={() => handleButtonUpdate(id)}
                  >
                    Update
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </div>
      </Container>
    </Paper>
  );
};

export default NewsForm;
