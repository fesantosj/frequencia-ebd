import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAutenticated = useAppSelector((state) => state.authentication.isAutenticated);

  if (!isAutenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
