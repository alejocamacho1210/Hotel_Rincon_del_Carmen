// home.js

const registerBtn =
document.querySelectorAll(".nav-btn")[0];

const loginBtn =
document.querySelectorAll(".nav-btn")[1];

const registerModal =
document.querySelector(".register-modal");

const loginModal =
document.querySelector(".login-modal");

const registerForm =
document.querySelector(".register-modal form");

const loginForm =
document.querySelector(".login-modal form");

const contactForm =
document.querySelector(".contact-form");

const topNav =
document.querySelector(".top-nav");

const roomModal =
document.querySelector(".room-modal");

const roomPreview =
document.querySelector(".room-preview");

const roomTitle =
document.querySelector(".room-title");

const roomDescription =
document.querySelector(".room-description");


// ======================
// HABITACIONES
// ======================

const habitaciones = JSON.parse(
    localStorage.getItem("habitaciones")
) || [];


// ======================
// IMAGENES
// ======================

const imageMap = {

    "Estandar King":
    "../images/estandar_king.jpeg",

    "Estandar Double":
    "../images/estandar_double.jpeg",

    "Ejecutiva King":
    "../images/ejecutiva_king.jpeg",

    "Habitacion premium":
    "../images/habitacion_premium.jpeg",

    "Apart Hotel":
    "../images/apart_hotel.jpeg",

    "Junior Suite":
    "../images/suite_junior.jpeg",

    "Suite Familiar":
    "../images/suite_familiar.jpeg",

    "Suite Presidencial":
    "../images/suite_presidencial.jpeg",

    "Habitacion Accesible":
    "../images/habitacion_accesible.jpeg"
};


// ======================
// MODALES
// ======================

registerBtn.addEventListener("click", () => {

    registerModal.style.display = "flex";
});

loginBtn.addEventListener("click", () => {

    loginModal.style.display = "flex";
});

window.addEventListener("click", (e) => {

    if(e.target === registerModal){

        registerModal.style.display = "none";
    }

    if(e.target === loginModal){

        loginModal.style.display = "none";
    }

    if(e.target === roomModal){

        roomModal.style.display = "none";

        document.body.style.overflow = "";
    }
});


// ======================
// CREAR ADMIN
// ======================

function crearAdmin(){

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const existeAdmin = usuarios.some(
        user => user.role === "admin"
    );

    if(existeAdmin){
        return;
    }

    const admin = {

        id: 1,

        name: "Juan Arias",

        identification: "1097489524",

        country: "Colombia",

        email: "admin@hotel.com",

        phone: "0000000000",

        password: "Juanda.2210",

        role: "admin"
    };

    usuarios.push(admin);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

crearAdmin();


// ======================
// REGISTRO
// ======================

registerForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const inputs =
    registerForm.querySelectorAll("input");

    const identification =
    inputs[0].value.trim();

    const name =
    inputs[1].value.trim();

    const country =
    inputs[2].value.trim();

    const email =
    inputs[3].value.trim();

    const phone =
    inputs[4].value.trim();

    const password =
    inputs[5].value.trim();

    if(
        !identification ||
        !name ||
        !country ||
        !email ||
        !phone ||
        !password
    ){

        alert("Completa todos los campos");

        return;
    }

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const existeDocumento =
    usuarios.some(
        user =>
        user.identification === identification
    );

    if(existeDocumento){

        alert("Ese documento ya existe");

        return;
    }

    const existeCorreo =
    usuarios.some(
        user => user.email === email
    );

    if(existeCorreo){

        alert("Ese correo ya existe");

        return;
    }

    const nuevoUsuario = {

        id: Date.now(),

        identification,

        name,

        country,

        email,

        phone,

        password,

        role: "client"
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    alert("Cuenta creada correctamente");

    registerForm.reset();

    registerModal.style.display = "none";
});


// ======================
// LOGIN
// ======================

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const inputs =
    loginForm.querySelectorAll("input");

    const identification =
    inputs[0].value.trim();

    const password =
    inputs[1].value.trim();

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const usuarioEncontrado =
    usuarios.find(user =>

        user.identification === identification &&
        user.password === password
    );

    if(!usuarioEncontrado){

        alert("Datos incorrectos");

        return;
    }

    sessionStorage.setItem(
        "activeUser",
        JSON.stringify(usuarioEncontrado)
    );

    loginForm.reset();

    loginModal.style.display = "none";

    if(usuarioEncontrado.role === "admin"){

        location.href = "admin.html";

        return;
    }

    renderUsuario(usuarioEncontrado);

    alert("Sesión iniciada");
});


// ======================
// USUARIO LOGUEADO
// ======================

function renderUsuario(user){

    topNav.innerHTML = `

        <button class="user-btn">
            ${user.name}
        </button>

        <button
            class="reserve-btn"
            onclick="location.href='pag-02.html'"
        >
            Reservar
        </button>

        <button
            class="logout-btn"
        >
            Cerrar sesión
        </button>
    `;

    const logoutBtn =
    document.querySelector(".logout-btn");

    logoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem(
            "activeUser"
        );

        location.reload();
    });

    renderReservasUsuario();
}


