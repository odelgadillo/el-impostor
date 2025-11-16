"use strict";
// configuracion.ts
const selectorModo = document.getElementById("modo-juego");
const botonGuardar = document.getElementById("btn-guardar");
// Cargar modo actual si ya estaba guardado
const modoGuardado = localStorage.getItem("modo-impostor") || "general";
selectorModo.value = modoGuardado;
// Guardar el modo elegido
botonGuardar.addEventListener("click", () => {
    const modo = selectorModo.value;
    localStorage.setItem("modo-impostor", modo);
    window.location.href = "index.html";
});
