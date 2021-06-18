import { Container } from "@material-ui/core"
import useStyles from '../../styles/_Dashboard';

const AccountSettingsContent = () => {
  const classes = useStyles();


  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        {/* code here */}
      </Container>
    </main>
  )
}

export default AccountSettingsContent;