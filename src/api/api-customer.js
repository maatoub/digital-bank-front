import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.76.3:8080/customers",
});

export const getAllCustomers = () => {
  return api.get(`/accounts`);
};

export const getListOfCustomers = () => {
  return api.get("/");
};

export const saveCustomer = (customer) => {
  return api.post(`/save`, customer);
};

export const deleteCustomer = (id) => {
  return api.delete(`/delete/${id}`);
};

export const updateCustomer = (customer) => {
  return api.put(`/update/${customer.id}`, customer);
};
