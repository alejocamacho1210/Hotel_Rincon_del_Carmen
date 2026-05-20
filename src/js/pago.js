//pago.js

const activeUser = JSON.parse(
    sessionStorage.getItem("activeUser")
)

if(!activeUser){
    alert("Debes iniciar sesión")
    location.href = "pag-01.html"
}

const reservaPendiente = JSON.parse(
    sessionStorage.getItem("reservaPendiente")
)

if(!reservaPendiente){
    alert("No hay información de reserva")
    location.href = "pag-02.html"
}

const habitaciones = JSON.parse(
    localStorage.getItem("hotelRooms")
) || []

const reservas = JSON.parse(
    localStorage.getItem("reservas")
) || []

const paymentUser = document.getElementById("payment-user")
const paymentContent = document.getElementById("payment-content")

paymentUser.innerHTML = `
    <div class="payment-user-box">

        <span class="payment-user-icon">
            👤
        </span>

        <div>
            <strong>${activeUser.name}</strong>
            <p>${activeUser.email}</p>
        </div>

    </div>
`

const habitacion = habitaciones.find(
    room => room.id === reservaPendiente.roomId
)

if(!habitacion){
    alert("Habitación no encontrada")
    location.href = "pag-02.html"
}

const imagenes = {
    "Estandar King":"../images/estandar_king.jpeg",
    "Estandar Double":"../images/estandar_double.jpeg",
    "Ejecutiva King":"../images/ejecutiva_king.jpeg",
    "Habitacion premium":"../images/habitacion_premium.jpeg",
    "Apart Hotel":"../images/apart_hotel.jpeg",
    "Junior Suite":"../images/suite_junior.jpeg",
    "Suite Familiar":"../images/suite_familiar.jpeg",
    "Suite Presidencial":"../images/suite_presidencial.jpeg",
    "Habitacion Accesible":"../images/habitacion_accesible.jpeg"
}

paymentContent.innerHTML = `
    <article class="payment-card">

        <img 
            src="${imagenes[habitacion.tipo]}"
            class="payment-room-image"
        >

        <div class="payment-room-content">

            <div class="payment-room-header">

                <div>

                    <span class="payment-room-tag">
                        ${habitacion.ubicacion}
                    </span>

                    <h2>
                        ${habitacion.tipo}
                    </h2>

                </div>

                <strong class="payment-price">
                    $${habitacion.precio.toLocaleString()}
                </strong>

            </div>

            <p class="payment-description">
                ${habitacion.descripcion}
            </p>

            <div class="payment-services">

                ${habitacion.servicios
                    .map(service => `
                        <span>${service}</span>
                    `)
                    .join("")
                }

            </div>

            <div class="payment-details">

                <div class="payment-detail">

                    <span>Check In</span>

                    <strong>
                        ${reservaPendiente.checkIn}
                    </strong>

                </div>

                <div class="payment-detail">

                    <span>Check Out</span>

                    <strong>
                        ${reservaPendiente.checkOut}
                    </strong>

                </div>

                <div class="payment-detail">

                    <span>Noches</span>

                    <strong>
                        ${reservaPendiente.noches}
                    </strong>

                </div>

                <div class="payment-detail">

                    <span>Personas</span>

                    <strong>
                        ${reservaPendiente.personas}
                    </strong>

                </div>

            </div>

            <div class="payment-total">

                <span>Total a pagar</span>

                <strong>
                    $${reservaPendiente.total.toLocaleString()}
                </strong>

            </div>

            <button 
                class="confirm-payment-btn"
                id="confirmPaymentBtn"
            >
                Reservar habitación
            </button>

        </div>

    </article>
`

const confirmPaymentBtn = document.getElementById(
    "confirmPaymentBtn"
)

confirmPaymentBtn.onclick = () => {

    const reservasActuales = JSON.parse(
        localStorage.getItem("reservas")
    ) || []

    const habitacionesActuales = JSON.parse(
        localStorage.getItem("hotelRooms")
    ) || []

    const roomActual = habitacionesActuales.find(
        room => room.id === reservaPendiente.roomId
    )

    if(!roomActual){
        alert("La habitación ya no existe")
        return
    }

    const reservasDeEstaHabitacion =
    reservasActuales.filter(
        reserva =>
        reserva.roomId === roomActual.id
    ).length

    const disponibles =
    roomActual.cantidadDisponibles -
    reservasDeEstaHabitacion

    if(disponibles <= 0){

        alert(
            "Lo sentimos, esta habitación ya no se encuentra disponible"
        )

        location.href = "pag-02.html"

        return
    }

    const nuevaReserva = {

        reservationId: Date.now(),

        userId: activeUser.id,

        userName: activeUser.name,

        userEmail: activeUser.email,

        userPhone: activeUser.phone,

        roomId: roomActual.id,

        roomType: roomActual.tipo,

        roomPrice: roomActual.precio,

        roomLocation: roomActual.ubicacion,

        roomDescription: roomActual.descripcion,

        roomServices: roomActual.servicios,

        checkIn: reservaPendiente.checkIn,

        checkOut: reservaPendiente.checkOut,

        noches: reservaPendiente.noches,

        personas: reservaPendiente.personas,

        total: reservaPendiente.total,

        createdAt: new Date().toISOString()
    }

    reservasActuales.push(nuevaReserva)

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservasActuales)
    )

    sessionStorage.removeItem(
        "reservaPendiente"
    )

    alert("Reserva realizada correctamente")

    location.href = "pag-01.html"
}