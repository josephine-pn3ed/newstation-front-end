import MUIDataTable from "mui-datatables";
import { CssBaseline, Container, Button } from "@material-ui/core";
import useStyles from '../../styles/_Employee';

const EmployeeList = () => {
  const columns = ["Name", "Company", "City", "State"];
  const classes = useStyles();

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  const options = {
    filterType: 'checkbox',
  };


  return (
    <main className={classes.content} >
      <div className={classes.appBarSpacer} />
      <Button href="/employee-registration-form" color="secondary" variant="contained" className={classes.addEmployeeButton} >
        Add Employee
          </Button>
      <Container maxWidth="xl" className={classes.container} >
        <MUIDataTable
          title={"Employee List"}
          data={data}
          columns={columns}
        />
      </Container>
    </main>
  )
}

export default EmployeeList;