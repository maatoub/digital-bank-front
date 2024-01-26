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
import { debitOperation } from "../api/api-operation";
import { OpDebitInterface } from "../utils/OperationApiInterface";

const Operations = () => {
  const [search, setSearch] = React.useState("");
  const [account, setAccount] = React.useState(null);
  const [checked, setChecked] = React.useState("");
  const handleSearchAccount = (e) => {
    e.preventDefault();
    getAccount(search)
      .then((res) => setAccount(res.data))
      .catch((err) => setAccount(null));
  };

  React.useEffect(() => {
    setSearch("");
  }, [account]);

  console.log(account);

  switch (checked) {
    case "debit":
      const data = OpDebitInterface()
      debitOperation().then().catch();
      break;
    case "credit":
      console.log("credit");
      break;
    case "transfer":
      console.log("transfer");
      break;
    default:
      break;
  }
  return (
    <div>
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
          <div className="max-w-lg bg-gray-100 shadow-md rounded-md overflow-hidden">
            <h2 className="text-xl font-bold mb-2 lg:p-2"> + Compte details</h2>
            <Divider variant="middle" />
            <div className="p-6 flex justify-between">
              <div>
                <Avatar
                  src="/broken-image.jpg"
                  sx={{ width: 80, height: 80 }}
                />
                <div className="lg:mt-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {account.customerDto.name}
                  </h2>
                  <p className="text-gray-600 mb-2">RIB : {account.id}</p>
                  <p className="text-gray-600 mb-2">
                    Date : {account.createdAt}
                  </p>
                  <p className="text-gray-600 mb-2">Type : {account.type}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  Balance : {account.balance}
                </p>
                <p className="text-gray-600 mb-2">Status : {account.status}</p>
              </div>
            </div>
          </div>

          <div className="lg:p-6">
            <form>
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
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />

                {checked == "transfer" ? (
                  <TextField
                    fullWidth
                    label="rib"
                    id="rib"
                    sx={{
                      mt: 2,
                      "& .MuiInputBase-root.Mui-focused": {
                        borderColor: "black",
                      },
                    }}
                  />
                ) : null}
                <TextField fullWidth label="motif" id="motif" sx={{ mt: 2 }} />
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "darkslategray" },
                  }}
                >
                  Contained
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
