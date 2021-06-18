import MUIDataTable from "mui-datatables";
import { Container, Button } from "@material-ui/core";
import useStyles from '../../styles/_Employee';
import { Props } from './types';

const EmployeeTable = (props: Props) => {
  const { employees } = props;
  const columns = ["Employee ID", "Name", "Email Address", "Password", "Contact Number", "Position", "Status", ""];
  const classes = useStyles();

  // const showSwal = () => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }
  
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

export default EmployeeTable;