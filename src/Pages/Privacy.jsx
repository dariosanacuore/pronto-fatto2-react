import Header from "../components/Header";
import "../css/LegalPages.css";
import Footer from "../components/Footer";

function Privacy() {
    return (
        <>
            <Header />

            <main className="legal-page container py-5">
                <div className="legal-card">
                    <div className="legal-heading">
                        <i className="bi bi-shield-lock"></i>
                        <h1>Privacy Policy</h1>
                        <p>Come vengono trattati i dati personali su ProntoFatto.</p>
                    </div>

                    <section>
                        <h2>1. Titolare del trattamento</h2>
                        <p>
                            Il titolare del trattamento è il soggetto che
                            gestisce ProntoFatto.
                        </p>
                        <p>
                            Prima della pubblicazione, inserisci qui il nome
                            o la denominazione del titolare e un indirizzo
                            email dedicato alla privacy.
                        </p>
                    </section>

                    <section>
                        <h2>2. Dati raccolti</h2>
                        <p>In base alle funzionalità effettivamente disponibili, il sito può trattare:</p>
                        <ul>
                            <li>nome, indirizzo email e dati dell'account;</li>
                            <li>password conservate in forma protetta;</li>
                            <li>foto profilo e contenuti degli annunci;</li>
                            <li>messaggi scambiati tramite la chat;</li>
                            <li>prodotti salvati nella wishlist;</li>
                            <li>dati tecnici necessari al funzionamento e alla sicurezza del sito;</li>
                            <li>informazioni relative a ordini, pagamenti e spedizioni, se questi servizi saranno attivati.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Finalità del trattamento</h2>
                        <p>I dati possono essere trattati per:</p>
                        <ul>
                            <li>creare e gestire gli account;</li>
                            <li>pubblicare e gestire gli annunci;</li>
                            <li>consentire le comunicazioni tra utenti;</li>
                            <li>gestire eventuali acquisti, pagamenti e spedizioni;</li>
                            <li>prevenire frodi, abusi e accessi non autorizzati;</li>
                            <li>adempiere agli obblighi di legge.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Base giuridica</h2>
                        <p>
                            Il trattamento deve basarsi su una delle basi
                            giuridiche previste dal GDPR, a seconda della
                            finalità: esecuzione di un contratto o di misure
                            precontrattuali, obblighi legali, legittimo
                            interesse oppure consenso, quando necessario.
                        </p>
                    </section>

                    <section>
                        <h2>5. Conservazione dei dati</h2>
                        <p>
                            I dati sono conservati per il periodo necessario
                            alle finalità per cui sono raccolti e secondo
                            gli eventuali obblighi di legge. I periodi
                            effettivi devono essere definiti dal gestore
                            in base ai dati e ai servizi utilizzati.
                        </p>
                    </section>

                    <section>
                        <h2>6. Comunicazione a terzi</h2>
                        <p>
                            I dati possono essere comunicati ai fornitori
                            tecnici necessari al funzionamento del sito,
                            come hosting, servizi email e, se attivati,
                            fornitori di pagamento e spedizione.
                        </p>
                        <p>
                            Ogni fornitore deve essere valutato in base
                            al servizio prestato, ai dati trattati e
                            agli accordi applicabili.
                        </p>
                    </section>

                    <section>
                        <h2>7. Sicurezza</h2>
                        <p>
                            Il gestore adotta misure tecniche e organizzative
                            adeguate a proteggere i dati. Nessun sistema
                            informatico può tuttavia garantire una sicurezza
                            assoluta.
                        </p>
                    </section>

                    <section>
                        <h2>8. Diritti degli interessati</h2>
                        <p>
                            Nei casi previsti dal GDPR, gli utenti possono
                            chiedere accesso ai propri dati, rettifica,
                            cancellazione, limitazione del trattamento,
                            portabilità e possono opporsi a determinati
                            trattamenti. Possono inoltre proporre reclamo
                            al Garante per la protezione dei dati personali.
                        </p>
                    </section>

                    <section>
                        <h2>9. Cookie e tecnologie simili</h2>
                        <p>
                            Il sito deve informare gli utenti sui cookie
                            e sulle altre tecnologie effettivamente utilizzate.
                            Gli eventuali strumenti non necessari devono
                            essere gestiti secondo le regole applicabili
                            in materia di consenso.
                        </p>
                    </section>

                    <section>
                        <h2>10. Contatti privacy</h2>
                        <p>
                            Per esercitare i propri diritti o ricevere
                            informazioni sul trattamento, l'utente può
                            contattare il titolare tramite l'indirizzo email
                            dedicato alla privacy, da inserire prima della
                            pubblicazione.
                        </p>
                    </section>

                </div>
            </main>
            <Footer />
        </>
    );
}

export default Privacy;