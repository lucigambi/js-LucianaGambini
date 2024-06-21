const URL = "https://base-lu-js-default-rtdb.firebaseio.com/";

let puntaje = 0;
let tematicaActual = null;
let IndicePreguntaActual = 0;
let preguntaRespondida = false;
let preguntaEditandoId = null;


//Fetch
const crearPregunta = async (pregunta) => {
    try {
        await fetch(URL + "preguntas.json", {
            method: "POST",
            body: JSON.stringify(pregunta)
        });
    } catch (error) {
        console.log(error);
    }
};

const actualizarPregunta = async (id, pregunta) => {
    try {
        await fetch(`${URL}preguntas/${id}.json`, {
            method: "PUT",
            body: JSON.stringify(pregunta)
        });
    } catch (error) {
        console.log(error);
    }
};

const traerPreguntas = async () => {
    try {
        const response = await fetch(URL + "preguntas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};


//Elegir Modo
const elegirModo = () => {
    app.innerHTML = `
<div class="container">
    <div class="flex-container-img">
        <img src="./img/EligeModo.png" alt="EligeModo">
    </div>
    <div class="flex-container-btns" id="modo-select">
        <button id="button-jugador" class="button button-blue"><img src="./img/bombita.svg" alt="Logo"></button>
        <button id="button-creador"  class="button button-red"><img src="./img/varita.svg" alt="Logo"></button>
    </div>
</div>
    `;

    document.getElementById('button-jugador').addEventListener('click', () => {
        elegirTematica();
    });

    document.getElementById('button-creador').addEventListener('click', () => {
        mostrarFormularioCreador();
    });
};


//Elegir Tematica
const elegirTematica = () => {
    app.innerHTML = `
    <div class="container">
        <div class="flex-container-img">
         <img src="./img/EligeCategoria.png" alt="EligeModo">
        </div>
          <h1>Elige una Temática</h1>
        <div id="tematica-select" class="flex-container-btns">
        <button id="button-cetaceos" class="button button-purpple">Cetáceos</button>
            <button id="button-pinipedos" class="button button-purpple">Pinípedos</button>
            
        </div>
        <div class="flex-container-reiniciar">
            <button id="reiniciarPuntaje" class="button button-small">Reiniciar Puntaje</button>
            <div id="score" >🏅Puntaje: ${puntaje}</div>
        </div>
    </div> 
    `;
    document.getElementById('reiniciarPuntaje').addEventListener('click', () => {
        reiniciarPuntaje();
    });

    document.getElementById('button-pinipedos').addEventListener('click', () => {
        iniciarTrivia('pinipedos');
    });

    document.getElementById('button-cetaceos').addEventListener('click', () => {
        iniciarTrivia('cetaceos');
    });
};


// Modulo Creador Preguntas
const mostrarFormularioCreador = (pregunta = null) => {
    app.innerHTML = `
        <div class="container-formulario">
        <div class="titulo-formulario">
        <img src="./img/varita.svg" alt="Logo" class="img-creador">
         <h1>${pregunta ? 'Editar Pregunta' : 'Crear Preguntas'}</h1><div>
            </div>
            </div>
            <form id="formulario-preguntas" class="formulario">
                <label for="tematica" class="label-formulario">Temática:</label>
                <select id="tematica" class="input-formulario">
                    <option value="pinipedos">Pinípedos</option>
                    <option value="cetaceos">Cetáceos</option>
                </select>
                <br>
                <label for="pregunta" class="label-formulario">Pregunta:</label>
                <input type="text" id="pregunta" class="input-formulario" autocomplete="off" required>
                <br>
                <label for="opcion1" class="label-formulario">Opción 1:</label>
                <input type="text" id="opcion1" class="input-formulario" autocomplete="off" required>
                <br>
                <label for="opcion2" class="label-formulario">Opción 2:</label>
                <input type="text" id="opcion2" class="input-formulario" autocomplete="off" required>
                <br>
                <label for="opcion3" class="label-formulario">Opción 3:</label>
                <input type="text" id="opcion3" class="input-formulario" autocomplete="off" required>
                <br>
                <label for="respuestaCorrecta" class="label-formulario">Respuesta Correcta:</label>
                <input type="number" id="respuestaCorrecta" class="input-formulario" min="1" max="3" required>
                <br>
                <button type="submit" class="button-formulario">${pregunta ? 'Actualizar' : 'Guardar'} Pregunta</button>
            </form>
            <div id="contenedorPreguntas" class="contenedor-preguntas"></div>
            <div>
                <button id="volver" class="button-volver">Volver</button>
            </div>
        </div>
    `;

    if (pregunta) {
        document.getElementById('tematica').value = pregunta.tematica;
        document.getElementById('pregunta').value = pregunta.pregunta;
        document.getElementById('opcion1').value = pregunta.opciones[0];
        document.getElementById('opcion2').value = pregunta.opciones[1];
        document.getElementById('opcion3').value = pregunta.opciones[2];
        document.getElementById('respuestaCorrecta').value = pregunta.respuestaCorrecta;
        preguntaEditandoId = pregunta.id;
    } else {
        preguntaEditandoId = null;
    }

    document.getElementById('formulario-preguntas').addEventListener('submit', guardarPregunta);
    document.getElementById('volver').addEventListener('click', elegirModo);
    cargarPreguntasCreadas();
};

const guardarPregunta = async (event) => {
    event.preventDefault();

    const tematica = document.getElementById('tematica').value;
    const preguntaTexto = document.getElementById('pregunta').value;
    const opcion1 = document.getElementById('opcion1').value;
    const opcion2 = document.getElementById('opcion2').value;
    const opcion3 = document.getElementById('opcion3').value;
    const respuestaCorrecta = parseInt(document.getElementById('respuestaCorrecta').value);

    const nuevaPregunta = {
        tematica,
        pregunta: preguntaTexto,
        opciones: [opcion1, opcion2, opcion3],
        respuestaCorrecta
    };

    if (preguntaEditandoId) {
        await actualizarPregunta(preguntaEditandoId, nuevaPregunta);
        preguntaEditandoId = null;
    } else {
        await crearPregunta(nuevaPregunta);
    }

    console.log(`Guardando pregunta en la temática ${tematica}:`, nuevaPregunta);
    mostrarFormularioCreador();
};


const cargarPreguntasCreadas = async () => {
    const contenedorPreguntas = document.getElementById('contenedorPreguntas');
    contenedorPreguntas.innerHTML = '';
    const preguntas = await traerPreguntas();

    for (const id in preguntas) {
        if (preguntas.hasOwnProperty(id)) {
            mostrarPreguntaCreada(id, preguntas[id]);
        }
    }
};


const mostrarPreguntaCreada = (id, pregunta) => {
    const contenedorPreguntas = document.getElementById('contenedorPreguntas');

    const preguntaDiv = document.createElement('div');
    preguntaDiv.classList.add('pregunta-creada');
    preguntaDiv.setAttribute('data-id', id);

    const preguntaTexto = document.createElement('p');
    preguntaTexto.classList.add('pregunta-texto');
    preguntaTexto.innerHTML = `
        <span class="pregunta-etiqueta">Temática:</span> ${pregunta.tematica} <br>
        <span class="pregunta-etiqueta">Pregunta:</span> ${pregunta.pregunta} <br>
        <span class="pregunta-etiqueta">Opciones:</span> ${pregunta.opciones.join(", ")} <br>
        <span class="pregunta-etiqueta">Respuesta Correcta:</span> ${pregunta.respuestaCorrecta}
    `;
    preguntaDiv.appendChild(preguntaTexto);

    const accionesDiv = document.createElement('div');
    accionesDiv.classList.add('pregunta-acciones');

    const editarButton = document.createElement('button');
    editarButton.classList.add('button-editar');
    editarButton.innerText = '✏️Editar';
    editarButton.addEventListener('click', () => editarPregunta(id));
    accionesDiv.appendChild(editarButton);

    const eliminarButton = document.createElement('button');
    eliminarButton.classList.add('button-eliminar');
    eliminarButton.innerText = '❌Eliminar';
    eliminarButton.addEventListener('click', () => eliminarPregunta(id));
    accionesDiv.appendChild(eliminarButton);

    preguntaDiv.appendChild(accionesDiv);
    contenedorPreguntas.appendChild(preguntaDiv);
};


// Editor de preguntas
const editarPregunta = async (id) => {
    const preguntas = await traerPreguntas();
    const pregunta = preguntas[id];
    pregunta.id = id;
    mostrarFormularioCreador(pregunta);
};

const eliminarPregunta = async (id) => {
    try {

        const result = await Swal.fire({
            icon: 'warning',
            title: 'Eliminar Pregunta',
            text: '¿Estás seguro de que quieres eliminar esta pregunta?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                content: 'my-swal-content'
            }
        });


        if (result.isConfirmed) {

            await fetch(`${URL}preguntas/${id}.json`, {
                method: 'DELETE'
            });
            cargarPreguntasCreadas();
        }

    } catch (error) {
        console.log('Error al eliminar la pregunta:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al intentar eliminar la pregunta. Por favor, intenta nuevamente.',
            customClass: {
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                content: 'my-swal-content'
            }
        });
    }
};



// Modulo Jugar Trivia
const iniciarTrivia = async (tematica) => {
    tematicaActual = await obtenerPreguntasPorTematica(tematica);
    IndicePreguntaActual = 0;
    cargarPregunta();
};

const obtenerPreguntasPorTematica = async (tematica) => {
    const data = await traerPreguntas();
    return Object.values(data).filter(pregunta => pregunta.tematica === tematica);
};

const imagenesTematica = {
    pinipedos: './img/Header-Pinipedos.png',
    cetaceos: './img/Header-Cetaceos.png'
};

const cargarPregunta = () => {
    preguntaRespondida = false;
    const pregunta = tematicaActual[IndicePreguntaActual];
    const imagenUrl = imagenesTematica[pregunta.tematica];

    app.innerHTML = `
    <div class="container">
    <div class="flex-container-pregunta">
    <img src="${imagenUrl}" alt="${pregunta.tematica}" class="imagen-categoria">
        <div class="answers"><h2>${pregunta.pregunta}</h2></div>
         <div class="buttons-container"><div id="message" class="message hidden">
        ❌Respuesta incorrecta.
        Restaste 10 puntos.</div><button id="continuar" class="button-small">Continuar</button>
        <button id="salir" class="button-small">Salir</button><div>
    </div>
    </div>
    `;

    const answersDiv = document.querySelector('.answers');
    pregunta.opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.classList.add('respuesta');
        button.innerText = opcion;
        button.addEventListener('click', () => validarRespuesta(index + 1));
        answersDiv.appendChild(button);
    });

    document.getElementById('continuar').addEventListener('click', continuar);
    document.getElementById('salir').addEventListener('click', confirmarSalir);
};

