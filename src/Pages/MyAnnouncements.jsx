
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "../css/MyAnnouncements.css";

function MyAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        subcategory: ""
    });

    const [message, setMessage] = useState("");

    // Recupera i miei annunci
    async function loadAnnouncements() {
        try {
            const response = await api.get("/announcements/mine");
            setAnnouncements(response.data);
        } catch (error) {
            setMessage("Errore nel caricamento degli annunci");
        }
    }

    useEffect(() => {
        loadAnnouncements();
    }, []);

    // Apre il modulo di modifica
    function handleEdit(announcement) {
        setEditId(announcement.id);

        setForm({
            title: announcement.title,
            description: announcement.description,
            price: announcement.price,
            category: announcement.category,
            subcategory: announcement.subcategory || ""
        });

        setMessage("");
    }

    // Modifica un campo del modulo
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // Salva le modifiche
    async function handleUpdate(e) {
        e.preventDefault();

        try {
            await api.put(
                `/announcements/${editId}`,
                form
            );

            setMessage("Annuncio modificato con successo!");
            setEditId(null);

            await loadAnnouncements();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Errore durante la modifica"
            );
        }
    }

    // Elimina un annuncio
    async function handleDelete(id) {
        const conferma = window.confirm(
            "Vuoi davvero eliminare questo annuncio?"
        );

        if (!conferma) return;

        try {
            await api.delete(`/announcements/${id}`);

            setAnnouncements(
                announcements.filter(
                    (announcement) => announcement.id !== id
                )
            );

            setMessage("Annuncio eliminato con successo!");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Errore durante l'eliminazione"
            );
        }
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">I miei annunci</h2>
            <Link to="/dashboard" className="dashboard-button">
                <i className="bi bi-grid-1x2-fill"></i>
                <span>Vai alla dashboard</span>
                <i className="bi bi-arrow-right"></i>
            </Link>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            {announcements.length === 0 && (
                <p>Non hai ancora pubblicato annunci.</p>
            )}

            <div className="row g-4">
                {announcements.map((announcement) => (
                    <div
                        className="col-12 col-md-6 col-lg-4"
                        key={announcement.id}
                    >
                        <div className="card h-100">
                            {announcement.image && (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${announcement.image.startsWith("/") ? "" : "/"}${announcement.image}`}
                                    className="card-img-top"
                                    alt={announcement.title}
                                    style={{
                                        height: "200px",
                                        objectFit: "contain"
                                    }}
                                />
                            )}

                            <div className="card-body">
                                {editId === announcement.id ? (
                                    <form onSubmit={handleUpdate}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Titolo
                                            </label>
                                            <input
                                                className="form-control"
                                                name="title"
                                                value={form.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Descrizione
                                            </label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={form.description}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Prezzo
                                            </label>
                                            <input
                                                className="form-control"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                name="price"
                                                value={form.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-success me-2"
                                        >
                                            Salva
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setEditId(null)}
                                        >
                                            Annulla
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <h5 className="card-title">
                                            {announcement.title}
                                        </h5>

                                        <p className="card-text">
                                            {announcement.description}
                                        </p>

                                        <p className="fw-bold">
                                            {announcement.price} €
                                        </p>

                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() =>
                                                handleEdit(announcement)
                                            }
                                        >
                                            Modifica
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                handleDelete(announcement.id)
                                            }
                                        >
                                            Elimina
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyAnnouncements;
