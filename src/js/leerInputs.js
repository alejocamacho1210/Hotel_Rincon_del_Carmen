// leerInputs.js

const roomsContainer =
document.querySelector("#roomsContainer");

const checkIn =
document.querySelector("#checkIn");

const checkOut =
document.querySelector("#checkOut");

const personasInput =
document.querySelector("#personas");

const habitaciones =
JSON.parse(localStorage.getItem("habitaciones")) || [];

const reservas =
JSON.parse(localStorage.getItem("reservas")) || [];

const imagenes = {

    "Estandar King": "../images/estandar_king.jpeg",
    "Estandar Double": "../images/estandar_double.jpeg",
    "Ejecutiva King": "../images/ejecutiva_king.jpeg",
    "Habitacion premium": "../images/habitacion_premium.jpeg",
    "Apart Hotel": "../images/apart_hotel.jpeg",
    "Junior Suite": "../images/suite_junior.jpeg",
    "Suite Familiar": "../images/suite_familiar.jpeg",
    "Suite Presidencial": "../images/suite_presidencial.jpeg",
    "Habitacion Accesible": "../images/habitacion_accesible.jpeg"
};

// ======================
// UTILIDADES
// ======================

function calcularNoches(inicio, fin){
    const entrada = new Date(inicio);
    const salida = new Date(fin);
    return (salida - entrada) / (1000 * 60 * 60 * 24);
}

// ======================
// RENDER HABITACIONES
// ======================

function renderRooms(){

    const personas = Number(personasInput.value);

    if(!checkIn.value || !checkOut.value || !personas){
        roomsContainer.innerHTML = "";
        return;
    }

    const activeUser =
    JSON.parse(sessionStorage.getItem("activeUser"));

    const reservaUsuario =
    activeUser
        ? reservas.find(r => r.userId === activeUser.id)
        : null;

    const filtradas =
    habitaciones.filter(room => {

        const min = Number(room["capacidad minima"]);
        const max = Number(room["capacidad maxima"]);

        return personas >= min && personas <= max;
    });

    if(filtradas.length <= 0){
        roomsContainer.innerHTML = `
            <div class="empty-room-card">
                <h2>No hay habitaciones disponibles</h2>
            </div>
        `;
        return;
    }

    roomsContainer.innerHTML =
    filtradas.map(room => {

        const estaReservada = reservas.some(
            r => r.roomId === room.id
        );

        let botonHTML = "";

        if (!activeUser) {
            botonHTML = `
                <button class="reserve-button" data-id="${room.id}">
                    Reservar
                </button>
            `;
        }

        else if (reservaUsuario) {

            if (reservaUsuario.roomId === room.id) {
                botonHTML = `
                    <button class="cancel-button" data-id="${room.id}">
                        Cancelar reserva
                    </button>
                `;
            } else {
                botonHTML = `
                    <button disabled>
                        Ya has reservado una habitación
                    </button>
                `;
            }

        }

        else if (estaReservada) {
            botonHTML = `
                <button disabled>
                    Reservada
                </button>
            `;
        }

        else {
            botonHTML = `
                <button class="reserve-button" data-id="${room.id}">
                    Reservar
                </button>
            `;
        }

        return `
        <article class="room-card">

            <img
                src="${imagenes[room.tipo]}"
                class="room-image"
            >

            <div class="room-info">

                <h2>${room.tipo}</h2>

                <p>${room.descripcion}</p>

                <div class="room-services">
                    ${room.servicios.map(servicio => `
                        <span>${servicio}</span>
                    `).join("")}
                </div>

                <strong class="room-price">
                    $${room.precio.toLocaleString()}
                </strong>

                ${botonHTML}

            </div>

        </article>
        `;
    }).join("");

    activarReservas();
    activarCancelaciones();
}

// ======================
// RESERVAR
// ======================

function activarReservas(){

    const botones =
    document.querySelectorAll(".reserve-button");

    botones.forEach(btn => {

        btn.addEventListener("click", () => {

            const activeUser =
            JSON.parse(sessionStorage.getItem("activeUser"));

            if(!activeUser){
                alert("Debes iniciar sesión en la página principal");
                location.href = "pag-01.html";
                return;
            }

            const yaReservo = reservas.some(
                r => r.userId === activeUser.id
            );

            if(yaReservo){
                alert("Ya has reservado una habitación");
                return;
            }

            const roomId = Number(btn.dataset.id);

            const room = habitaciones.find(
                r => r.id === roomId
            );

            const noches = calcularNoches(
                checkIn.value,
                checkOut.value
            );

            const nuevaReserva = {
                reservationId: Date.now(),
                userId: activeUser.id,
                userName: activeUser.name,
                roomId: room.id,
                roomType: room.tipo,
                checkIn: checkIn.value,
                checkOut: checkOut.value,
                personas: personasInput.value,
                noches,
                total: room.precio * noches
            };

            reservas.push(nuevaReserva);

            localStorage.setItem(
                "reservas",
                JSON.stringify(reservas)
            );

            renderRooms();

            alert("Habitación reservada correctamente");
        });
    });
}

// ======================
// CANCELAR RESERVA
// ======================

function activarCancelaciones(){

    const botones =
    document.querySelectorAll(".cancel-button");

    botones.forEach(btn => {

        btn.addEventListener("click", () => {

            const activeUser =
            JSON.parse(sessionStorage.getItem("activeUser"));

            const roomId = Number(btn.dataset.id);

            const index = reservas.findIndex(
                r => r.userId === activeUser.id &&
                     r.roomId === roomId
            );

            if(index !== -1){

                reservas.splice(index, 1);

                localStorage.setItem(
                    "reservas",
                    JSON.stringify(reservas)
                );

                renderRooms();
            }
        });
    });
}

// ======================
// EVENTOS
// ======================

checkIn.addEventListener("change", renderRooms);
checkOut.addEventListener("change", renderRooms);
personasInput.addEventListener("input", renderRooms);