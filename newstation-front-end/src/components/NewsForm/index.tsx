import {
  TextField,
  Grid,
  Container,
  Button,
} from '@material-ui/core';
import useStyles from '../../styles/_NewsForm';
import { Props } from './types';

const NewsForm = (props: Props) => {
  const classes = useStyles();
  const { handleCloseAddForm, news, handleInputChange, handleButtonSubmit, handleButtonUpdate } = props;
  const { id, company_id, news_topic, news_body, news_image, news_status, created_at, updated_at } = news;

  return (
    <main>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  error={false}
                  name="news_imaage"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  fullWidth
                  label="Image"
                  type="file"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event)}
                />
              </Grid> */}
              <Grid item xs={6}>

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() => handleCloseAddForm(false)}
                >Close
            </Button>
              </Grid>
              {!id ?
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleButtonSubmit}
                  >Submit
                </Button>
                </Grid> :
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => handleButtonUpdate(id)}
                  >Update
              </Button>
                </Grid>
              }
            </Grid>
          </form>
        </div>
      </Container>
    </main>
  )
}

export default NewsForm;