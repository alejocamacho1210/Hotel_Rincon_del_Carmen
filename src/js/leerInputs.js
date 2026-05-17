const defaultState = document.getElementById("default-state")
const roomsSection = document.getElementById("rooms-section")

const checkInInput = document.getElementById("check-in")
const checkOutInput = document.getElementById("check-out")
const cantPersonas = document.getElementById("cantPersonas")



let hoy, yearHoy, monthHoy, dayHoy, 
    fechaCheckIn, fechaCheckOut, yearCheckIn, yearCheckOut, 
    monthCheckIn, monthCheckOut, 
    dayCheckIn, dayCheckOut;

checkInInput.addEventListener("change", () => {

    hoy = new Date();
    yearHoy = hoy.getFullYear();
    monthHoy = hoy.getMonth() + 1;
    dayHoy = hoy.getDate() + 1;


    fechaCheckIn = new Date(checkInInput.value);
    yearCheckIn = fechaCheckIn.getFullYear();
    monthCheckIn = fechaCheckIn.getMonth() + 1;
    dayCheckIn = fechaCheckIn.getDate() + 1;

    console.log(yearCheckIn);
    console.log(monthCheckIn);
    console.log(dayCheckIn);

    diasAPagar();
    compararHoyConCheckIn();
    compararCheckInConCheckOut();

});


checkOutInput.addEventListener("change", () => {

    fechaCheckOut = new Date(checkOutInput.value);

    yearCheckOut = fechaCheckOut.getFullYear();

    monthCheckOut = fechaCheckOut.getMonth() + 1;

    dayCheckOut = fechaCheckOut.getDate() + 1;

    console.log(yearCheckOut);
    console.log(monthCheckOut);
    console.log(dayCheckOut);

    diasAPagar();
    compararCheckInConCheckOut();

});

function compararHoyConCheckIn() {
    if (!fechaCheckIn) return;

    if (fechaCheckIn < hoy) {
        console.log("No tiene sentido que la fecha de check in sea antes de hoy")
        checkInInput.value = "";
    }
}
function compararCheckInConCheckOut() {
    if (!fechaCheckIn || !fechaCheckOut) return;

    if (fechaCheckIn >= fechaCheckOut) {
        console.log("No tiene sentido que la fecha de checkout sea antes o el mismo de la fecha de check in")
        checkOutInput.value = "";
    }
}


function diasAPagar() {
    if (!fechaCheckIn || !fechaCheckOut) return;

    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const numeroDeDias = (fechaCheckOut-fechaCheckIn) / milisegundosPorDia;  
    console.log(numeroDeDias);
    return numeroDeDias;
}

function verificarFiltros() {

    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    const personas = cantPersonas.value;

    // SI LOS 3 ESTAN LLENOS
    if (checkIn && checkOut && personas) {

        defaultState.style.display = "none";

        roomsSection.innerHTML = `

        <article class="room-card">
            <h2>Habitaciones disponibles</h2>
            <p>Aquí aparecerán las habitaciones.</p>
        </article>

        `;

    } 
    
    // SI ALGUNO ESTA VACIO
    else {

        defaultState.style.display = "flex";

        roomsSection.innerHTML = "";

    }
}

checkInInput.addEventListener("input", verificarFiltros);

checkOutInput.addEventListener("input", verificarFiltros);

cantPersonas.addEventListener("input", verificarFiltros);