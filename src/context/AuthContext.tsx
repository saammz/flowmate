import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useGetCurrentUserQuery } from '../store/api/authApi';

interface UserData {
  _id: string;
  firebaseUid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
}

const defaultContextValue: AuthContextType = {
  currentUser: null,
  userData: null,
  loading: true
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const { 
    data: userData, 
    isLoading: userDataLoading,
    refetch 
  } = useGetCurrentUserQuery(undefined, {
    skip: !currentUser,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        refetch();
      }
      setAuthLoading(false);
    });

    return unsubscribe;
  }, [refetch]);

  const value: AuthContextType = {
    currentUser,
    userData: userData || null,
    loading: authLoading || (currentUser ? userDataLoading : false)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};