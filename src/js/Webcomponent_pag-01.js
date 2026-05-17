const registerBtn = document.querySelectorAll(".nav-btn")[0]

const loginBtn = document.querySelectorAll(".nav-btn")[1]

const reserveBtn = document.querySelector(".reserve-btn")

const registerModal = document.querySelector(".register-modal")

const loginModal = document.querySelector(".login-modal")

const registerForm = document.querySelector(".register-modal form")

const loginForm = document.querySelector(".login-modal form")

const contactForm = document.querySelector(".contact-form")

const topNav = document.querySelector(".top-nav")

let currentUser = null

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
}

registerForm.onsubmit = (e) =>{

    e.preventDefault()

    const inputs = registerForm.querySelectorAll("input")

    const user = {
        id:inputs[0].value,
        name:inputs[1].value,
        country:inputs[2].value,
        email:inputs[3].value,
        phone:inputs[4].value,
        password:inputs[5].value
    }

    localStorage.setItem("hotelUser",JSON.stringify(user))

    alert("Cuenta creada correctamente")

    registerModal.style.display = "none"
}

loginForm.onsubmit = (e) =>{

    e.preventDefault()

    const inputs = loginForm.querySelectorAll("input")

    const savedUser = JSON.parse(localStorage.getItem("hotelUser"))

    if(
        savedUser &&
        inputs[0].value === savedUser.name &&
        inputs[1].value === savedUser.id &&
        inputs[2].value === savedUser.password
    ){

        currentUser = savedUser

        sessionStorage.setItem(
             "activeUser",
             JSON.stringify(savedUser)
        )

        topNav.innerHTML = `

            <button class="user-btn">
            ${savedUser.name}
            </button>

             <button class="reserve-btn">
              Reservar
             </button>

            <div class="dropdown">

              <button class="logout-btn">
            Cerrar sesión
        </button>

    </div>

`

const userBtn = document.querySelector(".user-btn")

const dropdown = document.querySelector(".dropdown")

dropdown.style.display = "none"

userBtn.onclick = () =>{

    dropdown.style.display =
    dropdown.style.display === "flex"
    ? "none"
    : "flex"
}

document.querySelector(".logout-btn")
.onclick = () =>{

    sessionStorage.removeItem("activeUser")

    location.reload()
}

        loginModal.style.display = "none"

        alert("Sesión iniciada correctamente")

    }else{

        alert("Datos incorrectos")
    }
}

contactForm.onsubmit = (e) =>{

    e.preventDefault()

    alert("Tus datos se enviaron correctamente")

    contactForm.reset()
}
const activeUser = JSON.parse(
    sessionStorage.getItem("activeUser")
)

if(activeUser){

    topNav.innerHTML = `

        <button class="user-btn">
            ${activeUser.name}
        </button>

        <button class="reserve-btn">
            Reservar
        </button>

        <div class="dropdown">

         <button class="logout-btn">
            Cerrar sesión
         </button>

        </div>

    `

    const userBtn = document.querySelector(".user-btn")

    const dropdown = document.querySelector(".dropdown")

    dropdown.style.display = "none"

    userBtn.onclick = () =>{

        dropdown.style.display =
        dropdown.style.display === "flex"
        ? "none"
        : "flex"
    }

    document.querySelector(".logout-btn")
    .onclick = () =>{

        sessionStorage.removeItem("activeUser")

        location.reload()
    }
}
const rooms = [

{
    name:"Estandar King",

    image:"../images/estandar_king.jpeg",

    description:
    "Habitación elegante con cama king y ambiente moderno.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "❄️ Aire acondicionado",
        "☕ Cafetera"
    ]
},

{
    name:"Estandar Double",

    image:"../images/estandar_double.jpeg",

    description:
    "Perfecta para amigos o parejas con dos camas cómodas.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "🛏️ Dos camas",
        "❄️ Aire acondicionado"
    ]
},

{
    name:"Ejecutiva King",

    image:"../images/ejecutiva_king.jpeg",

    description:
    "Ideal para viajes ejecutivos con zona de trabajo.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "💻 Escritorio",
        "🍷 Mini bar"
    ]
},

{
    name:"Habitacion premium",

    image:"../images/habitacion_premium.jpeg",

    description:
    "Mayor comodidad y acabados premium.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "🍷 Mini bar",
        "🛋️ Sala privada"
    ]
},

{
    name:"Apart hotel",

    image:"../images/apart_hotel.jpeg",

    description:
    "Espacio tipo apartamento para largas estadías.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "🍳 Cocina",
        "🧺 Lavadora"
    ]
},

{
    name:"Junior suite",

    image:"../images/suite_junior.jpeg",

    description:
    "Suite moderna con ambiente exclusivo.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "🍷 Mini bar",
        "🛁 Jacuzzi"
    ]
},

{
    name:"Suite familiar",

    image:"../images/suite_familiar.jpeg",

    description:
    "Espacio amplio ideal para familias.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "🛏️ Camas múltiples",
        "🍽️ Comedor"
    ]
},

{
    name:"Suite presidencial",

    image:"../images/suite_presidencial.jpeg",

    description:
    "La habitación más lujosa del hotel.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "🛁 Jacuzzi",
        "🍾 Mini bar premium",
        "👑 Servicio VIP"
    ]
},

{
    name:"Habitaciones accesibles",

    image:"../images/habitacion_accesible.jpeg",

    description:
    "Diseñada para mayor comodidad y accesibilidad.",

    features:[
        "📶 Wifi",
        "📺 Smart TV",
        "♿ Accesibilidad",
        "🚿 Baño adaptado"
    ]
}

]



const gallery = document.querySelector(".gallery-grid")

if(gallery){

rooms.forEach((room,index)=>{

    gallery.innerHTML += `

    <article class="gallery-card">

        <img src="${room.image}">

        <div class="gallery-info">

            <h3>${room.name}</h3>

        </div>

    </article>

    `
})
}



const roomModal = document.querySelector(".room-modal")

const roomPreview = document.querySelector(".room-preview")

const roomTitle = document.querySelector(".room-title")

const roomDescription = document.querySelector(".room-description")



document.querySelectorAll(".gallery-card")
.forEach((card,index)=>{

    card.onclick = () =>{

        roomModal.style.display = "flex"

        roomPreview.src = rooms[index].image

        roomTitle.textContent = rooms[index].name

        roomDescription.innerHTML = `
            <p>
                ${rooms[index].description}
            </p>
            <div class="features-list">
                ${rooms[index].features.map(feature=>

                    `<span>${feature}</span>`

                ).join("")}
            </div>

        `
    }
})
document.querySelector(".back-room")
.onclick = () =>{

    roomModal.style.display = "none"
}
