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
        const bienvenida = document.getElementById("bienvenida");
        bienvenida.classList.add("hidden");
        const cantidad = parseInt(selectorCantidad.value);
        const inputs = contenedorNombres.querySelectorAll("input");
        const nombres = [];
        inputs.forEach((input) => {
            const valor = input.value.trim();
            nombres.push(valor || `Jugador ${nombres.length + 1}`);
        });
        iniciarJuego(cantidad, nombres);
    });
}
const btnNombres = document.getElementById("btn-nombres");
const contenedorNombres = document.getElementById("contenedor-nombres");
const selectorCantidad = document.getElementById("cantidad-jugadores");
btnNombres.addEventListener("click", () => {
    contenedorNombres.classList.toggle("hidden");
    generarCamposNombres();
});
function generarCamposNombres() {
    contenedorNombres.innerHTML = "";
    const cantidad = parseInt(selectorCantidad.value);
    for (let i = 1; i <= cantidad; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Nombre del jugador ${i}`;
        input.className = "bg-gray-800 text-white rounded px-3 py-2 w-full";
        contenedorNombres.appendChild(input);
    }
}
function iniciarJuego(cantidad, nombres) {
    jugadores = [];
    for (let i = 0; i < cantidad; i++) {
        jugadores.push({
            id: i,
            nombre: nombres && nombres[i] ? nombres[i] : `Jugador ${i + 1}`,
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
    personajesUsados = [];
    const zonaJuego = document.getElementById("zona-juego");
    zonaJuego.classList.add("hidden");
    const cartasContenedor = document.getElementById("cartas-contenedor");
    cartasContenedor.innerHTML = "";
    const bienvenida = document.getElementById("bienvenida");
    bienvenida.classList.remove("hidden");
}
const botonSiguientePartida = document.getElementById("btn-siguiente-partida");
if (botonSiguientePartida) {
    botonSiguientePartida.addEventListener("click", siguientePartida);
}
const botonVolverAJugar = document.getElementById("btn-volver-a-jugar");
if (botonVolverAJugar) {
    botonVolverAJugar.addEventListener("click", volverAlInicio);
}
