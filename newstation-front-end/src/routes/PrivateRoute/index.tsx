import { Route, Redirect } from "react-router-dom";
import { Props } from "./types";
import { getUser, isLogin } from "../../utils";

const PrivateRoute = (props: Props) => {
  const { children, ...rest } = props;
  const { path } = rest;

  const routeComponent = () => {
    if (isLogin()) {
      if (getUser() !== "company") {
        if (path === "/employees" || path === "/administrators")  {
          return <Redirect to={{ pathname: "/dashboard" }} />;
        }
      } 
      return children;
    } else {
      return <Redirect to={{ pathname: "/login" }} />;
    }
  };

  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
