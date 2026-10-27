
import { useState, useEffect, useRef } from "react";
import api from "../api";
import "../css/Chatbot.css";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    async function sendMessage(e) {
        e.preventDefault();

        const userMessage = message.trim();

        if (!userMessage || loading) return;

        setMessages(prev => [
            ...prev,
            { role: "user", text: userMessage }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/chatbot", {
                message: userMessage
            });

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: response.data.reply ||
                        "Non ho ricevuto una risposta."
                }
            ]);
        } catch (error) {
            console.error(
                "Errore chatbot:",
                error.response?.data || error.message
            );

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: error.response?.data?.message ||
                        "Si è verificato un errore. Riprova tra poco."
                }
            ]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    }

    function clearChat() {
        if (loading) return;

        setMessages([]);
        setMessage("");
        inputRef.current?.focus();
    }

    const suggestions = [
        "Come funziona ProntoFatto?",
        "Come pubblico un annuncio?",
        "Come contatto un venditore?"
    ];

    return (
        <div className="chatbot">

            {/* Intestazione */}
            <div className="chatbot-header">
                <div className="chatbot-header-info">
                    <div className="chatbot-avatar">
                        <span>✦</span>
                    </div>

                    <div className="chatbot-title">
                        <h3>Assistente ProntoFatto</h3>

                        <div className="chatbot-status">
                            <span className="status-dot"></span>
                            <span>Assistente AI</span>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="chatbot-clear"
                    onClick={clearChat}
                    disabled={loading || messages.length === 0}
                    title="Cancella conversazione"
                    aria-label="Cancella conversazione"
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Messaggi */}
            <div className="chatbot-messages">

                {messages.length === 0 && (
                    <div className="chatbot-welcome">
                        <div className="welcome-icon">✦</div>

                        <h2>Ciao! 👋</h2>

                        <p>
                            Sono l'assistente virtuale di ProntoFatto.
                            Come posso aiutarti oggi?
                        </p>

                        <div className="chatbot-suggestions">
                            <span className="suggestions-title">
                                Puoi chiedermi, ad esempio:
                            </span>

                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="suggestion-button"
                                    onClick={() => {
                                        setMessage(suggestion);
                                        inputRef.current?.focus();
                                    }}
                                >
                                    {suggestion}
                                    <span>↗</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.role === "user"
                                ? "user-message"
                                : "assistant-message"
                            }`}
                    >
                        {msg.role === "assistant" && (
                            <div className="message-avatar">✦</div>
                        )}

                        <div className="message-content">
                            <span className="message-author">
                                {msg.role === "user" ? "Tu" : "ProntoFatto AI"}
                            </span>

                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="chat-message assistant-message">
                        <div className="message-avatar">✦</div>

                        <div className="message-content">
                            <span className="message-author">
                                ProntoFatto AI
                            </span>

                            <div
                                className="message-bubble typing-bubble"
                                aria-label="L'assistente sta scrivendo"
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef}></div>
            </div>

            {/* Barra di scrittura */}
            <form className="chatbot-form" onSubmit={sendMessage}>
                <div className="chatbot-input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Scrivi un messaggio..."
                        disabled={loading}
                        autoComplete="off"
                        aria-label="Scrivi un messaggio"
                    />

                    <button
                        type="submit"
                        className="chatbot-send"
                        disabled={loading || !message.trim()}
                        aria-label="Invia messaggio"
                        title="Invia messaggio"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M22 2 15 22l-4-9-9-4 20-7ZM22 2 11 13"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <p className="chatbot-disclaimer">
                    L'assistente AI può commettere errori.
                </p>
            </form>

        </div>
    );
}

export default Chatbot;
