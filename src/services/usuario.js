import { api } from "./service";

const salvar = data => {
  return api.post("/usuarios", data);
};

const atualizar = (data, id) => {
  return api.put(`/usuarios/${id}`, data);
};

const pesquisar = (page,size) =>{
  return api.get('/usuarios',{
    params:{
      page,
      size
    }
  });
}

const pesquisarComParametros = (page,size,login) =>{
  return api.get('/usuarios',{
    params:{
      login,
      page,
      size
    }
  });
}


const getUsuario = id =>{
  return api.get(`/usuarios/${id}`);
}


export default {
  salvar,
  pesquisar,
  getUsuario,
  pesquisarComParametros,
  atualizar
};
