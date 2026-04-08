let aciertos = 0;
const META_PARA_GANAR = 3;

const listaDeMurales = [
    { rutaImagen: '../img/conjuntos/Union.png', respuestaCorrecta: 'A ∪ B' },
    { rutaImagen: '../img/conjuntos/Interseccion.png', respuestaCorrecta: 'A ∩ B' },
    { rutaImagen: '../img/conjuntos/A-B.png', respuestaCorrecta: 'A - B' },
    { rutaImagen: '../img/conjuntos/simetrica.png', respuestaCorrecta: 'A ⊕ B' }
];

// Todas las fórmulas posibles que sirven como "distractores"
const bancoDeFormulas = ['A ∪ B', 'A ∩ B', 'A - B', 'A ⊕ B', 'B - A', 'U', 'A Δ B', 'B ∩ A', 'Aᶜ'];

function cargarNuevoMural() {
    const indiceAzar = Math.floor(Math.random() * listaDeMurales.length);
    const muralElegido = listaDeMurales[indiceAzar];

    document.getElementById('venn-image').src = muralElegido.rutaImagen;
    document.getElementById('progress').innerText = "Murales: " + aciertos + "/" + META_PARA_GANAR;

    const contenedorBotones = document.getElementById('options-container');
    contenedorBotones.innerHTML = '';

    // --- LÓGICA PARA FILTRAR 4 OPCIONES ---

    // 1. Empezamos nuestra lista de opciones con la CORRECTA
    let opcionesParaMostrar = [muralElegido.respuestaCorrecta];

    // 2. Buscamos fórmulas incorrectas del banco hasta tener 4 en total
    while (opcionesParaMostrar.length < 4) {
        const formulaAlAzar = bancoDeFormulas[Math.floor(Math.random() * bancoDeFormulas.length)];
        
        // Solo la agregamos si NO está ya en nuestra lista (para no repetir)
        if (opcionesParaMostrar.indexOf(formulaAlAzar) === -1) {
            opcionesParaMostrar.push(formulaAlAzar);
        }
    }

    // 3. Mezclamos la lista para que la correcta no sea siempre la primera
    opcionesParaMostrar.sort(function() { return Math.random() - 0.5; });

    // --- CREAR LOS BOTONES ---
    for (let i = 0; i < opcionesParaMostrar.length; i++) {
        const formulaIndividual = opcionesParaMostrar[i];
        const boton = document.createElement('button');
        boton.innerText = formulaIndividual;
        boton.className = 'btn-logic';
        
        boton.onclick = function() {
            verificarMural(formulaIndividual, muralElegido.respuestaCorrecta);
        };
        
        contenedorBotones.appendChild(boton);
    }
}

function verificarMural(seleccionada, correcta) {
    const nombre = localStorage.getItem('playerName') || "Explorador";
    const mensajeHTML = document.getElementById('message');

    if (seleccionada === correcta) {
        aciertos = aciertos + 1;
        document.body.style.backgroundColor = "#2ecc71";
        mensajeHTML.innerText = "¡Exacto, " + nombre + "! El mural brilla.";
        mensajeHTML.style.color = "#2ecc71";

        if (aciertos >= META_PARA_GANAR) {
            // --- 1. LIMPIEZA TOTAL INMEDIATA ---
            // Ocultamos todos los contenedores para que solo quede el body
            document.getElementById('game-container').style.display = 'none';
            document.getElementById('mural-frame').style.display = 'none';
            document.getElementById('progress').style.display = 'none';
            if(document.getElementById('game-title')) {
                document.getElementById('game-title').style.display = 'none';
            }

            // --- 2. EL CAMBIO ÉPICO ---
            // Cambiamos la imagen de fondo al muro destruido
            document.body.style.backgroundImage = "url('../img/conjuntos2.png')";
            document.body.style.backgroundColor = "transparent"; // Quitamos el verde para ver la imagen

            // Mostramos un mensaje final flotante si quieres, o lo dejamos vacío
            mensajeHTML.innerText = "¡EL MURO SE DERRUMBA!";
            mensajeHTML.style.color = "#d4ac0d";
            mensajeHTML.style.position = "fixed";
            mensajeHTML.style.bottom = "10%";

            // --- 3. TIEMPO PARA APRECIAR Y REDIRIGIR ---
            setTimeout(function () {
                window.location.href = "instruccionRelacion.html";
            }, 3500); // 3.5 segundos para ver el pasadizo abierto
            
            return; // Detenemos la ejecución aquí
        } else {
            setTimeout(function() {
                cargarNuevoMural();
                mensajeHTML.innerText = "";
            }, 1200);
        }
        setTimeout(function() {
            document.body.style.backgroundColor = "#2c1e14"; // Color original (café)
        }, 1000);
    } else {
        mensajeHTML.innerText = "No, " + nombre + ". Esa piedra no encaja.";
        mensajeHTML.style.color = "#e74c3c";
    }
}

window.onload = function() {
    cargarNuevoMural();
};