// Keys for localStorage
const TOKEN_KEY = "auth_token";
const EMAIL_KEY = "auth_email";
const ROLE_KEY = "auth_role";

interface AuthData {
  token: string;
  email: string;
  role: string;
}

// Save each value separately
export const saveAuth = (data: AuthData) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(EMAIL_KEY, data.email);
  localStorage.setItem(ROLE_KEY, data.role || "user"); // default user
};

// Get all values back as object
export const getAuth = (): AuthData | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const email = localStorage.getItem(EMAIL_KEY);
  const role = localStorage.getItem(ROLE_KEY) || "user"; // backend default

  if (token && email) {
    return { token, email, role };
  }
  return null;
};

// Clear all auth values
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(ROLE_KEY);
};

// Check if logged in
export const isAuthenticated = (): boolean => !!localStorage.getItem(TOKEN_KEY);
