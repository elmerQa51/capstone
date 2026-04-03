let currentQuestionIndex = 0;
let preguntas = [];
let aciertos = 0; 
const META_ACIERTOS = 3; 


fetch('../json/preguntasInduccion.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data;
        showQuestion();
    })
    .catch(error => console.error("Error cargando el Oráculo:", error));

function showQuestion() {
    const q = preguntas[currentQuestionIndex];
    const container = document.getElementById('options-container');
    const questionText = document.getElementById('question-text');
    
    // Mostrar progreso en pantalla (Opcional pero recomendado)
    questionText.innerHTML = `<small>Progreso: ${aciertos}/${META_ACIERTOS}</small><br>${q.pregunta}`;
    
    container.innerHTML = ''; 

    q.opciones.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "btn-option"; // Para que herede tus estilos
        btn.onclick = () => checkAnswer(index);
        container.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const name = localStorage.getItem('playerName') || "Explorador";
    const msg = document.getElementById('message');
    const currentQ = preguntas[currentQuestionIndex];

    if (selectedIndex === currentQ.correcta) {
        aciertos++;
        msg.innerText = `¡Bien hecho, ${name}! La lógica es sólida.`;
        msg.style.color = "#2ecc71";

        if (aciertos >= META_ACIERTOS) {
            msg.innerHTML = `<strong>¡INCREÍBLE, ${name}!</strong> El Oráculo se ha abierto. Avanzando a las Ruinas de los Conjuntos...`;
            setTimeout(() => {
                window.location.href = "instruccionConjunto.html"; // Ruta al siguiente nivel
            }, 2000);
            return;
        }

        // Si no hemos llegado a 3, pasar a la siguiente pregunta
        currentQuestionIndex = (currentQuestionIndex + 1) % preguntas.length; 
        setTimeout(showQuestion, 1500);

    } else {
        // Si falla, el contador de aciertos NO sube. 
        // Opcional: podrías restarle 1 si quieres que sea más difícil.
        msg.innerText = `¡Cuidado, ${name}! Esa no es la respuesta. El templo tiembla...`;
        msg.style.color = "#e74c3c"; // Rojo peligro
    }
}