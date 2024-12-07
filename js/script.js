

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

        // **Usamos el nombre como un identificador único en el dataset**
        card.dataset.nombre = producto.nombre; // Usamos el nombre para identificar la card

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

            // Evitar que el evento click en el input se propague a la card y muestre el modal "comentarios"
inputCantidad.addEventListener("click", function (e) {
  e.stopPropagation();
});

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
                e.stopPropagation();
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


async function traerLosDatos() {
  try {
    const response = await fetch('comentarios.json');
    if (!response.ok) {
      throw new Error(`Error al cargar los datos: ${response.statusText}`);
    }

    const datos = await response.json();
    configurarEventos(datos.comentarios);

  } catch (error) {
    console.error(error);
  }
}

function configurarEventos(comentarios) {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const nombreProducto = card.dataset.nombre;

    card.addEventListener('click', () => {
      const comentariosProducto = comentarios.filter(p => p.nombreProducto === nombreProducto);
  
      if (comentariosProducto.length > 0) {
        // Mostrar el modal con todos los comentarios
        mostrarModal(comentariosProducto);
      } else {
        console.error('No hay comentarios para este producto en el archivo JSON');
      }
    });
  });
}

function mostrarModal(comentariosProducto) {
  // Construir el contenido HTML para todos los comentarios
  const contenidoComentarios = comentariosProducto.map(comentario => {
    const estrellas = '⭐'.repeat(comentario.calificacion);
    return `
      <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
        <img src="${comentario.imagen}" alt="${comentario.usuario}" style="width: 45px; height: 45px; border-radius: 50%; margin-right: 15px; border: 2px solid #FFD700;">
        <div style="text-align: left;">
          <p style="font-weight: bold; font-size: 1rem; color: #333;">${comentario.usuario}</p>
          <p style="font-size: 0.9rem; color: #555;">${comentario.comentario}</p>
          <p style="font-size: 1rem; color: #FFD700;">${estrellas}</p>
        </div>
      </div>
    `;
  }).join(''); // Unir todos los comentarios en una sola cadena

  // Mostrar el modal con el contenido
  Swal.fire({
    title: 'Comentarios de Clientes',
    html: contenidoComentarios, // Aquí se incluyen todos los comentarios
    width: '350px', // Tamaño ajustado
    showCloseButton: true, // Mostrar la cruz de cierre
    showConfirmButton: false, // Eliminar el botón de confirmación
    padding: '15px', // Reducir el padding
    background: '#f8f8f8',
    customClass: {
      popup: 'comentarios-modal', // Clase personalizada solo para este modal
      title: 'comentarios-title', // Clase para personalizar el título
      content: 'comentarios-content', // Clase para el contenido
      closeButton: 'comentarios-close' // Clase personalizada para la cruz
    }
  });
}

// Llamar a la función para traer los datos
traerLosDatos();




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
    traerLosDatos();
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

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


// AGREGAR LOS PRODUCTOS SELECCIONADOS POR EL USUSARIO AL CARRITO
function agregarProducto(producto) {
    carrito.push(producto); // Añadimos el producto al carrito
    mostrarCarrito(); // Mostramos el carrito actualizado en la página
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
    actualizarCarrito(); // Actualizar el contador del carrito
    actualizarEstadoBotonPagar();  // Actualizar estado del botón de pago
    // Notificación elegante
    Toast.fire({
      icon: "success",
      title: "Producto Agregado"
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

        total += Number(producto.precio) * Number(producto.cantidad);
       
       
    });
    
    document.getElementById("precioTotal").innerHTML = `<strong>Precio final: </strong> $${total}`;
     
    return total;
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
 Toast.fire({
  icon: "warning",
  title: "Producto Eliminado"
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

 // Limpiar el mensaje de descuento si existe
 actualizarEstadoBotonPagar();
 const finalConDescuento = document.querySelector(".preciosFinales");
 finalConDescuento.innerHTML = ''; 
 // Limpiar el valor del input de descuento
 inputDescuento.value = '';  // Aquí es donde limpias el texto ingresado en el input
document.getElementById("precioTotal").innerHTML = ``;
document.getElementById("cantidadCarrito").innerHTML = '';
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



// Aqui comienza el div de "Descuentos"
const divDescuento = document.querySelector('.carrito-descuento');

// Crear el contenedor para el input y el botón
const divDescuentoElement = document.createElement('div');
divDescuentoElement.classList.add("descuentoElement");

// Crear el input para el código de descuento
const inputDescuento = document.createElement('input');
inputDescuento.classList.add("descuentoInput");
inputDescuento.placeholder = 'Código de Descuento';
divDescuentoElement.appendChild(inputDescuento);

// Crear el boton para aplicar el descuento
const botonDescuento = document.createElement('button');
botonDescuento.classList.add("buttonDescuento");
botonDescuento.textContent= 'Aplicar';
divDescuentoElement.appendChild(botonDescuento);

// crear un parrafo con el mensaje de error
const mensajeError = document.createElement('p');
mensajeError.classList.add('mensajeError');
mensajeError.textContent= 'Código incorrecto. Intenta de nuevo.';
divDescuentoElement.appendChild(mensajeError);

// Finalmente, agregar todo al divDescuento
divDescuento.appendChild(divDescuentoElement);



// Selecciona el botón "Ir a pagar"
const botonPagar = document.querySelector('.boton-prueba');

// Función para habilitar/deshabilitar el botón según el contenido del carrito
function actualizarEstadoBotonPagar(){
    if(carrito.length === 0){
      botonDescuento.disabled = true;
      botonDescuento.classList.add('boton-desactivado');
        botonPagar.disabled = true;
        botonPagar.classList.add('boton-desactivado');
    }else{
      botonDescuento.disabled = false;
      botonDescuento.classList.remove('boton-desactivado');
        botonPagar.disabled = false;
        botonPagar.classList.remove('boton-desactivado');
    }
}

actualizarEstadoBotonPagar()



// Funcion para aplicar descuento en el carrito de compras
function aplicarDescuento(){
  const codigoDescuento = inputDescuento.value.trim().toLowerCase();

 const precioTotalElemento = document.getElementById("precioTotal")
 const finalConDescuento = document.querySelector(".preciosFinales")

 const total = mostrarCarrito(); // Llamar a la función mostrarCarrito y obtener el total

if(codigoDescuento === 'mendoza2025'){
          // Aplicar descuento (20%)
          const descuento = total * 0.20; // 20% de descuento
          const totalConDescuento = total - descuento;
precioTotalElemento.classList.add("tachado");

const conDescuento = document.createElement('p');
conDescuento.innerHTML= `¡Descuento aplicado! Tu nuevo precio es: $${totalConDescuento}`
conDescuento.classList.add("descuentoFinal")
finalConDescuento.appendChild(conDescuento);
mensajeError.style.display = 'none';

const botonesAgregarProducto = document.querySelectorAll(".card-modern-btn");
const botonesCancelarProducto = document.querySelectorAll(".eliminar-btn");
botonesAgregarProducto.forEach(boton => {
    boton.disabled = true; // Deshabilitar todos los botones
})
// Deshabilitar los botones de cancelar producto
botonesCancelarProducto.forEach(boton => {
  boton.disabled = true; // Deshabilitar todos los botones de eliminar
});

  }else{
    mensajeError.style.display = 'block';
    precioTotalElemento.classList.remove("tachado");
  }
}
// Le asignamos el evento, al botón aplicar, para mostrar el descuento.
botonDescuento.addEventListener('click', aplicarDescuento);



// Funcion para el formulario de pago final
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






