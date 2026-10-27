

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Messages.css";

function Messages() {
    const [conversazioni, setConversazioni] = useState([]);
    const [caricamento, setCaricamento] = useState(true);
    const [errore, setErrore] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        async function caricaConversazioni() {
            try {
                setErrore("");

                const risposta = await axios.get(
                    "http://localhost:3000/api/chat/conversazioni",
                    {
                        withCredentials: true
                    }
                );

                setConversazioni(risposta.data);
            } catch (error) {
                setErrore(
                    error.response?.data?.message ||
                    "Errore nel caricamento dei messaggi"
                );
            } finally {
                setCaricamento(false);
            }
        }

        caricaConversazioni();
    }, []);

    function formattaData(data) {
        if (!data) return "";

        const dataMessaggio = new Date(data);

        if (Number.isNaN(dataMessaggio.getTime())) return "";

        const oggi = new Date();
        const stessoGiorno =
            dataMessaggio.toDateString() === oggi.toDateString();

        if (stessoGiorno) {
            return dataMessaggio.toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit"
            });
        }

        return dataMessaggio.toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "short"
        });
    }

    function iniziali(username) {
        return username
            ? username.trim().charAt(0).toUpperCase()
            : "?";
    }

    return (
        <>
            <Header />

            <main className="messages-page">
                <div className="messages-container">

                    <div className="messages-heading">
                        <div className="messages-heading-icon">
                            <i className="bi bi-chat-dots-fill"></i>
                        </div>

                        <div>
                            <h1>I miei messaggi</h1>
                            <p>
                                Tutte le tue conversazioni in un unico posto.
                            </p>
                        </div>
                    </div>

                    <section className="messages-panel">
                        <div className="messages-panel-header">
                            <h2>Conversazioni</h2>

                            <span className="messages-count">
                                {conversazioni.length}
                            </span>
                        </div>

                        {caricamento && (
                            <div className="messages-state">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Caricamento...
                                    </span>
                                </div>

                                <p>Caricamento delle conversazioni...</p>
                            </div>
                        )}

                        {!caricamento && errore && (
                            <div className="messages-state">
                                <i className="bi bi-exclamation-circle messages-state-icon"></i>
                                <h3>Qualcosa è andato storto</h3>
                                <p>{errore}</p>

                                <button
                                    className="messages-retry-button"
                                    onClick={() => window.location.reload()}
                                >
                                    Riprova
                                </button>
                            </div>
                        )}

                        {!caricamento &&
                            !errore &&
                            conversazioni.length === 0 && (
                                <div className="messages-state">
                                    <div className="messages-empty-icon">
                                        <i className="bi bi-chat-square-text"></i>
                                    </div>

                                    <h3>Ancora nessuna conversazione</h3>

                                    <p>
                                        Quando contatterai un venditore o
                                        riceverai un messaggio, lo troverai qui.
                                    </p>

                                    <button
                                        className="messages-browse-button"
                                        onClick={() => navigate("/annunci")}
                                    >
                                        Esplora gli annunci
                                    </button>
                                </div>
                            )}

                        {!caricamento &&
                            !errore &&
                            conversazioni.length > 0 && (
                                <div className="messages-list">
                                    {conversazioni.map((conversazione) => (
                                        <button
                                            key={conversazione.conversazione_id}
                                            type="button"
                                            className="message-item"
                                            onClick={() =>
                                                navigate(
                                                    `/chat/${conversazione.conversazione_id}`
                                                )
                                            }
                                        >
                                            <div className="message-avatar">
                                                {iniziali(
                                                    conversazione.altro_utente_username
                                                )}
                                            </div>

                                            <div className="message-content">
                                                <div className="message-top">
                                                    <strong className="message-username">
                                                        {conversazione.altro_utente_username ||
                                                            "Utente"}
                                                    </strong>

                                                    <span className="message-date">
                                                        {formattaData(
                                                            conversazione.data_ultimo_messaggio
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="message-preview">
                                                    {conversazione.ultimo_messaggio ||
                                                        "Nessun messaggio ancora"}
                                                </p>
                                            </div>

                                            <i className="bi bi-chevron-right message-arrow"></i>
                                        </button>
                                    ))}
                                </div>
                            )}
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Messages;
