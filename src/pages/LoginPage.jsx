import AuthForm from '../components/AuthForm';

export const LoginPage = ({ onLogin }) => {
  return <AuthForm onLogin={onLogin} />;
};

export default LoginPage;