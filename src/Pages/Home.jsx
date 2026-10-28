
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Home.css";
import Announcements from "./Announcements";
import { useState } from "react";
import ChatbotWidget from "../components/ChatbotWidget";

function Home() {
    const [mostraRicerca, setMostraRicerca] = useState(false);
    const [ricerca, setRicerca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [prezzoMin, setPrezzoMin] = useState("");
    const [prezzoMax, setPrezzoMax] = useState("");

    const categorie = [
        { nome: "Console", icona: "🎮", descrizione: "Le tue console preferite" },
        { nome: "Videogiochi", icona: "🕹️", descrizione: "Giochi per ogni piattaforma" },
        { nome: "Gadget", icona: "👾", descrizione: "Il mondo del gaming" },
        { nome: "Accessori", icona: "🎧", descrizione: "Tutto per giocare al meglio" }
    ];

    function cercaAnnunci() {
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
        <div className="home-page">
            <div className="container">
                <Header />

                <main>
                    <section className="home-hero">
                        <div className="hero-glow hero-glow-one"></div>
                        <div className="hero-glow hero-glow-two"></div>

                        <div className="hero-content">
                            <span className="hero-badge">
                                <span className="hero-badge-dot"></span>
                                IL TUO MARKETPLACE GAMING
                            </span>

                            <h1>
                                Il tuo prossimo
                                <span> livello inizia qui.</span>
                            </h1>

                            <p className="hero-description">
                                Scopri console, videogiochi, accessori e gadget.
                                Trova quello che cerchi e dai una nuova vita
                                alla tua passione.
                            </p>

                            <div className="hero-buttons">
                                <button
                                    className="hero-primary-button"
                                    onClick={() => setMostraRicerca(!mostraRicerca)}
                                >
                                    {mostraRicerca ? "Chiudi ricerca" : "Esplora gli annunci"}
                                    <span>{mostraRicerca ? "↑" : "→"}</span>
                                </button>

                                <a
                                    href="#ultimi-annunci"
                                    className="hero-secondary-button"
                                >
                                    Scopri le offerte
                                </a>
                            </div>

                            <div className="hero-features">
                                <div className="hero-feature">
                                    <span>🎮</span>
                                    <div>
                                        <strong>Gaming</strong>
                                        <small>Per ogni giocatore</small>
                                    </div>
                                </div>

                                <div className="hero-feature">
                                    <span>🔎</span>
                                    <div>
                                        <strong>Ricerca facile</strong>
                                        <small>Trova ciò che vuoi</small>
                                    </div>
                                </div>

                                <div className="hero-feature">
                                    <span>✨</span>
                                    <div>
                                        <strong>Nuove scoperte</strong>
                                        <small>Ogni giorno</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual" aria-hidden="true">
                            <div className="hero-orbit hero-orbit-one"></div>
                            <div className="hero-orbit hero-orbit-two"></div>

                            <div className="hero-game-card hero-game-card-back">
                                <span>YOUR NEXT</span>
                                <strong>ADVENTURE</strong>
                                <div className="game-card-symbol">✦</div>
                            </div>

                            <div className="hero-game-card hero-game-card-front">
                                <div className="game-card-top">
                                    <span className="game-card-dot"></span>
                                    <span>PRONTO FATTO</span>
                                </div>

                                <div className="gamepad-icon">🎮</div>

                                <div className="game-card-bottom">
                                    <span>LEVEL UP</span>
                                    <strong>START HERE.</strong>
                                </div>
                            </div>

                            <div className="hero-floating-icon floating-icon-one">
                                ✦
                            </div>

                            <div className="hero-floating-icon floating-icon-two">
                                +
                            </div>

                            <div className="hero-floating-label">
                                <span>⚡</span>
                                La tua prossima scoperta
                            </div>
                        </div>

                        {mostraRicerca && (
                            <section className="home-search-panel">
                                <div className="search-panel-heading">
                                    <span className="search-panel-icon">⌕</span>
                                    <div>
                                        <h2>Trova il tuo prossimo acquisto</h2>
                                        <p>Personalizza la ricerca e scopri gli annunci.</p>
                                    </div>
                                </div>

                                <div className="home-search-form">
                                    <div className="home-search-field search-field-wide">
                                        <label htmlFor="home-ricerca">
                                            Cosa cerchi?
                                        </label>
                                        <input
                                            id="home-ricerca"
                                            type="text"
                                            placeholder="Es. PlayStation 5, controller..."
                                            value={ricerca}
                                            onChange={(e) => setRicerca(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") cercaAnnunci();
                                            }}
                                        />
                                    </div>

                                    <div className="home-search-field">
                                        <label htmlFor="home-categoria">
                                            Categoria
                                        </label>
                                        <select
                                            id="home-categoria"
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                        >
                                            <option value="">Tutte le categorie</option>
                                            <option value="Console">Console</option>
                                            <option value="Videogiochi">Videogiochi</option>
                                            <option value="Gadget">Gadget</option>
                                            <option value="Accessori">Accessori</option>
                                        </select>
                                    </div>

                                    <div className="home-search-field">
                                        <label htmlFor="home-prezzo-min">
                                            Prezzo minimo (€)
                                        </label>
                                        <input
                                            id="home-prezzo-min"
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={prezzoMin}
                                            onChange={(e) => setPrezzoMin(e.target.value)}
                                        />
                                    </div>

                                    <div className="home-search-field">
                                        <label htmlFor="home-prezzo-max">
                                            Prezzo massimo (€)
                                        </label>
                                        <input
                                            id="home-prezzo-max"
                                            type="number"
                                            min="0"
                                            placeholder="Nessun limite"
                                            value={prezzoMax}
                                            onChange={(e) => setPrezzoMax(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        className="home-search-submit"
                                        onClick={cercaAnnunci}
                                    >
                                        Cerca annunci <span>→</span>
                                    </button>
                                </div>
                            </section>
                        )}
                    </section>

                    <section className="home-categories">
                        <div className="home-section-heading">
                            <div>
                                <span className="home-eyebrow">ESPLORA IL CATALOGO</span>
                                <h2>Da dove vuoi iniziare?</h2>
                                <p>Entra nella categoria che fa per te.</p>
                            </div>
                        </div>

                        <div className="home-category-grid">
                            {categorie.map((item) => (
                                <button
                                    type="button"
                                    className="home-category-card"
                                    key={item.nome}
                                    onClick={() => {
                                        const params = new URLSearchParams();
                                        params.set("categoria", item.nome);
                                        window.location.href =
                                            `/announcements?${params.toString()}`;
                                    }}
                                >
                                    <span className="category-icon">
                                        {item.icona}
                                    </span>

                                    <span className="category-text">
                                        <strong>{item.nome}</strong>
                                        <small>{item.descrizione}</small>
                                    </span>

                                    <span className="category-arrow">↗</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="home-announcements" id="ultimi-annunci">
                        <div className="home-section-heading announcements-heading">
                            <div>
                                <span className="home-eyebrow">TUTTO DA SCOPRIRE</span>
                                <h2>Annunci in evidenza</h2>
                                <p>Scopri gli articoli disponibili su ProntoFatto.</p>
                            </div>

                            <a href="/announcements" className="home-view-all">
                                Tutti gli annunci <span>→</span>
                            </a>
                        </div>

                        <Announcements />
                    </section>
                </main>

                <Footer />
            </div>

            <ChatbotWidget />
        </div>
    );
}

export default Home;
