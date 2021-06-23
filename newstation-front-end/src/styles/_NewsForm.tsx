import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#e3f2fd",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1),
  },
  password_field: {
    width: "100%",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    marginTop: "90px",
    marginRight: "20px"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  multiline: {
    width: "100%",
  },
}));

export default useStyles;