const confirmarSalir = () => {
    Swal.fire({
        icon: 'warning',
        title: 'Salir de la Trivia',
        text: '¿Estás seguro de que quieres salir de la trivia?',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: 'Continuar',
        customClass: {
            popup: 'my-swal-popup',
            title: 'my-swal-title',
            content: 'my-swal-content'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            elegirModo();
        }
    });
};

const validarRespuesta = (respuesta) => {
    if (preguntaRespondida) return;
    preguntaRespondida = true;

    const pregunta = tematicaActual[IndicePreguntaActual];
    const messageDiv = document.getElementById('message');
    const continuarButton = document.getElementById('continuar');
    const buttons = document.querySelectorAll('.respuesta');

    buttons.forEach((button, index) => {
        button.disabled = true;
        button.classList.add('disabled');
        button.classList.remove('selected', 'correct', 'incorrect', 'unselected', 'blink-correct');

        if (index + 1 === respuesta) {
            button.classList.add('selected');
            if (pregunta.respuestaCorrecta === respuesta) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        } else if (pregunta.respuestaCorrecta === index + 1) {
            button.classList.add('blink-correct');
        } else {
            button.classList.add('unselected');
        }
    });

    if (pregunta.respuestaCorrecta === respuesta) {
        puntaje += 10;
        Swal.fire({
            icon: 'success',
            title: 'Correcto!',
            text: 'Sumaste 10 puntos.',
            showConfirmButton: false,
            timer: 2500,
            customClass: {
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                content: 'my-swal-content'
            }
        });
    } else {
        puntaje -= 10;
        messageDiv.classList.remove('hidden');
    }

    continuarButton.classList.remove('hidden');
    guardarPuntaje();
};

const continuar = () => {
    IndicePreguntaActual++;
    if (IndicePreguntaActual < tematicaActual.length) {
        cargarPregunta();
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Trivia Finalizada',
            html: `🏅Tu Puntaje es: ${puntaje}`,
            customClass: {
                popup: 'my-swal-popup',
                title: 'my-swal-title',
                content: 'my-swal-content'
            }
        }).then(() => {
            elegirModo();
        });
    }
};


// Puntaje en LocalStorage
const cargarPuntaje = () => {
    puntaje = localStorage.getItem('puntaje') ? parseInt(localStorage.getItem('puntaje')) : 0;
    const scoreDiv = document.getElementById('score');
    scoreDiv.innerText = `🏅Puntaje: ${puntaje}`;
};

const guardarPuntaje = () => {
    localStorage.setItem('puntaje', puntaje);
};

const reiniciarPuntaje = () => {
    puntaje = 0;
    guardarPuntaje();
    cargarPuntaje();
};

document.addEventListener('DOMContentLoaded', () => {
    puntaje = localStorage.getItem('puntaje') ? parseInt(localStorage.getItem('puntaje')) : 0;
    elegirModo();
});
