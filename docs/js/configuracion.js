// configuracion.ts
import { bancos } from './datos.js';
const selectorModo = document.getElementById("modo-juego");
const botonGuardar = document.getElementById("btn-guardar");
// Función para capitalizar la primera letra
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
// Cargar opciones dinámicamente
selectorModo.innerHTML = ""; // Limpiar opciones existentes
Object.keys(bancos).forEach((clave) => {
    const option = document.createElement("option");
    option.value = clave;
    option.textContent = capitalizar(clave);
    selectorModo.appendChild(option);
});
// Cargar modo actual si ya estaba guardado
const modoGuardado = localStorage.getItem("modo-impostor") || "general";
selectorModo.value = modoGuardado;
// Guardar el modo elegido
botonGuardar.addEventListener("click", () => {
    const modo = selectorModo.value;
    localStorage.setItem("modo-impostor", modo);
    window.location.href = "index.html";
});
