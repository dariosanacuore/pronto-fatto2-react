
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import api from "../api";
import "../css/UserProfileMenu.css";

function UserProfileMenu() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [imageError, setImageError] = useState(false);

    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Carica i dati del profilo
    useEffect(() => {
        api.get("/profile")
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Errore caricamento profilo:", error);
            });
    }, []);

    // Costruisce il percorso della foto profilo
    function getProfileImage(image) {
        if (!image) {
            return null;
        }

        // Se l'immagine ha già un URL completo, lo restituisce
        if (image.startsWith("http")) {
            return image;
        }

        // URL del backend configurato nel file .env
        const API_URL = import.meta.env.VITE_API_URL;

        // Costruisce il percorso completo dell'immagine
        return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
    }

    const profileImage = getProfileImage(user?.immagine_profilo);

    // Mostra la foto oppure l'avatar predefinito
    const showDefaultAvatar = !profileImage || imageError;

    // Chiude il menu quando clicchi fuori
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // Avatar riutilizzabile
    function ProfileAvatar() {
        if (showDefaultAvatar) {
            return (
                <div className="profile-avatar profile-avatar-default">
                    <i className="bi bi-person-fill"></i>
                </div>
            );
        }

        return (
            <img
                src={profileImage}
                alt="Foto profilo"
                className="profile-avatar"
                onError={() => setImageError(true)}
            />
        );
    }

    return (
        <div className="user-profile-menu" ref={menuRef}>

            {/* Pulsante che apre il menu */}
            <button
                type="button"
                className="profile-trigger"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                aria-label="Apri menu profilo"
            >
                <ProfileAvatar />

                <i className="bi bi-chevron-down"></i>
            </button>

            {/* Menu a tendina */}
            {open && (
                <div className="profile-dropdown">

                    {/* Informazioni utente */}
                    <div className="profile-info">
                        <ProfileAvatar />

                        <div className="profile-info-text">
                            <strong>
                                {user?.username || user?.nome || "Il mio profilo"}
                            </strong>

                            <small>
                                {user?.email || "Utente registrato"}
                            </small>
                        </div>
                    </div>

                    <hr />

                    {/* Modifica profilo */}
                    <button
                        type="button"
                        className="dropdown-item-custom"
                        onClick={() => {
                            setOpen(false);
                            navigate("/modifica-profilo");
                        }}
                    >
                        <i className="bi bi-person-gear"></i>
                        Modifica profilo
                    </button>

                    {/* Messaggi */}
                    <button
                        type="button"
                        className="dropdown-item-custom"
                        onClick={() => {
                            setOpen(false);
                            navigate("/messaggi");
                        }}
                    >
                        <i className="bi bi-chat-dots"></i>
                        Messaggi
                    </button>

                    {/* Logout */}
                    <div className="dropdown-item-custom logout-item">
                        <i className="bi bi-box-arrow-right"></i>
                        <LogoutButton />
                    </div>

                </div>
            )}
        </div>
    );
}

export default UserProfileMenu;
