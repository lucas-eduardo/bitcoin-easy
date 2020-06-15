import React, { createContext, useContext, useState, useCallback } from 'react';

import { formatMoney } from '../../utils/formatting';
import api from '../../services/Api';

interface TransactionsContextData {
  formattedBalance: string;
  balance: number;
  loadBalance: () => Promise<number>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

const TransactionsProvider: React.FC = ({ children }) => {
  const [formattedBalance, setFormattedBalance] = useState(formatMoney(0));
  const [balance, setBalance] = useState(0);

  const loadBalance = useCallback(async (): Promise<number> => {
    const { data } = await api.get('account/balance');
    setFormattedBalance(formatMoney(data.balance));
    setBalance(data.balance);
    return data.balance;
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ formattedBalance, balance, loadBalance }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      'useTransactions must be used within an TransactionsProvider',
    );
  }

  return context;
}

export { TransactionsProvider, useTransactions };
