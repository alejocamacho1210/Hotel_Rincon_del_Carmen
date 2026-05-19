// admin.js


// LEER USUARIO ACTIVO
const activeUser =
    JSON.parse(
        sessionStorage.getItem("activeUser")
    );


// SI NO HAY USUARIO
if (!activeUser) {

    window.location.href =
        "pag-01.html";

}


// SI NO ES ADMIN
if (activeUser.role !== "admin") {

    alert(
        "No tienes permisos para entrar aquí"
    );

    window.location.href =
        "pag-01.html";

}


console.log(
    "Administrador autenticado correctamente"
);