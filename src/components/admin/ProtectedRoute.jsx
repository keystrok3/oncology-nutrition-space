import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Wraps admin routes — redirects to login if not authenticated
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  // Wait for session restore before deciding
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-body text-sm text-charcoal/50">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Optional role check — e.g. requiredRole="admin"
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}