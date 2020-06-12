import React from "react";
import {Badge,Button} from 'reactstrap';
import { Link } from "react-router-dom";

// const getUsuarios = (content) => {
//   const retorno = content.map((user) => {
//     return [
//       user.id,
//       user.nome,
//       user.email,
//       user.login,
//       <h5><Badge color="success" >{user.status}</Badge></h5>,
//       <Link to={`/dashboard/usuario/form/${user.id}`}>
//         <Button type="submit" size="md" color="primary">
//           <i className="fa fa-pencil"></i>
//         </Button>
//       </Link>,
//     ];
//   });
//   return {
//     headers: ["Id", "Nome", "Email", "Login", "Status", "Ações"],
//     body: retorno,
//   };
// };


const getUsuarios = (content) => {
  return content.map((user) => {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      login :user.login,
      status: <h4><Badge color="success" >{user.status}</Badge></h4>,
      acao: <Link to={`/dashboard/usuario/form/${user.id}`}>
        <Button type="submit" size="md" color="primary">
          <i className="fa fa-pencil"></i>
        </Button>
      </Link>,
    };
  });
};

export default {
  getUsuarios,
}




