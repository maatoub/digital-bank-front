import React from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deleteCustomer, getAllCustomers } from "../api/api";
import FormNewCustomer from "../components/FormNewCustomer";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [modalOpen, setModelOpen] = React.useState(false);

  React.useEffect(() => {
    handleAllCustomers();
  }, [data]);

  const handleAllCustomers = () => {
    getAllCustomers()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  const handleDeleteCustomer = (id) => {
    deleteCustomer(id)
      .then(() => {
        handleAllCustomers();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateCustomer = (customer) => {
    console.log("updated");
  };
  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div className="mx-auto lg:grid lg:grid-cols-2 lg:gap-8 items-center p-12 ">
      <div className="items-center ">
        <TableContainer component={Paper} sx={{ bgcolor: "black" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ color: "white" }}>
                <TableCell />
                <TableCell sx={{ color: "white" }}>Id</TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  name
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Email
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Delete
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  Update
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        color: "white",
                      },
                    }}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowClick(row.id)}
                      >
                        {expandedRow === row.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white" }}
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {row.email}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/delete/${row.id}`}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteCustomer(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/update/${row.id}`}>
                        <IconButton
                          aria-label="edit"
                          color="success"
                          size="small"
                          onClick={() => handleUpdateCustomer(customer)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                  {/* ***************** Row details  ************* */}
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={expandedRow === row.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Details
                          </Typography>
                          <Table size="small" aria-label="more details table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">RIB</TableCell>
                                <TableCell align="right">Type </TableCell>
                                <TableCell align="right">Amount</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Data 1</TableCell>
                                <TableCell align="right">Data 2</TableCell>
                                <TableCell align="right">Data 3</TableCell>
                                <TableCell align="right">Data 4</TableCell>*
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="mx-auto lg:col-span-1 lg:col-start-2 mt-32">
        <FormNewCustomer />
      </div>
    </div>
  );
}
