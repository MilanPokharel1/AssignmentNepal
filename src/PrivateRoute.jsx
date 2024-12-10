import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { role, exp } = decodedToken;

    // Check token expiration
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    // Check role authorization
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