// ======================
// SESION ACTIVA
// ======================

const activeUser = JSON.parse(
    sessionStorage.getItem("activeUser")
);

if(activeUser){

    renderUsuario(activeUser);
}


// ======================
// CONTACTO
// ======================

if(contactForm){

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const inputs =
        contactForm.querySelectorAll("input");

        const completo =
        [...inputs].every(
            input => input.value.trim() !== ""
        );

        if(!completo){

            alert("Completa todos los campos");

            return;
        }

        alert("Mensaje enviado");

        contactForm.reset();
    });
}


// ======================
// GALERIA
// ======================

const gallery =
document.querySelector(".gallery-grid");

if(gallery){

    habitaciones.forEach((room, index) => {

        gallery.innerHTML += `

        <article
            class="gallery-card"
            data-index="${index}"
        >

            <img
                src="${imageMap[room.tipo]}"
                alt="${room.tipo}"
            >

            <div class="gallery-info">

                <h3>
                    ${room.tipo}
                </h3>

            </div>

        </article>
        `;
    });

    activarCards();
}


// ======================
// CARDS
// ======================

function activarCards(){

    const cards =
    document.querySelectorAll(".gallery-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const index =
            card.dataset.index;

            const room =
            habitaciones[index];

            roomModal.style.display = "flex";

            document.body.style.overflow = "hidden";

            roomPreview.src =
            imageMap[room.tipo];

            roomTitle.textContent =
            room.tipo;

            roomDescription.innerHTML = `

                <p>
                    ${room.descripcion}
                </p>

                <div class="features-list">

                    ${room.servicios.map(servicio => `

                        <span>
                            ${servicio}
                        </span>

                    `).join("")}

                </div>

                <button
                    class="reserve-btn"
                    onclick="location.href='pag-02.html'"
                    style="
                        margin-top:1rem;
                        width:100%;
                    "
                >
                    Reservar esta habitación
                </button>
            `;
        });
    });
}


// ======================
// CERRAR MODAL
// ======================

const backRoom =
document.querySelector(".back-room");

if(backRoom){

    backRoom.addEventListener("click", () => {

        roomModal.style.display = "none";

        document.body.style.overflow = "";
    });
}


// ======================
// AREAS
// ======================

const areas = [

    {

        name: "Piscina",

        image: "../images/piscina.jpeg",

        description:
        "Relájate en nuestra piscina.",

        features: [
            "🏊 Piscina",
            "🌅 Vista",
            "🍹 Bar"
        ]
    },

    {

        name: "Jacuzzi",

        image: "../images/jacuzzi.jpeg",

        description:
        "Zona privada de relajación.",

        features: [
            "♨️ Agua caliente",
            "💆 Spa",
            "🛁 Privado"
        ]
    },

    {

        name: "Cocina",

        image: "../images/cocina.jpeg",

        description:
        "Comida premium.",

        features: [
            "👨‍🍳 Chef",
            "🍽️ Gourmet",
            "🍱 Buffet"
        ]
    }
];

const areasGrid =
document.querySelector(".areas-grid");

if(areasGrid){

    areas.forEach(area => {

        areasGrid.innerHTML += `

        <article class="area-card">

            <img
                src="${area.image}"
                alt="${area.name}"
            >

            <div class="area-info">

                <h3>
                    ${area.name}
                </h3>

                <p>
                    ${area.description}
                </p>

                <div class="features-list">

                    ${area.features.map(feature => `

                        <span>
                            ${feature}
                        </span>

                    `).join("")}

                </div>

            </div>

        </article>
        `;
    });
}


// ======================
// MIS RESERVAS
// ======================

function renderReservasUsuario(){

    const activeUser = JSON.parse(
        sessionStorage.getItem("activeUser")
    );

    if(!activeUser){
        return;
    }

    const reservas = JSON.parse(
        localStorage.getItem("reservas")
    ) || [];

    const reservasUsuario =
    reservas.filter(
        reserva =>
        reserva.userId === activeUser.id
    );

    if(reservasUsuario.length === 0){
        return;
    }

    const existe =
    document.querySelector(".user-reservations");

    if(existe){
        existe.remove();
    }

    const section =
    document.createElement("section");

    section.className =
    "user-reservations";

    section.innerHTML = `

        <h2 class="section-title">
            Mis Reservas
        </h2>

        <div class="user-reservations-grid">

            ${reservasUsuario.map(reserva => `

                <article class="user-reservation-card">

                    <img
                        src="${imageMap[reserva.roomType]}"
                        class="user-reservation-image"
                    >

                    <div class="user-reservation-content">

                        <h3>
                            ${reserva.roomType}
                        </h3>

                        <p>
                            ${reserva.checkIn}
                            →
                            ${reserva.checkOut}
                        </p>

                        <strong>
                            $${reserva.total.toLocaleString()}
                        </strong>

                    </div>

                </article>

            `).join("")}

        </div>
    `;

    document.querySelector(".home-page")
    .appendChild(section);
}