// main.ts
import { personajes } from '../ts/datos';
import { mostrarCarta } from '../ts/ui';

interface Jugador {
    id: number;
    nombre: string;
    cartaVista: boolean;
}

let jugadores: Jugador[] = [];
let personajesUsados: string[] = [];
let personajeActual: string = "";
let indiceImpostor: number = -1;

function iniciarJuego(cantidad: number, nombres?: string[]) {
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
    personajeActual = disponibles[Math.floor(Math.random() * disponibles.length)];
    personajesUsados.push(personajeActual);
    indiceImpostor = Math.floor(Math.random() * jugadores.length);

    console.log("Personaje:", personajeActual, "Impostor:", jugadores[indiceImpostor].nombre);
    mostrarCarta();
}

const botonJugar = document.getElementById("btn-jugar");
if (botonJugar){
    botonJugar.addEventListener("click", () => {
        // Se definen cuantos jugadores queremos, en este caso 4
        iniciarJuego(4);
    })
}