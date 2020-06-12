import { Constante } from "./../util/constante";

const tratarExcecao = data => {
  let retorno;
  switch (data.status) {
    case Constante.UNAUTHORIZED:
      retorno = data.data.message;
      break;

    case Constante.BAD_REQUEST:
      if (data.data.errors) {
        retorno = data.data.errors[0];
      } else {
        retorno = Constante.BAD_REQUEST_MSG;
      }
      break;

    default:
      retorno = Constante.ERRO;
      break;
  }
  return retorno;
};

export default {
  tratarExcecao
};
