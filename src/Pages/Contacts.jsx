import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../css/LegalPages.css";
import Footer from "../components/Footer";

function Contacts() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [oggetto, setOggetto] = useState("");
    const [messaggio, setMessaggio] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setFeedback("");

        try {
            const response = await axios.post(
                "http://localhost:3000/api/contatti",
                {
                    nome,
                    email,
                    oggetto,
                    messaggio
                }
            );

            setFeedback(response.data.message);

            setNome("");
            setEmail("");
            setOggetto("");
            setMessaggio("");
        } catch (error) {
            setFeedback(
                error.response?.data?.message ||
                "Impossibile inviare il messaggio."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Header />

            <main className="legal-page container py-5">
                <div className="contact-card">
                    <div className="legal-heading">
                        <i className="bi bi-envelope-paper"></i>
                        <h1>Contattaci</h1>
                        <p>Hai una domanda su ProntoFatto? Siamo qui per aiutarti.</p>
                    </div>

                    <div className="contact-info">
                        <div className="contact-info-item">
                            <i className="bi bi-envelope"></i>
                            <div>
                                <h3>Email di supporto</h3>
                                <p>prontofattohub@gmail.com</p>
                            </div>
                        </div>

                        <div className="contact-info-item">
                            <i className="bi bi-chat-dots"></i>
                            <div>
                                <h3>Assistenza</h3>
                                <p>
                                    Per problemi con account, annunci o
                                    comunicazioni, descrivi il problema
                                    nel messaggio.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="contact-name" className="form-label">
                                Nome
                            </label>
                            <input
                                id="contact-name"
                                className="form-control"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contact-email" className="form-label">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                className="form-control"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="contact-subject" className="form-label">
                                Oggetto
                            </label>
                            <input
                                id="contact-subject"
                                className="form-control"
                                type="text"
                                value={oggetto}
                                onChange={(e) => setOggetto(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contact-message" className="form-label">
                                Messaggio
                            </label>
                            <textarea
                                id="contact-message"
                                className="form-control"
                                rows="5"
                                value={messaggio}
                                onChange={(e) => setMessaggio(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            <i className="bi bi-send me-2"></i>
                            {loading ? "Invio in corso..." : "Invia messaggio"}
                        </button>

                        {feedback && (
                            <div className="alert alert-info mt-3" role="status">
                                {feedback}
                            </div>
                        )}
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Contacts;