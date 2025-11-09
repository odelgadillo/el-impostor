// main.ts
import { personajes } from './datos.js';
import { mostrarCartas } from './ui.js';

interface Jugador {
    id: number;
    nombre: string;
    cartaVista: boolean;
}

let jugadores: Jugador[] = [];
let personajesUsados: string[] = [];
let personajeActual: string = "";
let indiceImpostor: number = -1;

const botonJugar = document.getElementById("btn-jugar");
if (botonJugar) {
    botonJugar.addEventListener("click", () => {
        const selector = document.getElementById("cantidad-jugadores") as HTMLSelectElement;
        const cantidad = parseInt(selector.value);

        document.querySelector("div.min-h-screen")?.classList.add("hidden");
        iniciarJuego(cantidad);
    })
}

function iniciarJuego(cantidad: number) {
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
    if (disponibles.length === 0){
        alert("Ya se usaron todos los personajes. Iniciá un nuevo juego.");
        return;
    }

    personajeActual = disponibles[Math.floor(Math.random() * disponibles.length)];
    personajesUsados.push(personajeActual);
    indiceImpostor = Math.floor(Math.random() * jugadores.length);

    console.log("Personaje:", personajeActual, "Impostor:", jugadores[indiceImpostor].nombre);
    mostrarCartas(jugadores, personajeActual, indiceImpostor, siguientePartida, volverAlInicio);
}

function siguientePartida(){
    asignarPersonaje();
}

function volverAlInicio(){
    personajesUsados = [];
    const zonaJuego = document.getElementById("zona-juego") as HTMLDivElement;
    zonaJuego.classList.add("hidden");
    zonaJuego.innerHTML = ""; 

    document.querySelector("div.min-h-screen")?.classList.remove("hidden");
}