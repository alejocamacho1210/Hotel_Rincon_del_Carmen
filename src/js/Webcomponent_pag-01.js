const registerBtn = document.querySelectorAll(".nav-btn")[0]

const loginBtn = document.querySelectorAll(".nav-btn")[1]

const registerModal = document.querySelector(".register-modal")

const loginModal = document.querySelector(".login-modal")

const registerForm = document.querySelector(
    ".register-modal form"
)

const loginForm = document.querySelector(
    ".login-modal form"
)

const contactForm = document.querySelector(
    ".contact-form"
)

const topNav = document.querySelector(".top-nav")

let currentUser = null


const habitaciones = JSON.parse(
    localStorage.getItem("habitaciones")
) || []


// MAPA DE IMAGENES
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
}


// MODALES
registerBtn.onclick = () =>{
    registerModal.style.display = "flex"
}

loginBtn.onclick = () =>{
    loginModal.style.display = "flex"
}

window.onclick = (e) =>{

    if(e.target === registerModal){
        registerModal.style.display = "none"
    }

    if(e.target === loginModal){
        loginModal.style.display = "none"
    }

    if(e.target === roomModal){
        roomModal.style.display = "none"
        document.body.style.overflow = ""
    }
}


// REGISTRO
registerForm.onsubmit = (e) =>{

    e.preventDefault()

    const inputs =
    registerForm.querySelectorAll("input")

    const identification = inputs[0].value.trim()

    const name = inputs[1].value.trim()

    const country = inputs[2].value.trim()

    const email = inputs[3].value.trim()

    const phone = inputs[4].value.trim()

    const password = inputs[5].value.trim()

    if(
        !identification ||
        !name ||
        !country ||
        !email ||
        !phone ||
        !password
    ){
        alert("Completa todos los campos")
        return
    }

    // CAMBIO IMPORTANTE
    const users = JSON.parse(
        localStorage.getItem("usuarios")
    ) || []

    const emailExists = users.some(
        user => user.email === email
    )

    if(emailExists){
        alert("Ese correo ya está registrado")
        return
    }

    const identificationExists = users.some(
        user =>
        user.identification === identification
    )

    if(identificationExists){
        alert("Ese documento ya está registrado")
        return
    }

    const newUser = {

        id: Date.now(),

        name,

        country,

        email,

        phone,

        identification,

        password,

        role: "client"
    }

    users.push(newUser)

    // CAMBIO IMPORTANTE
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    )

    sessionStorage.setItem(
        "activeUser",
        JSON.stringify(newUser)
    )

    alert("Cuenta creada correctamente")

    registerModal.style.display = "none"

    registerForm.reset()

    renderLoggedUser(newUser)
}


// LOGIN
loginForm.onsubmit = (e) =>{

    e.preventDefault()

    const inputs =
    loginForm.querySelectorAll("input")

    const name = inputs[0].value.trim()

    const identification =
    inputs[1].value.trim()

    const password =
    inputs[2].value.trim()

    // CAMBIO IMPORTANTE
    const users = JSON.parse(
        localStorage.getItem("usuarios")
    ) || []

    const userFound = users.find(user =>

        user.name === name &&
        user.identification === identification &&
        user.password === password
    )

    if(!userFound){

        alert("Datos incorrectos")

        return
    }

    currentUser = userFound

    sessionStorage.setItem(
        "activeUser",
        JSON.stringify(userFound)
    )

    if(userFound.role === "admin"){

        alert("Bienvenido administrador")

        location.href = "admin.html"

        return
    }

    renderLoggedUser(userFound)

    loginModal.style.display = "none"

    alert("Sesión iniciada correctamente")
}


