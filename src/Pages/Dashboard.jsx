
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcements from "./Announcements";
import api from "../api";
import ChatbotWidget from "../components/ChatbotWidget";
import "../css/Dashboard.css";

function Dashboard() {
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [user, setUser] = useState(null);

    const [mostraRicerca, setMostraRicerca] = useState(false);
    const [ricerca, setRicerca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [prezzoMin, setPrezzoMin] = useState("");
    const [prezzoMax, setPrezzoMax] = useState("");

    useEffect(() => {
        api.get("/profile")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Errore caricamento profilo:", error);
            });
    }, []);

    function handleSearch() {
        const params = new URLSearchParams();

        if (ricerca.trim()) {
            params.set("ricerca", ricerca.trim());
        }

        if (categoria) {
            params.set("categoria", categoria);
        }

        if (prezzoMin !== "") {
            params.set("prezzoMin", prezzoMin);
        }

        if (prezzoMax !== "") {
            params.set("prezzoMax", prezzoMax);
        }

        window.location.href = `/announcements?${params.toString()}`;
    }

    return (
        <div>
            <Header />

            <div className="container">
                <section className="main-section">
                    <ChatbotWidget />

                    <div className="riquadro-benvenuto">
                        <h2 className="text-center">
                            Benvenuto su Pronto Fatto!
                        </h2>

                        <p>
                            Scopri tutti i nostri servizi e cosa possiamo offrirti
                        </p>

                        <button
                            type="button"
                            className={`btn-prontofatto btn-ricerca-home ${mostraRicerca ? "ricerca-aperta" : ""
                                }`}
                            onClick={() =>
                                setMostraRicerca((prev) => !prev)
                            }
                            aria-expanded={mostraRicerca}
                        >
                            <i
                                className={`bi ${mostraRicerca
                                        ? "bi-x-lg"
                                        : "bi-search"
                                    }`}
                            ></i>

                            <span>
                                {mostraRicerca
                                    ? "Chiudi ricerca"
                                    : "Cerca subito"}
                            </span>

                            <i
                                className={`bi freccia-ricerca ${mostraRicerca
                                        ? "bi-chevron-up"
                                        : "bi-arrow-right"
                                    }`}
                            ></i>
                        </button>

                        {mostraRicerca && (
                            <section className="ricerca-home">
                                <h2>Cosa stai cercando?</h2>

                                <div className="ricerca-form">
                                    <input
                                        type="text"
                                        placeholder="Cerca un prodotto..."
                                        value={ricerca}
                                        onChange={(e) =>
                                            setRicerca(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                    />

                                    <select
                                        value={categoria}
                                        onChange={(e) =>
                                            setCategoria(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Tutte le categorie
                                        </option>
                                        <option value="Console">
                                            Console
                                        </option>
                                        <option value="Videogiochi">
                                            Videogiochi
                                        </option>
                                        <option value="Gadget">
                                            Gadget
                                        </option>
                                        <option value="Accessori">
                                            Accessori
                                        </option>
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Prezzo minimo (€)"
                                        min="0"
                                        step="0.01"
                                        value={prezzoMin}
                                        onChange={(e) =>
                                            setPrezzoMin(e.target.value)
                                        }
                                    />

                                    <input
                                        type="number"
                                        placeholder="Prezzo massimo (€)"
                                        min="0"
                                        step="0.01"
                                        value={prezzoMax}
                                        onChange={(e) =>
                                            setPrezzoMax(e.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="btn-prontofatto btn-cerca-annunci"
                                        onClick={handleSearch}
                                    >
                                        <i className="bi bi-search"></i>
                                        Cerca annunci
                                    </button>
                                </div>
                            </section>
                        )}
                    </div>
                </section>

                <Announcements
                    selectedPlatform={selectedPlatform}
                />
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
