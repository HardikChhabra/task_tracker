import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { storageHelpers } from './utils/storageHelpers';
import { apiHelpers } from './utils/apiHelpers';
import { API_ENDPOINTS } from './utils/constants';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load token and user from storage on mount
    const savedToken = storageHelpers.getToken();
    const savedUser = storageHelpers.getUser();
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    storageHelpers.saveToken(authToken);
    storageHelpers.saveUser(userData);
  };

  const handleLogout = async () => {
    try {
      await apiHelpers.post(API_ENDPOINTS.AUTH.LOGOUT, {}, token);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setToken(null);
      setUser(null);
      storageHelpers.clearAll();
    }
  };

  if (!token || !user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard user={user} token={token} onLogout={handleLogout} />;
}

export default App;