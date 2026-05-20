// admin.js

const totalRooms =
    document.getElementById("totalRooms");

const availableRooms =
    document.getElementById("availableRooms");

const adminRoomsGrid =
    document.getElementById("adminRoomsGrid");

const adminReservationsGrid =
    document.getElementById("adminReservationsGrid");


// =========================
// HABITACIONES
// =========================

let habitaciones =
    JSON.parse(
        localStorage.getItem("hotelRooms")
    ) || [];


// =========================
// RESERVAS
// =========================

let reservaciones =
    JSON.parse(
        localStorage.getItem("reservas")
    ) || [];


// =========================
// ESTADISTICAS
// =========================

function renderStats() {

    totalRooms.textContent =
        habitaciones.length;

    const disponibles =
        habitaciones.reduce(
            (acc, habitacion) =>
                acc + Number(habitacion.cantidadDisponibles),
            0
        );

    availableRooms.textContent =
        disponibles;

}


// =========================
// RENDER HABITACIONES
// =========================

function renderRooms() {

    adminRoomsGrid.innerHTML = "";

    habitaciones.forEach((habitacion) => {

        adminRoomsGrid.innerHTML += `

        <article class="admin-room-card">

            <img
                src="../images/estandar_king.jpeg"
                class="admin-room-image"
            >

            <div class="admin-room-content">

                <h3>${habitacion.tipo}</h3>

                <textarea
                    id="descripcion-${habitacion.id}"
                >${habitacion.descripcion}</textarea>

                <input
                    type="number"
                    id="precio-${habitacion.id}"
                    value="${habitacion.precio}"
                >

                <input
                    type="number"
                    id="disponibles-${habitacion.id}"
                    value="${habitacion.cantidadDisponibles}"
                >

                <input
                    type="number"
                    id="min-${habitacion.id}"
                    value="${habitacion["capacidad minima"]}"
                >

                <input
                    type="number"
                    id="max-${habitacion.id}"
                    value="${habitacion["capacidad maxima"]}"
                >

                <input
                    type="text"
                    id="ubicacion-${habitacion.id}"
                    value="${habitacion.ubicacion}"
                >

                <input
                    type="text"
                    id="servicios-${habitacion.id}"
                    value="${habitacion.servicios.join(", ")}"
                >

                <button
                    class="save-room-btn"
                    onclick="guardarCambios(${habitacion.id})"
                >
                    Guardar cambios
                </button>

            </div>

        </article>

        `;

    });

}


// =========================
// GUARDAR CAMBIOS
// =========================

function guardarCambios(id) {

    const habitacion =
        habitaciones.find(
            h => h.id === id
        );

    if (!habitacion) return;

    habitacion.descripcion =
        document.getElementById(
            `descripcion-${id}`
        ).value;

    habitacion.precio =
        Number(
            document.getElementById(
                `precio-${id}`
            ).value
        );

    habitacion.cantidadDisponibles =
        Number(
            document.getElementById(
                `disponibles-${id}`
            ).value
        );

    habitacion["capacidad minima"] =
        document.getElementById(
            `min-${id}`
        ).value;

    habitacion["capacidad maxima"] =
        document.getElementById(
            `max-${id}`
        ).value;

    habitacion.ubicacion =
        document.getElementById(
            `ubicacion-${id}`
        ).value;

    habitacion.servicios =
        document.getElementById(
            `servicios-${id}`
        ).value
        .split(",");

    localStorage.setItem(
        "habitaciones",
        JSON.stringify(habitaciones)
    );

    renderStats();

    alert("Habitación actualizada");

}


// =========================
// RENDER RESERVAS
// =========================

function renderReservaciones() {

    adminReservationsGrid.innerHTML = "";

    if (reservaciones.length <= 0) {

        adminReservationsGrid.innerHTML = `

        <p class="no-reservations">
            No hay reservaciones realizadas.
        </p>

        `;

        return;

    }

    reservaciones.forEach((reserva, index) => {

        adminReservationsGrid.innerHTML += `

        <article class="reservation-admin-card">

            <h3>
                ${reserva.user.name}
            </h3>

            <p>
                <strong>Documento:</strong>
                ${reserva.user.identification}
            </p>

            <p>
                <strong>Habitación:</strong>
                ${reserva.room.tipo}
            </p>

            <p>
                <strong>Check In:</strong>
                ${reserva.checkIn}
            </p>

            <p>
                <strong>Check Out:</strong>
                ${reserva.checkOut}
            </p>

            <p>
                <strong>Noches:</strong>
                ${reserva.nights}
            </p>

            <p>
                <strong>Total:</strong>
                $${reserva.total.toLocaleString()}
            </p>

            <p>
                <strong>Estado:</strong>
                ${reserva.status}
            </p>

            <div class="reservation-actions">

                <button
                    class="edit-reservation-btn"
                    onclick="editarReserva(${index})"
                >
                    Editar
                </button>

                <button
                    class="delete-reservation-btn"
                    onclick="cancelarReserva(${index})"
                >
                    Cancelar
                </button>

            </div>

        </article>

        `;

    });

}


// =========================
// CANCELAR RESERVA
// =========================

function cancelarReserva(index) {

    const confirmar =
        confirm(
            "¿Cancelar esta reservación?"
        );

    if (!confirmar) return;

    reservaciones[index].status =
        "cancelada";

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );

    renderReservaciones();

}


// =========================
// EDITAR RESERVA
// =========================

function editarReserva(index) {

    const nuevaFechaEntrada =
        prompt(
            "Nueva fecha check in:",
            reservaciones[index].checkIn
        );

    const nuevaFechaSalida =
        prompt(
            "Nueva fecha check out:",
            reservaciones[index].checkOut
        );

    if (
        !nuevaFechaEntrada ||
        !nuevaFechaSalida
    ) {

        return;

    }

    reservaciones[index].checkIn =
        nuevaFechaEntrada;

    reservaciones[index].checkOut =
        nuevaFechaSalida;

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );

    renderReservaciones();

    alert("Reserva actualizada");

}


// =========================
// INICIALIZAR
// =========================

renderStats();

renderRooms();

renderReservaciones();