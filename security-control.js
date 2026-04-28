import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let timeout;

export function activarVigilante(auth) {
    const reiniciarTemporizador = () => {
        // console.log("Movimiento detectado, reiniciando reloj..."); // Opcional para debug
        clearTimeout(timeout);
        
        // PARA PRUEBA: 10000 (10 segundos)
        // PARA PRODUCCIÓN: 300000 (5 minutos)
        timeout = setTimeout(() => {
            if (auth.currentUser) {
                console.log("⏰ Sesión expirada por inactividad.");
                signOut(auth).then(() => {
                    window.location.href = "index.html?reason=timeout";
                }).catch(err => console.error("Error al cerrar sesión:", err));
            }
        }, 300000); 
    };

    // Lista de eventos que resetean el tiempo
    const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    eventos.forEach(evt => {
        document.addEventListener(evt, reiniciarTemporizador, true);
    });

    // Iniciar el conteo apenas cargue la página
    reiniciarTemporizador();
}
