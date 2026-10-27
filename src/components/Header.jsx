
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import UserProfileMenu from "./UserProfileMenu";
import MobileDropdown from "./MobileDropdown";
import "../css/Header.css";

function Header() {
    const [wishlist, setWishlist] = useState([]);
    const [openWishlist, setOpenWishlist] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verifica l'autenticazione
    useEffect(() => {
        api.get("/auth/me")
            .then(() => {
                setIsLogged(true);
            })
            .catch(() => {
                setIsLogged(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Recupera la wishlist
    useEffect(() => {
        if (!isLogged) {
            setWishlist([]);
            setOpenWishlist(false);
            return;
        }

        api.get("/wishlist")
            .then((response) => {
                setWishlist(response.data);
            })
            .catch((error) => {
                console.error(
                    "Errore caricamento wishlist:",
                    error
                );
            });
    }, [isLogged]);

    // Rimuove un annuncio dai preferiti
    async function removeFromWishlist(id) {
        try {
            await api.delete(`/wishlist/${id}`);

            setWishlist((prev) =>
                prev.filter(
                    (item) =>
                        String(item.announcement_id) !== String(id)
                )
            );
        } catch (error) {
            console.error(
                "Errore rimozione wishlist:",
                error
            );
        }
    }

    // Genera il percorso dell'immagine
    function getImageUrl(image) {
        if (!image) return null;

        if (image.startsWith("http")) {
            return image;
        }

        if (image.startsWith("/")) {
            return `http://localhost:3000${image}`;
        }

        return `http://localhost:3000/uploads/${image}`;
    }

    return (

        <nav className="navbar bg-white header-navbar">
            <div className="container-fluid px-3 header-layout">

                {/* Logo */}
                <Link
                    to={isLogged ? "/dashboard" : "/home"}
                    className="header-logo"
                >
                    <img
                        src="/prontofatto-logo.jpeg"
                        alt="Logo ProntoFatto"
                    />
                </Link>

                {/* Navbar desktop */}
                <div className="header-desktop-actions">

                    {!isLogged && !loading && (
                        <>
                            <Link
                                to="/login"
                                className="header-about-link"
                            >
                                Accedi
                            </Link>

                            <Link
                                to="/register"
                                className="header-about-link"
                            >
                                Registrati
                            </Link>
                        </>
                    )}

                    {isLogged && (
                        <>
                            <Link
                                to="/my-announcements"
                                className="btn header-btn header-btn-outline"
                            >
                                <i className="bi bi-grid me-2"></i>
                                I miei annunci
                            </Link>

                            <Link
                                to="/announcements/create"
                                className="header-about-link"
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                Vendi
                            </Link>
                        </>
                    )}

                    <Link
                        to="/chi-siamo"
                        className="header-about-link"
                    >
                        Chi siamo
                    </Link>

                    {/* Wishlist */}
                    {!loading && isLogged && (
                        <div className="dropdown position-relative header-wishlist">
                            <button
                                type="button"
                                className="btn header-wishlist-button"
                                onClick={() =>
                                    setOpenWishlist((prev) => !prev)
                                }
                                aria-expanded={openWishlist}
                                aria-label="Apri la wishlist"
                            >
                                <i className="bi bi-heart"></i>

                                {wishlist.length > 0 && (
                                    <span className="header-wishlist-badge">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>

                            {openWishlist && (
                                <div className="dropdown-menu show shadow header-wishlist-menu">

                                    <div className="header-wishlist-heading">
                                        <div className="header-wishlist-heading-icon">
                                            <i className="bi bi-heart-fill"></i>
                                        </div>

                                        <div>
                                            <h6>I tuoi preferiti</h6>
                                            <span>
                                                {wishlist.length}{" "}
                                                {wishlist.length === 1
                                                    ? "annuncio salvato"
                                                    : "annunci salvati"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="header-wishlist-content">
                                        {wishlist.length === 0 ? (
                                            <div className="header-wishlist-empty">
                                                <i className="bi bi-heart"></i>
                                                <p>Ancora nessun preferito</p>
                                                <span>
                                                    Salva gli annunci che ti interessano
                                                    per ritrovarli qui.
                                                </span>
                                            </div>
                                        ) : (
                                            wishlist.map((item) => (
                                                <div
                                                    key={item.announcement_id}
                                                    className="header-wishlist-item"
                                                >
                                                    {item.image ? (
                                                        <img
                                                            src={getImageUrl(item.image)}
                                                            alt={item.title}
                                                            className="header-wishlist-image"
                                                        />
                                                    ) : (
                                                        <div className="header-wishlist-placeholder">
                                                            <i className="bi bi-image"></i>
                                                        </div>
                                                    )}

                                                    <div className="header-wishlist-info">
                                                        <div
                                                            className="header-wishlist-title"
                                                            title={item.title}
                                                        >
                                                            {item.title}
                                                        </div>

                                                        <div className="header-wishlist-price">
                                                            {Number(item.price).toLocaleString(
                                                                "it-IT",
                                                                {
                                                                    style: "currency",
                                                                    currency: "EUR"
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="header-wishlist-remove"
                                                        title="Rimuovi dai preferiti"
                                                        aria-label={`Rimuovi ${item.title} dai preferiti`}
                                                        onClick={() =>
                                                            removeFromWishlist(
                                                                item.announcement_id
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-trash3"></i>
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="header-wishlist-footer">

                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!loading && isLogged && <UserProfileMenu />}

                </div>

                {/* Menu smartphone */}
                <MobileDropdown
                    logged={isLogged}
                    loading={loading}
                    wishlist={wishlist}
                    removeFromWishlist={removeFromWishlist}
                    getImageUrl={getImageUrl}
                />

            </div>
        </nav>

    );
}

export default Header;

