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
        carta.className = "relative  bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg transform transition-transform hover:scale-105 hover:border-yellow-400 hover:shadow-yellow-500/20 text-center animar-carta";
        carta.dataset.vista = "false";
        const nombre = document.createElement("p");
        nombre.textContent = jugador.nombre;
        nombre.className = "font-bold text-yellow-400 mb-2";
        const contenido = document.createElement("p");
        contenido.className = "text-2xl text-white mb-4 hidden";
        // Barra de progreso
        const barraContenedor = document.createElement("div");
        barraContenedor.className = "w-full h-1 bg-gray-700 rounded-full overflow-hidden mt-2 hidden";
        const barraProgreso = document.createElement("div");
        barraProgreso.className = "h-full bg-yellow-400 w-0 transition-all duration-75";
        barraContenedor.appendChild(barraProgreso);
        // Crear boton 'ver' para cada carta
        const boton = document.createElement("button");
        boton.textContent = "Ver carta";
        boton.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded transition";
        // Crear boton 'cerrar' para cada carta
        const btnCerrar = document.createElement("button");
        btnCerrar.innerHTML = "❌";
        btnCerrar.className = "hidden absolute top-2 right-2 text-gray-400 hover:text-white text-xl transition";
        let intervalo;
        // Agregar evento al boton ver de cada carta
        boton.addEventListener("click", () => {
            const vista = carta.dataset.vista === "true";
            const bloqueada = carta.dataset.bloqueada === "true";
            // si ya fue bloqueada no se puede volver a abrir
            if (bloqueada)
                return;
            if (!vista) {
                contenido.textContent = index === indiceImpostor ? "IMPOSTOR 😈" : `${personaje}`;
                contenido.classList.remove("hidden");
                boton.textContent = "Ocultar carta";
                boton.classList.add("hidden");
                btnCerrar.classList.remove("hidden");
                carta.dataset.vista = "true";
                carta.classList.add("border-4", "border-green-500");
                // Mostrar barra y reiniciar progreso
                barraContenedor.classList.remove("hidden");
                barraProgreso.style.width = "0%";
                let progreso = 0;
                let pausado = false;
                function iniciarProgreso() {
                    intervalo = setInterval(() => {
                        if (!pausado) {
                            progreso += 2; // velocidad de avance
                            barraProgreso.style.width = progreso + "%";
                            if (progreso >= 100) {
                                clearInterval(intervalo);
                                ocultarCarta();
                            }
                        }
                    }, 80);
                }
                // Eventos tactiles para pausar/reanudar
                boton.addEventListener("touchstart", () => (pausado = true));
                boton.addEventListener("touchend", () => (pausado = false));
                iniciarProgreso();
            }
            else {
                carta.classList.add("cursor-not-allowed");
                contenido.textContent = "Visto";
                boton.textContent = "Vista finalizada";
                boton.disabled = true;
                boton.classList.add("hidden");
                carta.dataset.vista = "false";
                carta.dataset.bloqueada = "true";
                carta.classList.add("border-gray-600", "opacity-70");
                barraContenedor.classList.add("hidden");
            }
        });
        btnCerrar.addEventListener("click", () => {
            ocultarCarta();
        });
        function ocultarCarta() {
            contenido.textContent = "Visto";
            boton.textContent = "Vista finalizada";
            boton.disabled = true;
            boton.classList.add("hidden");
            btnCerrar.classList.add("hidden");
            carta.dataset.vista = "false";
            carta.dataset.bloqueada = "true";
            carta.classList.add("border-gray-600", "opacity-70");
            barraContenedor.classList.add("hidden");
            clearInterval(intervalo);
        }
        carta.appendChild(nombre);
        carta.appendChild(contenido);
        carta.appendChild(barraContenedor);
        carta.appendChild(boton);
        carta.appendChild(btnCerrar);
        contenedor.appendChild(carta);
    });
}
