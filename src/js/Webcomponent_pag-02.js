class ReservationPage extends HTMLElement {

    connectedCallback(){

        this.innerHTML = `

        <main class="reservation-page">

            <section class="filters-section">

                <input
                    type="date"
                    id="checkIn"
                >

                <input
                    type="date"
                    id="checkOut"
                >

                <input
                    type="number"
                    id="personas"
                    min="1"
                    placeholder="Personas"
                >

            </section>

            <section
                id="roomsContainer"
                class="rooms-section"
            >

            </section>

        </main>

        `;
    }
}

customElements.define(
    "reservation-page",
    ReservationPage
);