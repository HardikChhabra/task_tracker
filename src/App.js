import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { storageHelpers } from "./utils/storageHelpers";

function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Load token and user from storage on mount
    const savedToken = storageHelpers.getToken();
    const savedUser = storageHelpers.getUserName();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUserName(savedUser);
    }
  }, []);

  const handleLogin = (authToken, user) => {
    setToken(authToken);
    setUserName(user);
    storageHelpers.saveToken(authToken);
    storageHelpers.saveUserName(user);
  };

  const handleLogout = () => {
    try {
      storageHelpers.clearStorage();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setToken(null);
      setUserName(null);
    }
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}

export default App;
