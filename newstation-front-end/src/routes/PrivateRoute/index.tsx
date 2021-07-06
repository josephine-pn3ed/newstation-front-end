import { Route, Redirect } from "react-router-dom";
import { Props } from "./types";
import { getUser, isLogin } from "../../utils";

const PrivateRoute = (props: Props) => {
  const { children, ...rest } = props;
  const { path } = rest;

  const routeComponent = () => {
    if (isLogin()) {
      if (
        (getUser() === "administrator" && path === "/administrator") ||
        (getUser() === "employee" &&
          (path === "/employee" || path === "/administrator"))
      ) {
        return (
          <div style={{ textAlign: "center", color: 'red' }}>
            <h1 style={{ fontSize: "100px" }}>401</h1>
            <h1>Unauthorized</h1>
          </div>
        );
      }
      return children;
    } else {
      return <Redirect to={{ pathname: "/login" }} />;
    }
  };

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
