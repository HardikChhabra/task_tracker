import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { validationHelpers } from "../utils/validationHelpers";
import { apiHelpers } from "../utils/apiHelpers";
import { API_ENDPOINTS } from "../utils/constants";

export const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (!validationHelpers.validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validationHelpers.validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!isLogin && !validationHelpers.validateRequired(name)) {
      setError("Name is required");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin
        ? API_ENDPOINTS.AUTH.LOGIN
        : API_ENDPOINTS.AUTH.SIGNUP;
      const data = isLogin ? { email, password } : { name, email, password };
      console.log("Submitting to endpoint:", endpoint, "with data:", data);
      const result = await apiHelpers.post(endpoint, data);

      onLogin(result.token, result.userName);
    } catch (err) {
      console.error("Auth error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md card rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        {error && (
          <div className="bg-tertiary border-secondary text-tertiary px-4 py-3 rounded mb-4 flex items-center gap-2">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block label text-sm mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full input-field rounded px-4 py-2.5"
                required
              />
            </div>
          )}

          <div>
            <label className="block label text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-field rounded px-4 py-2.5"
              required
            />
          </div>

          <div>
            <label className="block label text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full input-field rounded px-4 py-2.5"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full btn-primary font-semibold py-2.5 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-tertiary hover:text-secondary text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
