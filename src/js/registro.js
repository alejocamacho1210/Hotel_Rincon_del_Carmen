// registro.js

function crearAdmin(){

    const usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const existe =
    usuarios.some(
        u => u.role === "admin"
    );

    if(existe) return;

    usuarios.push({

        id:1,

        name:"Admin",

        identification:"123",

        email:"admin@hotel.com",

        phone:"000",

        country:"Colombia",

        password:"123",

        role:"admin"
    });

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

crearAdmin();

const registerForm =
document.querySelector(
    ".register-form"
);

registerForm.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        const inputs =
        registerForm.querySelectorAll(
            "input"
        );

        const usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

        const nuevoUsuario = {

            id:Date.now(),

            identification:
            inputs[0].value,

            name:
            inputs[1].value,

            country:
            inputs[2].value,

            email:
            inputs[3].value,

            phone:
            inputs[4].value,

            password:
            inputs[5].value,

            role:"client"
        };

        usuarios.push(
            nuevoUsuario
        );

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        sessionStorage.setItem(
            "activeUser",
            JSON.stringify(
                nuevoUsuario
            )
        );

        alert(
            "Registro exitoso"
        );

        location.href =
        "pag-02.html";
    }
);