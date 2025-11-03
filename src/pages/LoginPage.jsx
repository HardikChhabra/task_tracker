import AuthForm from "../components/AuthForm";

/**
 * LoginPage
 *
 * Page wrapper that renders the shared AuthForm component and forwards the
 * onLogin callback from the parent to the form.
 *
 * @param {Object} props
 * @param {(token: string, userName: string) => void} props.onLogin - called after successful authentication
 * @returns {JSX.Element}
 */
export const LoginPage = ({ onLogin }) => {
  // Render AuthForm and pass the parent's onLogin handler to it.
  return <AuthForm onLogin={onLogin} />;
};

export default LoginPage;
