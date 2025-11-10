// Lógica visual de dar vuelta las cartas y mostrar rol/personaje
export function mostrarCartas(jugadores, personaje, indiceImpostor, onSiguiente, onVolver) {
    const zonaJuego = document.getElementById("zona-juego");
    zonaJuego.innerHTML = ""; //limpiar
    zonaJuego.classList.remove("hidden");
    zonaJuego.classList.add("grid", "grid-cols-2", "sm:grid-cols-3", "gap-4", "p-6", "justify-center");
    jugadores.forEach((jugador, index) => {
        const carta = document.createElement("dev");
        carta.className = "bg-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg transition-transform transform hover:scale-105";
        carta.dataset.vista = "false";
        const nombre = document.createElement("p");
        nombre.textContent = jugador.nombre;
        nombre.className = "font-bold text-yellow-400 mb-2";
        const contenido = document.createElement("p");
        contenido.className = "text-lg text-white mb-4 hidden";
        const boton = document.createElement("button");
        boton.textContent = "Ver carta";
        boton.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded";
        boton.addEventListener("click", () => {
            const vista = carta.dataset.vista === "true";
            const bloqueada = carta.dataset.bloqueada === "true";
            // si ya fue bloqueada no se puede volver a abrir
            if (bloqueada)
                return;
            if (!vista) {
                contenido.textContent = index === indiceImpostor ? "Sos el IMPOSTOR 😈" : `Palabra: ${personaje}`;
                contenido.classList.remove("hidden");
                boton.textContent = "Ocultar carta";
                carta.dataset.vista = "true";
                carta.classList.add("border-4", "border-green-500");
            }
            else {
                contenido.classList.add("hidden");
                boton.textContent = "Vista finalizada";
                boton.classList.add("opacity-60", "cursor-not-allowed");
                boton.disabled = true;
                carta.dataset.vista = "false";
                carta.dataset.bloqueada = "true";
                carta.classList.add("border-gray-600", "opacity-70");
            }
        });
        carta.appendChild(nombre);
        carta.appendChild(contenido);
        carta.appendChild(boton);
        zonaJuego.appendChild(carta);
    });
    // === Botones inferiores ===
    const contenedorBotones = document.createElement("div");
    contenedorBotones.className = "col-span-full flex gap-4 justify-center mt-8";
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente partida";
    btnSiguiente.className = "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded";
    btnSiguiente.addEventListener("click", onSiguiente);
    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver al inicio";
    btnVolver.className = "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded";
    btnVolver.addEventListener("click", onVolver);
    contenedorBotones.appendChild(btnSiguiente);
    contenedorBotones.appendChild(btnVolver);
    zonaJuego.appendChild(contenedorBotones);
}
