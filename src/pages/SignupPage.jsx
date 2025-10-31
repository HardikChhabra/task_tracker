import AuthForm from '../components/AuthForm';

export const SignupPage = ({ onLogin }) => {
  return <AuthForm onLogin={onLogin} />;
};

export default SignupPage;