
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcements from "./Announcements";
import FilterPlatform from "../components/FilterPlatform";
import api from "../api";
import ChatbotWidget from "../components/ChatbotWidget";

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

    function getProfileImage(image) {
        if (!image) {
            return "/default-avatar.png";
        }

        if (image.startsWith("http")) {
            return image;
        }

        return `http://localhost:3000${image.startsWith("/") ? "" : "/"}${image}`;
    }

    return (
        <div>
            <Header />

            <div className="container">
                <section className="main-section">
                    <ChatbotWidget />
                    <div className="riquadro-benvenuto">
                        <h2 className="text-center">Benvenuto su Pronto Fatto!</h2>
                        <p>Scopri tutti i nostri servizi e cosa possiamo offrirti</p>
                        <button
                            className="btn-prontofatto"
                            onClick={() => setMostraRicerca(!mostraRicerca)}
                        >
                            {mostraRicerca ? "Chiudi ricerca" : "Cerca subito"}
                        </button>
                        {mostraRicerca && (
                            <section className="ricerca-home">

                                <h2>Cosa stai cercando?</h2>

                                <div className="ricerca-form">

                                    <input
                                        type="text"
                                        placeholder="Cerca un prodotto..."
                                        value={ricerca}
                                        onChange={(e) => setRicerca(e.target.value)}
                                    />

                                    <select
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                    >
                                        <option value="">Tutte le categorie</option>
                                        <option value="Console">Console</option>
                                        <option value="Videogiochi">Videogiochi</option>
                                        <option value="Gadget">Gadget</option>
                                        <option value="Accessori">PC</option>
                                    </select>

                                    <input
                                        type="number"
                                        placeholder="Prezzo minimo (€)"
                                        min="0"
                                        value={prezzoMin}
                                        onChange={(e) => setPrezzoMin(e.target.value)}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Prezzo massimo (€)"
                                        min="0"
                                        value={prezzoMax}
                                        onChange={(e) => setPrezzoMax(e.target.value)}
                                    />

                                    <button
                                        className="btn-prontofatto"
                                        onClick={() => {
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

                                            window.location.href =
                                                `/announcements?${params.toString()}`;
                                        }}
                                    >
                                        Cerca annunci
                                    </button>

                                </div>

                            </section>
                        )}
                    </div>
                </section>


                {/* Filtro piattaforme */}


                {/* Annunci */}
                <Announcements
                    selectedPlatform={selectedPlatform}
                />

            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
