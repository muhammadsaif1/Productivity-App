import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('PrivateRoute must be used within an AuthProvider');
  }

  return authContext.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" replace />
  );
};
