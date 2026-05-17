class ContactPage extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

        <main class="contact-page">

            <section class="contact-hero">

                <h1 class="contact-title">
                    Contáctanos
                </h1>

                 <p class="contact-subtitle">
                    📍 Nos encontramos ubicados en la carrera 19 #35-02,
                    cerca del centro de la ciudad, restaurantes, comercio y puntos de interés
                    para que disfrutes una estadía cómoda y accesible.
                 </p>
                <div class="map-container">

                    <iframe
                        src="https://www.google.com/maps?q=7.119349,-73.122741&output=embed"
                        allowfullscreen=""
                        loading="lazy">
                     </iframe>

                    <div class="map-badge">
                        🏨 Hotel El Rincón del Carmen
                    </div>

                </div>

            </section>


            <section class="contact-info">

                <div class="contact-card">

                    <span class="contact-icon">
                        📞
                    </span>

                    <div>
                        <h3>Teléfono</h3>
                        <p>+57 317 482 1943</p>
                    </div>

                </div>


                <div class="contact-card">

                       <span class="contact-icon">
                         📲
                       </span>

                       <div>
                         <h3>WhatsApp</h3>
                         <p>+57 320 654 8891</p>
                </div>
                </div>
            </section>


                <div class="contact-card">

                    <span class="contact-icon">
                        ✉️
                    </span>

                    <div>
                        <h3>Correo electrónico</h3>
                        <p>reservas@rincondelcarmen.com</p>
                    </div>

                </div>

            </section>

        </main>

        `;
    }
}
customElements.define("contact-page", ContactPage);