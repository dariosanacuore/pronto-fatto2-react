
import { useNavigate } from "react-router-dom";
import api from "../api";

function LogoutButton() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api.post("/auth/logout");
            navigate("/home");
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    }

    return (
        <div className="d-flex justify-content-end">
            <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
            >
                Esci
            </button>
        </div>
    );
}

export default LogoutButton;
