import {
    leerReservaActual
} from "./reservaActual.js";

import {
    guardarReserva
} from "./reservaciones.js";


const usuarioActivo = JSON.parse(
    sessionStorage.getItem("activeUser")
);


const reservaActual = leerReservaActual();

const paymentUser =
    document.getElementById("payment-user");

const paymentContent =
    document.getElementById("payment-content");


if (!usuarioActivo || !reservaActual) {

    window.location.href = "pag-01.html";

}


paymentUser.innerHTML = `

<div class="payment-user-box">

    <span>👤</span>

    <div>
        <strong>${usuarioActivo.nombre}</strong>
        <p>${usuarioActivo.correo}</p>
    </div>

</div>

`;

paymentContent.innerHTML = `

        <div class="payment-details">

            <span>
                📅 Check in:
                ${reservaActual.checkIn}
            </span>

            <span>
                📅 Check out:
                ${reservaActual.checkOut}
            </span>

            <span>
                🌙 Noches:
                ${reservaActual.noches}
            </span>

            <span>
                👥 Personas:
                ${reservaActual.personas}
            </span>

        </div>


        <div class="payment-total">

            Total a pagar:

            <strong>
                $${reservaActual.total.toLocaleString()}
            </strong>

        </div>


        <button class="confirm-payment-btn" id="confirm-payment-btn">
            Pagar ahora
        </button>

    </div>

</article>

`;


const confirmPaymentBtn =
    document.getElementById("confirm-payment-btn");


confirmPaymentBtn.addEventListener("click", () => {

    const nuevaReservacion = {

        usuario: usuarioActivo,

        reserva: reservaActual,

        fechaReserva:
            new Date().toLocaleDateString()

    };


    guardarReserva(nuevaReservacion);


    alert(
        "Reserva realizada correctamente"
    );


    window.location.href = "pag-01.html";

});