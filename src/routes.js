// import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';


// const Login = React.lazy( () =>  import('./pages/login/Login'));
// const Registrar = React.lazy( () =>  import('./pages/register/Register'));
// const DashBoard = React.lazy( () => import('./containers/DefaultLayout'))
// const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// export default function Rotas(){
//     return(
//         <BrowserRouter>
//             <React.Suspense fallback={loading()}>
//             <Switch>
//                 <Route path="/" exact component={Login}></Route>
//                 <Route path="/register" component={Registrar}></Route>
//                 <Route path="/dashboard" component={DashBoard}></Route>
//             </Switch>
//             </React.Suspense>
//         </BrowserRouter>
//     );
// };

import React from 'react';

const FormularioUsuario = React.lazy( () => import('./pages/usuario/Formulario'));
const ListagemUsuario = React.lazy(() => import("./pages/usuario/Listagem"));
const SFC = React.lazy(() => import("./pages/frete/finalizacao/SFC"));
const QFC = React.lazy(() => import("./pages/frete/finalizacao/QFC"));

const routes = [
  {
    path: "/dashboard/usuario/form",
    exact: true,
    name: "Usuário",
    component: FormularioUsuario,
    isPrivate: true
  },
  {
    path: "/dashboard/usuario/form/:id",
    exact: true,
    name: "Usuário",
    component: FormularioUsuario,
    isPrivate: true
  },
  {
    path: "/dashboard/usuario/list",
    exact: true,
    name: "Listagem",
    component: ListagemUsuario,
    isPrivate: true
  },
  {
    path: "/dashboard/frete/sfc",
    exact: true,
    name: "SFC",
    component: SFC,
    isPrivate: true
  },
  {
    path: "/dashboard/frete/qfc",
    exact: true,
    name: "QFC",
    component: QFC,
    isPrivate: true
  }
];

export default routes;