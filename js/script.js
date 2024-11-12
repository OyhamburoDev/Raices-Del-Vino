
// CARGAR EL CARRITO DESDE LOCAL STORAGE CUANDO LA PÁGINA SE CARGA
window.onload = function() {
    cargarCarritoDeLocalStorage(); 
}


// INICIALIZAMOS EL CARRITO COMO UN ARRAY VACIO
let carrito = []; 


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
}


// AGREGAR LOS PRODUCTOS SELECCIONADOS POR EL USUSARIO AL CARRITO
function agregarProducto(producto) {
    carrito.push(producto); // Añadimos el producto al carrito
    mostrarCarrito(); // Mostramos el carrito actualizado en la página
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
}

// ELIMINAR LOS PRODUCTOS SELECCIONADOS DEL CARRITO
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminamos el producto
    mostrarCarrito(); // Mostramos el carrito actualizado
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
}

// GUARDAR LOS PRODUCTOS EN LOCAL STORAGE
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito como texto JSON
}

// OBTENER EL CARRITO DE LOCAL STORAGE
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito"); // Obtenemos el carrito del Local Storage
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Convertimos el string de vuelta a un objeto
        mostrarCarrito(); // Mostramos el carrito recuperado
    }
}