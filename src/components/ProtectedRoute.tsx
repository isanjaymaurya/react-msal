import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const isAuthenticated = useIsAuthenticated();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}; 