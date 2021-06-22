import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from '../../styles/_Dashboard';
import { Container, Typography, Button, Card, CardHeader, Avatar, CardContent, CardActions, Tooltip } from "@material-ui/core";
import { Props, News } from './types';
import { getUser } from '../../utils';

const DashboardContent = (props: Props) => {
  const classes = useStyles();
  const { handleCloseAddForm, handleUpdateForm, max_width, news } = props;

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      {getUser() === 'company' &&
        <Button color="secondary" className={classes.addNewsButton} variant="contained" onClick={() => handleCloseAddForm()}>
          Add News
      </Button>}
      <Container maxWidth={max_width} className={classes.container}>
        {news.map((value: News) => {
          return (
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>R</Avatar>
                }
                title={value.news_topic}
                subheader={value.updated_at}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {value.news_body}
                </Typography>
              </CardContent>
              {getUser() === 'company' &&
                <CardActions disableSpacing >
                  <Tooltip color="primary" title="Edit" aria-label="edit" onClick={() => handleUpdateForm(value.id)}>
                    <EditIcon />
                  </Tooltip>
                  <Tooltip color="secondary" title="Delete" aria-label="delete" id={value.id}>
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