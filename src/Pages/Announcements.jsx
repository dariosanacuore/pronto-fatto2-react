
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../css/Announcements.css";

function Announcements({
    selectedPlatform = "",
    ricerca = "",
    categoria = "",
    prezzoMin = "",
    prezzoMax = ""
}) {
    const [announcements, setAnnouncements] = useState([]);
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        subcategory: ""
    });

    const [saving, setSaving] = useState(false);

    // Carica gli annunci, l'utente e i preferiti.
    useEffect(() => {
        let active = true;

        async function loadAnnouncements() {
            setLoading(true);
            setError("");

            try {
                const response = await api.get("/announcements");

                const data = response.data;
                const items = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.announcements)
                        ? data.announcements
                        : [];

                if (active) {
                    setAnnouncements(items);
                }
            } catch (err) {
                if (active) {
                    setError("Non è stato possibile caricare gli annunci.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        async function loadUser() {
            try {
                const response = await api.get("/auth/me");

                if (active) {
                    setUser(
                        response.data?.user ??
                        response.data?.utente ??
                        response.data
                    );
                }
            } catch {
                if (active) {
                    setUser(null);
                }
            }
        }

        async function loadWishlist() {
            try {
                const response = await api.get("/wishlist");
                const data = response.data;

                const items = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.wishlist)
                        ? data.wishlist
                        : [];

                if (active) {
                    setWishlist(
                        items.map((item) =>
                            Number(
                                item.announcement_id ??
                                item.annuncio_id ??
                                item.id_annuncio ??
                                item.id
                            )
                        )
                    );
                }
            } catch {
                if (active) {
                    setWishlist([]);
                }
            }
        }

        loadAnnouncements();
        loadUser();
        loadWishlist();

        return () => {
            active = false;
        };
    }, []);

    // Filtra gli annunci in base ai valori ricevuti dalla pagina.
    const filteredAnnouncements = useMemo(() => {
        return announcements.filter((annuncio) => {
            const testoRicerca = ricerca.trim().toLowerCase();

            const corrispondeRicerca =
                !testoRicerca ||
                [
                    annuncio.title,
                    annuncio.description,
                    annuncio.category,
                    annuncio.subcategory,
                    annuncio.user_name,
                    annuncio.username
                ].some((valore) =>
                    String(valore ?? "")
                        .toLowerCase()
                        .includes(testoRicerca)
                );

            const corrispondeCategoria =
                !categoria || annuncio.category === categoria;

            const prezzo = Number(annuncio.price);

            const corrispondePrezzoMin =
                prezzoMin === "" ||
                prezzoMin === null ||
                prezzo >= Number(prezzoMin);

            const corrispondePrezzoMax =
                prezzoMax === "" ||
                prezzoMax === null ||
                prezzo <= Number(prezzoMax);

            // La piattaforma viene considerata solo per i videogiochi.
            const corrispondePiattaforma =
                !selectedPlatform ||
                annuncio.category !== "Videogiochi" ||
                annuncio.subcategory === selectedPlatform;

            return (
                corrispondeRicerca &&
                corrispondeCategoria &&
                corrispondePrezzoMin &&
                corrispondePrezzoMax &&
                corrispondePiattaforma
            );
        });
    }, [
        announcements,
        ricerca,
        categoria,
        prezzoMin,
        prezzoMax,
        selectedPlatform
    ]);

    // Controlla se l'utente corrente è il proprietario dell'annuncio.
    function isOwner(annuncio) {
        if (!user) return false;

        const userId = user.id ?? user.user_id;
        return Number(annuncio.user_id) === Number(userId);
    }

    function getImageUrl(annuncio) {
        const image = annuncio.image ?? annuncio.photo;

        if (!image) return null;

        // Se l'immagine ha già un URL completo, lo restituisce
        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }

        // URL del backend configurato nel file .env
        const API_URL = import.meta.env.VITE_API_URL;

        // Rimuove lo slash iniziale, se presente
        const imagePath = image.startsWith("/")
            ? image.slice(1)
            : image;

        // Costruisce l'URL completo dell'immagine
        return `${API_URL}/${imagePath}`;
    }

    // Apre il modulo di modifica.
    function startEditing(annuncio) {
        setEditingId(annuncio.id);

        setEditForm({
            title: annuncio.title ?? "",
            description: annuncio.description ?? "",
            price: annuncio.price ?? "",
            category: annuncio.category ?? "",
            subcategory: annuncio.subcategory ?? ""
        });
    }

    // Gestisce le modifiche ai campi.
    function handleEditChange(event) {
        const { name, value } = event.target;

        setEditForm((previous) => ({
            ...previous,
            [name]: value,
            ...(name === "category" && value !== "Videogiochi"
                ? { subcategory: "" }
                : {})
        }));
    }

    // Salva le modifiche sul server.
    async function saveEdit(event) {
        event.preventDefault();

        if (!editingId) return;

        setSaving(true);
        setError("");

        try {
            const response = await api.put(
                `/announcements/${editingId}`,
                {
                    ...editForm,
                    price: Number(editForm.price)
                }
            );

            const updatedAnnouncement =
                response.data?.announcement ?? response.data;

            setAnnouncements((previous) =>
                previous.map((annuncio) =>
                    Number(annuncio.id) === Number(editingId)
                        ? {
                            ...annuncio,
                            ...updatedAnnouncement,
                            ...editForm,
                            price: Number(editForm.price)
                        }
                        : annuncio
                )
            );

            setEditingId(null);
        } catch (err) {
            setError(
                err.response?.data?.message ??
                "Non è stato possibile modificare l'annuncio."
            );
        } finally {
            setSaving(false);
        }
    }

    // Elimina un annuncio.
    async function deleteAnnouncement(id) {
        const conferma = window.confirm(
            "Vuoi davvero eliminare questo annuncio?"
        );

        if (!conferma) return;

        try {
            await api.delete(`/announcements/${id}`);

            setAnnouncements((previous) =>
                previous.filter(
                    (annuncio) => Number(annuncio.id) !== Number(id)
                )
            );

            setWishlist((previous) =>
                previous.filter((announcementId) =>
                    announcementId !== Number(id)
                )
            );
        } catch (err) {
            setError(
                err.response?.data?.message ??
                "Non è stato possibile eliminare l'annuncio."
            );
        }
    }

    // Aggiunge o rimuove un annuncio dai preferiti.
    async function toggleWishlist(id) {
        if (!user) {
            window.alert("Accedi per aggiungere annunci ai preferiti.");
            return;
        }

        const announcementId = Number(id);
        const isFavorite = wishlist.includes(announcementId);

        try {
            if (isFavorite) {
                await api.delete(`/wishlist/${announcementId}`);

                setWishlist((previous) =>
                    previous.filter(
                        (itemId) => itemId !== announcementId
                    )
                );
            } else {
                await api.post("/wishlist", {
                    announcement_id: announcementId
                });

                setWishlist((previous) =>
                    previous.includes(announcementId)
                        ? previous
                        : [...previous, announcementId]
                );
            }
        } catch (err) {
            window.alert(
                err.response?.data?.message ??
                "Non è stato possibile aggiornare i preferiti."
            );
        }
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border"
                    role="status"
                    aria-label="Caricamento"
                />
                <p className="mt-3">Caricamento annunci...</p>
            </div>
        );
    }

    return (
        <section className="container py-4 announcements-section">
            <div className="announcements-heading">
                <div>
                    <h2>Annunci</h2>
                    <p>Scopri gli annunci pubblicati su ProntoFatto.</p>
                </div>

                <span className="announcements-count">
                    {filteredAnnouncements.length}{" "}
                    {filteredAnnouncements.length === 1
                        ? "annuncio"
                        : "annunci"}
                </span>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {filteredAnnouncements.length === 0 ? (
                <div className="announcements-empty">
                    <i className="bi bi-search" />
                    <h4>Nessun annuncio trovato</h4>
                    <p>
                        Prova a modificare la ricerca o i filtri selezionati.
                    </p>
                </div>
            ) : (
                <div className="row g-4">
                    {filteredAnnouncements.map((annuncio) => {
                        const isFavorite = wishlist.includes(
                            Number(annuncio.id)
                        );

                        const imageUrl = getImageUrl(annuncio);

                        return (
                            <div
                                className="col-12 col-sm-6 col-lg-4 col-xl-3"
                                key={annuncio.id}
                            >
                                <article className="card announcement-card h-100">
                                    <div className="announcement-image-wrapper">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={annuncio.title}
                                                className="announcement-card-image"
                                                loading="lazy"
                                                onError={(event) => {
                                                    event.currentTarget.style.display =
                                                        "none";
                                                }}
                                            />
                                        ) : (
                                            <div className="announcement-no-image">
                                                <i className="bi bi-image" />
                                                <span>
                                                    Nessuna foto disponibile
                                                </span>
                                            </div>
                                        )}

                                        {!isOwner(annuncio) && (
                                            <button
                                                type="button"
                                                className={`announcement-favorite ${isFavorite ? "is-favorite" : ""
                                                    }`}
                                                onClick={() =>
                                                    toggleWishlist(annuncio.id)
                                                }
                                                aria-label={
                                                    isFavorite
                                                        ? "Rimuovi dai preferiti"
                                                        : "Aggiungi ai preferiti"
                                                }
                                                title={
                                                    isFavorite
                                                        ? "Rimuovi dai preferiti"
                                                        : "Aggiungi ai preferiti"
                                                }
                                            >
                                                <i
                                                    className={
                                                        isFavorite
                                                            ? "bi bi-heart-fill"
                                                            : "bi bi-heart"
                                                    }
                                                />
                                            </button>
                                        )}
                                    </div>

                                    <div className="card-body announcement-card-body">
                                        {editingId === annuncio.id ? (
                                            <form onSubmit={saveEdit}>
                                                <div className="mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor={`title-${annuncio.id}`}
                                                    >
                                                        Titolo
                                                    </label>
                                                    <input
                                                        id={`title-${annuncio.id}`}
                                                        className="form-control"
                                                        name="title"
                                                        value={editForm.title}
                                                        onChange={handleEditChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor={`description-${annuncio.id}`}
                                                    >
                                                        Descrizione
                                                    </label>
                                                    <textarea
                                                        id={`description-${annuncio.id}`}
                                                        className="form-control"
                                                        name="description"
                                                        value={editForm.description}
                                                        onChange={handleEditChange}
                                                        rows="3"
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor={`price-${annuncio.id}`}
                                                    >
                                                        Prezzo (€)
                                                    </label>
                                                    <input
                                                        id={`price-${annuncio.id}`}
                                                        className="form-control"
                                                        type="number"
                                                        name="price"
                                                        min="0"
                                                        step="0.01"
                                                        value={editForm.price}
                                                        onChange={handleEditChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor={`category-${annuncio.id}`}
                                                    >
                                                        Categoria
                                                    </label>
                                                    <select
                                                        id={`category-${annuncio.id}`}
                                                        className="form-select"
                                                        name="category"
                                                        value={editForm.category}
                                                        onChange={handleEditChange}
                                                        required
                                                    >
                                                        <option value="">
                                                            Seleziona categoria
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
                                                        <option value="PC">
                                                            PC
                                                        </option>
                                                    </select>
                                                </div>

                                                {editForm.category === "Videogiochi" && (
                                                    <div className="mb-3">
                                                        <label
                                                            className="form-label"
                                                            htmlFor={`subcategory-${annuncio.id}`}
                                                        >
                                                            Piattaforma
                                                        </label>
                                                        <select
                                                            id={`subcategory-${annuncio.id}`}
                                                            className="form-select"
                                                            name="subcategory"
                                                            value={editForm.subcategory}
                                                            onChange={handleEditChange}
                                                            required
                                                        >
                                                            <option value="">
                                                                Seleziona piattaforma
                                                            </option>
                                                            <option value="PS1">PS1</option>
                                                            <option value="PS2">PS2</option>
                                                            <option value="PS3">PS3</option>
                                                            <option value="PS4">PS4</option>
                                                            <option value="PS5">PS5</option>
                                                            <option value="PC">PC</option>
                                                            <option value="Xbox 360">Xbox 360</option>
                                                            <option value="Xbox One">Xbox One</option>
                                                            <option value="Nintendo Switch">
                                                                Nintendo Switch
                                                            </option>
                                                            <option value="Nintendo 3DS">
                                                                Nintendo 3DS
                                                            </option>
                                                            <option value="Nintendo 2DS">
                                                                Nintendo 2DS
                                                            </option>
                                                        </select>
                                                    </div>
                                                )}

                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success btn-sm"
                                                        disabled={saving}
                                                    >
                                                        {saving
                                                            ? "Salvataggio..."
                                                            : "Salva"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() =>
                                                            setEditingId(null)
                                                        }
                                                        disabled={saving}
                                                    >
                                                        Annulla
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <h5 className="announcement-title">
                                                    {annuncio.title}
                                                </h5>

                                                <p className="announcement-description">
                                                    {annuncio.description ||
                                                        "Nessuna descrizione disponibile."}
                                                </p>

                                                <div className="announcement-meta">
                                                    <span>Prezzo</span>
                                                    <strong className="announcement-price">
                                                        {Number(
                                                            annuncio.price
                                                        ).toLocaleString("it-IT", {
                                                            style: "currency",
                                                            currency: "EUR"
                                                        })}
                                                    </strong>
                                                </div>

                                                <div className="announcement-tags">
                                                    {annuncio.category && (
                                                        <span className="announcement-tag">
                                                            <i className="bi bi-grid" />
                                                            {annuncio.category}
                                                        </span>
                                                    )}

                                                    {annuncio.subcategory && (
                                                        <span className="announcement-tag">
                                                            <i className="bi bi-controller" />
                                                            {annuncio.subcategory}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="announcement-seller">
                                                    <i className="bi bi-person-circle" />
                                                    <span>
                                                        Pubblicato da{" "}
                                                        <strong>
                                                            {annuncio.user_name ||
                                                                annuncio.username ||
                                                                "Utente sconosciuto"}
                                                        </strong>
                                                    </span>
                                                </div>

                                                <Link
                                                    to={`/announcements/${annuncio.id}`}
                                                    className="announcement-details-button"
                                                >
                                                    Visualizza dettagli
                                                    <i className="bi bi-arrow-right" />
                                                </Link>

                                                {isOwner(annuncio) && (
                                                    <div className="announcement-owner-actions">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                startEditing(annuncio)
                                                            }
                                                        >
                                                            <i className="bi bi-pencil me-1" />
                                                            Modifica
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                deleteAnnouncement(
                                                                    annuncio.id
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-trash me-1" />
                                                            Elimina
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Announcements;
