import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading } as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
};