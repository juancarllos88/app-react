import React from "react";
import "./App.scss";
//import Rotas from './routes'

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RouteCustom from './components/Routes/RouteCustom';
import './config/ReactotronConfig';

const Login = React.lazy( () =>  import('./pages/login/Login'));
const Registrar = React.lazy( () =>  import('./pages/register/Register'));
const DefaultLayout = React.lazy( () => import('./containers/DefaultLayout'))
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path="/" component={Login}/>
          <Route path="/register" component={Registrar}/>
          <RouteCustom path="/dashboard" component={DefaultLayout} isPrivate={true}/>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
