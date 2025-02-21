import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user) return children;

  if (loading) return <Loading />

  return <Navigate state={{from: location}} replace to="/login" />;
};

export default PrivateRoute;