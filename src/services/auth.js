import { api } from "./service";
import jwt from 'jwt-decode'

export const login = (username, password) => {
  const data = {
    login: username,
    senha: password
  };
  return api.post("/tokens", data);
};

export const setToken = token => {
  console.tron.log('dadosUsuario',jwt(token));
  const {roles} = jwt(token);
  localStorage.setItem("roles", JSON.stringify(roles));
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () =>{
  return localStorage.getItem("token");
}

export const hiddenByPermission = (permission) =>{
  const roles = JSON.parse(localStorage.getItem("roles"));
  return !roles.some(role => role === permission);
}
