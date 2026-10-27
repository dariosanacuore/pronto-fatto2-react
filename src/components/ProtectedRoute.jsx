
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api";

function ProtectedRoute() {
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        api.get("/auth/me")
            .then(() => {
                setAuthenticated(true);
            })
            .catch(() => {
                setAuthenticated(false);
            });
    }, []);

    if (authenticated === null) {
        return <p>Verifica accesso...</p>;
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
