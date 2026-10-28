
import { Link } from "react-router-dom";
import "../css/Footer.css"
import { useState, useEffect } from "react";
import api from "../api";
import {
    FaInstagram,
    FaFacebook,
    FaLinkedin,
    FaLayerGroup
} from "react-icons/fa";

function Footer() {
    const [isLogged, setIsLogged] = useState(false);

    // Verifica l'autenticazione
    useEffect(() => {
        api.get("/auth/me")
            .then(() => {
                setIsLogged(true);
            })
            .catch(() => {
                setIsLogged(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <footer className="footer mt-5">
            <div className="container py-5">
                <div className="row g-4">

                    {/* Logo e descrizione */}
                    <div className="col-lg-4 col-md-6">
                        <Link
                            to="/home"
                            className="footer-brand text-decoration-none"
                        >
                            <FaLayerGroup className="me-2" />
                            ProntoFatto
                        </Link>

                        <p className="footer-description mt-3">
                            Trova quello che cerchi, facilmente.
                            Scopri annunci, confronta le offerte
                            e trova ciò che fa per te.
                        </p>

                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="social-link" aria-label="Instagram">
                                <FaInstagram />
                            </a>

                            <a href="#" className="social-link" aria-label="Facebook">
                                <FaFacebook />
                            </a>

                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Link di navigazione */}
                    <div className="col-6 col-lg-2 col-md-3">
                        <h5 className="footer-title">Esplora</h5>

                        <ul className="footer-links">
                            <li>{isLogged ? <Link to="/dashboard">Home</Link> : <Link to="/home">Home</Link>}</li>
                            <li><Link to="/announcements">Annunci</Link></li>
                            <li>{isLogged ? <Link to="/dashboard">Registrati</Link> : <Link to="/register">Registrati</Link>} </li>
                            <li>{isLogged ? <Link to="/dashboard">Accedi</Link> : <Link to="/login">Accedi</Link>}</li>
                        </ul>
                    </div>

                    {/* Informazioni */}
                    <div className="col-6 col-lg-2 col-md-3">
                        <h5 className="footer-title">Informazioni</h5>

                        <ul className="footer-links">
                            <li><Link to="/chi-siamo">Chi siamo</Link></li>
                            <li><Link to="/contatti">Contatti</Link></li>
                            <li><Link to="/privacy">Privacy</Link></li>
                            <li><Link to="/termini">Termini e condizioni</Link></li>
                        </ul>
                    </div>

                    {/* Contatti */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="footer-title">Hai bisogno di aiuto?</h5>

                        <p className="footer-description">
                            Hai domande o vuoi maggiori informazioni?
                            Siamo qui per aiutarti.
                        </p>

                        <a
                            href="mailto:info@prontofatto.it"
                            className="footer-email"
                        >
                            prontofattohub@gmail.com
                        </a>
                    </div>
                </div>

                <hr className="footer-divider" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                    <p className="footer-copyright mb-0">
                        © {new Date().getFullYear()} ProntoFatto.
                        Tutti i diritti riservati.
                    </p>

                    <p className="footer-copyright mb-0">
                        Realizzato con React e Bootstrap
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
