
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { categories } from "../constants/announcementCategories";
import "../css/CreateAnnouncements.css";

function CreateAnnouncement() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    // Array contenente tutte le immagini selezionate
    const [images, setImages] = useState([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Crea gli URL delle anteprime e li libera quando non servono più
    useEffect(() => {
        const urls = images.map((image) =>
            URL.createObjectURL(image)
        );

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    function handleImagesChange(e) {
        const selectedFiles = Array.from(e.target.files || []);

        // Permette di annullare la selezione senza perdere le foto già scelte
        if (selectedFiles.length === 0) {
            return;
        }

        setError("");

        // Controlla che ogni file sia un'immagine consentita
        const tipiConsentiti = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        const fileNonValidi = selectedFiles.some(
            (file) => !tipiConsentiti.includes(file.type)
        );

        if (fileNonValidi) {
            setError("Sono consentite solo immagini JPG, PNG e WEBP.");
            e.target.value = "";
            return;
        }

        // Controlla il peso di ogni immagine
        const fileTroppoGrandi = selectedFiles.some(
            (file) => file.size > 5 * 1024 * 1024
        );

        if (fileTroppoGrandi) {
            setError("Ogni immagine deve avere una dimensione massima di 5 MB.");
            e.target.value = "";
            return;
        }

        // Evita di superare il limite di 10 immagini
        if (images.length + selectedFiles.length > 10) {
            setError("Puoi caricare al massimo 10 immagini.");
            e.target.value = "";
            return;
        }

        // Aggiunge le nuove immagini a quelle già selezionate
        setImages((prevImages) => [
            ...prevImages,
            ...selectedFiles
        ]);

        // Permette di selezionare nuovamente lo stesso file
        e.target.value = "";
    }

    function removeImage(indexToRemove) {
        setImages((prevImages) =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );

        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (category === "Videogiochi" && !subcategory) {
            setError("Seleziona una piattaforma.");
            return;
        }

        if (price.trim() === "" || !Number.isFinite(Number(price)) || Number(price) < 0) {
            setError("Inserisci un prezzo valido.");
            return;
        }

        if (images.length === 0) {
            setError("Seleziona almeno un'immagine.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("title", title.trim());
            formData.append("description", description.trim());
            formData.append("price", price);
            formData.append("category", category);

            formData.append(
                "subcategory",
                category === "Videogiochi" ? subcategory : ""
            );

            // Invia tutte le immagini con il nome atteso da Multer
            images.forEach((image) => {
                formData.append("images", image);
            });

            console.log(
                "Immagini inviate:",
                formData.getAll("images")
            );

            await api.post("/announcements", formData);

            navigate("/dashboard");
        } catch (err) {
            console.error("Errore creazione annuncio:", err);

            if (err.response?.status === 401) {
                setError(
                    "Devi effettuare il login per pubblicare un annuncio."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Errore durante la creazione dell'annuncio."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="container publish-page py-5">
            <div className="publish-card">
                <div className="publish-header">
                    <div className="publish-header-icon">
                        <i className="bi bi-bag-plus"></i>
                    </div>

                    <div>
                        <h2>Pubblica un annuncio</h2>
                        <p>
                            Vendi ciò che non usi più e trova nuovi acquirenti.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger publish-alert" role="alert">
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="publish-section">
                        <h5 className="publish-section-title">
                            <i className="bi bi-card-text"></i>
                            Informazioni sull'annuncio
                        </h5>

                        <div className="mb-4">
                            <label className="form-label publish-label">
                                Titolo dell'annuncio
                            </label>

                            <input
                                type="text"
                                className="form-control publish-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={150}
                                placeholder="Es. PlayStation 5, Tekken..."
                                required
                            />

                            <div className="form-text">
                                Dai un titolo chiaro e facile da trovare.
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label publish-label">
                                Descrizione
                            </label>

                            <textarea
                                className="form-control publish-input publish-textarea"
                                rows="5"
                                placeholder="Descrivi le condizioni, le caratteristiche e gli eventuali accessori..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label publish-label">
                                Prezzo di vendita
                            </label>

                            <div className="input-group publish-price-group">
                                <span className="input-group-text">€</span>

                                <input
                                    type="number"
                                    className="form-control publish-input"
                                    min="0"
                                    step="0.01"
                                    placeholder="0,00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="publish-section">
                        <h5 className="publish-section-title">
                            <i className="bi bi-tags"></i>
                            Categoria e piattaforma
                        </h5>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label publish-label">
                                    Categoria
                                </label>

                                <select
                                    className="form-select publish-input"
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setSubcategory("");
                                    }}
                                    required
                                >
                                    <option value="">
                                        Seleziona una categoria
                                    </option>

                                    {Object.keys(categories).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {category === "Videogiochi" && (
                                <div className="col-12 col-md-6">
                                    <label className="form-label publish-label">
                                        Piattaforma
                                    </label>

                                    <select
                                        className="form-select publish-input"
                                        value={subcategory}
                                        onChange={(e) =>
                                            setSubcategory(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Seleziona una piattaforma
                                        </option>

                                        {categories.Videogiochi.map((platform) => (
                                            <option key={platform} value={platform}>
                                                {platform}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="publish-section">
                        <h5 className="publish-section-title">
                            <i className="bi bi-images"></i>
                            Foto del prodotto
                        </h5>

                        <p className="publish-section-description">
                            Aggiungi foto nitide per mostrare meglio il tuo articolo.
                            La prima immagine sarà quella principale.
                        </p>

                        <label className="publish-upload-area">
                            <i className="bi bi-cloud-arrow-up"></i>
                            <strong>Seleziona le immagini</strong>
                            <span>
                                JPG, PNG o WEBP · Massimo 5 MB per foto
                            </span>
                            <span className="publish-upload-limit">
                                {images.length}/10 immagini selezionate
                            </span>

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                onChange={handleImagesChange}
                                disabled={images.length >= 10 || loading}
                            />
                        </label>

                        {images.length > 0 && (
                            <div className="publish-image-grid">
                                {images.map((image, index) => (
                                    <div
                                        key={`${image.name}-${index}`}
                                        className="publish-image-item"
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Anteprima ${index + 1}`}
                                        />

                                        <button
                                            type="button"
                                            className="publish-remove-image"
                                            onClick={() => removeImage(index)}
                                            disabled={loading}
                                            aria-label={`Rimuovi immagine ${index + 1}`}
                                            title="Rimuovi immagine"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>

                                        {index === 0 && (
                                            <span className="publish-main-image-badge">
                                                <i className="bi bi-star-fill"></i>
                                                Principale
                                            </span>
                                        )}

                                        <div className="publish-image-name">
                                            {image.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="publish-actions">
                        <button
                            type="submit"
                            className="btn publish-submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Pubblicazione in corso...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Pubblica annuncio
                                </>
                            )}
                        </button>

                        <Link
                            to="/dashboard"
                            className="btn publish-cancel-button"
                        >
                            Annulla
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default CreateAnnouncement;
