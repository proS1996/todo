import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "../services/rtk-query/authApi";

const ProtectedRoute = ({ children }) => {
  const { data, isError, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
