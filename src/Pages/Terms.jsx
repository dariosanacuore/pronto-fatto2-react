import Header from "../components/Header";
import "../css/LegalPages.css";
import Footer from "../components/Footer";

function Terms() {
    return (
        <>
            <Header />

            <main className="legal-page container py-5">
                <div className="legal-card">
                    <div className="legal-heading">
                        <i className="bi bi-file-earmark-text"></i>
                        <h1>Termini e condizioni</h1>
                        <p>Le regole per utilizzare ProntoFatto.</p>
                    </div>

                    <section>
                        <h2>1. Informazioni generali</h2>
                        <p>
                            ProntoFatto è una piattaforma online pensata per
                            consentire agli utenti di pubblicare annunci,
                            cercare prodotti e contattare altri utenti.
                        </p>
                        <p>
                            Utilizzando il sito, l'utente dichiara di aver letto
                            e accettato i presenti termini.
                        </p>
                    </section>

                    <section>
                        <h2>2. Registrazione e account</h2>
                        <p>
                            Per utilizzare alcune funzionalità è necessario
                            creare un account e fornire informazioni corrette
                            e aggiornate. L'utente è responsabile della
                            riservatezza delle proprie credenziali.
                        </p>
                    </section>

                    <section>
                        <h2>3. Pubblicazione degli annunci</h2>
                        <p>
                            Gli utenti devono pubblicare annunci veritieri,
                            con descrizioni e prezzi corretti e immagini
                            pertinenti al prodotto offerto.
                        </p>
                        <p>
                            È vietato pubblicare contenuti illegali,
                            ingannevoli, offensivi o relativi a prodotti
                            la cui vendita è vietata dalla legge.
                        </p>
                    </section>

                    <section>
                        <h2>4. Rapporti tra utenti</h2>
                        <p>
                            Gli utenti sono responsabili delle comunicazioni,
                            degli accordi e delle transazioni effettuate
                            tra loro. Prima di concludere un acquisto,
                            è opportuno verificare le condizioni del prodotto,
                            il prezzo e le modalità di consegna.
                        </p>
                    </section>

                    <section>
                        <h2>5. Pagamenti e spedizioni</h2>
                        <p>
                            Se ProntoFatto integra servizi di pagamento
                            o spedizione, le relative condizioni saranno
                            indicate prima dell'utilizzo del servizio.
                            I pagamenti possono essere soggetti alle
                            condizioni dei fornitori esterni.
                        </p>
                        <p>
                            Non effettuare pagamenti al di fuori delle
                            modalità ufficialmente indicate dalla piattaforma
                            quando si utilizza un servizio di pagamento
                            integrato.
                        </p>
                    </section>

                    <section>
                        <h2>6. Responsabilità</h2>
                        <p>
                            Nei limiti consentiti dalla legge, ProntoFatto
                            non è responsabile dei comportamenti degli utenti,
                            delle informazioni inesatte inserite negli annunci
                            o dell'inadempimento degli accordi tra venditore
                            e acquirente.
                        </p>
                        <p>
                            Nessuna disposizione esclude o limita i diritti
                            e le responsabilità che non possono essere esclusi
                            ai sensi della normativa applicabile.
                        </p>
                    </section>

                    <section>
                        <h2>7. Sospensione degli account</h2>
                        <p>
                            In caso di violazioni dei presenti termini,
                            attività fraudolente o utilizzo illecito del sito,
                            il gestore può adottare misure proporzionate,
                            nel rispetto della legge applicabile.
                        </p>
                    </section>

                    <section>
                        <h2>8. Modifiche ai termini</h2>
                        <p>
                            I presenti termini possono essere aggiornati.
                            Le modifiche saranno pubblicate su questa pagina,
                            indicando la data di aggiornamento.
                        </p>
                    </section>

                    <section>
                        <h2>9. Contatti</h2>
                        <p>
                            Per domande sui termini di utilizzo, puoi
                            consultare la pagina Contatti.
                        </p>
                    </section>


                </div>
            </main>
            <Footer />
        </>
    );
}

export default Terms;