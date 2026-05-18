import {
    guardarUsuario,
    buscarUsuarioPorDocumento
} from "./usuarios.js";


const registerForm =
    document.getElementById("register-form");


registerForm.addEventListener("submit", (e) => {

    e.preventDefault();


    const nuevoUsuario = {

        documento:
            document.getElementById("documento").value,

        nombre:
            document.getElementById("nombre").value,

        pais:
            document.getElementById("pais").value,

        correo:
            document.getElementById("correo").value,

        telefono:
            document.getElementById("telefono").value,

        password:
            document.getElementById("password").value

    };


    const usuarioExistente =
        buscarUsuarioPorDocumento(
            nuevoUsuario.documento
        );


    if (usuarioExistente) {

        alert(
            "Ya existe un usuario registrado con ese documento"
        );

        return;

    }


    guardarUsuario(nuevoUsuario);


    sessionStorage.setItem(
        "activeUser",
        JSON.stringify(nuevoUsuario)
    );


    alert("Usuario registrado correctamente");


    window.location.href =
        "irAPagar.html";

});