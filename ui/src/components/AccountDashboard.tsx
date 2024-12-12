import { Account } from "../types/Account";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Paper,
} from "@mui/material";
import { useAccount } from "../hooks/useAccount";
import { Transactions } from "./Transactions";

type AccountDashboardProps = {
  account: Account;
  signOut: () => Promise<void>;
};

export const AccountDashboard = (props: AccountDashboardProps) => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const { account, transactions, depositFunds, withdrawFunds } = useAccount(
    props.account
  );

  return (
    <Paper className="account-dashboard">
      <div className="dashboard-header">
        <h1>Hello, {account.name}!</h1>
        <Button variant="contained" onClick={props.signOut}>
          Sign Out
        </Button>
      </div>
      <h2>
        Balance: $
        {account.type === "credit"
          ? (account.amount + account.creditLimit).toLocaleString()
          : account.amount.toLocaleString()}
      </h2>

      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Card className="deposit-card">
            <CardContent>
              <h3>Deposit</h3>
              <TextField
                label="Deposit Amount"
                variant="outlined"
                type="number"
                sx={{ display: "flex", margin: "auto" }}
                onChange={(e) => setDepositAmount(+e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ display: "flex", margin: "auto", marginTop: 2 }}
                onClick={() => depositFunds(depositAmount)}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className="withdraw-card">
            <CardContent>
              <h3>Withdraw</h3>
              <TextField
                label="Withdraw Amount"
                variant="outlined"
                type="number"
                sx={{ display: "flex", margin: "auto" }}
                onChange={(e) => setWithdrawAmount(+e.target.value)}
                error={withdrawAmount < 0}
                helperText={withdrawAmount < 0 ? "Amount must be positive" : ""}
              />
              <Button
                variant="contained"
                sx={{ display: "flex", margin: "auto", marginTop: 2 }}
                disabled={withdrawAmount < 0}
                onClick={() => withdrawFunds(withdrawAmount)}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Transactions transactions={transactions} />
        </Grid>
      </Grid>
    </Paper>
  );
};
