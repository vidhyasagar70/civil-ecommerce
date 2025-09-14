// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../ui/utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    // Not logged in → redirect to signin
    return <Navigate to="/signIn" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
