// Obtiene los elementos del DOM
const parrafoDias = document.querySelector("#dias");
const parrafoHoras = document.querySelector("#horas");
const parrafoMinutos = document.querySelector("#minutos");
const parrafoSegundos = document.querySelector("#segundos");
const spanFecha = document.querySelector("#fecha");
const cuentaAtras = document.querySelector("#cuenta-atras");
const inputFecha = document.querySelector("#input-fecha");
const btnActualizarFecha = document.querySelector("#btn-actualizar-fecha");

// Establece la fecha objetivo predeterminada
let fechaObjetivo = new Date(2025, 0, 1, 0, 0).getTime();

// Muestra la fecha objetivo en el span
spanFecha.innerText = new Date(fechaObjetivo).toLocaleDateString();

// Actualiza la cuenta atrás cada segundo
const intervalo = setInterval(actualizarCuentaAtras, 1000);

// Función para actualizar la cuenta atrás
function actualizarCuentaAtras() {
    // Obtiene la fecha actual
    const ahora = new Date().getTime();

    // Calcula la distancia entre la fecha objetivo y la fecha actual
    const distancia = fechaObjetivo - ahora;

    // Calcula los días, horas, minutos y segundos restantes
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Actualiza los elementos del DOM con los valores calculados
    parrafoDias.innerText = dias;
    parrafoHoras.innerText = horas.toString().padStart(2, '0');
    parrafoMinutos.innerText = minutos.toString().padStart(2, '0');
    parrafoSegundos.innerText = segundos.toString().padStart(2, '0');

    // Detiene la cuenta atrás cuando se alcanza la fecha objetivo
    if (distancia < 0) {
        clearInterval(intervalo);
        cuentaAtras.innerHTML = "<p class='grande'>¡Ya llegamos!</p>";
    }
}

// Función para actualizar la fecha objetivo
function actualizarFechaObjetivo() {
    // Obtiene la fecha ingresada por el usuario
    const nuevaFecha = new Date(inputFecha.value).getTime();

    // Valida si la fecha ingresada es válida
    if (!isNaN(nuevaFecha)) {
        fechaObjetivo = nuevaFecha;
        // Muestra la nueva fecha objetivo en el span
        spanFecha.innerText = new Date(fechaObjetivo).toLocaleDateString();
        // Reinicia la cuenta atrás con la nueva fecha objetivo
        clearInterval(intervalo);
        intervalo = setInterval(actualizarCuentaAtras, 1000);
    } else {
        alert("Por favor, introduce una fecha válida.");
    }
}

// Evento click para el botón de actualizar fecha
btnActualizarFecha.addEventListener("click", actualizarFechaObjetivo);
