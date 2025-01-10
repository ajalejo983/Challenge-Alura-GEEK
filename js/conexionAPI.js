async function listaProductos() {
    try {
        const conexion = await fetch("http://localhost:3001/productos", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });

        if (!conexion.ok) {
            throw new Error(`Error en la solicitud: ${conexion.status} ${conexion.statusText}`);
        }

        const conexionConvertida = await conexion.json();
        console.log("Respuesta de la API:", conexionConvertida);
        return conexionConvertida; // Devuelve los datos para que puedan ser usados
    } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        return []; // Devuelve un arreglo vacío si hay un error para evitar fallos en el frontend
    }
}



async function crearProducto(imagen,nombre,precio) {
    const conexion = await fetch("http://localhost:3001/productos",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            imagen:imagen,
            nombre:nombre,
            precio:precio
        })
    })

    const conexionConvertida = await conexion.json();
    return conexionConvertida;


}

async function borrarProducto(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
            method: "DELETE",
        });
        if (!respuesta.ok) {
            throw new Error(`Error al eliminar el producto con ID ${id}`);
        }
        console.log(`Producto con ID ${id} eliminado correctamente`);
    } catch (error) {
        console.error("Error al intentar borrar el producto:", error);
    }
}



export const conexionAPI = {
    listaProductos,crearProducto,borrarProducto
};


