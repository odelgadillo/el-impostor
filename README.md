# 🎭 El Impostor

Aplicación web para jugar la versión presencial del juego social **El Impostor**, donde un jugador desconoce el personaje o palabra que los demás deben describir sin revelar directamente.  
Creada con **HTML, CSS, Tailwind y TypeScript**, enfocada en la simplicidad y en la experiencia de juego entre amigos.

---

### 🕹️ Cómo se juega

1. Elegí la cantidad de jugadores (entre 3 y 7).
2. Opcionalmente, asigná nombres personalizados.
3. Presioná **“Jugar”** para iniciar la partida.
4. Cada jugador, por turno, revela su carta:
   - Uno de ellos será **El Impostor**, que no sabe la palabra.
   - Los demás conocerán la palabra o personaje.
5. Después de que todos vean sus cartas, comienzan las rondas de descripciones para descubrir quién miente.
6. Al finalizar, podés:
   - Iniciar una **siguiente partida** con una nueva palabra (sin repetir).
   - Volver al menú principal y comenzar un **nuevo juego**.


### 🧩 Tecnologías utilizadas
- **HTML5** – Estructura principal  
- **Tailwind CSS (CDN)** – Estilo visual moderno y responsivo  
- **TypeScript** – Lógica del juego, tipado y estructura  
- **Node.js** – Entorno para compilar TypeScript  
- **GitHub Pages** – Hospedaje gratuito del juego  


### 📂 Estructura del proyecto
```text
el-impostor/
├─ docs/ # Carpeta publicada en GitHub Pages
│ ├─ css/
│ ├─ js/ # Código TypeScript compilado
│ ├─ index.html
│ └─ instrucciones.html
├─ ts/ # Código fuente TypeScript
│ ├─ main.ts
│ ├─ ui.ts
│ └─ datos.ts
├─ tsconfig.json
└─ README.md
```

### 🧠 Aprendizajes del proyecto

- Uso práctico de **TypeScript** en un entorno simple (sin framework).  
- Modularización de funciones (`main.ts`, `ui.ts`, `datos.ts`).  
- Manejo de **eventos del DOM** con funciones flecha.  
- Compilación manual con `npx tsc` y configuración de `tsconfig.json`.  
- Publicación gratuita usando **GitHub Pages**.


### 🚀 Probar el juego
El sitio está disponible en:
👉 [https://odelgadillo.github.io/el-impostor/](https://odelgadillo.github.io/el-impostor/)


---
Desarrollado con 💛 por Omar Delgadillo, como proyecto de aprendizaje en TypeScript.
