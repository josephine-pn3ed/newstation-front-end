import MUIDataTable from "mui-datatables";
import { Container, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles/_Employee";
import { Props } from "./types";

const AdministratorsTable = (props: Props) => {
  const { administrators, handleFormLoaded, formLoaded } = props;
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
          Add Administrator
        </Button>
      )}
      <Container maxWidth="xl" className={classes.container}>
        <MUIDataTable
          title={"Administrators List"}
          data={administrators}
          columns={columns}
          options={{ selectableRows: "none" }}
        />
      </Container>
    </main>
  );
};

export default AdministratorsTable;
