// configuracion.ts

const selectorModo = document.getElementById("modo-juego") as HTMLSelectElement;
const botonGuardar = document.getElementById("btn-guardar") as HTMLButtonElement;

// Cargar modo actual si ya estaba guardado
const modoGuardado = localStorage.getItem("modo-impostor") || "general";
selectorModo.value = modoGuardado;

// Guardar el modo elegido
botonGuardar.addEventListener("click", () => {
    const modo = selectorModo.value;
    localStorage.setItem("modo-impostor", modo);
    window.location.href = "index.html";
});
