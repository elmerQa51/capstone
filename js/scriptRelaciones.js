let listaDeRelaciones = [];
let relacionActual = {};
let estadoMatrizUsuario = [0, 0, 0, 0, 0, 0, 0, 0, 0]; 
let aciertosLogrados = 0;
const META_RELACIONES = 3;

// 1. CARGAR DATOS
fetch('../json/preguntasRelaciones.json')
    .then(function(res) { return res.json(); })
    .then(function(datos) {
        listaDeRelaciones = datos;
        cargarNuevoAcertijo();
    });

function cargarNuevoAcertijo() {
    // Reiniciamos la matriz del usuario a ceros
    estadoMatrizUsuario = [0, 0, 0, 0, 0, 0, 0, 0,0];
    
    // Elegimos uno al azar de la lista
    const azar = Math.floor(Math.random() * listaDeRelaciones.length);
    relacionActual = listaDeRelaciones[azar];

    document.getElementById('titulo-mision').innerText = relacionActual.titulo;
    document.getElementById('instruccion-texto').innerText = relacionActual.instruccion;
    document.getElementById('progress').innerText = "Matrices resueltas: " + aciertosLogrados + "/" + META_RELACIONES;
    
    dibujarMatrizEnPantalla();
}

// 2. DIBUJAR LA CUADRÍCULA
function dibujarMatrizEnPantalla() {
    const contenedor = document.getElementById('matriz-grid');
    contenedor.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const piedra = document.createElement('div');
        piedra.className = 'piedra-matriz';
        piedra.innerText = "0";
        
        piedra.onclick = function() {
            if (estadoMatrizUsuario[i] === 0) {
                estadoMatrizUsuario[i] = 1;
                piedra.innerText = "1";
                piedra.classList.add('activada');
            } else {
                estadoMatrizUsuario[i] = 0;
                piedra.innerText = "0";
                piedra.classList.remove('activada');
            }
        };
        contenedor.appendChild(piedra);
    }
}

// 3. VERIFICACIÓN CON CONTADOR
function verificarMatriz() {
    let esCorrecto = true;
    const patronGanador = relacionActual.patronCorrecto;
    const mensajeHTML = document.getElementById('message');

    // Comparamos cada una de las 9 posiciones
    for (let i = 0; i < 9; i++) {
        if (estadoMatrizUsuario[i] !== patronGanador[i]) {
            esCorrecto = false;
        }
    }

    if (esCorrecto) {
        aciertosLogrados = aciertosLogrados + 1;
        //document.body.style.backgroundColor = "#2ecc71"; // Verde éxito
        mensajeHTML.innerText = "¡El mecanismo encaja perfectamente!";

        // Volver al color original después de un momento
        setTimeout(function() {
            document.body.style.backgroundColor = "white";
            document.getElementById('matriz-grid').style.background="rgba(253, 253, 253, 0.4)";
        }, 800);

        // ¿Ya completó las 3?
        if (aciertosLogrados >= META_RELACIONES) {
            mensajeHTML.innerHTML = "<strong>¡FANTÁSTICO!</strong> Has dominado las Relaciones. La salida está cerca.";
            setTimeout(function() {
                window.location.href = "final.html"; // Siguiente nivel
            }, 2000);
        } else {
            // Si faltan, cargamos otro acertijo
            setTimeout(function() {
                mensajeHTML.innerText = "";
                cargarNuevoAcertijo();
            }, 1200);
        }
    } else {
        // Error
        mensajeHTML.innerText = "El patrón no es válido. La energía se disipa...";
        document.body.style.backgroundColor = "#e74c3c"; // Rojo
        //document.getElementById('matriz-grid').style.background="black"
        setTimeout(function() {
            document.body.style.backgroundColor = "white";
            //document.getElementsByClassName('grid-3x3').style.background="rgba(253, 253, 253, 0.4)".filter= "blur(25px)";
        }, 800);
    }
}