import {
    leerDisponibilidad
} from "./disponibilidad.js";

import {
    leerReservaciones
} from "./reservaciones.js";


const defaultState =
    document.getElementById("default-state");

const roomsSection =
    document.getElementById("rooms-section");

const checkInInput =
    document.getElementById("check-in");

const checkOutInput =
    document.getElementById("check-out");

const cantPersonas =
    document.getElementById("cantPersonas");


let hoy,
    fechaCheckIn,
    fechaCheckOut;



// ==========================
// IMAGENES
// ==========================

const imagenesHabitaciones = {

    "Estandar King":
    "../images/estandar_king.jpeg",

    "Estandar Double":
    "../images/estandar_double.jpeg",

    "Ejecutiva King":
    "../images/ejecutiva_king.jpeg",

    "Habitacion premium":
    "../images/habitacion_premium.jpeg",

    "Apart Hotel":
    "../images/apart_hotel.jpeg",

    "Junior Suite":
    "../images/suite_junior.jpeg",

    "Suite Familiar":
    "../images/suite_familiar.jpeg",

    "Suite Presidencial":
    "../images/suite_presidencial.jpeg",

    "Habitacion Accesible":
    "../images/habitacion_accesible.jpeg"

};



// ==========================
// CHECK IN
// ==========================

checkInInput.addEventListener("change", () => {

    hoy = new Date();

    fechaCheckIn =
        new Date(checkInInput.value);

    compararHoyConCheckIn();

    compararCheckInConCheckOut();

    verificarFiltros();

});



// ==========================
// CHECK OUT
// ==========================

checkOutInput.addEventListener("change", () => {

    fechaCheckOut =
        new Date(checkOutInput.value);

    compararCheckInConCheckOut();

    verificarFiltros();

});



// ==========================
// PERSONAS
// ==========================

cantPersonas.addEventListener(
    "input",
    verificarFiltros
);



// ==========================
// VALIDACIONES
// ==========================

function compararHoyConCheckIn() {

    if (!fechaCheckIn) return;

    const hoySinHora =
        new Date();

    hoySinHora.setHours(0, 0, 0, 0);

    if (fechaCheckIn < hoySinHora) {

        alert(
            "La fecha de check in no puede ser anterior a hoy"
        );

        checkInInput.value = "";

    }

}


function compararCheckInConCheckOut() {

    if (
        !fechaCheckIn ||
        !fechaCheckOut
    ) return;

    if (
        fechaCheckIn >= fechaCheckOut
    ) {

        alert(
            "La fecha de salida debe ser posterior al check in"
        );

        checkOutInput.value = "";

    }

}



// ==========================
// DIAS A PAGAR
// ==========================

function diasAPagar() {

    if (
        !fechaCheckIn ||
        !fechaCheckOut
    ) return 0;

    const milisegundosPorDia =
        1000 * 60 * 60 * 24;

    return (
        (fechaCheckOut - fechaCheckIn)
        / milisegundosPorDia
    );

}



// ==========================
// FILTROS
// ==========================

async function verificarFiltros() {

    const checkIn =
        checkInInput.value;

    const checkOut =
        checkOutInput.value;

    const personas =
        Number(cantPersonas.value);


    if (
        !checkIn ||
        !checkOut ||
        !personas
    ) {

        defaultState.style.display =
            "flex";

        roomsSection.innerHTML = "";

        return;

    }


    defaultState.style.display =
        "none";


    const habitaciones =
        await leerDisponibilidad();

    const reservaciones =
        leerReservaciones();


    const habitacionesDisponibles =
        habitaciones.filter(habitacion => {

            const capacidadMinima =
                Number(
                    habitacion["capacidad minima"]
                );

            const capacidadMaxima =
                Number(
                    habitacion["capacidad maxima"]
                );


            const cumpleCapacidad =
                personas >= capacidadMinima &&
                personas <= capacidadMaxima;


            if (!cumpleCapacidad) {

                return false;

            }


            const reservasDeEsteTipo =
                reservaciones.filter(
                    reserva =>
                        reserva.tipoHabitacion ===
                        habitacion.tipo
                ).length;


            const disponibilidadReal =
                habitacion.cantidadDisponibles -
                reservasDeEsteTipo;


            return disponibilidadReal > 0;

        });


    if (
        habitacionesDisponibles.length === 0
    ) {

        roomsSection.innerHTML = `

        <article class="empty-room-card">

            <h2>
                No encontramos habitaciones disponibles
            </h2>

            <p>
                Intenta cambiar las fechas
                o la cantidad de personas.
            </p>

        </article>

        `;

        return;

    }


    roomsSection.innerHTML = "";


    habitacionesDisponibles.forEach(
        habitacion => {

            const reservasDeEsteTipo =
                reservaciones.filter(
                    reserva =>
                        reserva.tipoHabitacion ===
                        habitacion.tipo
                ).length;


            const disponibilidadReal =
                habitacion.cantidadDisponibles -
                reservasDeEsteTipo;


            const imagen =
                imagenesHabitaciones[
                    habitacion.tipo
                ];


            roomsSection.innerHTML += `

            <article class="hotel-room-card">

                <img
                    src="${imagen}"
                    class="hotel-room-image"
                >

                <div class="hotel-room-content">

                    <div class="hotel-room-top">

                        <h2>
                            ${habitacion.tipo}
                        </h2>

                        <span class="room-location">
                            📍 ${habitacion.ubicacion}
                        </span>

                    </div>


                    <p class="hotel-room-description">
                        ${habitacion.descripcion}
                    </p>


                    <div class="hotel-room-info">

                        <span>
                            👥
                            ${habitacion["capacidad minima"]}
                            -
                            ${habitacion["capacidad maxima"]}
                            personas
                        </span>

                        <span>
                            🛏️
                            ${disponibilidadReal}
                            disponibles
                        </span>

                    </div>


                    <div class="hotel-room-services">

                        ${habitacion.servicios
                            .map(
                                servicio =>
                                `<span>${servicio}</span>`
                            )
                            .join("")}

                    </div>


                    <div class="hotel-room-footer">

                        <strong>
                            $
                            ${habitacion.precio.toLocaleString()}
                            / noche
                        </strong>

                        <button
                            class="hotel-room-btn"
                            onclick="location.href='registro.html'"
                        >
                            Reservar
                        </button>

                    </div>

                </div>

            </article>

            `;

        });

}