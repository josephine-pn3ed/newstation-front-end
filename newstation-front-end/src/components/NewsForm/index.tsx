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
  } = props;

  const { id, news_topic, news_body } = news;

  return (
    <Paper elevation={3} className={classes.content}>
      {/* <main> */}
        <Container component="main" maxWidth="xs">
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {addForm ? (
                  <h2>Add News</h2>
                ) : (
                  <h2>Update News</h2>
                )}
              </Grid>
            </Grid>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={false}
                    name="news_topic"
                    variant="outlined"
                    fullWidth
                    label="Topic"
                    value={news_topic}
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
                    id="outlined-multiline-static"
                    label="Message"
                    name="news_body"
                    multiline
                    rows={20}
                    variant="outlined"
                    className={classes.multiline}
                    value={news_body}
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
      {/* </main> */}
    </Paper>
  );
};

export default NewsForm;
