import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getAccount } from "../api/api-accounts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {
  creditOperation,
  debitOperation,
  transferOperation,
} from "../api/api-operation";
import {
  OpDebitCreditInterface,
  OpTransferInterface,
} from "../utils/OperationApiInterface";
import { Toaster, toast } from "sonner";

const Operations = () => {
  const [search, setSearch] = React.useState("");
  const [account, setAccount] = React.useState(null);
  const [checked, setChecked] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [champs, setChamps] = React.useState({
    balance: "",
    ribDst: "",
    motif: "",
  });

  React.useEffect(() => {
    setSearch("");
  }, [account]);

  const handleSearchAccount = (e) => {
    e.preventDefault();
    getAccount(search)
      .then((res) => {
        setAccount(res.data);
      })
      .catch(() => {
        setAccount(null);
        toast.info("Account not found.");
      });
  };

  const handleChangeChamps = (e) => {
    setChamps({
      ...champs,
      [e.target.id]: e.target.value,
    });
  };
  const handleSaveOperation = async (e) => {
    e.preventDefault();

    try {
      let operationData;
      switch (checked) {
        case "debit":
          operationData = OpDebitCreditInterface(
            account.id,
            champs.balance,
            champs.motif
          );
          await debitOperation(operationData);
          break;
        case "credit":
          operationData = OpDebitCreditInterface(
            account.id,
            champs.balance,
            champs.motif
          );
          await creditOperation(operationData);
          break;
        case "transfer":
          operationData = OpTransferInterface(
            account.id,
            champs.ribDst,
            champs.balance,
            champs.motif
          );
          await transferOperation(operationData);
          break;
        default:
          toast.info("Choose type of operation");
          return;
      }

      setAlert(true);
      await updateAccountInfo();
      setChamps({
        balance: "",
        ribDst: "",
        motif: "",
      });

      setTimeout(() => {
        setAlert(false);
      }, 4000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateAccountInfo = () => {
    getAccount(account.id)
      .then((res) => {
        setAccount(res.data);
      })
      .catch(() => {
        setAccount(null);
        toast.info("Account not found.");
      });
  };
  return (
    <div>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSearchAccount}
        className="grid justify-center items-center lg:mt-8"
      >
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Search"
            value={search}
            id="fullWidth"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </form>
      {account && (
        <div className="grid lg:grid-cols-2 lg:mt-8 p-4">
          <div className="max-w-lg bg-black text-white shadow-md rounded-md overflow-hidden">
            <h2 className="text-xl font-bold mb-2 lg:p-2"> + Compte details</h2>
            <Divider variant="middle" color="white" />
            <div className="p-6 flex justify-between ">
              <div>
                <Avatar
                  src="/broken-image.jpg"
                  sx={{ width: 80, height: 80 }}
                />
                <div className="lg:mt-6 font-semibold ">
                  <h2 className="text-2xl text-blue-500 font-bold mb-2">
                    {account.customerDto.name}
                  </h2>
                  <Divider variant="fullWidth" color="white" />
                  <div className="mt-2">
                    <label className="text-blue-500 mb-2">RIB : </label>
                    <span className="text-white mb-2">{account.id}</span>
                  </div>
                  <div className="mt-2">
                    <label className="text-blue-500 mb-2">CREATED AT : </label>
                    <span className="text-white mb-2">{account.createdAt}</span>
                  </div>
                  <div className="mt-2">
                    <label className="text-blue-500 mb-2">STATUS : </label>
                    <span className="text-white mb-2">{account.status}</span>
                  </div>
                </div>
              </div>
              <div className="font-bold">
                <p className="text-blue-500 mb-2">{account.balance} DH</p>
                <p className="text-gray-400 mb-2">{account.type}</p>
              </div>
            </div>
          </div>

          {/**************** add operation  ************ */}

          <div>
            {alert && (
              <Alert
                className="mb-2 rounded-2xl"
                variant="filled"
                severity="success"
              >
                Operation was successful.
              </Alert>
            )}
            <form
              className="lg:p-6 bg-gray-200 rounded-2xl"
              onSubmit={handleSaveOperation}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                Operation
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e) => setChecked(e.target.value)}
              >
                <FormControlLabel
                  value="debit"
                  control={<Radio />}
                  label="Debit"
                />
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="Credit"
                />
                <FormControlLabel
                  value="transfer"
                  control={<Radio />}
                  label="Transfer"
                />
              </RadioGroup>

              <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="balance"
                  value={champs.balance}
                  onChange={handleChangeChamps}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />

                {checked == "transfer" ? (
                  <TextField
                    fullWidth
                    label="rib"
                    id="ribDst"
                    value={champs.ribDst}
                    onChange={handleChangeChamps}
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: "black",
                      },
                    }}
                  />
                ) : null}
                <TextField
                  fullWidth
                  label="motif"
                  id="motif"
                  value={champs.motif}
                  onChange={handleChangeChamps}
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "primary" },
                  }}
                >
                  Save
                </Button>
              </FormControl>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operations;
