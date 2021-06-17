import MUIDataTable from "mui-datatables";
import { CssBaseline, Container, Button, Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from '../../styles/_Employee';
import { Props } from './types';

const EmployeeList = (props: Props) => {
  const { employees } = props;
  const columns = ["Employee ID", "Name", "Email Address", "Password", "Contact Number", "Position", "Status", ""];
  const classes = useStyles();

  return (
    <main className={classes.content} >
      <div className={classes.appBarSpacer} />
      <Button href="/employee-registration-form" color="secondary" variant="contained" className={classes.addEmployeeButton} >
        Add Employee
          </Button>
      <Container maxWidth="xl" className={classes.container} >
        <MUIDataTable
          title={"Employee List"}
          data={employees}
          columns={columns}
        />
      </Container>
    </main>
  )
}

export default EmployeeList;