import {
  TextField,
  Link,
  Grid,
  Container,
  Button,
  TextareaAutosize
} from '@material-ui/core';
import useStyles from '../../styles/_NewsForm';
import { Props } from './types';

const AddNewsForm = (props: Props) => {
  const classes = useStyles();
  const { handleEditNewsInput, handleUpdateNews, handleCloseEditNews, editedNews, error } = props;
  const { news_topic, news_body } = editedNews;
  return (
    <main className={classes.content} >
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={false}
                  name="news_topic"
                  value={news_topic}
                  variant="outlined"
                  fullWidth
                  label="Topic"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={30}
                  value={news_body}
                  variant="outlined"
                  className={classes.multiline}
                />
              </Grid>
              <Grid item xs={6}>

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => handleCloseEditNews()}
                >Close
                </Button>
              </Grid>
              <Grid item xs={6}>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </main>
  )
}

export default AddNewsForm;