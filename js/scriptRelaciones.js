let listaDeRelaciones = [];
let relacionActual = {};
let estadoMatrizUsuario = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let aciertosLogrados = 0;
let indicesUsados = [];
const META_RELACIONES = 3;

// 1. CARGAR DATOS
fetch('../json/preguntasRelaciones.json')
    .then(function(res) { return res.json(); })
    .then(function(datos) {
        listaDeRelaciones = datos;
        cargarNuevoAcertijo();
    });

function cargarNuevoAcertijo() {
    estadoMatrizUsuario = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    if (indicesUsados.length >= listaDeRelaciones.length) {
        indicesUsados = [];
    }

    let azar;
    do {
        azar = Math.floor(Math.random() * listaDeRelaciones.length);
    } while (indicesUsados.includes(azar));

    indicesUsados.push(azar);
    relacionActual = listaDeRelaciones[azar];

    document.getElementById('titulo-mision').innerText = relacionActual.titulo;
    //document.getElementById('instruccion-texto').innerText = relacionActual.instruccion;
    document.getElementById('progress').innerText = "Matrices resueltas: " + aciertosLogrados + "/" + META_RELACIONES;

    
    actualizarModal();

    dibujarMatrizEnPantalla();
}

function actualizarModal() {
    document.getElementById('modal-titulo').innerText = relacionActual.titulo;
    document.getElementById('modal-ayuda-texto').innerText = relacionActual.ayuda;

    const tabla = document.getElementById('modal-tabla');
    tabla.innerHTML = `
        <p><strong>${relacionActual.puebloFila} (filas):</strong> {${relacionActual.costumbres.join(', ')}}</p>
        <p><strong>${relacionActual.puebloColumna} (columnas):</strong> {${relacionActual.costumbres.join(', ')}}</p>
    `;

    document.getElementById('modal-pie').innerText =
        "Activa las baldosas correctas y presiona 'Activar Mecanismo' para verificar.";
}

// 2. DIBUJAR LA CUADRÍCULA
function dibujarMatrizEnPantalla() {
    const contenedor = document.getElementById('matriz-grid');
    contenedor.innerHTML = '';

    for (let i = 0; i < 16; i++) {
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
    
    
    const botones = document.querySelectorAll('.piedra-matriz');
    botones.forEach(b => b.style.pointerEvents = "none"); 


    const overlay = document.createElement('div');
    overlay.className = 'pantalla-feedback';
    document.body.appendChild(overlay);

    
    for (let i = 0; i < 16; i++) {
        if (estadoMatrizUsuario[i] !== patronGanador[i]) {
            esCorrecto = false;
        }
    }

    if (esCorrecto) {
        aciertosLogrados = aciertosLogrados + 1;
        overlay.innerText = "¡CORRECTO!";
        overlay.style.color = "#2ecc71";
        document.body.appendChild(overlay); 

        
        if (aciertosLogrados >= META_RELACIONES) {
            mensajeHTML.innerHTML = "<strong>¡FANTÁSTICO!</strong> Has dominado las Relaciones. La salida está cerca.";
            setTimeout(function() {
                window.location.href = "final.html"; 
            }, 2000);
        } else {
            
            setTimeout(function() {
                overlay.remove();
                cargarNuevoAcertijo();
                botones.forEach(b => b.style.pointerEvents = "auto"); // Reactivamos
            }, 1200);
        }
    } else {
        // Error
        overlay.innerText = "INCORRECTO";
        overlay.style.color = "#8b1a1a";
        document.body.appendChild(overlay); 
        
        setTimeout(function() {
            overlay.remove();
            botones.forEach(b => b.style.pointerEvents = "auto"); // Reactivamos
        }, 1500);
    }
}
// 4. MODAL
const btnAyuda = document.getElementById('btn-ayuda');
const modal = document.getElementById('modal-info');
const spanCerrar = document.querySelector('.close-btn');

btnAyuda.onclick = function() {
    modal.style.display = "block";
}
spanCerrar.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}