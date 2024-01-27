import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { headTableAccounts } from "../constants/Constants";
import { getAllAccounts } from "../api/api-accounts";
import Pagination from "@mui/material/Pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AccountConsultation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allAccounts, setAllAccounts] = useState([]);

  React.useEffect(() => {
    getAllAccounts()
      .then((res) => setAllAccounts(res.data))
      .catch((err) => console.error(err));
  }, []);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  /******** Pagination ******* */
  const accountPerPage = 4;
  const totalPages = Math.ceil(allAccounts.length / accountPerPage);
  const indexOfLastAccount = accountPerPage * currentPage;
  const indexOfFirstAccount = indexOfLastAccount - accountPerPage;
  const accounts = allAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  return (
    <div className="lg:mt-8 p-4">
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 600, height: "auto" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>RIB</StyledTableCell>
              {headTableAccounts.map((item) => (
                <StyledTableCell key={item.id} align="right">
                  {item.title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.customerDto.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                <StyledTableCell align="right">{row.balance}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.interestRate}
                </StyledTableCell>
                <StyledTableCell align="right">{row.overDraft}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className="p-4 flex items-center justify-center"
        variant="outlined"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
