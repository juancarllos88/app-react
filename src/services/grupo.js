import { api } from "./service";

const buscarGrupos = () => {
  return api.get("/grupos");
};

export default {
  buscarGrupos
}
