import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.76.3:8080/accounts",
});

export const getAllAccounts = () => {
  return api.get("/");
};

export const getAccount = (id) => {
  return api.get(`/${id}`);
};

export const saveSavingAccount = (account) => {
  return api.post("/sa", account);
};

export const saveCurrentAccount = (account) => {
  return api.post("/ca", account);
};
