import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getAccount } from "../api/api-accounts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
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

  const handleSaveOperation = (e) => {
    e.preventDefault();

    switch (checked) {
      case "debit":
        const debit = OpDebitCreditInterface(
          account.id,
          champs.balance,
          champs.motif
        );
        debitOperation(debit)
          .then()
          .catch((err) => toast.error(err.message));
        break;
      case "credit":
        const credit = OpDebitCreditInterface(
          account.id,
          champs.balance,
          champs.motif
        );

        creditOperation(credit)
          .then()
          .catch((err) => toast.error(err.message));
        break;
      case "transfer":
        const transfer = OpTransferInterface(
          account.id,
          champs.ribDst,
          champs.balance,
          champs.motif
        );
        transferOperation(transfer)
          .then()
          .catch((err) => toast.error(err.message));
        break;
      default:
        toast.info("choose type of operation");
        break;
    }

    setChamps({
      balance: "",
      ribDst: "",
      motif: "",
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
            <Divider variant="middle" />
            <div className="p-6 flex justify-between ">
              <div>
                <Avatar
                  src="/broken-image.jpg"
                  sx={{ width: 80, height: 80 }}
                />
                <div className="lg:mt-6 font-semibold">
                  <h2 className="text-xl font-semibold mb-2">
                    {account.customerDto.name}
                  </h2>
                  <p className="text-gray-600 mb-2 ">RIB : {account.id} </p>
                  <p className="text-gray-600 mb-2">
                    CREATED AT : {account.createdAt}
                  </p>
                  <p className="text-gray-600 mb-2">
                    STATUS : {account.status}
                  </p>
                </div>
              </div>
              <div className="font-semibold">
                <p className="text-gray-600 mb-2">{account.balance} DH</p>
                <p className="text-gray-600 mb-2">{account.type}</p>
              </div>
            </div>
          </div>
          {/**************** add operation  ****** */}
          <div className="lg:p-6 bg-gray-200 rounded-2xl">
            <form onSubmit={handleSaveOperation}>
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
                    "&:hover": { backgroundColor: "darkslategray" },
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
