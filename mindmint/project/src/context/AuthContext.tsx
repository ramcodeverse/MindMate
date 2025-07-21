import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sampleUsers, sampleCredentials } from '../data/sampleUsers';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('mindmate_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('mindmate_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Check credentials
    const credentials = sampleCredentials.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (!credentials) {
      return false;
    }

    // Find user data
    const userData = sampleUsers.find(user => user.email === email);
    
    if (!userData) {
      return false;
    }

    // Update last login
    const updatedUser = { ...userData, lastLogin: new Date().toISOString() };
    
    setUser(updatedUser);
    localStorage.setItem('mindmate_user', JSON.stringify(updatedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mindmate_user');
    localStorage.removeItem('mindmate_mood_entries');
    localStorage.removeItem('mindmate_journal_entries');
    localStorage.removeItem('mindmate_habits');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};