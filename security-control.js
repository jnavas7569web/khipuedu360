import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Variable para el temporizador
let timeout;

const reiniciarTemporizador = () => {
    const auth = getAuth();
    clearTimeout(timeout);
    
    // 300000 ms = 5 minutos
    timeout = setTimeout(() => {
        if (auth.currentUser) {
            signOut(auth).then(() => {
                window.location.href = "index.html?reason=timeout";
            });
        }
    }, 300000); 
};

// Eventos para detectar que el usuario sigue ahí
window.onload = reiniciarTemporizador;
document.onmousemove = reiniciarTemporizador;
document.onkeypress = reiniciarTemporizador;
document.onclick = reiniciarTemporizador;
document.onwheel = reiniciarTemporizador;
document.ontouchstart = reiniciarTemporizador;

console.log("🛡️ Seguridad Khipu: Auto-logout activo (5 min)");
