// ELEMENTOS DEL HTML

const formulario = document.getElementById("formulario-quiz");
const preguntas = document.querySelectorAll(".pregunta-quiz");
const progreso = document.getElementById("progreso-quiz");
const botonSiguiente = document.getElementById("siguiente-quiz");
const resultado = document.getElementById("resultado-quiz");
const botonReiniciar = document.getElementById("reiniciar-quiz");

// VARIABLES

let preguntaActual = 0;
let puntaje = 0;
let respondida = false;


// FUNCIÓN PARA MOSTRAR LAS PREGUNTAS

function mostrarPregunta() {

    respondida = false;

    // OCULTAR TODAS LAS PREGUNTAS

    for (let i = 0; i < preguntas.length; i++) {
        preguntas[i].hidden = true;
    }

    // MOSTRAR LA PREGUNTA ACTUAL

    preguntas[preguntaActual].hidden = false;

    progreso.textContent =
        "Pregunta " + (preguntaActual + 1) +
        " de " + preguntas.length;

    botonSiguiente.disabled = true;

    if (preguntaActual == preguntas.length - 1) {
        botonSiguiente.textContent = "Ver resultado";
    } else {
        botonSiguiente.textContent = "Siguiente pregunta";
    }

    // ACTIVAR LOS BOTONES DE OPCIONES

    const opciones = preguntas[preguntaActual].querySelectorAll(".opcion-quiz");

    for (let i = 0; i < opciones.length; i++) {

        opciones[i].disabled = false;
        opciones[i].classList.remove("correcta");
        opciones[i].classList.remove("incorrecta");
    }

    // ELIMINAR LA EXPLICACIÓN ANTERIOR

    const explicacionAnterior =
        preguntas[preguntaActual].querySelector(".explicacion-quiz");

    if (explicacionAnterior != null) {
        explicacionAnterior.remove();
    }
}


// FUNCIÓN PARA COMPROBAR LAS RESPUESTAS

function comprobarRespuesta(botonElegido) {

    if (respondida == true) {
        return;
    }

    respondida = true;

    const pregunta = preguntas[preguntaActual];
    const opciones = pregunta.querySelectorAll(".opcion-quiz");

    // DESACTIVAR LOS BOTONES

    for (let i = 0; i < opciones.length; i++) {

        opciones[i].disabled = true;

        if (opciones[i].dataset.correcta == "true") {
            opciones[i].classList.add("correcta");
        }
    }

    // COMPROBAR SI LA RESPUESTA ES CORRECTA

    const mensaje = document.createElement("p");

    mensaje.className = "explicacion-quiz";

    if (botonElegido.dataset.correcta == "true") {

        puntaje++;

        mensaje.textContent =
            "¡Correcto! " + pregunta.dataset.explicacion;

    } else {

        botonElegido.classList.add("incorrecta");

        mensaje.textContent =
            "Respuesta incorrecta. " + pregunta.dataset.explicacion;
    }

    pregunta.appendChild(mensaje);

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

    resultado.focus();
}


// EVENTOS DE LOS BOTONES DE RESPUESTA

for (let i = 0; i < preguntas.length; i++) {

    const opciones = preguntas[i].querySelectorAll(".opcion-quiz");

    for (let j = 0; j < opciones.length; j++) {

        opciones[j].addEventListener("click", function() {
            comprobarRespuesta(opciones[j]);
        });
    }
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

    // ELIMINAR LAS EXPLICACIONES ANTERIORES

    for (let i = 0; i < preguntas.length; i++) {

        const explicacion =
            preguntas[i].querySelector(".explicacion-quiz");

        if (explicacion != null) {
            explicacion.remove();
        }
    }

    mostrarPregunta();
});


// INICIAR EL CUESTIONARIO

mostrarPregunta();