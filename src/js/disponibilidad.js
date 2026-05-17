// disponibilidad.js

const fs = require("fs");
const path = require("path");

const rutaJSON = path.join(__dirname, "disponibilidad.json");


// LEER DISPONIBILIDAD
function leerDisponibilidad() {

    try {

        const data = fs.readFileSync(rutaJSON, "utf-8");

        return JSON.parse(data);

    } catch (error) {

        console.error("Error leyendo disponibilidad:", error);

        return [];

    }

}


// SOBREESCRIBIR DISPONIBILIDAD
function guardarDisponibilidad(nuevaDisponibilidad) {

    try {

        const data = JSON.stringify(nuevaDisponibilidad, null, 2);

        fs.writeFileSync(rutaJSON, data, "utf-8");

        console.log("Disponibilidad actualizada");

    } catch (error) {

        console.error("Error guardando disponibilidad:", error);

    }

}


// VERIFICAR SI HAY HABITACIONES
function hayDisponibilidad(tipoHabitacion) {

    const habitaciones = leerDisponibilidad();

    const habitacion = habitaciones.find(
        h => h.tipo === tipoHabitacion
    );

    if (!habitacion) {

        return false;

    }

    return habitacion.cantidadDisponibles > 0;

}


// RESTAR UNA HABITACION DISPONIBLE
function restarDisponibilidad(tipoHabitacion) {

    const habitaciones = leerDisponibilidad();

    const habitacion = habitaciones.find(
        h => h.tipo === tipoHabitacion
    );

    if (!habitacion) {

        console.log("Tipo de habitación no encontrado");

        return false;

    }

    if (habitacion.cantidadDisponibles <= 0) {

        console.log("No hay habitaciones disponibles");

        return false;

    }

    habitacion.cantidadDisponibles -= 1;

    guardarDisponibilidad(habitaciones);

    return true;

}


export {
    leerDisponibilidad,
    guardarDisponibilidad,
    hayDisponibilidad,
    restarDisponibilidad
};