import React, { useState } from "react";
import { saveCustomer } from "../api/api";

const FormNewCustomer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    const customer = { name, email };
    saveCustomer(customer)
      .then(() => {
        setEmail("");
        setName("");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="w-96 rounded-2xl bg-black">
      <form method="post" onSubmit={handleSaveCustomer}>
        {" "}
        <div className="flex flex-col gap-2 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">
            Add Customer
          </p>
          <input
            className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            className="bg-slate-900 w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <button
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNewCustomer;
