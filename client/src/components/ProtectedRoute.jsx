import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('adminToken');
  
  if (!token) {
    // If unauthorized, quietly slip them back to the home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
