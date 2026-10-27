
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Chat.css";

const API_URL = import.meta.env.VITE_API_URL;

function Chat() {
    const { id } = useParams();

    const [messaggi, setMessaggi] = useState([]);
    const [testo, setTesto] = useState("");
    const [socket, setSocket] = useState(null);
    const [connesso, setConnesso] = useState(false);
    const [utente, setUtente] = useState(null);
    const [errore, setErrore] = useState("");
    const [invioInCorso, setInvioInCorso] = useState(false);

    const messaggiRef = useRef(null);
    const inputRef = useRef(null);

    // Carica i messaggi e avvia la connessione
    useEffect(() => {
        let connessione;
        let attivo = true;

        async function avviaChat() {
            try {
                setErrore("");
                setMessaggi([]);
                setConnesso(false);

                const [rispostaMessaggi, rispostaUtente] =
                    await Promise.all([
                        axios.get(
                            `${API_URL}/api/chat/conversazioni/${id}/messaggi`,
                            { withCredentials: true }
                        ),
                        axios.get(
                            `${API_URL}/api/profile`,
                            { withCredentials: true }
                        )
                    ]);

                if (!attivo) return;

                setMessaggi(rispostaMessaggi.data);
                setUtente(rispostaUtente.data);

                connessione = io(API_URL, {
                    withCredentials: true
                });

                connessione.on("connect", () => {
                    if (!attivo) return;

                    setConnesso(true);
                    setErrore("");

                    connessione.emit(
                        "entra-conversazione",
                        Number(id),
                        (risultato) => {
                            if (!attivo) return;

                            if (risultato?.error) {
                                setErrore(risultato.error);
                            }
                        }
                    );
                });

                connessione.on("disconnect", () => {
                    if (attivo) {
                        setConnesso(false);
                    }
                });

                connessione.on("connect_error", (error) => {
                    if (!attivo) return;

                    setConnesso(false);
                    setErrore(
                        "Impossibile collegarsi alla chat. Riprova tra poco."
                    );

                    console.error("Errore Socket.IO:", error.message);
                });

                connessione.on("nuovo-messaggio", (messaggio) => {
                    if (
                        Number(messaggio.conversazione_id) === Number(id)
                    ) {
                        setMessaggi((precedenti) => {
                            if (
                                precedenti.some(
                                    (m) => m.id === messaggio.id
                                )
                            ) {
                                return precedenti;
                            }

                            return [...precedenti, messaggio];
                        });
                    }
                });

                if (attivo) {
                    setSocket(connessione);
                }
            } catch (error) {
                if (attivo) {
                    setErrore(
                        error.response?.data?.message ||
                        "Impossibile caricare la conversazione."
                    );
                }

                console.error(
                    "Errore nel caricamento della chat:",
                    error
                );
            }
        }

        if (!API_URL) {
            setErrore(
                "URL del backend non configurato. Controlla VITE_API_URL."
            );
            return;
        }

        avviaChat();

        return () => {
            attivo = false;

            connessione?.disconnect();

            setSocket(null);
            setConnesso(false);
        };
    }, [id]);

    // Scorre automaticamente all'ultimo messaggio
    useEffect(() => {
        if (messaggiRef.current) {
            messaggiRef.current.scrollTop =
                messaggiRef.current.scrollHeight;
        }
    }, [messaggi]);

    // Invia un messaggio
    function inviaMessaggio(e) {
        e.preventDefault();

        const contenuto = testo.trim();

        if (!contenuto || !socket?.connected || invioInCorso) {
            return;
        }

        setErrore("");
        setInvioInCorso(true);

        socket.emit(
            "invia-messaggio",
            {
                conversazioneId: Number(id),
                testo: contenuto
            },
            (risultato) => {
                setInvioInCorso(false);

                if (risultato?.error) {
                    setErrore(risultato.error);
                    return;
                }

                setTesto("");
                inputRef.current?.focus();
            }
        );
    }

    // Controlla se il messaggio è stato inviato dall'utente corrente
    function messaggioMio(messaggio) {
        const idMittente = messaggio.mittente_id;
        const idUtente = utente?.id;

        return (
            idMittente != null &&
            idUtente != null &&
            String(idMittente) === String(idUtente)
        );
    }

    // Formatta l'orario
    function formattaData(data) {
        if (!data) return "";

        const dataMessaggio = new Date(data);

        if (Number.isNaN(dataMessaggio.getTime())) return "";

        return dataMessaggio.toLocaleString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    return (
        <>
            <Header />

            <main className="chat-page">
                <div className="chat-container">

                    {/* Intestazione */}
                    <div className="chat-header">
                        <div className="chat-header-avatar">
                            <i className="bi bi-chat-dots-fill"></i>
                        </div>

                        <div className="chat-header-info">
                            <h1>Messaggi</h1>

                            <span className="chat-connection-status">
                                <span
                                    className={`chat-status-dot ${connesso ? "online" : "offline"
                                        }`}
                                ></span>

                                {connesso
                                    ? "Connesso"
                                    : "Connessione in corso..."}
                            </span>
                        </div>

                        <div className="chat-header-badge">
                            <i className="bi bi-shield-check"></i>
                            <span>ProntoFatto</span>
                        </div>
                    </div>

                    {/* Area dei messaggi */}
                    <section
                        className="chat-messages"
                        ref={messaggiRef}
                        aria-label="Cronologia messaggi"
                        aria-live="polite"
                    >
                        <div className="chat-date-divider">
                            <span>Conversazione</span>
                        </div>

                        {messaggi.length === 0 && !errore && (
                            <div className="chat-empty">
                                <div className="chat-empty-icon">
                                    <i className="bi bi-chat-square-text"></i>
                                </div>

                                <h2>Inizia la conversazione</h2>

                                <p>
                                    Scrivi un messaggio per metterti
                                    in contatto con l'altro utente.
                                </p>
                            </div>
                        )}

                        {messaggi.map((messaggio) => {
                            const mio = messaggioMio(messaggio);

                            return (
                                <div
                                    key={messaggio.id}
                                    className={`chat-message-row ${mio ? "my-message" : "other-message"
                                        }`}
                                >
                                    {!mio && (
                                        <div className="chat-message-avatar">
                                            <i className="bi bi-person-fill"></i>
                                        </div>
                                    )}

                                    <div className="chat-message-content">
                                        <div className="chat-message-author">
                                            {mio
                                                ? "Tu"
                                                : messaggio.mittente_username ||
                                                "Utente"}
                                        </div>

                                        <div className="chat-bubble">
                                            {messaggio.testo}
                                        </div>

                                        <div className="chat-message-time">
                                            {formattaData(
                                                messaggio.data_invio
                                            )}

                                            {mio && (
                                                <i className="bi bi-check2-all"></i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* Errore */}
                    {errore && (
                        <div className="chat-error" role="alert">
                            <i className="bi bi-exclamation-circle"></i>
                            <span>{errore}</span>
                        </div>
                    )}

                    {/* Composizione del messaggio */}
                    <form
                        onSubmit={inviaMessaggio}
                        className="chat-composer"
                    >
                        <div className="chat-input-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Scrivi il tuo messaggio..."
                                value={testo}
                                maxLength={5000}
                                onChange={(e) => setTesto(e.target.value)}
                                disabled={!connesso}
                                aria-label="Testo del messaggio"
                            />

                            <span className="chat-character-count">
                                {testo.length}/5000
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="chat-send-button"
                            disabled={
                                !testo.trim() ||
                                !connesso ||
                                invioInCorso
                            }
                            aria-label="Invia messaggio"
                        >
                            <span>
                                {invioInCorso ? "Invio..." : "Invia"}
                            </span>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>

                    <div className="chat-footer-note">
                        <i className="bi bi-info-circle"></i>
                        Comunica direttamente con gli altri utenti
                        di ProntoFatto.
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default Chat;
