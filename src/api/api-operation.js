import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.76.3:8080/operation",
});

export const debitOperation = (op) => {
  return api.post("/debit", op);
};

export const creditOperation = (op) => {
  return api.post("/credit", op);
};

export const transferOperation = (op) => {
  return api.post("/transfer", op);
};
