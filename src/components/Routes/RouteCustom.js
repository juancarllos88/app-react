import React from 'react';

import {Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from '../../services/auth';

export default function RouteCustom({
  component: Component,
  isPrivate = false,
  ...rest
}) {

  const autenticado = isAuthenticated();
  if(!autenticado && isPrivate){
    return <Redirect to="/"/>;
  }
  return <Route {...rest} component={Component}/>;
}