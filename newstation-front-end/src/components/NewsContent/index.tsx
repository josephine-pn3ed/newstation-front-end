import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useStyles from "../../styles/_Dashboard";
import {
  Container,
  Typography,
  Button,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Tooltip,
} from "@material-ui/core";
import { Props, News } from "./types";
import { getUser, getUserId } from "../../utils";

const NewsContent = (props: Props) => {
  const classes = useStyles();

  const {
    handleCloseAddForm,
    handleUpdateForm,
    handleButtonDelete,
    closeAddForm,
    news,
  } = props;

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      {(getUser() === "company" || getUser() === "administrator") &&
        !closeAddForm && (
          <Button
            color="primary"
            className={classes.addNewsButton}
            variant="contained"
            onClick={() => handleCloseAddForm(true)}
          >
            Add News
          </Button>
        )}
      <Container
        maxWidth={closeAddForm ? "lg" : "xl"}
        className={classes.container}
      >
        {news.map((value: News, key: any) => {
          return (
            <Card key={key} className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="user" className={classes.avatar}>
                    {value.first_name.slice(0, 1)}
                  </Avatar>
                }
                title={
                  !value.middle_name && !value.last_name
                    ? value.first_name
                    : !value.middle_name
                    ? value.first_name + " " + value.last_name
                    : value.first_name +
                      " " +
                      value.middle_name +
                      " " +
                      value.last_name
                }
                subheader={value.updated_at}
              />
              <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                  {value.topic}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {value.body}
                </Typography>
              </CardContent>
              {(getUser() === "company" ||
                (getUser() === "administrator" &&
                  getUserId() === value.user_id)) && (
                <CardActions disableSpacing>
                  <Tooltip
                    color="primary"
                    title="Edit"
                    aria-label="edit"
                    onClick={() => handleUpdateForm(value.id)}
                  >
                    <EditIcon />
                  </Tooltip>
                  <Tooltip
                    color="secondary"
                    title="Delete"
                    aria-label="delete"
                    onClick={() => handleButtonDelete(value.id)}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </CardActions>
              )}
            </Card>
          );
        })}
        ,
      </Container>
    </main>
  );
};

export default NewsContent;
