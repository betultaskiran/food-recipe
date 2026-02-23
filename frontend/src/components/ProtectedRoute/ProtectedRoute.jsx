import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(
    token
      ? "Token bulundu, erişim verildi."
      : "Token bulunamadı, yönlendiriliyor."
  );

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
