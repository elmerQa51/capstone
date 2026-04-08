// 1. VARIABLES GLOBALES (El estado del juego)
let indicePreguntaActual = 0;
let listaDePreguntas = [];
let contadorAciertos = 0;
const META_PARA_GANAR = 3;

// 2. CARGAR EL ARCHIVO JSON (El Oráculo)
fetch('../json/preguntasInduccion.json')
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        listaDePreguntas = datos;
        mostrarPregunta();
    })
    .catch(function (error) {
        console.error("Error cargando el Oráculo:", error);
    });

// 3. FUNCIÓN PARA DIBUJAR LA PREGUNTA EN PANTALLA
function mostrarPregunta() {
    const preguntaUbicada = listaDePreguntas[indicePreguntaActual];
    const contenedorOpciones = document.getElementById('options-container');
    const textoDePregunta = document.getElementById('question-text');

    // Actualizamos el progreso visual
    textoDePregunta.innerHTML = "<small>Progreso: " + contadorAciertos + "/" + META_PARA_GANAR + "</small><br>" + preguntaUbicada.pregunta;

    // Limpiamos los botones anteriores
    contenedorOpciones.innerHTML = '';

    // Creamos los botones de respuesta con un bucle clásico
    for (let i = 0; i < preguntaUbicada.opciones.length; i++) {
        const opcionTexto = preguntaUbicada.opciones[i];
        const boton = document.createElement('button');

        boton.innerText = opcionTexto;

        // Al hacer clic, verificamos si es el índice correcto
        boton.onclick = function () {
            verificarRespuesta(i);
        };

        contenedorOpciones.appendChild(boton);
    }
}

// 4. FUNCIÓN PARA EVALUAR LA RESPUESTA
// ... (Tus variables y fetch se mantienen igual) ...

function verificarRespuesta(indiceSeleccionado) {
    const nombreJugador = localStorage.getItem('playerName') || "Explorador";
    const preguntaActual = listaDePreguntas[indicePreguntaActual];
    const mensajeHTML = document.getElementById('message');
    
    const overlay = document.createElement('div');
    overlay.className = 'pantalla-feedback';
    document.body.appendChild(overlay);

    if (indiceSeleccionado === preguntaActual.correcta) {
        contadorAciertos = contadorAciertos + 1;
        mensajeHTML.innerText = "CORRECTO";

        // Cambiamos el fondo según el progreso
        document.body.style.backgroundImage = "url('../img/induccion" + contadorAciertos + ".png')";

        if (contadorAciertos >= META_PARA_GANAR) {
            // --- AQUÍ ESTÁ EL TRUCO ---
            // Escondemos todo el cuadro del juego para que solo se vea la imagen de fondo
            document.getElementById('game-container').style.display = 'none';
            
            // Opcional: mostrar un mensaje flotante de victoria
            mensajeHTML.innerText = "¡ORÁCULO DESCIFRADO!";

            setTimeout(function () {
                window.location.href = "instruccionConjunto.html";
            }, 3000); // Damos 3 segundos para que aprecie la imagen final
            return; 
        }

        // Si no ha ganado todavía, seguimos con la siguiente pregunta
        indicePreguntaActual = (indicePreguntaActual + 1) % listaDePreguntas.length;

        setTimeout(function () {
            overlay.remove();
            mostrarPregunta();
            mensajeHTML.innerText = ""; // Limpiar el texto de "CORRECTO"
        }, 1500);

    } else {
        mensajeHTML.innerText = "INCORRECTO";
        setTimeout(function () {
            overlay.remove();
            mensajeHTML.innerText = "";
        }, 1200);
    }
}