import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const LOCAL_STORAGE_GO_BARBER_TOKEN = '@GoBarber:token';
const LOCAL_STORAGE_GO_BARBER_USER = '@GoBarber:user';

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_GO_BARBER_TOKEN);
    const user = localStorage.getItem(LOCAL_STORAGE_GO_BARBER_USER);

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem(LOCAL_STORAGE_GO_BARBER_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_GO_BARBER_USER, JSON.stringify(user));

    setData({ token, user });

    api.defaults.headers.authorization = `Bearer ${token}`;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_GO_BARBER_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_GO_BARBER_USER);

    api.defaults.headers.authorization = null;

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem(LOCAL_STORAGE_GO_BARBER_USER, JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
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

export { AuthProvider, useAuth };
