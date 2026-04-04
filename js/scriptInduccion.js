// 1. VARIABLES GLOBALES (El estado del juego)
let indicePreguntaActual = 0;
let listaDePreguntas = [];
let contadorAciertos = 0; 
const META_PARA_GANAR = 3; 

// 2. CARGAR EL ARCHIVO JSON (El Oráculo)
fetch('../json/preguntasInduccion.json')
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos) {
        listaDePreguntas = datos;
        mostrarPregunta();
    })
    .catch(function(error) {
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
        boton.onclick = function() {
            verificarRespuesta(i);
        };
        
        contenedorOpciones.appendChild(boton);
    }
}

// 4. FUNCIÓN PARA EVALUAR LA RESPUESTA
function verificarRespuesta(indiceSeleccionado) {
    const nombreJugador = localStorage.getItem('playerName') || "Explorador";
    const areaDeMensaje = document.getElementById('message');
    const preguntaActual = listaDePreguntas[indicePreguntaActual];

    // ¿Es el número de la opción correcta?
    if (indiceSeleccionado === preguntaActual.correcta) {
        contadorAciertos = contadorAciertos + 1;
        areaDeMensaje.innerText = "¡Bien hecho, " + nombreJugador + "! La lógica es sólida.";
        areaDeMensaje.style.color = "#2ecc71"; // Verde

        // Verificar si ya se alcanzó la meta
        if (contadorAciertos >= META_PARA_GANAR) {
            areaDeMensaje.innerHTML = "<strong>¡INCREÍBLE, " + nombreJugador + "!</strong> El Oráculo se ha abierto.";
            
            setTimeout(function() {
                window.location.href = "instruccionConjunto.html"; 
            }, 2000);
            
            return; // Detenemos la función aquí
        }

        // Si no ha ganado, pasar a la siguiente pregunta de la lista
        // Usamos el símbolo % para que si llega al final, vuelva a empezar la lista
        indicePreguntaActual = (indicePreguntaActual + 1) % listaDePreguntas.length; 
        
        setTimeout(function() {
            areaDeMensaje.innerText = ""; // Limpiar mensaje
            mostrarPregunta();
        }, 1500);

    } else {
        // Si falla
        areaDeMensaje.innerText = "¡Cuidado, " + nombreJugador + "! El templo tiembla...";
        areaDeMensaje.style.color = "#e74c3c"; // Rojo
    }
}