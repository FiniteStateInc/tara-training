"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserContextType {
  email: string | null;
  setEmail: (email: string) => void;
  clearEmail: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "tara_training_user_email";

export function UserProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load email from localStorage on mount
  useEffect(() => {
    // Use a microtask to avoid synchronous setState warnings
    queueMicrotask(() => {
      const storedEmail = localStorage.getItem(STORAGE_KEY);
      if (storedEmail) {
        setEmailState(storedEmail);
      }
      setIsLoading(false);
    });
  }, []);

  const setEmail = (newEmail: string) => {
    localStorage.setItem(STORAGE_KEY, newEmail);
    setEmailState(newEmail);
  };

  const clearEmail = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEmailState(null);
  };

  return (
    <UserContext.Provider value={{ email, setEmail, clearEmail, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
