import React from 'react'
import {
  Route,
  Redirect,
} from "react-router-dom";
import { Props } from './types';
import { isLogin } from '../../utils';

const PrivateRoute = (props: Props) => {
  const { children, ...rest } = props;
  console.log('dashboard!!!!!!!!!!!!!!!!!!!!!!!11')

  const routeComponent = () => {
    if (isLogin()) {
      return (children)
    } else {
      return (<Redirect to={{ pathname: "/login" }} />)
    }
  }

  return (
    <Route
      {...rest}
      render={routeComponent}
    />
  )

}

export default PrivateRoute;