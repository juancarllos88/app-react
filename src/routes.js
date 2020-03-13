import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const Login = React.lazy( () =>  import('./pages/login/Login'));
const Registrar = React.lazy( () =>  import('./pages/register/Register'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

export default function Rotas(){
    return(
        <BrowserRouter>
            <React.Suspense fallback={loading()}>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" component={Registrar}></Route>
            </Switch>
            </React.Suspense>
        </BrowserRouter>
    );
};