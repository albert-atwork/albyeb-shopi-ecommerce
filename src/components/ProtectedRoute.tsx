// src/components/ProtectedRoute.tsx   ← UPDATED – SAVE INTENDED PATH FOR REDIRECT

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    // Save intended path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}