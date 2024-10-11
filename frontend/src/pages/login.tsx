// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authContext"; // Import the Auth context
import formStyles from "../styles/Form.module.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User"); // Default user type
  const { login } = useAuth(); // Get the login function from context
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Username and password cannot be blank!");
      return;
    }

    // Handle login state
    login(); // Set the user as logged in

    // Redirect based on userType
    switch (userType) {
      case "User":
        router.push("/user-dashboard");
        break;
      case "Moderator":
        router.push("/moderator-dashboard");
        break;
      case "Analyst":
        router.push("/analyst-dashboard");
        break;
      case "Admin":
        router.push("/admin-dashboard");
        break;
      default:
        break;
    }
  };

  return (
    <div className={formStyles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={formStyles.form}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={formStyles.formItem}
          placeholder="Enter username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={formStyles.formItem}
          placeholder="Enter password"
        />

        <label htmlFor="userType">Login as:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className={formStyles.formItem}
        >
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
          <option value="Analyst">Analyst</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" className={formStyles.formItem}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
