import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
    evento.preventDefault();
    const imagen = document.querySelector("[data-imagen]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;

    await conexionAPI.crearProducto(imagen,nombre,precio)
}

formulario,addEventListener("submit",evento=>crearProducto(evento));
