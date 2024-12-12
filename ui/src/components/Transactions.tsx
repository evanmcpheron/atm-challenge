import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Transaction, TransactionType } from "../types/Transaction";
import { Fragment } from "react/jsx-runtime";

type TransactionsProps = {
  transactions: Transaction[];
};

export const Transactions = (props: TransactionsProps) => {
  return props.transactions.length === 0 ? (
    <Fragment />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Amount (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions.map((transaction) => {
            const date = new Date(transaction.date);

            // Format date to the user's current timezone
            const formattedDate = date.toLocaleDateString();

            return (
              <TableRow key={transaction.id}>
                <TableCell align="center">{formattedDate}</TableCell>
                <TableCell align="center">{transaction.type}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color:
                      transaction.type === TransactionType.WITHDRAWAL
                        ? "red"
                        : "green",
                  }}
                >
                  ${Math.abs(transaction.amount).toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
