// reservaciones.js

function guardarReserva(nuevaReserva) {

    const reservasGuardadas =
        JSON.parse(
            localStorage.getItem("reservaciones")
        ) || [];


    reservasGuardadas.push(nuevaReserva);


    localStorage.setItem(
        "reservaciones",
        JSON.stringify(reservasGuardadas)
    );

}


function leerReservaciones() {

    return JSON.parse(
        localStorage.getItem("reservaciones")
    ) || [];

}

export {
    guardarReserva,
    leerReservaciones
};