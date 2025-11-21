let btnLogin;

document.addEventListener('DOMContentLoaded', function () {
    loadNav();
    btnLogin = document.getElementById('btn-login');
    btnLogin.addEventListener('click', login);
});

async function login() {
    const loginUser = document.getElementById('login-user').value;
    const loginPassword = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: loginUser, password: loginPassword })
        });

        console.log({ username: loginUser, password: loginPassword });

        const data = await response.json();
        if (response.ok) {
            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', data.token);
            // Redirigir a la página principal
            window.location.href = 'mostrador.html';
        } else {
            alert('Error de login: ' + data.message);
        }

    } catch (error) {
        console.error("Error en fetch:", error);
    }
}
