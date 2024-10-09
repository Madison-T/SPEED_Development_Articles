import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Define a user type
type User = {
  username: string;
  email: string;
  accessToken: string;
};

// Define AuthContext types
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create a context with the default value as null
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider for the auth context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to handle user login
  const login = async (username: string, password: string) => {
    try {
      // Make a request to the backend to validate user credentials
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        username,
        password,
      });

      // Assuming the backend returns the user info and an access token
      const { access_token } = response.data;

      // Simulate fetching user details (this can come from the backend as well)
      const userData: User = {
        username,
        email: `${username}@example.com`, // Placeholder email, adjust as needed
        accessToken: access_token,
      };

      // Set the user state with the fetched user data
      setUser(userData);

      // Store the access token in localStorage for later use
      localStorage.setItem("accessToken", access_token);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid username or password");
    }
  };

  // Function to handle user logout
  const logout = () => {
    // Clear the user state
    setUser(null);

    // Remove the access token from localStorage
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
