const app = document.getElementById("app");
let puntaje = 0;
let tematicaActual = null;
let IndicePreguntaActual = 0;


const preguntasPinipedos = [
    {
        titulo: "🦭🦭PINÍPEDOS🦭🦭\nPregunta 1de3🔵⚪⚪",
        pregunta: "¿Cuál es el pinípedo más grande?",
        opciones: ["Foca Leopardo", "Elefante Marino", "Morsa"],
        respuestaCorrecta: 1
    },
    {
        titulo: "🦭🦭PINÍPEDOS🦭🦭\nPregunta 2de3🔵🔵⚪",
        pregunta: "¿Cuál es el pinípedo más veloz?",
        opciones: ["Foca Leopardo", "León Marino", "Foca Cangrejera"],
        respuestaCorrecta: 0
    },
    {
        titulo: "🦭🦭PINÍPEDOS🦭🦭\nPregunta 3de3🔵🔵🔵",
        pregunta: "¿Cuál es el pinípedo más numeroso de la Patagonia?",
        opciones: ["León Marino", "Elefante Marino", "Morsa"],
        respuestaCorrecta: 0
    }
];


const preguntasCetaceos = [
    {
        titulo: "🐳🐳CETÁCEOS🐬🐬\nPregunta 1de3🔵⚪⚪",
        pregunta: "¿CUÁL DE ESTOS CETÁCEOS NO ES UN DELFÍN?",
        opciones: ["Orca", "Cachalote", "Beluga"],
        respuestaCorrecta: 1
    },
    {
        titulo: "🐳🐳CETÁCEOS🐬🐬\nPregunta 2de3🔵🔵⚪",
        pregunta: "¿Cuál es la ballena más grande?",
        opciones: ["Ballena Jorobada", "Ballena Gris", "Ballena Azul"],
        respuestaCorrecta: 2
    },
    {
        titulo: "🐳🐳CETÁCEOS🐬🐬\nPregunta 3de3🔵🔵🔵",
        pregunta: "¿Cuáles son los cetáceos más inteligentes?",
        opciones: ["Delfines", "Ballenas", "Cachalotes"],
        respuestaCorrecta: 0
    }
];


const tematicas = {
    pinipedos: preguntasPinipedos,
    cetaceos: preguntasCetaceos
};


const elegirTematica = () => {
    app.innerHTML = `
    <h1>TRIVIA</h1>    
    <h2>Elige una temática</h2>
        <div id="tematica-select">
            <button id="button-pinipedos">🦭 Pinípedos</button>
            <button id="button-cetaceos">🐬 Cetáceos</button>
        </div>
        <div class="reiniciarContent">
            <button id="reiniciarPuntaje">Reiniciar Puntaje</button>
            <div id="score">🏅Puntaje: ${puntaje}</div>
        </div>
    `;
    document.getElementById('reiniciarPuntaje').addEventListener('click', () => {
        reiniciarPuntaje();
    });

    document.getElementById('button-pinipedos').addEventListener('click', () => {
        if ('pinipedos' in tematicas) {
            iniciarTrivia('pinipedos');
        }
    });

    document.getElementById('button-cetaceos').addEventListener('click', () => {
        if ('cetaceos' in tematicas) {
            iniciarTrivia('cetaceos');
        }
    });
};


const reiniciarPuntaje = () => {
    puntaje = 0; // Reinicio puntaje a cero
    guardarPuntaje(); // Guardo puntaje actualizado en localStorage
    actualizarPuntajeEnUI(); // Actualizo puntaje en interfaz
};


const actualizarPuntajeEnUI = () => {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `🏅Puntaje: ${puntaje}`;
};


const iniciarTrivia = (tematica) => {
    tematicaActual = tematicas[tematica];
    IndicePreguntaActual = 0;
    cargarPuntaje();
    cargarPregunta();
};


const cargarPregunta = () => {
    preguntaRespondida = false;
    const pregunta = tematicaActual[IndicePreguntaActual];

    app.innerHTML = `
    <h2>${pregunta.titulo}</h2>
    <div class="question">${pregunta.pregunta}</div>
    <div class="answers"></div>
    <div id="score">🏅Puntaje:${puntaje}</div>
    <div id="message" class="message hidden">
        ❌Respuesta incorrecta.
        Restaste 10 puntos.
        
    </div>
    <button id="continuar" class="hidden">Continuar</button>
`;

    const answersContainer = document.querySelector('.answers'); // Para cada Opcion agrego un boton appendChild(button)
    pregunta.opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.innerText = opcion;
        button.addEventListener('click', () => manejarRespuesta(index));
        answersContainer.appendChild(button);
    });

    const continuarButton = document.getElementById('continuar');
    continuarButton.addEventListener('click', () => {
        IndicePreguntaActual++;
        if (IndicePreguntaActual < tematicaActual.length) {
            cargarPregunta();
        } else {
            mostrarResultados();
        }
        guardarPuntaje();
    });

    continuarButton.classList.add('continue-button');
    continuarButton.classList.add('hidden');
};


let preguntaRespondida = false;

const manejarRespuesta = (index) => {
    if (preguntaRespondida) {
        return; // Salgo de la funcion si ya conteste
    }

    const pregunta = tematicaActual[IndicePreguntaActual];
    const message = document.getElementById('message');
    const continuarButton = document.getElementById('continuar');
    const buttons = document.querySelectorAll('.answers button');
    buttons[index].classList.add('selected');

    buttons.forEach(button => {
        button.disabled = true; // disable para deshabilitar los botones cuando ya conteste
    });

    if (index === pregunta.respuestaCorrecta) {
        puntaje += 10;
        message.innerText = `✅¡Respuesta correcta!\n  Sumaste 10 puntos.\n`;
        message.classList.remove('hidden');
        message.classList.remove('error');
    } else {
        puntaje -= 10;
        message.innerText = `❌Respuesta incorrecta.\n Restaste 10 puntos.\n`;
        message.classList.remove('hidden');
        message.classList.add('error');
    }

    continuarButton.classList.remove('hidden');


    preguntaRespondida = true; // Marco la pregunta como respondida
};


const mostrarResultados = () => {
    app.innerHTML = `
        <div class="result">
            <h2>Fin del juego</h2>
            <p>Tu puntuación es: ${puntaje}</p>
            <button id="reiniciar">Reiniciar</button>
        </div>
    `;

    document.getElementById('reiniciar').addEventListener('click', elegirTematica);
    document.getElementById('reiniciar').classList.add('reiniciarTrivia');
};


const guardarPuntaje = () => {
    localStorage.setItem('puntajeTrivia', JSON.stringify(puntaje));
};


const cargarPuntaje = () => {
    const puntajeGuardado = localStorage.getItem('puntajeTrivia');
    if (puntajeGuardado) {
        puntaje = JSON.parse(puntajeGuardado);
    }
};

cargarPuntaje();
elegirTematica();
