import { useState } from 'react';
import { useAuth } from '../context/authContext';
import formStyles from '../styles/Form.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();  // Use the login function from context

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Redirect user to search page or dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
