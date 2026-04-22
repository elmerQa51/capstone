// 1. CONFIGURACIÓN INICIAL
let aciertos = 0;
const META_PARA_GANAR = 3;
let indicesUsados = [];

const listaDeMurales = [
    { rutaImagen: '../img/conjuntos/C-BnA.png', respuestaCorrecta: 'C-(A∩B)' },
    { rutaImagen: '../img/conjuntos/Ac.png', respuestaCorrecta: 'Aᶜ' },
    { rutaImagen: '../img/conjuntos/B-AUC.png', respuestaCorrecta: 'B-(AUC)' }
];


const bancoDeFormulas = ['B-(AUC)', '(AUB)UC', 'A - B', 'B-(A-C)', 'U', '(AΔB)-C', '(B∩A)∩C', 'Aᶜ', 'C-(A∩B)'];

// 2. INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", function() {
    cargarNuevoMural();
});

// 3. LÓGICA DE MEZCLA
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 4. CARGAR MURAL
function cargarNuevoMural() {
    if (indicesUsados.length === listaDeMurales.length) return;

    let indiceAzar;
    do {
        indiceAzar = Math.floor(Math.random() * listaDeMurales.length);
    } while (indicesUsados.includes(indiceAzar));

    indicesUsados.push(indiceAzar);
    const muralElegido = listaDeMurales[indiceAzar];

    // Actualizar imagen
    document.getElementById('venn-image').src = muralElegido.rutaImagen;

    const progresoEl = document.getElementById('progress');
if (progresoEl) {
    progresoEl.innerText = "Correctos: " + aciertos + "/" + META_PARA_GANAR;
    progresoEl.style.display = 'block'; // Asegura que sea visible
}

    // Dibujar botones
    const contenedorBotones = document.getElementById('options-container');
    contenedorBotones.innerHTML = '';

    let opcionesParaMostrar = [muralElegido.respuestaCorrecta];
    while (opcionesParaMostrar.length < 4) {
        const formulaAlAzar = bancoDeFormulas[Math.floor(Math.random() * bancoDeFormulas.length)];
        if (opcionesParaMostrar.indexOf(formulaAlAzar) === -1) opcionesParaMostrar.push(formulaAlAzar);
    }
    opcionesParaMostrar.sort(() => Math.random() - 0.5);

    opcionesParaMostrar.forEach(formula => {
        const boton = document.createElement('button');
        boton.innerText = formula;
        boton.className = 'btn-logic';
        boton.onclick = () => verificarMural(formula, muralElegido.respuestaCorrecta);
        contenedorBotones.appendChild(boton);
    });
}

// 5. BARRA DE PROGRESO VISUAL
function actualizarBarraProgreso() {
    // El índice empieza en 1, no en 0
    const segmentoActivo = document.getElementById('seg-' + aciertos);
    if (segmentoActivo) {
        segmentoActivo.classList.add('active');
    }
}

// 6. EVALUAR RESPUESTA
function verificarMural(seleccionada, correcta) {
    const botones = document.querySelectorAll('.btn-logic');
    botones.forEach(b => b.disabled = true);

    const overlay = document.createElement('div');
    overlay.className = 'pantalla-feedback';
    document.body.appendChild(overlay);

    if (seleccionada === correcta) {
        aciertos++;
        actualizarBarraProgreso();
        overlay.innerText = "CORRECTO";
        overlay.style.color = "#2e6b2e"; 
        document.body.appendChild(overlay);

        if (aciertos >= META_PARA_GANAR) {
            overlay.innerText = "¡MURAL DESCIFRADO!";
            document.body.style.backgroundImage = "url('../img/conjuntos2.png')";
            setTimeout(() => { window.location.href = "instruccionRelacion.html"; }, 2500);
            return;
        }

        setTimeout(() => {
            overlay.remove();
            cargarNuevoMural();
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
