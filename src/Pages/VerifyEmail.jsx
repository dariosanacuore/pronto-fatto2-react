import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState("Verifica in corso...");

    useEffect(() => {
        api.get(`/auth/verifica-email/${token}`)
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                setMessage(
                    error.response?.data?.message ||
                    "Errore durante la verifica dell'email"
                );
            });
    }, [token]);
    return (
        <div className="container py-5 text-center">
            <h2>Verifica email</h2>

            <p>{message}</p>

            <Link to="/login" className="btn btn-primary">
                Vai al login
            </Link>
        </div>
    );
}

export default VerifyEmail;