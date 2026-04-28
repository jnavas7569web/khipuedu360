import { signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let timeout;

export function activarVigilante(auth) {
    const reiniciarTemporizador = () => {
        clearTimeout(timeout);
        
        // 300000 son 5 min. Para probar ponle 10000 (10 seg)
        timeout = setTimeout(() => {
            if (auth.currentUser) {
                console.log("⏰ Sesión expirada por inactividad.");
                signOut(auth).then(() => {
                    window.location.href = "index.html?reason=timeout";
                });
            }
        }, 300000); 
    };

    const eventos = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    eventos.forEach(evt => {
        document.addEventListener(evt, reiniciarTemporizador, true);
    });

    reiniciarTemporizador();
}
