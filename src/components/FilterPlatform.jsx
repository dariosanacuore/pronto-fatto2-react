
import "../css/FilterPlatform.css";
import nintendoIcon from "../assets/nintendo-switch.svg";
import xboxIcon from "../assets/xbox.svg";
import ps4Icon from "../assets/playstation.svg";
import pcIcon from "../assets/laptop.svg";

function FilterPlatform({ selectedPlatform, setSelectedPlatform }) {
    const platforms = [
        { name: "PlayStation", icon: ps4Icon },
        { name: "PC", icon: pcIcon },
        { name: "Xbox", icon: xboxIcon },
        { name: "Nintendo", icon: nintendoIcon }
    ];
    console.log("selectedPlatform:", selectedPlatform);
    console.log("setSelectedPlatform:", typeof setSelectedPlatform);

    return (
        <div className="my-4">
            <h4 className="mb-3">Scegli una piattaforma</h4>

            <div className="row g-3">
                {platforms.map((platform) => (
                    <div
                        className="col-6 col-md-3"
                        key={platform.name}
                    >
                        <div
                            className={`card platform-card p-3 d-flex flex-row align-items-center gap-3 ${selectedPlatform === platform.name
                                ? "border-primary border-3 bg-light"
                                : "border rounded-4"
                                }`}
                            style={{
                                cursor: "pointer",
                                minHeight: "70px"
                            }}
                            onClick={() =>
                                setSelectedPlatform(platform.name)
                            }
                        >
                            <img
                                src={platform.icon}
                                alt={platform.name}
                                width="35"
                                height="35"
                            />

                            <h5 className="mb-0">
                                {platform.name}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="btn btn-outline-secondary mt-3"
                onClick={() => setSelectedPlatform("")}
            >
                Mostra tutti
            </button>
        </div>
    );
}

export default FilterPlatform;
