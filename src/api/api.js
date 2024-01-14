import axios from "axios";

export const api = axios.create({
  baseUrl: "http://localhost:8080",
});

export const getAllCustomers = () => {
    return api.get("/")
};
