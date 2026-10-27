
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../css/ProductDetail.css";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false);
    const [contattando, setContattando] = useState(false);
    const [erroreChat, setErroreChat] = useState("");

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/auth/me")
            .then(() => setIsLogged(true))
            .catch(() => setIsLogged(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        setError("");
        setSelectedImage(0);

        api.get(`/announcements/${id}`)
            .then((response) => {
                setProduct(response.data.announcement ?? response.data);
            })
            .catch((error) => {
                console.error("Errore caricamento annuncio:", error);
                setError("Impossibile caricare l'annuncio.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    function getImageUrl(image) {
        if (!image) return null;

        if (image.startsWith("http://") || image.startsWith("https://")) {
            return image;
        }

        const API_URL = import.meta.env.VITE_API_URL;

        if (image.startsWith("/")) {
            return `${API_URL}${image}`;
        }

        return `${API_URL}/uploads/${image}`;
    }

    const images = product
        ? product.images?.length
            ? product.images
            : product.image
                ? [product.image]
                : []
        : [];

    async function contattaVenditore() {
        try {
            setContattando(true);
            setErroreChat("");

            const venditoreId = product?.user_id;

            if (!venditoreId) {
                setErroreChat("Non è stato possibile trovare il venditore.");
                return;
            }

            const risposta = await api.post("/chat/conversazioni", {
                altroUtenteId: venditoreId
            });

            navigate(`/chat/${risposta.data.id}`);
        } catch (error) {
            console.error("Errore apertura chat:", error.response?.data || error);

            setErroreChat(
                error.response?.data?.message ||
                "Errore durante l'apertura della chat."
            );
        } finally {
            setContattando(false);
        }
    }

    async function addToWishlist() {
        try {
            await api.post("/wishlist", {
                announcement_id: product.id
            });

            setMessage("Annuncio aggiunto ai preferiti!");
        } catch (error) {
            console.error("Errore wishlist:", error);

            setMessage(
                error.response?.status === 401
                    ? "Devi effettuare l'accesso per aggiungere ai preferiti."
                    : error.response?.data?.message ||
                    "Non è stato possibile aggiungere l'annuncio ai preferiti."
            );
        }
    }

    if (loading) {
        return (
            <div className="product-state-page">
                <div className="product-loading">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                    <p>Stiamo preparando il tuo annuncio...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-state-page">
                <div className="product-error-card">
                    <i className="bi bi-exclamation-circle"></i>
                    <h2>Annuncio non disponibile</h2>
                    <p>{error || "Annuncio non trovato."}</p>

                    <Link
                        to={isLogged ? "/dashboard" : "/home"}
                        className="product-primary-button"
                    >
                        <i className="bi bi-arrow-left"></i>
                        Torna agli annunci
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="product-detail-page">
            <div className="product-detail-container">

                <Link
                    to={isLogged ? "/dashboard" : "/home"}
                    className="product-back-link"
                >
                    <i className="bi bi-arrow-left"></i>
                    Torna agli annunci
                </Link>

                <div className="product-detail-grid">

                    {/* Galleria immagini */}
                    <section className="product-gallery">
                        <div className="product-gallery-top">
                            <span className="product-gallery-label">
                                <i className="bi bi-images"></i>
                                Foto dell'annuncio
                            </span>

                            {images.length > 0 && (
                                <span className="product-photo-count">
                                    {selectedImage + 1} / {images.length}
                                </span>
                            )}
                        </div>

                        <div className="product-main-image">
                            {images.length > 0 ? (
                                <img
                                    src={getImageUrl(images[selectedImage])}
                                    alt={`${product.title} - foto ${selectedImage + 1}`}
                                    onError={(e) => {
                                        e.currentTarget.style.visibility = "hidden";
                                    }}
                                />
                            ) : (
                                <div className="product-no-image">
                                    <i className="bi bi-image"></i>
                                    <span>Nessuna immagine disponibile</span>
                                </div>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="product-thumbnails">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        className={`product-thumbnail ${selectedImage === index ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(index)}
                                        aria-label={`Visualizza foto ${index + 1}`}
                                        aria-pressed={selectedImage === index}
                                    >
                                        <img
                                            src={getImageUrl(image)}
                                            alt={`Miniatura ${index + 1}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Dettagli annuncio */}
                    <section className="product-info">
                        <div className="product-category-badge">
                            <i className="bi bi-tag"></i>
                            {product.category || "Annuncio"}
                        </div>

                        <h1 className="product-title">{product.title}</h1>

                        <div className="product-price">
                            {Number(product.price).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "EUR"
                            })}
                        </div>

                        <div className="product-divider"></div>

                        <div className="product-description-section">
                            <h2>
                                <i className="bi bi-card-text"></i>
                                Descrizione
                            </h2>

                            <p>
                                {product.description ||
                                    "Il venditore non ha inserito una descrizione."}
                            </p>
                        </div>

                        <div className="product-details-box">
                            <div className="product-detail-row">
                                <span>
                                    <i className="bi bi-grid"></i>
                                    Categoria
                                </span>
                                <strong>
                                    {product.category || "Non specificata"}
                                </strong>
                            </div>

                            <div className="product-detail-row">
                                <span>
                                    <i className="bi bi-bookmark"></i>
                                    Sottocategoria
                                </span>
                                <strong>
                                    {product.subcategory || "Non specificata"}
                                </strong>
                            </div>
                        </div>

                        <div className="product-seller">
                            <div className="product-seller-avatar">
                                <i className="bi bi-person-fill"></i>
                            </div>

                            <div>
                                <span className="product-seller-label">
                                    Pubblicato da
                                </span>
                                <strong>
                                    {product.user_name ||
                                        product.username ||
                                        "Utente"}
                                </strong>
                            </div>
                        </div>

                        <div className="product-actions">
                            <button
                                type="button"
                                className="product-contact-button"
                                onClick={contattaVenditore}
                                disabled={contattando}
                            >
                                {contattando ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                        ></span>
                                        Apertura chat...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-chat-dots-fill"></i>
                                        Contatta il venditore
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="product-wishlist-button"
                                onClick={addToWishlist}
                            >
                                <i className="bi bi-heart"></i>
                                Aggiungi ai preferiti
                            </button>
                        </div>

                        {erroreChat && (
                            <div className="product-feedback error">
                                <i className="bi bi-exclamation-circle"></i>
                                {erroreChat}
                            </div>
                        )}

                        {message && (
                            <div className={`product-feedback ${message.includes("aggiunto") ? "success" : "error"
                                }`}>
                                <i className={`bi ${message.includes("aggiunto")
                                    ? "bi-check-circle-fill"
                                    : "bi-info-circle"
                                    }`}></i>
                                <span>{message}</span>

                                {message.includes("Devi effettuare") && (
                                    <Link to="/login">Accedi</Link>
                                )}
                            </div>
                        )}

                        <div className="product-safe-note">
                            <i className="bi bi-shield-check"></i>
                            <span>
                                Hai domande sull'articolo? Contatta il venditore
                                prima di procedere.
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;
