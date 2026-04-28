// security-control.js - Versión Blindada
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let timeout;
const auth = getAuth();

const reiniciarTemporizador = () => {
    clearTimeout(timeout);
    
    // 300000 ms = 5 minutos
    timeout = setTimeout(() => {
        // Solo cerramos si hay alguien logueado
        if (auth.currentUser) {
            console.log("⏰ Tiempo agotado. Cerrando sesión...");
            signOut(auth).then(() => {
                window.location.href = "index.html?reason=timeout";
            });
        }
    }, 100000); 
};

// Escuchar cuando el estado de autenticación cambia para activar el vigilante
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("🛡️ Vigilante de sesión activado para:", user.email);
        reiniciarTemporizador();
        
        // Eventos para detectar actividad humana
        const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        eventos.forEach(evt => {
            document.addEventListener(evt, reiniciarTemporizador, true);
        });
    }
});
