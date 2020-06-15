import React from 'react';

import { AuthProvider } from './Auth';
import { TransactionsProvider } from './Transactions';
import { ModalProvider } from './Modal';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <TransactionsProvider>
      <ModalProvider>{children}</ModalProvider>
    </TransactionsProvider>
  </AuthProvider>
);

export default AppProvider;
