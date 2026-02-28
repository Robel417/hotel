import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "guest" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const CartContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, _password: string) => {
    if (email === "admin@robelhotel.com") {
      setUser({ id: "U001", name: "Admin User", email, role: "admin" });
    } else {
      setUser({ id: "U999", name: email.split("@")[0], email, role: "guest" });
    }
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    setUser({ id: "U" + Date.now(), name, email, role: "guest" });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <CartContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </CartContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
