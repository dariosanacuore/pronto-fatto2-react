
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../css/SearchFilter.css";

function SearchFilter({ onSearch }) {
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("ricerca") || ""
    );

    const [category, setCategory] = useState(
        searchParams.get("categoria") || ""
    );

    const [minPrice, setMinPrice] = useState(
        searchParams.get("prezzoMin") || ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("prezzoMax") || ""
    );

    const [sort, setSort] = useState("");

    useEffect(() => {
        onSearch({
            search,
            category,
            minPrice,
            maxPrice,
            sort
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        onSearch({
            search,
            category,
            minPrice,
            maxPrice,
            sort
        });
    }

    function handleReset() {
        setSearch("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSort("");

        onSearch({
            search: "",
            category: "",
            minPrice: "",
            maxPrice: "",
            sort: ""
        });
    }

    return (
        <section className="search-filter-section">
            <div className="search-filter-heading">
                <span className="search-filter-eyebrow">
                    PRONTOFATTO MARKETPLACE
                </span>

                <h2>Trova quello che cerchi</h2>

                <p>
                    Cerca tra console, videogiochi, gadget e accessori.
                </p>
            </div>

            <form className="search-filter" onSubmit={handleSubmit}>
                <div className="search-field search-field-main">
                    <label htmlFor="search-product">
                        Cerca prodotto
                    </label>

                    <input
                        id="search-product"
                        type="text"
                        placeholder="Es. PlayStation 5..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="search-field">
                    <label htmlFor="search-category">
                        Categoria
                    </label>

                    <select
                        id="search-category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Tutte le categorie</option>
                        <option value="Console">Console</option>
                        <option value="Videogiochi">Videogiochi</option>
                        <option value="Gadget">Gadget</option>
                        <option value="Accessori">Accessori</option>
                    </select>
                </div>

                <div className="search-field">
                    <label htmlFor="min-price">Prezzo minimo (€)</label>

                    <input
                        id="min-price"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>

                <div className="search-field">
                    <label htmlFor="max-price">Prezzo massimo (€)</label>

                    <input
                        id="max-price"
                        type="number"
                        min="0"
                        placeholder="Nessun limite"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                <div className="search-field">
                    <label htmlFor="search-sort">Ordina per</label>

                    <select
                        id="search-sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Ordine predefinito</option>
                        <option value="price_asc">Prezzo crescente</option>
                        <option value="price_desc">Prezzo decrescente</option>
                    </select>
                </div>

                <div className="search-filter-actions">
                    <button type="submit" className="search-submit">
                        Cerca annunci
                    </button>

                    <button
                        type="button"
                        className="search-reset"
                        onClick={handleReset}
                    >
                        Azzera filtri
                    </button>
                </div>
            </form>
        </section>
    );
}

export default SearchFilter;
