

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterPlatform from "../components/FilterPlatform";
import Announcements from "./Announcements";

function PublicAnnouncements() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [ricerca, setRicerca] = useState(
        searchParams.get("ricerca") || ""
    );

    const [categoria, setCategoria] = useState(
        searchParams.get("categoria") || ""
    );

    const [prezzoMin, setPrezzoMin] = useState(
        searchParams.get("prezzoMin") || ""
    );

    const [prezzoMax, setPrezzoMax] = useState(
        searchParams.get("prezzoMax") || ""
    );

    const [selectedPlatform, setSelectedPlatform] = useState("");

    function applicaFiltri(e) {
        e.preventDefault();

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

        setSearchParams(params);
    }

    function resetFiltri() {
        setRicerca("");
        setCategoria("");
        setPrezzoMin("");
        setPrezzoMax("");
        setSelectedPlatform("");
        setSearchParams({});
    }

    return (
        <div>
            <Header />

            <div className="container my-4">

                <section className="ricerca-home mb-4">
                    <h2>Cosa stai cercando?</h2>

                    <form
                        className="ricerca-form"
                        onSubmit={applicaFiltri}
                    >
                        <input
                            type="text"
                            placeholder="Cerca per nome o descrizione..."
                            value={ricerca}
                            onChange={(e) =>
                                setRicerca(e.target.value)
                            }
                        />

                        <select
                            value={categoria}
                            onChange={(e) =>
                                setCategoria(e.target.value)
                            }
                        >
                            <option value="">Tutte le categorie</option>
                            <option value="Console">Console</option>
                            <option value="Videogiochi">Videogiochi</option>
                            <option value="Gadget">Gadget</option>
                            <option value="Accessori">Accessori</option>
                        </select>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Prezzo minimo (€)"
                            value={prezzoMin}
                            onChange={(e) =>
                                setPrezzoMin(e.target.value)
                            }
                        />

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Prezzo massimo (€)"
                            value={prezzoMax}
                            onChange={(e) =>
                                setPrezzoMax(e.target.value)
                            }
                        />

                        <button
                            type="submit"
                            className="btn-prontofatto"
                        >
                            Cerca annunci
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={resetFiltri}
                        >
                            Azzera filtri
                        </button>
                    </form>
                </section>

                {categoria === "Videogiochi" && (
                    <FilterPlatform
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                    />
                )}

                <Announcements
                    selectedPlatform={selectedPlatform}
                    ricerca={searchParams.get("ricerca") || ""}
                    categoria={searchParams.get("categoria") || ""}
                    prezzoMin={searchParams.get("prezzoMin") || ""}
                    prezzoMax={searchParams.get("prezzoMax") || ""}
                />
            </div>

            <Footer />
        </div>
    );
}

export default PublicAnnouncements;
