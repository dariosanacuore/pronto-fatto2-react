
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            await api.post("/auth/login", {
                email,
                password
            });

            // Il server ha creato la sessione.
            // Il cookie viene gestito automaticamente dal browser.
            navigate("/dashboard");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Errore durante il login"
            );
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="login-page">
            <div className="login-box">
                <h2>Accedi</h2>

                <p className="login-description">
                    Bentornato su ProntoFatto!
                </p>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="login-field">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {message && (
                        <p className="text-danger">{message}</p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Accesso..." : "Accedi"}
                    </button>
                </form>

                <p className="login-register">
                    Non hai un account? <Link to="/register">Registrati</Link>
                </p>
                <br></br>
                <Link to="/home" className="dashboard-button">
                    <i className="bi bi-grid-1x2-fill"></i>
                    <span>Vai alla Home</span>
                    <i className="bi bi-arrow-right"></i>
                </Link>
            </div>
        </div>

    );
}

export default Login;
