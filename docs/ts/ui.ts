// Lógica visual de dar vuelta las cartas y mostrar rol/personaje

export function mostrarCartas(
    jugadores: any[],
    personaje: string,
    indiceImpostor: number,
    onSiguiente: () => void,
    onVolver: () => void
) {
    const zonaJuego = document.getElementById("zona-juego") as HTMLDivElement;
    zonaJuego.classList.remove("hidden");

    // Contenedor de cartas
    const contenedor = document.getElementById("cartas-contenedor") as HTMLDivElement;
    contenedor.innerHTML = ""; //limpiar

    // Crear carta para cada jugador
    jugadores.forEach((jugador, index) => {
        const carta = document.createElement("div");
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

        // Crear boton 'revelar' para cada carta
        const btnRevelar = document.createElement("button");
        btnRevelar.textContent = "Revelar";
        btnRevelar.className = "hidden bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded transition";

        // Crear boton 'cerrar' para cada carta
        const btnCerrar = document.createElement("button");
        btnCerrar.innerHTML = "❌";
        btnCerrar.className = "hidden absolute top-2 right-2 text-gray-400 hover:text-white text-xl transition";

        let intervalo: any;

        // Agregar evento al boton ver de cada carta
        boton.addEventListener("click", () => {
            const vista = carta.dataset.vista === "true";
            const bloqueada = carta.dataset.bloqueada === "true";

            // si ya fue bloqueada no se puede volver a abrir
            if (bloqueada) return;

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

            } else {
                ocultarCarta();
            }
        });

        btnCerrar.addEventListener("click", () => {
            ocultarCarta();
        });

        // Evento para revelar rol
        btnRevelar.addEventListener("click", () => {
            if (index === indiceImpostor) {
                contenido.textContent = "Es el Impostor 😈";
                contenido.className = "text-xl text-red-500 font-bold mb-4";
            } else {
                contenido.textContent = "No es el Impostor 😇";
                contenido.className = "text-xl text-green-500 font-bold mb-4";
            }
            contenido.classList.remove("hidden");
            btnRevelar.classList.add("hidden");
        });

        function ocultarCarta() {
            contenido.textContent = "Visto";
            contenido.className = "text-2xl text-gray-500 mb-4"; // Restaurar estilo o poner gris
            contenido.classList.remove("hidden"); // Asegurar que se vea "Visto"

            boton.textContent = "Vista finalizada";
            boton.disabled = true;
            boton.classList.add("hidden");
            btnCerrar.classList.add("hidden");

            carta.dataset.vista = "false";
            carta.dataset.bloqueada = "true";
            carta.classList.add("border-gray-600", "opacity-70");
            barraContenedor.classList.add("hidden");
            clearInterval(intervalo);

            // Mostrar boton revelar
            btnRevelar.classList.remove("hidden");
        }

        carta.appendChild(nombre);
        carta.appendChild(contenido);
        carta.appendChild(barraContenedor);
        carta.appendChild(boton);
        carta.appendChild(btnRevelar); // Agregar el nuevo boton
        carta.appendChild(btnCerrar);
        contenedor.appendChild(carta);
    });
}