

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


// Filtrados globales
let filtrados = productos;  // Inicializamos la variable filtrados con todos los productos

// FUNCIÓN PARA GENERAR LAS CARDS EN EL INDEX CON CLASES DE BOOTSTRAP
function generarCards() {
    const contenedor = document.querySelector(".container");  // ---> este es el container principal
    contenedor.innerHTML = "";  // Limpiamos el contenedor antes de agregar las nuevas cards

    filtrados.forEach((producto, index) => {
        // creamos una fila cada 4 cards, para una mejor visualización en desktop
        if (index % 4 === 0) {
            fila = document.createElement("div");
            fila.classList.add("row", "justify-content-center");
            contenedor.appendChild(fila);
        }

        // creamos la columna de la card
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
            // creamos otro div para contener título, párrafo, precio, cantidad y botón
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            // Título
            const titulo = document.createElement("h5");
            titulo.classList.add("card-title");
            titulo.textContent = producto.nombre;

            // Tipo de vino
            const tipo = document.createElement("p");
            tipo.classList.add("card-text");
            tipo.textContent = producto.tipo;

            // Creamos un div para el precio, input y botón
            const divPrecio = document.createElement("div");
            divPrecio.classList.add("divPrecio");

            // Precio
            const precio = document.createElement("p");
            precio.classList.add("card-precio");
            precio.textContent = `$${producto.precio}`;

            // creamos otro div para el input y el button
            const divInputButton = document.createElement("div");
            divInputButton.classList.add("divInputButton");

            const inputCantidad = document.createElement("input");
            inputCantidad.classList.add("cantidad-input")
            inputCantidad.type = "number";
            inputCantidad.id = "cantidad";
            inputCantidad.name = "cantidad";
            inputCantidad.min = "1";
            inputCantidad.value = "1";

            // Crear el botón con el icono de Font Awesome dentro
            const btnAgregar = document.createElement("button");
            btnAgregar.classList.add("card-modern-btn"); // Aplica la clase del botón de la card moderna

            // Crear el icono de Font Awesome
            const icono = document.createElement("i");
            icono.classList.add("fas", "fa-plus"); // Aplica el icono de suma de Font Awesome

            // Agregar el icono al botón
            btnAgregar.appendChild(icono);

            // Agregar los elementos creados a la card
            card.appendChild(img); // Le agregamos la imagen
            card.appendChild(cardBody); // Le agregamos el div que engloba los elementos que faltan
            cardBody.appendChild(titulo);
            cardBody.appendChild(tipo);
            cardBody.appendChild(divPrecio);
            divPrecio.appendChild(precio);
            divPrecio.appendChild(divInputButton);
            divInputButton.appendChild(inputCantidad);
            divInputButton.appendChild(btnAgregar);

            btnAgregar.addEventListener("click", function (e) {
                e.preventDefault();  // Evita la acción por defecto del enlace
                const cantidad = parseInt(inputCantidad.value);  // Obtener la cantidad seleccionada por el usuario
                const productoAgregado = new Producto(producto.nombre, producto.tipo, producto.precio, cantidad, producto.imagen);  // Crear el objeto Producto
                agregarProducto(productoAgregado);  // Llamar a la función para agregar el producto al carrito
            });
        }

        // Agregar la columna a la fila
        fila.appendChild(cardCol);
        // Agregar la card a la columna
        cardCol.appendChild(card);
    });
}

// Llamamos a generarCards inicialmente con los productos completos
generarCards();

// Definimos la función para buscar productos
function buscarProductos(textoBusqueda, productos) {
    // Convertimos el texto de búsqueda a minúsculas para hacer la búsqueda insensible a mayúsculas
    const texto = textoBusqueda.toLowerCase();

    // Filtramos los productos que coinciden con el texto de búsqueda
    const filtrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.tipo.toLowerCase().includes(texto)
    );

    // Devolvemos el array de productos filtrados
    return filtrados;
}

// Evento para escuchar cuando el usuario escribe en el campo de búsqueda
const seleccionarInput = document.getElementById('buscador');
seleccionarInput.addEventListener("input", function() {
    // Obtenemos el valor del campo de búsqueda
    const textoBusqueda = seleccionarInput.value;

    // Llamamos a la función que filtra los productos
    filtrados = buscarProductos(textoBusqueda, productos);  // Actualizamos la variable filtrados

    // Limpiamos el contenedor antes de agregar las nuevas cards filtradas
    generarCards();  // Volver a generar las cards con los productos filtrados
});







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
    console.log("Carrito cargado:", carritoGuardado);
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Convertimos el string de vuelta a un objeto
        if (carrito.length === 0) {
            // Si el carrito está vacío, no hacemos nada
            return;
        }
        
        mostrarCarrito(); // Mostramos el carrito recuperado
        actualizarEstadoBotonPagar();
        actualizarCarrito();
    }
}

