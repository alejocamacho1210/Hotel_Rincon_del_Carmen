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


let currentUser = null;


// ABRIR MODAL REGISTRO
registerBtn.onclick = () => {

    registerModal.style.display = "flex";

};


// ABRIR MODAL LOGIN
loginBtn.onclick = () => {

    loginModal.style.display = "flex";

};


// CERRAR MODALES
window.onclick = (e) => {

    if (e.target === registerModal) {

        registerModal.style.display = "none";

    }

    if (e.target === loginModal) {

        loginModal.style.display = "none";

    }

    if (e.target === roomModal) {

        roomModal.style.display = "none";

        document.body.style.overflow = "";

    }

};


// REGISTRAR USUARIO
registerForm.onsubmit = (e) => {

    e.preventDefault();


    const inputs =
        registerForm.querySelectorAll("input");


    // LEER USUARIOS
    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


    // VALIDAR DOCUMENTO
    const documentoExiste =
        usuarios.some(
            usuario =>
                usuario.identification ===
                inputs[0].value
        );


    if (documentoExiste) {

        alert(
            "Ya existe un usuario con ese documento"
        );

        return;

    }


    // VALIDAR CORREO
    const correoExiste =
        usuarios.some(
            usuario =>
                usuario.email ===
                inputs[3].value
        );


    if (correoExiste) {

        alert(
            "Ya existe un usuario con ese correo"
        );

        return;

    }


    // CREAR USUARIO
    const user = {

        id: usuarios.length + 1,

        identification: inputs[0].value,

        name: inputs[1].value,

        country: inputs[2].value,

        email: inputs[3].value,

        phone: inputs[4].value,

        password: inputs[5].value,

        role: "client"

    };


    // GUARDAR
    usuarios.push(user);


    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );


    alert(
        "Cuenta creada correctamente"
    );


    registerModal.style.display =
        "none";

};


// LOGIN
loginForm.onsubmit = (e) => {

    e.preventDefault();


    const inputs =
        loginForm.querySelectorAll("input");


    // LEER USUARIOS
    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


    // BUSCAR USUARIO
    const usuarioEncontrado =
        usuarios.find(
            usuario =>

                inputs[0].value ===
                usuario.name &&

                inputs[1].value ===
                usuario.identification &&

                inputs[2].value ===
                usuario.password
        );


    // SI EXISTE
    if (usuarioEncontrado) {

        currentUser =
            usuarioEncontrado;


        // GUARDAR SESION
        sessionStorage.setItem(
            "activeUser",
            JSON.stringify(usuarioEncontrado)
        );


        // SI ES ADMIN
        if (
            usuarioEncontrado.role ===
            "admin"
        ) {

            alert(
                "Bienvenido administrador"
            );


            window.location.href =
                "admin.html";

            return;

        }


        // CLIENTE NORMAL
        topNav.innerHTML = `

            <button class="user-btn">
                ${usuarioEncontrado.name}
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

        `;


        const userBtn =
            document.querySelector(".user-btn");

        const dropdown =
            document.querySelector(".dropdown");


        dropdown.style.display = "none";


        userBtn.onclick = () => {

            dropdown.style.display =

            dropdown.style.display === "flex"
            ? "none"
            : "flex";

        };


        document.querySelector(".logout-btn")
        .onclick = () => {

            sessionStorage.removeItem(
                "activeUser"
            );

            location.reload();

        };


        loginModal.style.display =
            "none";


        alert(
            "Sesión iniciada correctamente"
        );

    }

    else {

        alert(
            "Datos incorrectos"
        );

    }

};


// FORMULARIO CONTACTO
contactForm.onsubmit = (e) => {

    e.preventDefault();


    const inputs =
        contactForm.querySelectorAll("input");


    const filled =
        [...inputs].every(
            input =>
                input.value.trim() !== ""
        );


    if (!filled) {

        alert(
            "Ingresa tus datos"
        );

        return;

    }


    alert(
        "Tus datos se enviaron correctamente"
    );


    contactForm.reset();

};


// USUARIO ACTIVO
const activeUser =
    JSON.parse(
        sessionStorage.getItem("activeUser")
    );


if (
    activeUser &&
    activeUser.role !== "admin"
) {

    topNav.innerHTML = `

        <button class="user-btn">
            ${activeUser.name}
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

    `;


    const userBtn =
        document.querySelector(".user-btn");

    const dropdown =
        document.querySelector(".dropdown");


    dropdown.style.display = "none";


    userBtn.onclick = () => {

        dropdown.style.display =

        dropdown.style.display === "flex"
        ? "none"
        : "flex";

    };


    document.querySelector(".logout-btn")
    .onclick = () => {

        sessionStorage.removeItem(
            "activeUser"
        );

        location.reload();

    };

}