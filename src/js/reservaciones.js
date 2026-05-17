// reservaciones.js

const fs = require("fs");
const path = require("path");

const rutaJSON = path.join(__dirname, "reservaciones.json");


// FUNCION PARA LEER EL JSON
function leerReservaciones() {

    try {

        const data = fs.readFileSync(rutaJSON, "utf-8");

        const reservaciones = JSON.parse(data);

        return reservaciones;

    } catch (error) {

        console.error("Error leyendo el archivo JSON:", error);

        return [];

    }

}


// FUNCION PARA SOBREESCRIBIR EL JSON
function guardarReservaciones(nuevasReservaciones) {

    try {

        const data = JSON.stringify(nuevasReservaciones, null, 2);

        fs.writeFileSync(rutaJSON, data, "utf-8");

        console.log("Reservaciones guardadas correctamente");

    } catch (error) {

        console.error("Error escribiendo el archivo JSON:", error);

    }

}


module.exports = {
    leerReservaciones,
    guardarReservaciones
};