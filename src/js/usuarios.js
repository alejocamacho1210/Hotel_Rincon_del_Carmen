function leerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

}

function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}

function guardarUsuario(nuevoUsuario) {

    const usuarios = leerUsuarios();

    usuarios.push(nuevoUsuario);

    guardarUsuarios(usuarios);

}

function buscarUsuario(documento, password) {

    const usuarios = leerUsuarios();

    return usuarios.find(
        usuario =>
            usuario.identification === documento &&
            usuario.password === password
    );

}

function obtenerUsuarioActivo() {

    return JSON.parse(
        sessionStorage.getItem("activeUser")
    );

}

function cerrarSesion() {

    sessionStorage.removeItem(
        "activeUser"
    );

}