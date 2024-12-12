import { useState } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import { SignIn } from "./components/SignIn";
import { AccountDashboard } from "./components/AccountDashboard";
import { Account } from "./types/Account";
import { getAccount } from "./services/accountService";

export const App = () => {
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [account, setAccount] = useState<Account | undefined>(undefined);

  const signIn = async (accountNumber: number) => {
    const data = await getAccount(accountNumber);

    if (data.error) {
      alert(data.error);
      setAccountNumberError(true);
      setAccount(undefined);
      return;
    }

    setAccountNumberError(false);
    setAccount({
      accountNumber: data.account_number,
      name: data.name,
      amount: data.amount,
      type: data.type,
      creditLimit: data.credit_limit,
    });
  };
  const signOut = async () => {
    setAccount(undefined);
  };

  const Page = () => {
    if (account) {
      return <AccountDashboard account={account} signOut={signOut} />;
    } else {
      return <SignIn signIn={signIn} accountNumberError={accountNumberError} />;
    }
  };

  return (
    <div className="app">
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Page />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};
