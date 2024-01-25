import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/customers",
});

export const getAllCustomers = () => {
  return api.get(`/accounts`);
};

export const saveCustomer = (customer) => {
  return api.post(`/save`, customer);
};

export const deleteCustomer = (id) => {
  return api.delete(`/delete/${id}`);
};

export const updateCustomer = (customer) => {
  return api.put(`/update/${customer.id}`, customer);
}

