import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import formStyles from '../styles/Form.module.scss';  // Assuming you have form styles here

type FormData = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        router.push('/search');  // Redirect to search page after login
      }
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={formStyles.formContainer}>
      <h1>Login</h1>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          {...register('username', { required: true })}
          placeholder="Username"
          required
          className={formStyles.formItem}
        />
        <label htmlFor="password">Password</label>
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Password"
          required
          className={formStyles.formItem}
        />
        {error && <p className={formStyles.error}>{error}</p>}  {/* Display error if login fails */}
        <button type="submit" className={formStyles.formItem}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
