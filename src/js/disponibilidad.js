// disponibilidad.js


// LEER DISPONIBILIDAD
async function leerDisponibilidad() {

    try {

        const respuesta = await fetch(
            "../data/disponibilidad.json"
        );

        const habitaciones =
            await respuesta.json();

        return habitaciones;

    } catch (error) {

        console.error(
            "Error leyendo disponibilidad:",
            error
        );

        return [];

    }

}


export {
    leerDisponibilidad,
};