
import { useState } from "react";
import Chatbot from "./Chatbot";
import "../css/ChatbotWidget.css";

function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <Chatbot />}

            <button
                type="button"
                className={`chatbot-toggle ${isOpen ? "is-open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Chiudi assistente AI" : "Apri assistente AI"}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M6 6l12 12M18 6L6 18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}

                {!isOpen && <span>Assistente AI</span>}
            </button>
        </>
    );
}

export default ChatbotWidget;
