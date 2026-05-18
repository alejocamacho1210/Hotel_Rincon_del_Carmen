function leerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

}


function guardarUsuario(nuevoUsuario) {

    const usuarios = leerUsuarios();

    usuarios.push(nuevoUsuario);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}


function buscarUsuarioPorDocumento(documento) {

    const usuarios = leerUsuarios();

    return usuarios.find(
        usuario => usuario.documento === documento
    );

}


export {
    leerUsuarios,
    guardarUsuario,
    buscarUsuarioPorDocumento
};