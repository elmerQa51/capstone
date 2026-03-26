let currentQuestionIndex = 0;
let preguntas = [];


fetch('../json/preguntasInduccion.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data;
        showQuestion();
    });

function showQuestion() {
    const q = preguntas[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.pregunta;
    const container = document.getElementById('options-container');
    container.innerHTML = ''; 

    q.opciones.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        container.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const msg = document.getElementById('message');
    if (selectedIndex === preguntas[currentQuestionIndex].correcta) {
        msg.innerText = "¡Correcto! La trampa se desactiva.";
        msg.style.color = "#2ecc71";
        currentQuestionIndex++;
        
        if (currentQuestionIndex < 3) {
            setTimeout(showQuestion, 1500);
        } else {
            msg.innerText = "¡Has superado el Oráculo! Avanza al siguiente nivel.";
            msg.style.color = "#f1c40f";
        }
    } else {
        msg.innerText = "¡Incorrecto! La trampa se activa. Intenta de nuevo.";
        msg.style.color = "#e74c3c";
    }
}