// RENDER USER
function renderLoggedUser(user){

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

        <div class="dropdown">

            <button class="logout-btn">
                Cerrar sesión
            </button>

        </div>
    `

    configurarDropdown()

    renderUserReservations()
}


// CONTACTO
contactForm.onsubmit = (e) =>{

    e.preventDefault()

    const inputs =
    contactForm.querySelectorAll("input")

    const filled =
    [...inputs].every(
        input => input.value.trim() !== ""
    )

    if(!filled){

        alert("Ingresa tus datos")

        return
    }

    alert("Tus datos se enviaron correctamente")

    contactForm.reset()
}


// SESION ACTIVA
const activeUser = JSON.parse(
    sessionStorage.getItem("activeUser")
)

if(activeUser){

    renderLoggedUser(activeUser)
}


// DROPDOWN
function configurarDropdown(){

    const userBtn =
    document.querySelector(".user-btn")

    const dropdown =
    document.querySelector(".dropdown")

    dropdown.style.display = "none"

    userBtn.onclick = () =>{

        dropdown.style.display =

        dropdown.style.display === "flex"
        ? "none"
        : "flex"
    }

    document.querySelector(
        ".logout-btn"
    ).onclick = () =>{

        sessionStorage.removeItem(
            "activeUser"
        )

        location.reload()
    }
}


// GALERIA
const gallery = document.querySelector(
    ".gallery-grid"
)

if(gallery){

    habitaciones.forEach((room)=>{

        gallery.innerHTML += `

        <article class="gallery-card">

            <img src="${imageMap[room.tipo]}">

            <div class="gallery-info">

                <h3>${room.tipo}</h3>

            </div>

        </article>
        `
    })
}


// MODAL HABITACION
const roomModal = document.querySelector(
    ".room-modal"
)

const roomPreview = document.querySelector(
    ".room-preview"
)

const roomTitle = document.querySelector(
    ".room-title"
)

const roomDescription = document.querySelector(
    ".room-description"
)


document.querySelectorAll(".gallery-card")
.forEach((card,index)=>{

    card.onclick = () =>{

        roomModal.style.display = "flex"

        roomModal.scrollTop = 0

        document.body.style.overflow = "hidden"

        const room = habitaciones[index]

        roomPreview.src = imageMap[room.tipo]

        roomTitle.textContent = room.tipo

        roomDescription.innerHTML = `

            <p>${room.descripcion}</p>

            <div class="features-list">

                ${room.servicios
                    .map(feature => `
                        <span>${feature}</span>
                    `)
                    .join("")
                }

            </div>

            <button 
                class="reserve-btn"
                onclick="location.href='pag-02.html'"
                style="
                    margin-top:1.5rem;
                    width:100%;
                "
            >
                Reservar esta habitación
            </button>
        `
    }
})


document.querySelector(".back-room")
.onclick = () =>{

    roomModal.style.display = "none"

    document.body.style.overflow = ""
}


// AREAS
const areas = [

    {
        name: "Piscina",
        image: "../images/piscina.jpeg",
        description:
        "Relájate en nuestra piscina con vista panorámica al mar.",
        features: [
            "🏊 Acceso libre",
            "🌅 Vista al mar",
            "🌿 Zona de descanso",
            "🍹 Bar en piscina"
        ]
    },

    {
        name: "Jacuzzi",
        image: "../images/jacuzzi.jpeg",
        description:
        "Disfruta de una experiencia de relajación total en nuestro jacuzzi privado.",
        features: [
            "♨️ Agua caliente",
            "💆 Zona de spa",
            "🕯️ Ambiente relajante",
            "🛁 Privado"
        ]
    },

    {
        name: "Cocina",
        image: "../images/cocina.jpeg",
        description:
        "Gastronomía de alta calidad preparada por nuestros chefs expertos.",
        features: [
            "👨‍🍳 Chef profesional",
            "🍽️ Menú variado",
            "🍱 Bufet"
        ]
    }
]


const areasGrid = document.querySelector(
    ".areas-grid"
)

if(areasGrid){

    areas.forEach(area =>{

        areasGrid.innerHTML += `

        <article class="area-card">

            <img 
                src="${area.image}" 
                alt="${area.name}"
            >

            <div class="area-info">

                <h3>${area.name}</h3>

                <p>${area.description}</p>

                <div class="features-list">

                    ${area.features
                        .map(f => `
                            <span>${f}</span>
                        `)
                        .join("")
                    }

                </div>

            </div>

        </article>
        `
    })
}


// RESERVAS USUARIO
function renderUserReservations(){

    const activeUser = JSON.parse(
        sessionStorage.getItem("activeUser")
    )

    if(!activeUser){
        return
    }

    const reservas = JSON.parse(
        localStorage.getItem("reservas")
    ) || []

    const userReservations =
    reservas.filter(
        reserva =>
        reserva.userId === activeUser.id
    )

    if(userReservations.length === 0){
        return
    }

    const existingSection =
    document.querySelector(".user-reservations")

    if(existingSection){
        existingSection.remove()
    }

    const section = document.createElement("section")

    section.className = "user-reservations"

    section.innerHTML = `

        <h2 class="section-title">
            Mis Reservas
        </h2>

        <div class="user-reservations-grid">

            ${userReservations.map(reserva => `

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
    `

    document.querySelector(".home-page")
    .appendChild(section)
}