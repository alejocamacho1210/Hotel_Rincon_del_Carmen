class ReservationPage extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

        <main class="reservation-page">

            <section class="reservation-hero">

                <h1 class="reservation-title">
                    Reserva tu habitación ideal
                </h1>

                <p class="reservation-subtitle">
                    Descubre espacios cómodos y modernos para disfrutar tu estadía.
                </p>

            </section>


            <section class="filters-section">

                <div class="filter-box">

                    <label>Entrada</label>

                    <input type="date" id="check-in">

                </div>


                <div class="filter-box">

                    <label>Salida</label>

                    <input type="date" id="check-out">

                </div>


                <div class="filter-box">

                    <label>Personas</label>

                    <input 
                        type="number" 
                        id="cantPersonas" 
                        placeholder="0"
                        min="1"
                    >

                </div>

            </section>


            <!-- ESTADO INICIAL -->
            <section class="default-state" id="default-state">

                <img 
                    src="../images/cama_blancoynegro_pag2.png"
                    alt="Habitación hotel"
                    class="default-image"
                >

            </section>


            <!-- HABITACIONES -->
            <section class="rooms-section" id="rooms-section">

            </section>

        </main>

        `;

    }


    room(img, name, description, price) {

        return `

        <article class="room-card">

            <img src="${img}" class="room-image">

            <div class="room-content">

                <h2>${name}</h2>

                <p class="room-description">
                    ${description}
                </p>

                <div class="room-services">

                    <span>📶 Wifi</span>
                    <span>🛏️ Comfort</span>
                    <span>📺 TV</span>

                </div>

                <div class="room-footer">

                    <strong>${price} / noche</strong>

                    <button>
                        Reservar
                    </button>

                </div>

            </div>

        </article>

        `;
    }

}

customElements.define("reservation-page", ReservationPage);