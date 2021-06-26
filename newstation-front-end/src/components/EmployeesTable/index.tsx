import MUIDataTable from "mui-datatables";
import { Container, Button } from "@material-ui/core";
import useStyles from "../../styles/_Employee";
import { Props } from "./types";

const EmployeesTable = (props: Props) => {
  const { employees, handleFormLoaded, formLoaded } = props;
  const columns = [
    "Name",
    "Email Address",
    "Password",
    "Contact Number",
    "Position",
    "",
  ];
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      {!formLoaded && (
        <Button
          color="primary"
          variant="contained"
          className={classes.addEmployeeButton}
          onClick={() => handleFormLoaded(true)}
        >
          Add Employee
        </Button>
      )}
      <Container maxWidth="xl" className={classes.container}>
        <MUIDataTable
          title={"Employees List"}
          data={employees}
          columns={columns}
          options={{ selectableRows: "none" }}
        />
      </Container>
    </main>
  );
};

export default EmployeesTable;
