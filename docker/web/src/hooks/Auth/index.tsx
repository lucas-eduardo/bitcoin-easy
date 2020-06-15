import React, { createContext, useCallback, useState, useContext } from 'react';
import decode from 'jwt-decode';

import api from '../../services/Api';

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@BitcoinEasy:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', { email, password });
    const { token } = response.data;
    const { id } = decode(token);
    localStorage.setItem('@BitcoinEasy:token', token);
    localStorage.setItem('@BitcoinEasy:id', JSON.stringify(id));
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@BitcoinEasy:token');
    localStorage.removeItem('@BitcoinEasy:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

function clearAuth() {
  localStorage.removeItem('@BitcoinEasy:token');
  localStorage.removeItem('@BitcoinEasy:user');
}

export { AuthProvider, useAuth, clearAuth };
