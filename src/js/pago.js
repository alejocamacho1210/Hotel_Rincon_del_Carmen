const activeUser = JSON.parse(
    sessionStorage.getItem("activeUser")
);

if(!activeUser){

    alert("Debes iniciar sesión");

    location.href = "pag-01.html";

}

const reservaPendiente = JSON.parse(
    sessionStorage.getItem("reservaPendiente")
);

if(!reservaPendiente){

    alert("No existe reserva pendiente");

    location.href = "pag-02.html";

}

const habitaciones = JSON.parse(
    localStorage.getItem("habitaciones")
) || [];

const habitacion = habitaciones.find(
    room =>
        room.id === reservaPendiente.roomId
);

const confirmPaymentBtn =
    document.querySelector(
        "#confirmPaymentBtn"
    );

confirmPaymentBtn.addEventListener(
    "click",
    () => {

        const reservas = JSON.parse(
            localStorage.getItem("reservas")
        ) || [];

        const nuevaReserva = {

            reservationId:Date.now(),

            userId:activeUser.id,

            userName:activeUser.name,

            userEmail:activeUser.email,

            roomId:habitacion.id,

            roomType:habitacion.tipo,

            checkIn:
                reservaPendiente.checkIn,

            checkOut:
                reservaPendiente.checkOut,

            personas:
                reservaPendiente.personas,

            noches:
                reservaPendiente.noches,

            total:
                reservaPendiente.total,

            status:"activa"

        };

        reservas.push(nuevaReserva);

        localStorage.setItem(
            "reservas",
            JSON.stringify(reservas)
        );

        sessionStorage.removeItem(
            "reservaPendiente"
        );

        alert(
            "Reserva realizada correctamente"
        );

        location.href =
            "pag-01.html";

    }
);