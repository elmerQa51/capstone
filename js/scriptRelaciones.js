let listaDeRelaciones = [];
let relacionActual = {};
let estadoMatrizUsuario = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Empezamos todo en 0

// 1. CARGAR DATOS
fetch('../json/preguntasRelaciones.json')
    .then(function(res) { return res.json(); })
    .then(function(datos) {
        listaDeRelaciones = datos;
        cargarAcertijo();
    });

function cargarAcertijo() {
    // Elegimos uno al azar
    const azar = Math.floor(Math.random() * listaDeRelaciones.length);
    relacionActual = listaDeRelaciones[azar];

    document.getElementById('titulo-mision').innerText = relacionActual.titulo;
    document.getElementById('instruccion-texto').innerText = relacionActual.instruccion;
    
    dibujarMatriz();
}

// 2. CREAR LA CUADRÍCULA
function dibujarMatriz() {
    const contenedor = document.getElementById('matriz-grid');
    contenedor.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const piedra = document.createElement('div');
        piedra.className = 'piedra-matriz';
        piedra.innerText = "0"; // Valor inicial visual
        
        // Al hacer clic, cambia entre 0 y 1
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

// 3. VERIFICAR SI EL PATRÓN ES IGUAL AL DEL JSON
function verificarMatriz() {
    let esCorrecto = true;
    const patronGanador = relacionActual.patronCorrecto;

    for (let i = 0; i < 9; i++) {
        if (estadoMatrizUsuario[i] !== patronGanador[i]) {
            esCorrecto = false;
        }
    }

    const mensajeHTML = document.getElementById('message');
    if (esCorrecto) {
        mensajeHTML.innerText = "¡La puerta de piedra se abre!";
        document.body.style.backgroundColor = "#2ecc71";
        setTimeout(function() {
            window.location.href = "final.html"; // O el siguiente nivel
        }, 2000);
    } else {
        mensajeHTML.innerText = "El patrón es incorrecto. Las paredes se cierran...";
        document.body.style.backgroundColor = "#e74c3c";
        setTimeout(function() {
            document.body.style.backgroundColor = "#1a0f00";
        }, 1000);
    }
}