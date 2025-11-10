// Lógica visual de dar vuelta las cartas y mostrar rol/personaje
export function mostrarCartas(jugadores, personaje, indiceImpostor, onSiguiente, onVolver) {
    const zonaJuego = document.getElementById("zona-juego");
    zonaJuego.classList.remove("hidden");
    // Contenedor de cartas
    const contenedor = document.getElementById("cartas-contenedor");
    contenedor.innerHTML = ""; //limpiar
    // Crear carta para cada jugador
    jugadores.forEach((jugador, index) => {
        const carta = document.createElement("dev");
        carta.className = "bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105 hover:border-yellow-400 hover:shadow-yellow-500/20 text-center animar-carta";
        carta.dataset.vista = "false";
        const nombre = document.createElement("p");
        nombre.textContent = jugador.nombre;
        nombre.className = "font-bold text-yellow-400 mb-2";
        const contenido = document.createElement("p");
        contenido.className = "text-lg text-white mb-4 hidden";
        const boton = document.createElement("button");
        boton.textContent = "Ver carta";
        boton.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded transition";
        boton.addEventListener("click", () => {
            const vista = carta.dataset.vista === "true";
            const bloqueada = carta.dataset.bloqueada === "true";
            // si ya fue bloqueada no se puede volver a abrir
            if (bloqueada)
                return;
            if (!vista) {
                contenido.textContent = index === indiceImpostor ? "Sos el IMPOSTOR 😈" : `${personaje}`;
                contenido.classList.remove("hidden");
                boton.textContent = "Ocultar carta";
                carta.dataset.vista = "true";
                carta.classList.add("border-4", "border-green-500");
            }
            else {
                carta.classList.add("cursor-not-allowed");
                contenido.textContent = "Visto";
                // contenido.classList.add("hidden");
                boton.textContent = "Vista finalizada";
                // boton.classList.add("opacity-60", "cursor-not-allowed");
                boton.disabled = true;
                boton.classList.add("hidden");
                carta.dataset.vista = "false";
                carta.dataset.bloqueada = "true";
                carta.classList.add("border-gray-600", "opacity-70");
            }
        });
        carta.appendChild(nombre);
        carta.appendChild(contenido);
        carta.appendChild(boton);
        contenedor.appendChild(carta);
    });
}
