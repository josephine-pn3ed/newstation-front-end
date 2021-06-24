import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#e3f2fd'
    },
    paper: {
        marginTop: theme.spacing(0),
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'normal'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),

    },
    submit: {
        margin: theme.spacing(1, 0, 1),
        padding: theme.spacing(1)
    },
    password_field: {
        width: '100%'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',


    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    pos: {
        marginBottom: 0,
    },
    employeeCard: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default useStyles;