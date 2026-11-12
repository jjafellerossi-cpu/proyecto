// PREGUNTAS SOBRE SAN JOSÉ DE CALASANZ

const preguntas = [
    {
        pregunta: "¿En qué año nació San José de Calasanz?",
        opciones: ["1557", "1648", "1597"],
        correcta: 0,
        explicacion: "Nació en 1557, en Peralta de la Sal, España."
    },
    {
        pregunta: "¿En qué país nació?",
        opciones: ["Italia", "España", "Francia"],
        correcta: 1,
        explicacion: "Nació en Peralta de la Sal, España."
    },
    {
        pregunta: "¿En qué año fue ordenado sacerdote?",
        opciones: ["1592", "1617", "1583"],
        correcta: 2,
        explicacion: "Fue ordenado sacerdote el 17 de diciembre de 1583."
    },
    {
        pregunta: "¿A qué ciudad viajó en 1592?",
        opciones: ["Roma", "Madrid", "París"],
        correcta: 0,
        explicacion: "Viajó a Roma, donde descubrió las necesidades educativas de los niños pobres."
    },
    {
        pregunta: "¿Qué hizo en 1597?",
        opciones: [
            "Fue nombrado obispo",
            "Abrió una escuela gratuita para niños pobres",
            "Regresó a España"
        ],
        correcta: 1,
        explicacion: "En 1597 impulsó una escuela gratuita en Santa Dorotea, en Roma."
    },
    {
        pregunta: "¿Qué institución religiosa fundó?",
        opciones: ["Los Franciscanos", "Los Jesuitas", "Las Escuelas Pías"],
        correcta: 2,
        explicacion: "Fundó las Escuelas Pías, origen de la Orden de los Escolapios."
    },
    {
        pregunta: "¿Cuál era su lema educativo?",
        opciones: ["Piedad y Letras", "Fe y Trabajo", "Ciencia y Progreso"],
        correcta: 0,
        explicacion: "Su lema era Piedad y Letras."
    },
    {
        pregunta: "¿En qué año falleció?",
        opciones: ["1557", "1648", "1617"],
        correcta: 1,
        explicacion: "Falleció en Roma el 25 de agosto de 1648."
    }
];


// ELEMENTOS DEL HTML

const formulario = document.getElementById("formulario-quiz");
const preguntaTexto = document.getElementById("pregunta-texto");
const opcionesContenedor = document.getElementById("opciones-quiz");
const progreso = document.getElementById("progreso-quiz");
const botonSiguiente = document.getElementById("siguiente-quiz");
const resultado = document.getElementById("resultado-quiz");
const botonReiniciar = document.getElementById("reiniciar-quiz");


// VARIABLES

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;
let botonesOpciones = [];


// FUNCIÓN PARA MOSTRAR LAS PREGUNTAS

function mostrarPregunta() {

    respondida = false;

    const pregunta = preguntas[preguntaActual];

    preguntaTexto.textContent =
        (preguntaActual + 1) + ". " + pregunta.pregunta;

    progreso.textContent =
        "Pregunta " + (preguntaActual + 1) +
        " de " + preguntas.length;

    opcionesContenedor.innerHTML = "";

    botonesOpciones = [];

    botonSiguiente.disabled = true;

    if (preguntaActual == preguntas.length - 1) {
        botonSiguiente.textContent = "Ver resultado";
    } else {
        botonSiguiente.textContent = "Siguiente pregunta";
    }

    // BUCLE PARA CREAR LAS OPCIONES

    for (let i = 0; i < pregunta.opciones.length; i++) {

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "opcion-quiz";
        boton.textContent = pregunta.opciones[i];

        boton.addEventListener("click", function() {
            comprobarRespuesta(i);
        });

        opcionesContenedor.appendChild(boton);

        botonesOpciones.push(boton);
    }
}


// FUNCIÓN PARA COMPROBAR LAS RESPUESTAS

function comprobarRespuesta(indiceElegido) {

    if (respondida == true) {
        return;
    }

    respondida = true;

    const pregunta = preguntas[preguntaActual];

    // BUCLE PARA DESACTIVAR LAS OPCIONES

    for (let i = 0; i < botonesOpciones.length; i++) {

        botonesOpciones[i].disabled = true;
    }

    // COMPROBAR SI LA RESPUESTA ES CORRECTA

    const mensaje = document.createElement("p");

    mensaje.className = "explicacion-quiz";

    if (indiceElegido == pregunta.correcta) {

        puntaje++;

        mensaje.textContent =
            "¡Correcto! " + pregunta.explicacion;

    } else {

        mensaje.textContent =
            "Respuesta incorrecta. " + pregunta.explicacion;
    }

    opcionesContenedor.appendChild(mensaje);

    botonSiguiente.disabled = false;
}


// FUNCIÓN PARA MOSTRAR EL RESULTADO

function mostrarResultado() {

    formulario.hidden = true;

    resultado.hidden = false;

    botonReiniciar.hidden = false;

    resultado.innerHTML = "";

    const titulo = document.createElement("h3");

    titulo.textContent = "¡Terminaste el cuestionario!";

    const puntajeTexto = document.createElement("p");

    puntajeTexto.textContent =
        "Tu puntaje: " + puntaje + " de " + preguntas.length;

    const mensaje = document.createElement("p");

    // CONDICIONALES PARA EL RESULTADO FINAL

    if (puntaje == preguntas.length) {

        mensaje.textContent =
            "¡Excelente! Conocés perfectamente la vida de San José de Calasanz.";

    } else if (puntaje >= 5) {

        mensaje.textContent =
            "¡Muy bien! Conocés bastante sobre su vida y su obra educativa.";

    } else {

        mensaje.textContent =
            "¡Buen intento! Podés repasar la información y volver a jugar.";
    }

    resultado.appendChild(titulo);
    resultado.appendChild(puntajeTexto);
    resultado.appendChild(mensaje);
}


// EVENTO DEL BOTÓN SIGUIENTE

botonSiguiente.addEventListener("click", function() {

    if (respondida == true) {

        if (preguntaActual < preguntas.length - 1) {

            preguntaActual++;

            mostrarPregunta();

        } else {

            mostrarResultado();
        }
    }
});


// EVENTO PARA REINICIAR EL JUEGO

botonReiniciar.addEventListener("click", function() {

    preguntaActual = 0;

    puntaje = 0;

    resultado.hidden = true;

    botonReiniciar.hidden = true;

    formulario.hidden = false;

    mostrarPregunta();
});


// INICIAR EL CUESTIONARIO

botonReiniciar.hidden = true;

mostrarPregunta();