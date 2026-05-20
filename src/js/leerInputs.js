// leerInputs.js

const contenedorHabitaciones =
document.querySelector("#roomsContainer");

const fechaCheckIn =
document.querySelector("#checkIn");

const fechaCheckOut =
document.querySelector("#checkOut");

const cantidadPersonas =
document.querySelector("#personas");





/* =========================
   IMÁGENES
========================= */

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



/* =========================
   VALIDACIONES FECHAS
========================= */

function validarCheckIn() {

    if (!fechaCheckIn.value) return;

    const hoy =
    new Date().toISOString().split("T")[0];



    if (fechaCheckIn.value <= hoy) {

        alert(
            "La fecha de check in debe ser posterior al día de hoy"
        );

        fechaCheckIn.value = "";

        return;
    }
}



function validarCheckOut() {

    if (
        !fechaCheckIn.value ||
        !fechaCheckOut.value
    ) return;



    if (
        fechaCheckOut.value <=
        fechaCheckIn.value
    ) {

        alert(
            "La fecha de salida no puede ser antes o igual al check in"
        );

        fechaCheckOut.value = "";
    }
}



/* =========================
   DÍAS A PAGAR
========================= */

export function diasAPagar(
    checkIn,
    checkOut
) {

    const entrada =
    new Date(checkIn);

    const salida =
    new Date(checkOut);

    const diferencia =
    salida - entrada;

    return diferencia / (
        1000 * 60 * 60 * 24
    );
}



/* =========================
   DISPONIBILIDAD
========================= */

function habitacionesDisponibles() {

    const habitaciones =
    JSON.parse(
        localStorage.getItem("habitaciones")
    )  || [];

    const personas =
    Number(cantidadPersonas.value);



    if (
        !fechaCheckIn.value ||
        !fechaCheckOut.value ||
        !cantidadPersonas.value
    ) {

        contenedorHabitaciones.innerHTML = "";

        return;
    }



    const reservas =
    JSON.parse(
        localStorage.getItem("reservas")
    ) || [];



    const candidatas =
    habitaciones.filter(habitacion => {

        const min =
        Number(
            habitacion["capacidad minima"]
        );

        const max =
        Number(
            habitacion["capacidad maxima"]
        );



        const cumpleCapacidad =
        personas >= min &&
        personas <= max;



        const reservasHabitacion =
        reservas.filter(reserva =>
            reserva.habitacion.tipo ===
            habitacion.tipo
        ).length;



        const disponibles =
        habitacion.cantidadDisponibles -
        reservasHabitacion;



        return (
            cumpleCapacidad &&
            disponibles > 0
        );
    });



    renderizarHabitaciones(
        candidatas
    );
}



/* =========================
   RENDER
========================= */

function renderizarHabitaciones(
    habitacionesFiltradas
) {

    if (
        habitacionesFiltradas.length === 0
    ) {

        contenedorHabitaciones.innerHTML = `

            <div class="no-rooms">

                <h2>
                    No hay habitaciones disponibles
                </h2>

            </div>

        `;

        return;
    }



    contenedorHabitaciones.innerHTML =
    habitacionesFiltradas.map(habitacion => {

        const imagen =
        imagenesHabitaciones[
            habitacion.tipo
        ];



        return `

        <article class="room-card">

            <img
                class="room-image"
                src="${imagen}"
                alt="${habitacion.tipo}"
            >

            <div class="room-info">

                <h2>
                    ${habitacion.tipo}
                </h2>

                <p>
                    ${habitacion.descripcion}
                </p>

                <div class="room-services">

                    ${habitacion.servicios.map(servicio => `

                        <span>
                            ${servicio}
                        </span>

                    `).join("")}

                </div>

                <div class="room-price">

                    $${habitacion.precio.toLocaleString()}
                    / noche

                </div>

                <button
                    class="reserve-button"
                    data-tipo="${habitacion.tipo}"
                >
                    Reservar
                </button>

            </div>

        </article>

        `;

    }).join("");



    activarBotonesReserva();
}



/* =========================
   RESERVAR
========================= */

function activarBotonesReserva() {

    const botones =
    document.querySelectorAll(
        ".reserve-button"
    );



    botones.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const habitaciones =
                JSON.parse(
                    localStorage.getItem("habitaciones")
                ) || [];

                const tipo =
                boton.dataset.tipo;

                const habitacion =
                habitaciones.find(
                    h => h.tipo === tipo
                );



                if (!habitacion) {

                    alert(
                        "No hay información de reserva"
                    );

                    return;
                }



                const reservaPendiente = {

                    roomId: habitacion.id,

                    checkIn:
                    fechaCheckIn.value,

                    checkOut:
                    fechaCheckOut.value,

                    personas:
                    cantidadPersonas.value,

                    noches:
                    diasAPagar(
                        fechaCheckIn.value,
                        fechaCheckOut.value
                    ),

                    total:
                    habitacion.precio *
                    diasAPagar(
                        fechaCheckIn.value,
                        fechaCheckOut.value
                    )
                };



                sessionStorage.setItem(
                    "reservaPendiente",
                    JSON.stringify(
                        reservaPendiente
                    )
                );



                const activeUser =
                sessionStorage.getItem(
                    "activeUser"
                );



                if (activeUser) {

                    window.location.href =
                    "irAPagar.html";

                } else {

                    window.location.href =
                    "registro.html";
                }
            }
        );
    });
}



/* =========================
   EVENTOS
========================= */

fechaCheckIn.addEventListener(
    "change",
    () => {

        validarCheckIn();

        habitacionesDisponibles();
    }
);



fechaCheckOut.addEventListener(
    "change",
    () => {

        validarCheckOut();

        habitacionesDisponibles();
    }
);



cantidadPersonas.addEventListener(
    "input",
    habitacionesDisponibles
);