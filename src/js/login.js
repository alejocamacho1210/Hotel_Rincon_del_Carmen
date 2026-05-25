// login.js

const loginForm =
document.querySelector(
    ".login-form"
);

if(loginForm){

    loginForm.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const documento =
            document.getElementById(
                "login-document"
            ).value;

            const password =
            document.getElementById(
                "login-password"
            ).value;

            const usuarios =
            JSON.parse(
                localStorage.getItem(
                    "usuarios"
                )
            ) || [];

            const usuario =
            usuarios.find(
                user =>
                user.identification === documento &&
                user.password === password
            );

            if(!usuario){

                alert(
                    "Datos incorrectos"
                );

                return;
            }

            sessionStorage.setItem(
                "activeUser",
                JSON.stringify(usuario)
            );

            alert(
                "Sesión iniciada"
            );

            location.href =
            "pag-02.html";
        }
    );
}