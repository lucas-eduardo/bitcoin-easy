import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
      <ToastContainer />
    </Router>
  );
};

export default App;
