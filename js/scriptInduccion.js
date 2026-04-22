// 1. VARIABLES GLOBALES
let indicePreguntaActual = 0;
let listaDePreguntas = [];
let contadorAciertos = 0;
const META_PARA_GANAR = 3;

// 2. FUNCIÓN PARA MEZCLAR
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 3. CARGA DE DATOS
fetch('../json/preguntasInduccion.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
        
        listaDePreguntas = mezclarArray(datos);
        mostrarPregunta();
    })
    .catch(error => console.error("Error cargando el Oráculo:", error));

// 4. MOSTRAR PREGUNTA
function mostrarPregunta() {
    const contenedorOpciones = document.getElementById('options-container');
    const textoDePregunta = document.getElementById('question-text');

    
    if (indicePreguntaActual >= listaDePreguntas.length) {
        textoDePregunta.innerText = "Has completado todas las preguntas del oráculo.";
        return;
    }

    const preguntaUbicada = listaDePreguntas[indicePreguntaActual];

    textoDePregunta.innerHTML = `<small>Progreso: ${contadorAciertos}/${META_PARA_GANAR}</small><br>${preguntaUbicada.pregunta}`;
    contenedorOpciones.innerHTML = '';

    preguntaUbicada.opciones.forEach((opcionTexto, i) => {
        const boton = document.createElement('button');
        boton.innerText = opcionTexto;
        boton.className = 'btn-logic'; 
        boton.onclick = () => verificarRespuesta(i);
        contenedorOpciones.appendChild(boton);
    });
}

// 5. EVALUAR RESPUESTA
function verificarRespuesta(indiceSeleccionado) {
    const preguntaActual = listaDePreguntas[indicePreguntaActual];
    const mensajeHTML = document.getElementById('message');
    const botones = document.querySelectorAll('.btn-logic');

    
    botones.forEach(b => b.disabled = true);

    
    const overlay = document.createElement('div');
    overlay.className = 'pantalla-feedback';

    
    if (indiceSeleccionado === preguntaActual.correcta) {
        
        contadorAciertos++;
        overlay.innerText = "CORRECTO";
        overlay.style.color = "#2e6b2e"; 
        document.body.appendChild(overlay);

        
        document.body.style.backgroundImage = `url('../img/induccion${contadorAciertos}.png')`;

        if (contadorAciertos >= META_PARA_GANAR) {
            document.getElementById('game-container').style.display = 'none';
            overlay.innerText = "¡ORÁCULO DESCIFRADO!";
            
            setTimeout(() => {
                window.location.href = "instruccionConjunto.html";
            }, 2000);
            return; 
        }

        indicePreguntaActual++;

        setTimeout(() => {
            overlay.remove();
            mostrarPregunta();
        }, 1500);

    } else {
        
        overlay.innerText = "INCORRECTO";
        overlay.style.color = "#8b1a1a";
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.remove();
            botones.forEach(b => b.disabled = false);
        }, 1500);
    }
}