import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
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
