function guardarReservaActual(reserva) {

    localStorage.setItem(
        "reservaActual",
        JSON.stringify(reserva)
    );

}


function leerReservaActual() {

    return JSON.parse(
        localStorage.getItem("reservaActual")
    );

}


function eliminarReservaActual() {

    localStorage.removeItem("reservaActual");

}


export {
    guardarReservaActual,
    leerReservaActual,
    eliminarReservaActual
};