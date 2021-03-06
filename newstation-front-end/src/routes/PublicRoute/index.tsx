import { Route, Redirect } from "react-router-dom";
import { Props } from "./types";
import { isLogin } from "../../utils";

const PublicRoute = (props: Props) => {
  const { children, ...rest } = props;

  const routeComponent = () => {
    if (!isLogin()) {
      return children;
    } else {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
  };

  return <Route {...rest} render={routeComponent} />;
};

export default PublicRoute;
