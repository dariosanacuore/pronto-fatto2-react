
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../css/ProfileEdit.css";

const API = "http://localhost:3000/api/profile";

function EditProfile() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [immagine, setImmagine] = useState(null);
    const [anteprima, setAnteprima] = useState(null);
    const [messaggio, setMessaggio] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API, { withCredentials: true })
            .then((response) => {
                setNome(response.data.nome);
                setEmail(response.data.email);

                if (response.data.immagine_profilo) {
                    setAnteprima(
                        `http://localhost:3000${response.data.immagine_profilo}`
                    );
                }
            })
            .catch(() => {
                setMessaggio("Impossibile caricare il profilo.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (file) {
            setImmagine(file);
            setAnteprima(URL.createObjectURL(file));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessaggio("");

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("email", email);

        if (immagine) {
            formData.append("immagine", immagine);
        }

        try {
            const response = await axios.put(API, formData, {
                withCredentials: true,
            });

            setMessaggio(response.data.message);

            if (response.data.user.immagine_profilo) {
                setAnteprima(
                    `http://localhost:3000${response.data.user.immagine_profilo}`
                );
                navigate("/dashboard");
            }

            setImmagine(null);
        } catch (error) {
            setMessaggio(
                error.response?.data?.message ||
                "Errore durante il salvataggio."
            );
        }
    }

    if (loading) {
        return <p className="text-center mt-5">Caricamento profilo...</p>;
    }

    return (
        <>
            <Header />

            <>
                <div className="container py-5 profile-edit-page">
                    <div className="profile-edit-card">
                        <div className="profile-edit-header">
                            <div className="profile-edit-header-icon">
                                <i className="bi bi-person-gear"></i>
                            </div>

                            <div>
                                <h2>Modifica profilo</h2>
                                <p>
                                    Aggiorna le tue informazioni personali su ProntoFatto.
                                </p>
                            </div>
                        </div>

                        {messaggio && (
                            <div className="alert alert-info profile-edit-alert" role="alert">
                                <i className="bi bi-info-circle me-2"></i>
                                {messaggio}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="profile-avatar-section">
                                <div className="profile-avatar-wrapper">
                                    <img
                                        src={anteprima || "/default-avatar.png"}
                                        alt="Foto profilo"
                                        className="profile-edit-avatar"
                                    />

                                    <span className="profile-avatar-camera">
                                        <i className="bi bi-camera-fill"></i>
                                    </span>
                                </div>

                                <h5>La tua foto profilo</h5>

                                <p>
                                    Scegli una foto per rendere riconoscibile il tuo profilo.
                                </p>

                                <label
                                    className="profile-image-upload"
                                    htmlFor="profile-image"
                                >
                                    <i className="bi bi-cloud-arrow-up"></i>
                                    <span>Scegli una nuova foto</span>
                                </label>

                                <input
                                    id="profile-image"
                                    type="file"
                                    className="profile-file-input"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                />

                                <div className="profile-image-help">
                                    Formati supportati: JPG, PNG e WEBP
                                </div>
                            </div>

                            <div className="profile-edit-divider"></div>

                            <div className="profile-edit-fields">
                                <h5 className="profile-edit-section-title">
                                    <i className="bi bi-person-lines-fill"></i>
                                    Informazioni personali
                                </h5>

                                <div className="mb-4">
                                    <label
                                        className="form-label profile-edit-label"
                                        htmlFor="profile-name"
                                    >
                                        Nome
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <i className="bi bi-person"></i>

                                        <input
                                            id="profile-name"
                                            type="text"
                                            className="form-control profile-edit-input"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            placeholder="Inserisci il tuo nome"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        className="form-label profile-edit-label"
                                        htmlFor="profile-email"
                                    >
                                        Email
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <i className="bi bi-envelope"></i>

                                        <input
                                            id="profile-email"
                                            type="email"
                                            className="form-control profile-edit-input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="nome@esempio.it"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="profile-edit-actions">
                                <button
                                    type="submit"
                                    className="btn profile-save-button"
                                >
                                    <i className="bi bi-check2-circle me-2"></i>
                                    Salva modifiche
                                </button>
                            </div>
                            <Link to="/dashboard" className="dashboard-button">

                                <i className="bi bi-arrow-left"></i>
                                <span>Vai alla Dashboard</span>
                                <i className="bi bi-grid-1x2-fill"></i>

                            </Link>
                        </form>
                    </div>
                </div>
            </>

        </>
    );
}

export default EditProfile;
