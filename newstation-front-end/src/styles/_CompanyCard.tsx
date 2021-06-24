import { makeStyles } from '@material-ui/core/styles';

const useStylesEmployee = makeStyles((theme) => ({
    root: {
        minWidth: 100,

    },
    title: {
        fontSize: 40,
    },
    pos: {
        marginBottom: 0,
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'normal',
        position: 'absolute',

        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[10],
        padding: theme.spacing(2, 4, 3),


    },
    paperCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        marginTop: theme.spacing(50)
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
    form: {
        width: '60%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),

    },
    submit: {
        margin: theme.spacing(1, 0, 1),
        padding: theme.spacing(1)
    },
}));

export default useStylesEmployee;