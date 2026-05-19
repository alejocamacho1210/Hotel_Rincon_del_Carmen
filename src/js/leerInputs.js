import {
    inicializarHabitaciones,
    obtenerHabitaciones
} from "./habitaciones.js";


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


// INICIALIZAR HABITACIONES
await inicializarHabitaciones();


// EVENTO CHECK IN
checkInInput.addEventListener("change", () => {

    hoy = new Date();

    fechaCheckIn =
        new Date(checkInInput.value);

    diasAPagar();

    compararHoyConCheckIn();

    compararCheckInConCheckOut();

});


// EVENTO CHECK OUT
checkOutInput.addEventListener("change", () => {

    fechaCheckOut =
        new Date(checkOutInput.value);

    diasAPagar();

    compararCheckInConCheckOut();

});


// VALIDAR CHECK IN
function compararHoyConCheckIn() {

    if (!fechaCheckIn) return;

    if (fechaCheckIn < hoy) {

        alert(
            "La fecha de entrada no puede ser anterior a hoy"
        );

        checkInInput.value = "";

    }

}


// VALIDAR CHECK OUT
function compararCheckInConCheckOut() {

    if (!fechaCheckIn || !fechaCheckOut) return;

    if (fechaCheckIn >= fechaCheckOut) {

        alert(
            "La fecha de salida debe ser posterior al check in"
        );

        checkOutInput.value = "";

    }

}


// CALCULAR DIAS
function diasAPagar() {

    if (!fechaCheckIn || !fechaCheckOut) return 0;

    const milisegundosPorDia =
        1000 * 60 * 60 * 24;

    const numeroDeDias =
        (fechaCheckOut - fechaCheckIn)
        / milisegundosPorDia;

    return numeroDeDias;

}


// VERIFICAR FILTROS
function verificarFiltros() {

    const checkIn =
        checkInInput.value;

    const checkOut =
        checkOutInput.value;

    const personas =
        Number(cantPersonas.value);


    // SI TODOS LOS FILTROS ESTAN LLENOS
    if (checkIn && checkOut && personas) {

        defaultState.style.display = "none";

        mostrarHabitaciones(personas);

    }

    // SI FALTA ALGUNO
    else {

        defaultState.style.display = "flex";

        roomsSection.innerHTML = "";

    }

}


// MOSTRAR HABITACIONES
function mostrarHabitaciones(personas) {

    const habitaciones =
        obtenerHabitaciones();

    const reservas =
        JSON.parse(
            localStorage.getItem("reservaciones")
        ) || [];


    // FILTRAR CANDIDATAS
    const habitacionesDisponibles =
        habitaciones.filter(habitacion => {

            const capacidadMinima =
                Number(habitacion["capacidad minima"]);

            const capacidadMaxima =
                Number(habitacion["capacidad maxima"]);


            const cumpleCapacidad =
                personas >= capacidadMinima &&
                personas <= capacidadMaxima;


            const reservasDeEseTipo =
                reservas.filter(reserva =>
                    reserva.tipoHabitacion ===
                    habitacion.tipo
                ).length;


            const disponiblesReales =
                habitacion.cantidadDisponibles -
                reservasDeEseTipo;


            return (
                cumpleCapacidad &&
                disponiblesReales > 0
            );

        });


    // SI NO HAY DISPONIBLES
    if (habitacionesDisponibles.length === 0) {

        roomsSection.innerHTML = `

        <article class="room-card">

            <h2>
                No hay habitaciones disponibles
            </h2>

        </article>

        `;

        return;

    }


    // PINTAR TARJETAS
    roomsSection.innerHTML = "";


    habitacionesDisponibles.forEach(habitacion => {

        roomsSection.innerHTML += `

        <article class="room-card">

            <h2>${habitacion.tipo}</h2>

            <p>${habitacion.descripcion}</p>

            <strong>
                $${habitacion.precio}
            </strong>

        </article>

        `;

    });

}


checkInInput.addEventListener(
    "input",
    verificarFiltros
);

checkOutInput.addEventListener(
    "input",
    verificarFiltros
);

cantPersonas.addEventListener(
    "input",
    verificarFiltros
);