import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <section className="section-band">
        <div className="page-wrap">
          <div className="panel-strong p-6 text-center text-slate-600">Checking your session...</div>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/gallery" replace />;
  }

  return children;
}

export default ProtectedRoute;
