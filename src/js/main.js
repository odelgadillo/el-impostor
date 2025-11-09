// main.ts
import { personajes } from './datos.js';
import { mostrarCartas } from './ui.js';
let jugadores = [];
let personajesUsados = [];
let personajeActual = "";
let indiceImpostor = -1;
const botonJugar = document.getElementById("btn-jugar");
if (botonJugar) {
    botonJugar.addEventListener("click", () => {
        var _a;
        const selector = document.getElementById("cantidad-jugadores");
        const cantidad = parseInt(selector.value);
        (_a = document.querySelector("div.min-h-screen")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        iniciarJuego(cantidad);
    });
}
function iniciarJuego(cantidad) {
    jugadores = [];
    for (let i = 0; i < cantidad; i++) {
        jugadores.push({
            id: i,
            nombre: `Jugador ${i + 1}`,
            cartaVista: false
        });
    }
    asignarPersonaje();
}
function asignarPersonaje() {
    const disponibles = personajes.filter(p => !personajesUsados.includes(p));
    if (disponibles.length === 0) {
        alert("Ya se usaron todos los personajes. Iniciá un nuevo juego.");
        return;
    }
    personajeActual = disponibles[Math.floor(Math.random() * disponibles.length)];
    personajesUsados.push(personajeActual);
    indiceImpostor = Math.floor(Math.random() * jugadores.length);
    console.log("Personaje:", personajeActual, "Impostor:", jugadores[indiceImpostor].nombre);
    mostrarCartas(jugadores, personajeActual, indiceImpostor, siguientePartida, volverAlInicio);
}
function siguientePartida() {
    asignarPersonaje();
}
function volverAlInicio() {
    var _a;
    personajesUsados = [];
    const zonaJuego = document.getElementById("zona-juego");
    zonaJuego.classList.add("hidden");
    zonaJuego.innerHTML = "";
    (_a = document.querySelector("div.min-h-screen")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
}
