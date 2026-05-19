// registro.js


// CREAR ADMIN AUTOMATICAMENTE
function crearAdminAutomatico() {

    // LEER USUARIOS
    const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


    // BUSCAR ADMIN
    const adminExiste =
        usuarios.some(
            usuario =>
                usuario.role === "admin"
        );


    // SI NO EXISTE CREARLO
    if (!adminExiste) {

        const admin = {

            id: 1,

            name: "Juan Arias",

            identification: "1097489524",

            email: "admin@hotel.com",

            phone: "0000000000",

            country: "Colombia",

            password: "Juanda.2210",

            role: "admin"

        };


        usuarios.push(admin);


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


        console.log(
            "Administrador creado correctamente"
        );

    }

}


// EJECUTAR AUTOMATICAMENTE
crearAdminAutomatico();


// FORMULARIO
const registerForm =
    document.querySelector(".register-form");


// REGISTRAR USUARIO
registerForm.addEventListener("submit", (e) => {

    e.preventDefault();


    // LEER INPUTS
    const inputs =
        registerForm.querySelectorAll("input");


    // OBTENER USUARIOS
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


    // VALIDAR EMAIL
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


    // CREAR NUEVO USUARIO
    const nuevoUsuario = {

        id: usuarios.length + 1,

        identification: inputs[0].value,

        name: inputs[1].value,

        country: inputs[2].value,

        email: inputs[3].value,

        phone: inputs[4].value,

        password: inputs[5].value,

        role: "client"

    };


    // AGREGAR AL ARRAY
    usuarios.push(nuevoUsuario);


    // GUARDAR
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );


    // GUARDAR SESION ACTIVA
    sessionStorage.setItem(
        "activeUser",
        JSON.stringify(nuevoUsuario)
    );


    // ALERTA
    alert(
        "Usuario registrado correctamente"
    );


    // REDIRECCION
    window.location.href =
        "irAPagar.html";

});