const preguntasPinipedos = [
    {
        titulo: "🦭🦭🦭PINÍPEDOS🦭🦭🦭                         Pregunta 1de3🔵⚪⚪",
        pregunta: "¿Cuál es el pinípedo más grande?",
        opciones: ["1-Foca Leopardo", "2-Elefante Marino", "3-Morsa"],
        respuestaCorrecta: 3
    },
    {
        titulo: "🦭🦭🦭PINÍPEDOS🦭🦭🦭                         Pregunta 2de3🔵🔵⚪",
        pregunta: "¿Cuál es el pinípedo más veloz?",
        opciones: ["1-Foca Leopardo", "2-León Marino", "3-Foca Cangrejera"],
        respuestaCorrecta: 1
    },
    {
        titulo: "🦭🦭🦭PINÍPEDOS🦭🦭🦭                         Pregunta 3de3🔵🔵🔵",
        pregunta: "¿Cuál es el pinípedo más numeroso de la Patagonia?",
        opciones: ["1-León Marino", "2-Elefante Marino", "3-Morsa"],
        respuestaCorrecta: 1
    }
];

const preguntasCetaceos = [
    {
        titulo: "🐳🐳🐳CETÁCEOS🐬🐬🐬                          Pregunta 1de3🔵⚪⚪",
        pregunta: "¿CUÁL DE ESTOS CETÁCEOS NO ES UN DELFÍN?",
        opciones: ["1-Orca", "2-Cachalote", "3-Beluga"],
        respuestaCorrecta: 2
    },
    {
        titulo: "🐳🐳🐳CETÁCEOS🐬🐬🐬                          Pregunta 2de3🔵🔵⚪",
        pregunta: "¿Cuál es la ballena más grande?",
        opciones: ["1-Ballena Jorobada", "2-Ballena Gris", "3-Ballena Azul"],
        respuestaCorrecta: 3
    },
    {
        titulo: "🐳🐳🐳CETÁCEOS🐬🐬🐬                          Pregunta 3de3🔵🔵🔵",
        pregunta: "¿Cuáles son los cetáceos más inteligentes?",
        opciones: ["1-Delfines", "2-Ballenas", "3-Cachalotes"],
        respuestaCorrecta: 1
    }
];

let puntaje = 0;


function mostrarPregunta(pregunta) {
    let opciones = pregunta.opciones.join("\n");
    let respuestaUsuario = prompt(pregunta.titulo + "\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n" + pregunta.pregunta + "\n (⚠️ Ingresa solo el número de la opción )\n" + opciones);


    if (respuestaUsuario === null) {
        let confirmarSalir = confirm("😭¿Deseas salir del juego?😭");
        if (confirmarSalir) {
            return false;
        } else {
            return mostrarPregunta(pregunta);
        }
    } else if (respuestaUsuario === "") {
        let confirmarSalir = confirm("¿😭Deseas salir del juego😭?");
        if (confirmarSalir) {
            return false;
        } else {
            return mostrarPregunta(pregunta);
        }
    }

    let respuestaNumerica = parseInt(respuestaUsuario);

    if (isNaN(respuestaNumerica) || respuestaNumerica < 1 || respuestaNumerica > pregunta.opciones.length) {
        alert("⚠️ Por favor, ingresa una opción válida");
        return mostrarPregunta(pregunta);
    }

    let respuestaCorrecta = pregunta.respuestaCorrecta;

    if (respuestaNumerica === respuestaCorrecta) {
        puntaje += 10
        alert("✅¡Respuesta correcta! \nSumaste 10 puntos.\n 🏅Tu puntaje actual es " + puntaje);

    } else {
        puntaje -= 10;
        alert("❌Respuesta incorrecta. \nRestaste 10 puntos\n🏅Tu puntaje actual es " + puntaje);

    }
    return true;
}


function elegirTematica() {
    let tema = prompt("/////////🐬🦭🐳 TRIVIA DE MAMÍFEROS MARINOS 🐳🦭🐬/////////\nElige una temática:\n- INGRESA P para 🦭Pinípedos\n- INGRESA C para 🐬Cetáceos").toLowerCase();
    if (tema === "p") {
        jugar(preguntasPinipedos);
    } else if (tema === "c") {
        jugar(preguntasCetaceos);
    } else {
        alert("⚠️ Temática inválida. \nPor favor, elige 'P' para 🦭Pinípedos o 'C' 🐬para Cetáceos.");
        elegirTematica();
    }
}


function jugar(tematica) {
    let seguirJugando = true;

    while (seguirJugando) {
        for (const pregunta of tematica) {
            let respuesta = mostrarPregunta(pregunta);
            if (!respuesta) {
                seguirJugando = false;
                break;
            }
        }

        if (seguirJugando) {
            seguirJugando = confirm("🏅Tu puntaje actual es: " + puntaje + "\n😇¿Quieres seguir jugando?😇");
        }

        if (seguirJugando) {
            elegirTematica();
        }


        if (seguirJugando == null) {
            break;
        }
    }
}

elegirTematica();



