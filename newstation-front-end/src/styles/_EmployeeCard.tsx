import { makeStyles } from '@material-ui/core/styles';

const useStylesEmployee = makeStyles((theme) => ({
    root: {
        minWidth: 100,

    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 0,
    },
    paper: {
        marginTop: theme.spacing(-50),
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'normal',
        position: 'absolute',
        width: 750,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[10],
        padding: theme.spacing(2, 4, 3),


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
        width: '50%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),

    },
}));

export default useStylesEmployee;