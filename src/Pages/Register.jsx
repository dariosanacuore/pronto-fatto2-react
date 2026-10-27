import api from '../api.js';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from './Login.jsx';
import "../css/Register.css";


function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confermaPassword, setConfermaPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        setMessage("");

        if (password !== confermaPassword) {
            setMessage("Le password non coincidono");
            return;
        }

        try {
            await api.post("/auth/register", {
                username: username,
                email: email,
                password: password,
                conferma_password: confermaPassword
            });
            navigate("/login");
        }
        catch (error) {
            setMessage(error.response?.data?.message || "Errore durante la registrazione");
        }
    }




    return (

        <div className="register-page">
            <div className="register-box">
                <h2>Registrati</h2>
                <p className="register-description">
                    Crea il tuo account su ProntoFatto
                </p>

                <form onSubmit={handleRegister} className="register-form">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="confermaPassword">Conferma password</label>
                    <input
                        id="confermaPassword"
                        type="password"
                        value={confermaPassword}
                        onChange={(e) => setConfermaPassword(e.target.value)}
                        required
                    />

                    {message && (
                        <p className="text-danger">{message}</p>
                    )}

                    <button type="submit">Registrati</button>
                </form>
                <br></br>
                <Link to="/home" className="dashboard-button">
                    <i className="bi bi-grid-1x2-fill"></i>
                    <span>Vai alla Home</span>
                    <i className="bi bi-arrow-right"></i>
                </Link>
            </div>
        </div>

    )
}
export default Register;