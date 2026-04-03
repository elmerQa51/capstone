let aciertos = 0;
const META = 3;

// Base de datos de los murales
const murales = [
    { img: '../img/conjuntos/Union.png', respuesta: 'A ∪ B' },
    { img: '../img/conjuntos/Interseccion.png', respuesta: 'A ∩ B' },
    { img: '../img/conjuntos/A-B.png', respuesta: 'A - B' },
    { img: '../img/conjuntos/DiferenciaSimetrica.png', respuesta: 'A ⊕ B' }
];


const formulas = ['A ∪ B', 'A ∩ B', 'A - B', 'A ⊕ B', 'B - A', 'U'];

function cargarMural() {
    const randomIdx = Math.floor(Math.random() * murales.length);
    const muralActual = murales[randomIdx];

    document.getElementById('venn-image').src = muralActual.img;
    document.getElementById('progress').innerText = `Murales: ${aciertos}/${META}`;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    // Crear botones de opción
    formulas.forEach(formula => {
        const btn = document.createElement('button');
        btn.innerText = formula;
        btn.className = 'btn-logic';
        btn.onclick = () => verificarMural(formula, muralActual.respuesta);
        container.appendChild(btn);
    });
}

function verificarMural(seleccionada, correcta) {
    const name = localStorage.getItem('playerName') || "Explorador";
    const msg = document.getElementById('message');

    if (seleccionada === correcta) {
        aciertos++;
        msg.innerText = `¡Exacto, ${name}! El mural brilla con luz dorada.`;
        msg.style.color = "#2ecc71";

        if (aciertos >= META) {
            msg.innerHTML = "<strong>¡HAS DESCIFRADO LOS MURALES!</strong> Entrando al Pasadizo de las Relaciones...";
            setTimeout(() => {
                window.location.href = "instruccionesRelaciones.html";
            }, 2000);
        } else {
            setTimeout(cargarMural, 1200);
        }
    } else {
        msg.innerText = `No, ${name}. Esa fórmula no encaja en la piedra.`;
        msg.style.color = "#e74c3c";
    }
}

// Iniciar el nivel
window.onload = cargarMural;