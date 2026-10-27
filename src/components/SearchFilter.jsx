import { useState } from "react";
import "../css/SearchFilter.css";

function SearchFilter({ onSearch }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");

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
        <form className="search-filter" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Cerca un prodotto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Tutte le categorie</option>
                <option value="Console">Console</option>
                <option value="Videogiochi">Videogiochi</option>
                <option value="Gadget">Gadget</option>
                <option value="Accessori">Accessori</option>
            </select>

            <div className="price-filters">
                <input
                    type="number"
                    min="0"
                    placeholder="Prezzo minimo"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    type="number"
                    min="0"
                    placeholder="Prezzo massimo"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="">Ordina per</option>
                <option value="price_asc">Prezzo crescente</option>
                <option value="price_desc">Prezzo decrescente</option>
            </select>

            <button type="submit">Cerca</button>

            <button type="button" onClick={handleReset}>
                Azzera filtri
            </button>
        </form>
    );
}

export default SearchFilter;