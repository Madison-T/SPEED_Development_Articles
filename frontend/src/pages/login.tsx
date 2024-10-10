import { useAuth } from '../context/authContext';
import LoginForm from '../components/LoginForm';  // Correctly import the LoginForm component

const Login = () => {
  const { login } = useAuth();  // Use the login function from context

  const handleSubmit = async (username: string, password: string) => {
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
      <LoginForm onSubmit={handleSubmit} /> {/* Use the new LoginForm component */}
    </div>
  );
};

export default Login;

