
// INICIALIZAMOS EL CARRITO COMO UN ARRAY VACIO
let carrito = []; 


// CARGAR EL CARRITO DESDE LOCAL STORAGE CUANDO LA PÁGINA SE CARGA Y MOSTRARLO EN LA PÁGINA
window.onload = function() {
    cargarCarritoDeLocalStorage(); 
}


// OBTENER EL CARRITO DE LOCAL STORAGE  recupera y muestra los datos guardados.
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito"); // Obtenemos el carrito del Local Storage
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Convertimos el string de vuelta a un objeto
        mostrarCarrito(); // Mostramos el carrito recuperado
    }
}

// CLASE CONSTRUCTORA PARA ARMAR LOS OBJETOS DEL CARRITO
class Producto {
    constructor(nombre, tipoDeVino, precio, cantidad) {
        this.nombre = nombre;
        this.tipoDeVino = tipoDeVino;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// LLAMAMOS A TODOS LOS BOTONES DE LAS CARDS
const botonesAgregar = document.querySelectorAll('.btn-primary');

// RECORREMOS CADA BOTON Y LE ASIGNAMOS EL EVENTO "CLICK"
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function(e) {
        e.preventDefault(); // Evitar que el enlace haga su acción por defecto

        // Encontrar la card de la que se hizo clic
        const card = boton.closest('.card'); 

        // Obtener los datos de la card
        const nombre = card.querySelector('.card-title').textContent; // Nombre del producto
        const tipoDeVino = card.querySelector('.card-text').textContent; // tipo de vino
        const precioTexto = card.querySelector('.card-precio').textContent; 
        const precio = parseInt(precioTexto.split('$')[1].trim()); // Obtenemos el solamente el precio en valor numérico
        const cantidad = parseInt(card.querySelector('input[name="cantidad"]').value); // Obtener la cantidad seleccionada

        // Crear un nuevo producto
        const producto = new Producto(nombre, tipoDeVino, precio, cantidad);

        // Agregar el producto al carrito
        agregarProducto(producto);
    });
});

// AGREGAR LOS PRODUCTOS SELECCIONADOS POR EL USUSARIO AL CARRITO
function agregarProducto(producto) {
    carrito.push(producto); // Añadimos el producto al carrito
    mostrarCarrito(); // Mostramos el carrito actualizado en la página
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
}

// MOSTRAR LOS PRODUCTOS EN EL CARRITO
function mostrarCarrito() {
    const cartDetails = document.getElementById("cartDetails");
    cartDetails.innerHTML = ''; // Limpiar el carrito antes de mostrarlo

    let total = 0;

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");

        // Crear elementos para cada parte del producto
        const nombreParrafo = document.createElement("p");
        nombreParrafo.innerHTML = `<strong>Nombre:</strong> ${producto.nombre} - ${producto.tipoDeVino}`;

        const cantidadParrafo = document.createElement("p");
        cantidadParrafo.innerHTML = `<strong>Cantidad:</strong> ${producto.cantidad} - Precio por unidad: $${producto.precio}`;

        const precioTotalParrafo = document.createElement("p");
        precioTotalParrafo.innerHTML = `<strong>Precio Total:</strong> $${producto.precio * producto.cantidad}`;

        // Crear el botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("eliminar-btn");
        botonEliminar.textContent = "❌";
        botonEliminar.setAttribute("data-index", index);

        // Añadir el evento de clic al botón
        botonEliminar.addEventListener("click", function() {
            eliminarProducto(index);
        });

        // Agregar todo al div del producto
        productoDiv.appendChild(nombreParrafo);
        productoDiv.appendChild(cantidadParrafo);
        productoDiv.appendChild(precioTotalParrafo);
        productoDiv.appendChild(botonEliminar);

        // Añadir el producto completo al contenedor
        cartDetails.appendChild(productoDiv);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById("precioTotal").innerHTML = `<strong>Precio final: </strong> $${total}`;
    
    // crear boton de finalizar compra
    const botonFinalizar = document.createElement("button");
    botonFinalizar.id = "botonFinalizarCompra"; // le asignamos un id
    botonFinalizar.textContent = "Finalizar compra"; // le asignamos un texto dentro del botón.

   
  // Añadir el evento de finalizar compra
    botonFinalizar.addEventListener("click", function() {
        finalizarCompra(); // Llamar a la función de finalizar compra
    });

  //Añadimos el botón al contenedor si el array carrito esta lleno
  
  const contenedorBotonFinalizar = document.querySelector(".botonFinalizarContenedor");
  contenedorBotonFinalizar.innerHTML = '';
  contenedorBotonFinalizar.appendChild(botonFinalizar);   
  
  actualizarEstadoBotonFinalizar(); // Llamamos para que el botón esté actualizado cada vez que se muestra el carrito
}

// Función que verifica si el formulario está completo
function formularioCompleto() {
    const nombre = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("phone").value;
    const direccion = document.getElementById("address").value;

    // Verificamos si ambos campos tienen valor
    return nombre !== "" && email !== "" && telefono !== "" && direccion !== "" ;
}

// ELIMINAR LOS PRODUCTOS SELECCIONADOS DEL CARRITO
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminamos el producto
    mostrarCarrito(); // Mostramos el carrito actualizado
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
}


// FUNCION FINALIZAR COMPRA
function finalizarCompra() {
    if (carrito.length > 0) {
        // Vaciar el carrito
        carrito = [];

        // Limpiar el carrito en LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito vacío en LocalStorage

        // Mostrar el mensaje de agradecimiento
        const contenedorCarrito = document.querySelector('.box2');
        contenedorCarrito.innerHTML = `<h2>¡Gracias por tu compra!</h2><p>Tu compra ha sido exitosa.</p>`;
    } else {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    }
}



// GUARDAR LOS PRODUCTOS EN LOCAL STORAGE
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito como texto JSON
}


// Escuchar cambios en los campos del formulario para actualizar el estado del botón "Finalizar compra"
document.getElementById("name").addEventListener("input", actualizarEstadoBotonFinalizar);
document.getElementById("email").addEventListener("input", actualizarEstadoBotonFinalizar);
document.getElementById("phone").addEventListener("input", actualizarEstadoBotonFinalizar);
document.getElementById("address").addEventListener("input", actualizarEstadoBotonFinalizar);

// Función para actualizar el estado del botón "Finalizar compra"
function actualizarEstadoBotonFinalizar() {
    const botonFinalizar = document.getElementById("botonFinalizarCompra");
    // Habilita el botón si el carrito tiene productos y el formulario está completo
    botonFinalizar.disabled = carrito.length === 0 || !formularioCompleto();
}
