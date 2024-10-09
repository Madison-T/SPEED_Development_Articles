import { useState } from 'react';
import axios from 'axios';
import formStyles from '../styles/Form.module.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { username, password });
      // Handle successful registration (redirect to login page or show message)
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
