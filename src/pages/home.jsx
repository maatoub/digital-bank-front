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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { deleteCustomer, getAllCustomers } from "../api/api-customer";
import FormNewCustomer from "../components/FormNewCustomer";
import ConfirmationModal from "../components/ConfirmationModal";
import Pagination from "@mui/material/Pagination";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [customerToDelete, setCustomerToDelete] = React.useState(null);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const headTitles = [
    { id: "1", title: "Name" },
    { id: "2", title: "Email" },
    { id: "3", title: "Deleted" },
    { id: "4", title: "Update" },
  ];
  /********    pagination    **** */

  const customerPerPage = 4;
  const totalPages = Math.ceil(data.length / customerPerPage);
  const indexOfLastCustomer = currentPage * customerPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customerPerPage;
  const currentCustomer = data.slice(indexOfFirstCustomer, indexOfLastCustomer);

  /********        **** */

  React.useEffect(() => {
    handleAllCustomers();
  }, []);

  const handleAllCustomers = () => {
    getAllCustomers()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteCustomer = (id) => {
    setCustomerToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete)
        .then(() => {
          handleAllCustomers();
        })
        .catch((err) => console.log(err));
    }
    setModalOpen(false);
    setCustomerToDelete(null);
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setCustomerToDelete(null);
  };

  const handleUpdateCustomer = (id) => {
    const customerUpdate = data.find((cus) => cus.customerDTO.id === id);
    setSelectedCustomer(customerUpdate);
  };

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
  };

  return (
    <div className="lg:mx-14 lg:grid lg:grid-cols-2 lg:gap-8 items-center h-screen">
      <div>
        <TableContainer
          component={Paper}
          sx={{ bgcolor: "black", maxHeight: "400px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ color: "white" }}>
                <TableCell />
                <TableCell sx={{ color: "white" }}>Id</TableCell>
                {headTitles.map((item) => (
                  <TableCell
                    key={item.id}
                    align="right"
                    sx={{ color: "white" }}
                  >
                    {item.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCustomer.map((row) => (
                <React.Fragment key={row.customerDTO.id}>
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
                        onClick={() => handleRowClick(row.customerDTO.id)}
                      >
                        {expandedRow === row.customerDTO.id ? (
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
                      {row.customerDTO.id}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {row.customerDTO.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {row.customerDTO.email}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteCustomer(row.customerDTO.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        color="success"
                        size="small"
                        onClick={() => handleUpdateCustomer(row.customerDTO.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {/* ***************** Row details  ************* */}
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={expandedRow === row.customerDTO.id}
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
                                <TableCell sx={{ color: "white" }}>
                                  Date
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ color: "white" }}
                                >
                                  RIB
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ color: "white" }}
                                >
                                  Status{" "}
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ color: "white" }}
                                >
                                  Type
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.accountsDto.map((account) => (
                                <TableRow key={account.id}>
                                  <TableCell sx={{ color: "white" }}>
                                    {account.createdAt}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{ color: "white" }}
                                  >
                                    {account.id}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{ color: "white" }}
                                  >
                                    {account.status}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    sx={{ color: "white" }}
                                  >
                                    {account.type}
                                  </TableCell>
                                  *
                                </TableRow>
                              ))}
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
        <Pagination
          className="p-4 flex items-center justify-center"
          count={totalPages}
          variant="outlined"
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
      <div className="mx-auto lg:col-span-1 lg:col-start-2">
        <FormNewCustomer
          onSubmitCustomer={handleAllCustomers}
          selectedCustomer={selectedCustomer}
          clearSelectedCustomer={clearSelectedCustomer}
        />
      </div> 
      <ConfirmationModal
        open={modalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
