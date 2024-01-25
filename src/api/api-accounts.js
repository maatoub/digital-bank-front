import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/accounts",
});

export const getAllAccounts = () => {
  return api.get("/");
};

export const saveSavingAccount = (account) => {
  return api.post("/sa", account);
};

export const saveCurrentAccount = (account) => {
  return api.post("/ca", account);
};