// CLASE CONSTRUCTORA PARA ARMAR LOS OBJETOS DEL CARRITO
class Producto {
    constructor(nombre, tipoDeVino, precio, cantidad, imagen) {
        
        this.nombre = nombre;
        this.tipoDeVino = tipoDeVino;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;  // Esta propiedad es necesaria para almacenar la imagen
        
    }
}

// AGREGAR LOS PRODUCTOS SELECCIONADOS POR EL USUSARIO AL CARRITO
function agregarProducto(producto) {
    carrito.push(producto); // Añadimos el producto al carrito
    mostrarCarrito(); // Mostramos el carrito actualizado en la página
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
    actualizarCarrito(); // Actualizar el contador del carrito
    actualizarEstadoBotonPagar();  // Actualizar estado del botón de pago
    // Notificación elegante
    Swal.fire({
        title: '¡Producto agregado!',
        text: `${producto.nombre} ha sido añadido al carrito.`,
        icon: 'success',
        confirmButtonText: 'OK',
         customClass: {
        confirmButton: 'custom-confirm-button'
    }
});
}

// MOSTRAR LOS PRODUCTOS EN EL CARRITO
function mostrarCarrito() {
    const cartDetails = document.getElementById("cartDetails");
    cartDetails.innerHTML = ''; // Limpiar el carrito antes de mostrarlo

     if (carrito.length === 0) {
        // Mostrar un mensaje si el carrito está vacío
        cartDetails.innerHTML = `<p>No hay productos en el carrito.</p>`;
        document.getElementById("precioTotal").innerHTML = `<strong>Precio final: </strong> $0`;
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto-carrito");
        productoDiv.style.opacity = 0; // Animación de entrada

        
       // Crear elementos para cada parte del producto
       const imagenParrafo = document.createElement("img");
       imagenParrafo.classList.add("imagen-carrito");
       imagenParrafo.src = producto.imagen; // Mostrar la imagen del producto
       imagenParrafo.alt = producto.nombre;

        const divNombreTipo = document.createElement("div");
        divNombreTipo.classList.add("div-nombre-tipo");

        const nombreParrafo = document.createElement("p");
        nombreParrafo.classList.add("nombreParrafo")
        nombreParrafo.innerHTML = `<strong>${producto.nombre}</strong>`;

        const tipoParrafo = document.createElement("p");
        tipoParrafo.innerHTML = `${producto.tipoDeVino}`

        divNombreTipo.appendChild(nombreParrafo);
        divNombreTipo.appendChild(tipoParrafo);

        const divCantPrecio = document.createElement("div");
        divCantPrecio.classList.add("cantidad-precio");

        const cantidadParrafo = document.createElement("p");
        cantidadParrafo.classList.add("cantidadParrafo")
        cantidadParrafo.innerHTML = ` ${producto.cantidad} `;

        const precioTotalParrafo = document.createElement("p");
        precioTotalParrafo.classList.add("precioTotalParrafo")
        precioTotalParrafo.innerHTML = `$${producto.precio * producto.cantidad}`;

        divCantPrecio.appendChild(cantidadParrafo);
        divCantPrecio.appendChild(precioTotalParrafo);

        
        const divBtnEliminar = document.createElement("div");
        divBtnEliminar.classList.add("divBtnEliminar");
        // Crear el botón de eliminar
const botonEliminar = document.createElement("button");
botonEliminar.classList.add("eliminar-btn");
botonEliminar.setAttribute("data-index", index);

// Crear el <span> y agregarlo al botón
const spanEliminar = document.createElement("span");
spanEliminar.innerHTML = "&#x2715;"; // Símbolo de la cruz
botonEliminar.appendChild(spanEliminar);

        // Añadir el evento de clic al botón
        botonEliminar.addEventListener("click", function() {
            eliminarProducto(index);
        });

        // Agregar todo al contenedor principal
        productoDiv.appendChild(imagenParrafo);
        productoDiv.appendChild(divNombreTipo); 
        productoDiv.appendChild(divCantPrecio);
        productoDiv.appendChild(botonEliminar);

        // Añadir el producto al carrito
        cartDetails.appendChild(productoDiv);

        // Animación de entrada
        setTimeout(() => {
            productoDiv.style.opacity = 1;
            productoDiv.style.transition = 'opacity 0.5s';
        }, 100);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById("precioTotal").innerHTML = `<strong>Precio final: </strong> $${total}`;
    
}



// ELIMINAR LOS PRODUCTOS SELECCIONADOS DEL CARRITO
function eliminarProducto(index) {
    const productoEliminado = carrito[index].nombre; // Obtenemos el nombre del producto eliminado
    carrito.splice(index, 1); // Eliminamos el producto
    mostrarCarrito(); // Mostramos el carrito actualizado
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
    actualizarCarrito(); // Actualizar el contador después de eliminar un producto
    actualizarEstadoBotonPagar();  // Actualizar estado del botón de pago

 // Notificación elegante
 Swal.fire({
    title: 'Producto eliminado',
    text: `${productoEliminado} fue eliminado del carrito.`,
    icon: 'warning',
    confirmButtonText: 'OK',
     customClass: {
        confirmButton: 'custom-confirm-button'
     }
});
}


// FUNCION FINALIZAR COMPRA
function finalizarCompra() {
   // Vaciar el carrito en el localStorage
localStorage.removeItem("carrito");
    
// Vaciar el carrito en la variable global
carrito = [];
   // Vaciar el carrito en el localStorage
   localStorage.removeItem("carrito");

// Limpiar el contenido visual del carrito en el DOM
const cartDetails = document.getElementById("cartDetails");
cartDetails.innerHTML = 'Gracias por tu compra!'; // Limpiar el contenido visual

// Actualizar el total y la cantidad en la interfaz
document.getElementById("precioTotal").innerHTML = ``;
document.getElementById("cantidadCarrito").innerHTML = '';
actualizarEstadoBotonPagar();
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

// Selecciona el botón "Ir a pagar"
const botonPagar = document.querySelector('.boton-prueba');

// Función para habilitar/deshabilitar el botón según el contenido del carrito
function actualizarEstadoBotonPagar(){
    console.log(carrito.length);  // Diagnóstico de la longitud del carrito
    if(carrito.length === 0){
        botonPagar.disabled = true;
        botonPagar.classList.add('boton-desactivado');
    }else{
        botonPagar.disabled = false;
        botonPagar.classList.remove('boton-desactivado');
    }
}

actualizarEstadoBotonPagar()

function funcionFinal() {
    document
      .getElementById("btn-ir-a-pagar")
      .addEventListener("click", function () {
        Swal.fire({
          title: '<span style="color:#000000;">Formulario de Pago</span>',
          html: `
            <div class="form-group">
              <i class="fas fa-user"></i>
              <input type="text" id="nombre" class="form-input" placeholder="Nombre completo" required />
            </div>
            <div class="form-group">
              <i class="fas fa-map-marker-alt"></i>
              <input type="text" id="direccion" class="form-input" placeholder="Dirección de envío" required />
            </div>
            <div class="form-group">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" class="form-input" placeholder="Correo electrónico" required>
            </div>
            <div class="form-group">
              <i class="fas fa-credit-card"></i>
              <input type="text" id="tarjeta" class="form-input" placeholder="Número de tarjeta" maxlength="16" required />
            </div>
              <div class="form-group">
              <i class="fas fa-calendar-alt"></i>
              <input type="month" class="form-input" id="expiration" required>
            </div>
            <div class="form-group">
              <i class="fas fa-lock"></i>
              <input type="text" id="cvv" class="form-input" placeholder="CVV" maxlength="3" required>
            </div>
          `,
          confirmButtonText: "Pagar",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          customClass: {
            popup: 'swal2-popup-custom',
            confirmButton: 'swal2-confirm-custom',
            cancelButton: 'swal2-cancel-custom',
          },
          preConfirm: () => {
            const nombre = document.getElementById("nombre")?.value.trim();
            const direccion = document.getElementById("direccion")?.value.trim();
            // const email = document.getElementById("email").value;
            const tarjeta = document.getElementById("tarjeta")?.value.trim();
            const expiration = document.getElementById("expiration").value;
            const cvv = document.getElementById("cvv").value;
  
            if (!nombre || !direccion ||
                 !tarjeta|| !expiration ||
                !cvv) {
              Swal.showValidationMessage("Por favor, completa todos los campos.");
              return false;
            }
  
            return { nombre, direccion, tarjeta, expiration, cvv };
          },
        }).then((result) => {
            if (result.isConfirmed) {
              // Aquí agregamos el Swal para mostrar el mensaje de éxito
              Swal.fire({
                title: '¡Pago exitoso!',
                text: 'Gracias por tu compra',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'custom-confirm-button', // Aplica la clase personalizada
                }
              }).then(() => {
                finalizarCompra();
              });
            }
          });
        });
    }
    
    funcionFinal();

// GUARDAR LOS PRODUCTOS EN LOCAL STORAGE
function guardarCarritoEnLocalStorage() {
    console.log("Guardando carrito:", carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito como texto JSON
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





//  AQUI COMIENZA LA FUNCION DEL BUSCADOR
