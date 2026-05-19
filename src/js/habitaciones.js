// habitaciones.js

async function inicializarHabitaciones() {

    // REVISAR SI YA EXISTEN EN LOCALSTORAGE
    const habitacionesGuardadas =
        localStorage.getItem("habitaciones");

    // SI YA EXISTEN NO HACER NADA
    if (habitacionesGuardadas) {

        return;

    }

    try {

        // LEER JSON ORIGINAL
        const respuesta = await fetch(
            "../data/disponibilidad.json"
        );

        const habitaciones =
            await respuesta.json();

        // GUARDAR EN LOCALSTORAGE
        localStorage.setItem(
            "habitaciones",
            JSON.stringify(habitaciones)
        );

        console.log(
            "Habitaciones inicializadas correctamente"
        );

    } catch (error) {

        console.error(
            "Error inicializando habitaciones:",
            error
        );

    }

}


// OBTENER HABITACIONES
function obtenerHabitaciones() {

    return JSON.parse(
        localStorage.getItem("habitaciones")
    ) || [];

}


// GUARDAR HABITACIONES
function guardarHabitaciones(habitaciones) {

    localStorage.setItem(
        "habitaciones",
        JSON.stringify(habitaciones)
    );

}


export {
    inicializarHabitaciones,
    obtenerHabitaciones,
    guardarHabitaciones
};