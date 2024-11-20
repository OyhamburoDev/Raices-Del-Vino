

// ARRAY DE PRODUCTOS.
const productos = [
    { nombre: "Catena Zapata", tipo: "Vino Tinto", precio: 5000, imagen: "./images/botella-vino-tinto-uno.jpg" },
    { nombre: "Bodega Norton", tipo: "Vino Tinto", precio: 5000, imagen: "./images/botella-vino-tinto-dos.jpg" },
    { nombre: "Bodega Luigi Bosca", tipo: "Vino Blanco", precio: 4000, imagen: "./images/botella-vino-blanco-uno.jpg" },
    { nombre: "Bodega Zuccardi", tipo: "Vino Blanco", precio: 4000, imagen: "./images/botella-vino-blanco-dos.jpg" },
    { nombre: "Bodega Susana Balbo", tipo: "Vino Rosado", precio: 4500, imagen: "./images/botella-vino-rosado-uno.jpg" },
    { nombre: "Bodega Chandon", tipo: "Vino Rosado", precio: 4500, imagen: "./images/botella-vino-rosado-dos.jpg" },
    { nombre: "Sacacorchos", tipo: "Accesorio", precio: 2000, imagen: "./images/accesorio-uno.jpg" },
    { nombre: "Ver Más", tipo: "Opción", precio: null, imagen: "./images/ver-mas.png" },
]


// FUNCIÓN PARA GENERAR LAS CARDS EN EL INDEX CON CLASES DE BOOTSTRAP
function generarCards(){
  const contenedor = document.querySelector(".container");  // ---> este es el container principal

  productos.forEach((producto, index)=>{
  // creamos una fila cada 4 cards, para una mejor visualizacion en desktop
    if(index % 4 === 0){
        fila = document.createElement("div");
        fila.classList.add("row", "justify-content-center");
        contenedor.appendChild(fila);
    }

    // creamos la columma de la card
    const cardCol = document.createElement("div");
    cardCol.classList.add("col-6", "col-lg-2", "mb-4");
    
    // creamos el div de la card
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "100%";

    // Creamos la imagen
    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.classList.add("card-img-top");

        // Si es el último producto (la opción "Ver Más"), solo agregamos la imagen
        if (index === productos.length - 1) {
            card.appendChild(img); // Solo agregar la imagen
          } else {
            // Si no es el último, agregamos los elementos habituales
    // creamos otro div para contener título, parrafo, precio, cantidad y botón
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // títutlo
    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = producto.nombre;

    // Tipo de vino.
    const tipo = document.createElement("p");
    tipo.classList.add("card-text");
    tipo.textContent = producto.tipo;

    // Precio
    const precio = document.createElement("p");
    precio.classList.add("card-precio");
    precio.textContent = `$${producto.precio}`;

     // Crear el input de cantidad y el botón
     const labelCantidad = document.createElement("label");
     labelCantidad.textContent = "Cantidad:";

     const inputCantidad = document.createElement("input");
     inputCantidad.type = "number";
     inputCantidad.id = "cantidad";
     inputCantidad.name = "cantidad";
     inputCantidad.min = "1";
     inputCantidad.value = "1";

     const btnAgregar = document.createElement("a");
     btnAgregar.href = "#";
     btnAgregar.classList.add("btn", "btn-danger");
     btnAgregar.textContent = "Agregar";



// Agregar los elementos creados a la card
card.appendChild(img); // Le agregamos la imagen
card.appendChild(cardBody); // Le agregamos el div que engloba los elementos que faltan
cardBody.appendChild(titulo);
cardBody.appendChild(tipo);
cardBody.appendChild(precio);
cardBody.appendChild(labelCantidad);
cardBody.appendChild(inputCantidad);
cardBody.appendChild(btnAgregar);

btnAgregar.addEventListener("click", function (e) {
    e.preventDefault();  // Evita la acción por defecto del enlace
    const cantidad = parseInt(inputCantidad.value);  // Obtener la cantidad seleccionada por el usuario
    const productoAgregado = new Producto(producto.nombre, producto.tipo, producto.precio, cantidad);  // Crear el objeto Producto
    agregarProducto(productoAgregado);  // Llamar a la función para agregar el producto al carrito
});
}

// Agregar la columna a la fila
fila.appendChild(cardCol);
// Agregar la card a la columna
cardCol.appendChild(card);
});
}

generarCards();


//  ------> CARRITO Y FORMULARIO <---------
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


// AGREGAR LOS PRODUCTOS SELECCIONADOS POR EL USUSARIO AL CARRITO
function agregarProducto(producto) {
    carrito.push(producto); // Añadimos el producto al carrito
    mostrarCarrito(); // Mostramos el carrito actualizado en la página
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
    actualizarCarrito(); // Actualizar el contador del carrito
    // Notificación elegante
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${producto.nombre} ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

// MOSTRAR LOS PRODUCTOS EN EL CARRITO
function mostrarCarrito() {
    const cartDetails = document.getElementById("cartDetails");
    cartDetails.innerHTML = ''; // Limpiar el carrito antes de mostrarlo

    let total = 0;

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");
        productoDiv.style.opacity = 0; // Animación de entrada

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

        // Animación de entrada
        setTimeout(() => {
            productoDiv.style.opacity = 1;
            productoDiv.style.transition = 'opacity 0.5s';
        }, 100);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById("precioTotal").innerHTML = `<strong>Precio final: </strong> $${total}`;
    
    // crear boton de finalizar compra
    const botonFinalizar = document.createElement("button");
    botonFinalizar.id = "botonFinalizarCompra"; // le asignamos un id
    botonFinalizar.textContent = "Finalizar compra"; // le asignamos un texto dentro del botón.
    botonFinalizar.classList.add("checkout-btn");

   
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
    const productoEliminado = carrito[index].nombre; // Obtenemos el nombre del producto eliminado
    carrito.splice(index, 1); // Eliminamos el producto
    mostrarCarrito(); // Mostramos el carrito actualizado
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
    actualizarCarrito(); // Actualizar el contador después de eliminar un producto

 // Notificación elegante
 Swal.fire({
    title: 'Producto eliminado',
    text: `${productoEliminado} fue eliminado del carrito.`,
    icon: 'warning',
    confirmButtonText: 'OK'
});
}


// FUNCION FINALIZAR COMPRA
function finalizarCompra() {
    if (carrito.length > 0) {
        // Vaciar el carrito
        carrito = [];

        // Limpiar el carrito en LocalStorage
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito vacío en LocalStorage

        // Mostrar el mensaje de agradecimiento
        const contenedorCarrito = document.querySelector('.carrito-items');
        contenedorCarrito.innerHTML = `<h2>¡Gracias por tu compra!</h2><p>Tu compra ha sido exitosa.</p>`;
    } else {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    }
}

function actualizarCarrito(){
    const cantidadElemento = document.getElementById("cantidadCarrito");
    cantidadElemento.textContent = carrito.length // Mostramos el número de productos en el carrito

    if (carrito.length > 0){
        cantidadElemento.style.display = `inline-block`;
    }else{
        cantidadElemento.style.display = `none`;
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



const carritoIcono = document.getElementById('carrito-icono');  // BOTON DE ABRIR
const carritoSidebar = document.getElementById('carrito-sidebar');
const carritoBotonCerrar = document.getElementById('close-carrito')

// Abrir el carrito al hacer clic en el icono
carritoIcono.addEventListener('click', () => {
    carritoSidebar.classList.add('active');
});

// Cerrar el carrito al hacer clic en el botón de cierre
carritoBotonCerrar.addEventListener('click', () => {
    carritoSidebar.classList.remove('active');
});