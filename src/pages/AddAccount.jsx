import React from "react";
import { saveCurrentAccount, saveSavingAccount } from "../api/api-accounts";
import { getListOfCustomers } from "../api/api-customer";
import { Toaster, toast } from "sonner";
import {
  createNewCurrentAccount,
  createNewSavingAccount,
} from "../utils/AccountApiInterface";
import Alert from "@mui/material/Alert";

export const AddAccount = () => {
  const [savingAccChecked, setSavingAccChecked] = React.useState(true);
  const [currentAccChecked, setCurrentAccChecked] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [overDraft, setOverDraft] = React.useState("");
  const [interestRate, setInterestRate] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const headTableAccounts = [
    { id: "1", title: "RIB" },
    { id: "2", title: "Type" },
    { id: "3", title: "Created At" },
    { id: "4", title: "Balance" },
    { id: "5", title: "interest Rate" },
    { id: "6", title: "OverDraft" },
    { id: "7", title: "Customer" },
    { id: "8", title: "Status" },
  ];
  React.useEffect(() => {
    getListOfCustomers()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  // const handleSaveAccount = (e) => {
  //   e.preventDefault();
  //   if (savingAccChecked) {
  //     const newSavingAccount = createNewSavingAccount(
  //       balance,
  //       interestRate,
  //       selectedStatus,
  //       selectedCustomer
  //     );
  //     saveSavingAccount(newSavingAccount)
  //       .then()
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error(err.message);
  //       });
  //     initializeInputs();
  //   } else {
  //     const newCurrentAccount = createNewCurrentAccount(
  //       balance,
  //       overDraft,
  //       selectedStatus,
  //       selectedCustomer
  //     );
  //     saveCurrentAccount(newCurrentAccount)
  //       .then()
  //       .catch((err) => console.log(err));
  //     initializeInputs();
  //   }
  // };

  const handleSaveAccount = async (e) => {
    e.preventDefault();

    try {
      let newAccount;
      if (savingAccChecked) {
        newAccount = createNewSavingAccount(
          balance,
          interestRate,
          selectedStatus,
          selectedCustomer
        );
        await saveSavingAccount(newAccount);
      } else {
        newAccount = createNewCurrentAccount(
          balance,
          overDraft,
          selectedStatus,
          selectedCustomer
        );
        await saveCurrentAccount(newAccount);
      }
    } catch {
      toast.error(err.message);
    }
    setAlert(true);
    initializeInputs();
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };
  const initializeInputs = () => {
    setBalance("");
    setInterestRate("");
    setSelectedStatus("");
    setSelectedCustomer("");
    setOverDraft("");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-right" />

      <div className=" w-1/2  rounded-2xl bg-black">
        {alert && (<Alert className="p-2">Account Added with success</Alert>)}
        <form method="post" onSubmit={handleSaveAccount}>
          <div className="flex flex-col gap-2 p-8">
            <p className="text-center text-3xl text-gray-300 mb-4">
              Add Account
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  onChange={() => {
                    setCurrentAccChecked(true);
                    setSavingAccChecked(false);
                  }}
                  checked={currentAccChecked}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Current Account
                </label>
              </div>
              <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  id="bordered-radio-2"
                  type="radio"
                  onChange={() => {
                    setSavingAccChecked(true);
                    setCurrentAccChecked(false);
                  }}
                  checked={savingAccChecked}
                  name="bordered-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Saving Account
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <select
                  id="customers-select"
                  className="bg-slate-900 lg:mt-4  w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Choose customer</option>
                  {customers.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  id="status-select"
                  className="bg-slate-900 lg:mt-4  w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Choose a status account</option>
                  <option value="CREATED">CREATED</option>
                  <option value="UPDATED">ACTIVATED</option>
                  <option value="REMOVED">REMOVED</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <input
                className="bg-slate-900 lg:mt-4  w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                placeholder="Balance"
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                required
              />
              {savingAccChecked ? (
                <input
                  className="bg-slate-900 lg:mt-4  w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                  placeholder="Interest Rate"
                  type="text"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  required
                />
              ) : (
                <input
                  className="bg-slate-900 lg:mt-4  w-full text-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                  placeholder="Over draft"
                  type="text"
                  value={overDraft}
                  onChange={(e) => setOverDraft(e.target.value)}
                  required
                />
              )}
            </div>

            <button
              className="inline-block lg:mt-4 cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
