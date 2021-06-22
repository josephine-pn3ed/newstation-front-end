import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from '../../styles/_Dashboard';
import { Container, Typography, Button, Card, CardHeader, Avatar, CardContent, CardActions, Tooltip } from "@material-ui/core";
import { Props, News } from './types';
import { getUser, getUserEmail } from '../../utils';

const DashboardContent = (props: Props) => {
  const classes = useStyles();
  const { handleCloseAddForm, handleUpdateForm, handleButtonDelete, max_width, news } = props;

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      {getUser() === 'company' &&
        <Button color="secondary" className={classes.addNewsButton} variant="contained" onClick={() => handleCloseAddForm(true)}>
          Add News
        </Button>}
      <Container maxWidth={max_width} className={classes.container}>
        {news.map((value: News) => {
          return (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="user" className={classes.avatar}>{getUserEmail()?.slice(0, 1)}</Avatar>
                }
                title={value.news_topic}
                subheader={value.updated_at}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  <p style={{ whiteSpace: 'pre-line' }}>{value.news_body}</p>
                </Typography>
              </CardContent>
              {getUser() === 'company' &&
                <CardActions disableSpacing >
                  <Tooltip color="primary" title="Edit" aria-label="edit" onClick={() => handleUpdateForm(value.id)}>
                    <EditIcon />
                  </Tooltip>
                  <Tooltip color="secondary" title="Delete" aria-label="delete" onClick={() => handleButtonDelete(value.id)}>
                    <DeleteIcon />
                  </Tooltip>
                </CardActions>
              }
            </Card>
          )
        })}
      </Container>
    </main>
  );
}

export default DashboardContent;
