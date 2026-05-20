// initRooms.js

async function inicializarHabitaciones() {

    const habitacionesGuardadas =
        localStorage.getItem("habitaciones");

    // SI YA EXISTEN
    if (habitacionesGuardadas) {

        return;

    }

    try {

        const respuesta = await fetch(
            "/src/data/disponibilidad.json"
        );

        const habitaciones =
            await respuesta.json();

        localStorage.setItem(
            "habitaciones",
            JSON.stringify(habitaciones)
        );

        console.log(
            "Habitaciones inicializadas"
        );

    } catch (error) {

        console.error(
            "Error inicializando habitaciones:",
            error
        );

    }

}

inicializarHabitaciones();