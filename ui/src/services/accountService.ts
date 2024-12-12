const API_BASE_URL = "http://localhost:3000";

export const depositByAccountNumber = async (
  accountNumber: number,
  amount: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/transactions/${accountNumber}/deposit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }
  );
  return response.json();
};

export const withdrawByAccountNumber = async (
  accountNumber: number,
  amount: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/transactions/${accountNumber}/withdraw`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    }
  );
  return response.json();
};

export const getAllTransactionsByAccountNumber = async (
  accountNumber: number
) => {
  const response = await fetch(
    `${API_BASE_URL}/transactions/${accountNumber}/transactions`
  );
  return response.json();
};

export const getAccount = async (accountNumber: number) => {
  const response = await fetch(`${API_BASE_URL}/accounts/${accountNumber}`);

  return response.json();
};
