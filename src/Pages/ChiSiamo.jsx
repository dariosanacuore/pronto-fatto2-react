
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/ChiSiamo.css";

function ChiSiamo() {
    return (
        <>
            <Header />

            <main className="chi-siamo-page">

                {/* Introduzione */}
                <section className="chi-siamo-hero container">
                    <span className="chi-siamo-etichetta">
                        CHI SIAMO
                    </span>

                    <h1>
                        Benvenuto su <span>ProntoFatto</span>
                    </h1>

                    <p className="chi-siamo-intro">
                        La piattaforma pensata per rendere la
                        compravendita online semplice, veloce e
                        alla portata di tutti.
                    </p>

                    <p className="chi-siamo-descrizione">
                        Mettiamo in contatto persone che vogliono
                        vendere oggetti che non utilizzano più con
                        chi è alla ricerca di qualcosa di utile,
                        interessante o speciale.
                    </p>
                </section>

                {/* I nostri valori */}
                <section className="container chi-siamo-valori">
                    <div className="text-center mb-5">
                        <h2>Perché scegliere ProntoFatto?</h2>
                        <p>
                            Un modo semplice per dare e trovare
                            nuove opportunità.
                        </p>
                    </div>

                    <div className="row g-4">

                        <div className="col-12 col-md-4">
                            <div className="card chi-siamo-card h-100">
                                <div className="chi-siamo-icona">
                                    <i className="bi bi-lightning-charge"></i>
                                </div>

                                <h3>Semplicità e velocità</h3>

                                <p>
                                    Pubblica i tuoi annunci, scopri
                                    nuove occasioni e trova facilmente
                                    ciò che cerchi.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card chi-siamo-card h-100">
                                <div className="chi-siamo-icona">
                                    <i className="bi bi-people"></i>
                                </div>

                                <h3>Una community connessa</h3>

                                <p>
                                    Mettiamo in contatto venditori
                                    e acquirenti, offrendo la possibilità
                                    di comunicare direttamente.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card chi-siamo-card h-100">
                                <div className="chi-siamo-icona">
                                    <i className="bi bi-recycle"></i>
                                </div>

                                <h3>Nuova vita agli oggetti</h3>

                                <p>
                                    Valorizziamo gli oggetti usati
                                    e aiutiamo a trovare loro una
                                    nuova casa.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Cosa puoi fare */}
                <section className="container chi-siamo-attivita">
                    <div className="row align-items-center g-4">

                        <div className="col-12 col-md-6">
                            <h2>Tutto quello che cerchi, in un unico posto</h2>

                            <p>
                                Dai videogiochi alle console, dagli
                                accessori ai gadget, su ProntoFatto
                                puoi esplorare annunci, salvare i tuoi
                                prodotti preferiti e contattare i venditori.
                            </p>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="chi-siamo-funzioni">

                                <div className="chi-siamo-funzione">
                                    <i className="bi bi-megaphone"></i>
                                    <div>
                                        <h3>Pubblica annunci</h3>
                                        <p>Metti in vendita ciò che non usi più.</p>
                                    </div>
                                </div>

                                <div className="chi-siamo-funzione">
                                    <i className="bi bi-heart"></i>
                                    <div>
                                        <h3>Salva i preferiti</h3>
                                        <p>Ritrova facilmente gli oggetti che ti interessano.</p>
                                    </div>
                                </div>

                                <div className="chi-siamo-funzione">
                                    <i className="bi bi-chat-dots"></i>
                                    <div>
                                        <h3>Contatta i venditori</h3>
                                        <p>Comunica direttamente con gli altri utenti.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* La nostra missione */}
                <section className="chi-siamo-missione">
                    <div className="container text-center">
                        <i className="bi bi-bullseye missione-icona"></i>

                        <h2>La nostra missione</h2>

                        <p>
                            Rendere ogni scambio più facile,
                            valorizzare gli oggetti e dare una
                            seconda possibilità a ciò che può
                            ancora essere utile a qualcun altro.
                        </p>

                        <h3>
                            ProntoFatto: trovi ciò che cerchi,
                            vendi ciò che non usi!
                        </h3>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default ChiSiamo;
