import { Navigate, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../services/rtk-query/authApi";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { data: user, isError, isLoading } = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
