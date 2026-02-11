import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: Record<string, { password: string; user: User }> = {
  "admin@test.com": {
    password: "12345678",
    user: {
      id: "admin-001",
      email: "admin@test.com",
      name: "Admin User",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
  },
  "student@test.com": {
    password: "12345678",
    user: {
      id: "student-001",
      email: "student@test.com",
      name: "Alex Student",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
  },
  "teacher@test.com": {
    password: "12345678",
    user: {
      id: "teacher-001",
      email: "teacher@test.com",
      name: "John Teacher",
      role: "teacher",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("lms_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("lms_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const lowerEmail = email.toLowerCase();
    const demoUser = demoUsers[lowerEmail];

    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem("lms_user", JSON.stringify(demoUser.user));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // For demo, just create a new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };

    setUser(newUser);
    localStorage.setItem("lms_user", JSON.stringify(newUser));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
