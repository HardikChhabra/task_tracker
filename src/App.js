import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { storageHelpers } from "./utils/storageHelpers";

/**
 * Root application component.
 *
 * Reads persisted auth state on mount and switches between the login page
 * and dashboard based on presence of an auth token.
 *
 * @returns {JSX.Element}
 */
function App() {
  // local state for authentication token and user display name
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Load token and user from storage on mount so session persists across reloads
    const savedToken = storageHelpers.getToken();
    const savedUser = storageHelpers.getUserName();

    // if both token and user exist, restore them into component state
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUserName(savedUser);
    }
  }, []);

  /**
   * Handle successful login by storing auth data in state and persisting it.
   *
   * @param {string} authToken - authentication token returned by the API
   * @param {string} user - user display name or object to persist
   * @returns {void}
   */
  const handleLogin = (authToken, user) => {
    // update React state for immediate UI changes
    setToken(authToken);
    setUserName(user);
    // persist token and user so session remains after refresh
    storageHelpers.saveToken(authToken);
    storageHelpers.saveUserName(user);
  };

  /**
   * Handle logout by clearing persisted data and resetting local state.
   *
   * @returns {void}
   */
  const handleLogout = () => {
    try {
      // clear all app data from storage (token, user, etc.)
      storageHelpers.clearStorage();
    } catch (err) {
      // log but continue to reset UI state to ensure user is logged out locally
      console.error("Logout failed:", err);
    } finally {
      // reset in-memory auth state so app shows the login page
      setToken(null);
      setUserName(null);
    }
  };

  // when there's no token, show the login page and forward the login handler
  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // when authenticated, show the dashboard and forward the logout handler
  return <Dashboard onLogout={handleLogout} />;
}

export default App;
