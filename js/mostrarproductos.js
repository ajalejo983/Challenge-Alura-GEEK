import { conexionAPI } from "./conexionAPI.js";

const listaProductos = document.querySelector("[data-productos]");

function crearProducto(id, imagen, nombre, precio) {
    const producto = document.createElement("li");
    producto.className = "producto__geek";
    producto.innerHTML = `
        <img class="producto__imagen" src="${imagen}" alt="${nombre}">
        <h3 class="producto__nombre">${nombre}</h3>
        <div class="producto__precio__icono">
            <p class="producto__precio">$ ${precio}</p>
            <img class="producto__icon__borrar" src="./imagenes/icon_borrar_producto.png" alt="Borrar producto" data-id="${id}">
        </div>`;
    
    // Agregar evento para borrar producto
    const botonBorrar = producto.querySelector(".producto__icon__borrar");
    botonBorrar.addEventListener("click", async () => {
        try {
            const confirmar = confirm("¿Estás seguro de que deseas eliminar este producto?");
            if (confirmar) {
                await conexionAPI.borrarProducto(id); // Llama a la API para eliminarlo
                producto.remove(); // Elimina el elemento del DOM
            }
        } catch (error) {
            console.error("Error al borrar el producto:", error);
        }
    });

    return producto;
}

async function listarProductos() {
    try {
        const listaAPI = await conexionAPI.listaProductos();
        if (!Array.isArray(listaAPI)) {
            throw new Error("La respuesta no es una lista válida");
        }
        listaAPI.forEach((producto) => {
            listaProductos.appendChild(
                crearProducto(producto.id, producto.imagen, producto.nombre, producto.precio)
            );
        });
    } catch (error) {
        console.error("Error al listar los productos:", error);
    }
}

listarProductos();

