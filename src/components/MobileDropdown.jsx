
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "../css/MobileDropdown.css";

function MobileDropdown({
    logged,
    loading,
    wishlist = [],
    removeFromWishlist,
    getImageUrl
}) {
    const [open, setOpen] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false);

    function chiudiMenu() {
        setOpen(false);
        setOpenWishlist(false);
    }

    return (
        <div className="mobile-dropdown">

            {/* Pulsante principale */}
            <button
                type="button"
                className="mobile-dropdown-button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-label="Apri o chiudi il menu"
            >
                <i className="bi bi-list"></i>
                <span>Menu</span>
            </button>

            {/* Voci del menu */}
            {open && (
                <div className="mobile-dropdown-content">

                    {!loading && !logged && (
                        <>
                            <Link
                                to="/login"
                                onClick={chiudiMenu}
                            >
                                <i className="bi bi-box-arrow-in-right"></i>
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={chiudiMenu}
                            >
                                <i className="bi bi-person-plus"></i>
                                Registrati
                            </Link>
                        </>
                    )}

                    {!loading && logged && (
                        <>
                            <Link
                                to="/my-announcements"
                                onClick={chiudiMenu}
                            >
                                <i className="bi bi-card-list"></i>
                                Gestisci i miei annunci
                            </Link>

                            <Link
                                to="/announcements/create"
                                onClick={chiudiMenu}
                            >
                                <i className="bi bi-plus-circle"></i>
                                Vendi
                            </Link>
                            <Link to="/messaggi"
                                onClick={chiudiMenu}
                            >
                                <i className="bi bi-chat-dots"></i>
                                Messaggi
                            </Link>

                            <Link
                                to="/modifica-profilo"
                                onClick={chiudiMenu}
                            >
                                <i className="bi bi-person-gear"></i>
                                Modifica profilo
                            </Link>

                            {/* Logout: usa il componente già esistente */}
                            <div className="mobile-logout">
                                <LogoutButton />
                            </div>

                            <div className="mobile-menu-divider"></div>

                            {/* Wishlist */}
                            <button
                                type="button"
                                className="mobile-menu-item mobile-wishlist-toggle"
                                onClick={() =>
                                    setOpenWishlist((prev) => !prev)
                                }
                                aria-expanded={openWishlist}
                            >
                                <span>
                                    <i className="bi bi-heart-fill text-danger"></i>
                                    I miei preferiti
                                </span>

                                <span className="d-flex align-items-center gap-2">
                                    {wishlist.length > 0 && (
                                        <span className="badge bg-danger">
                                            {wishlist.length}
                                        </span>
                                    )}

                                    <i
                                        className={`bi ${openWishlist
                                            ? "bi-chevron-up"
                                            : "bi-chevron-down"
                                            }`}
                                    ></i>
                                </span>
                            </button>

                            {openWishlist && (
                                <div className="mobile-wishlist-content">

                                    {loading ? (
                                        <p className="text-secondary small">
                                            Caricamento preferiti...
                                        </p>
                                    ) : wishlist.length === 0 ? (
                                        <p className="text-secondary small">
                                            Non hai ancora salvato annunci.
                                        </p>
                                    ) : (
                                        wishlist.map((item) => (
                                            <div
                                                key={item.announcement_id}
                                                className="mobile-wishlist-item"
                                            >
                                                {item.image && (
                                                    <img
                                                        src={getImageUrl(item.image)}
                                                        alt={item.title}
                                                    />
                                                )}

                                                <div className="mobile-wishlist-info">
                                                    <div
                                                        className="fw-semibold text-truncate"
                                                        title={item.title}
                                                    >
                                                        {item.title}
                                                    </div>

                                                    <div className="text-primary small fw-bold">
                                                        {Number(
                                                            item.price
                                                        ).toLocaleString(
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
                                                    className="btn btn-sm btn-outline-danger"
                                                    aria-label={`Rimuovi ${item.title} dai preferiti`}
                                                    onClick={() =>
                                                        removeFromWishlist(
                                                            item.announcement_id
                                                        )
                                                    }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        ))
                                    )}

                                    <Link
                                        to="/wishlist"
                                        className="btn btn-primary w-100 mt-2"
                                        onClick={chiudiMenu}
                                    >
                                        Visualizza tutti i preferiti
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    <Link
                        to="/chi-siamo"
                        onClick={chiudiMenu}
                    >
                        <i className="bi bi-info-circle"></i>
                        Chi siamo
                    </Link>

                </div>
            )}
        </div>
    );
}

export default MobileDropdown;
