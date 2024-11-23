

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

    // Creamos un div para el precio
    const divPrecio = document.createElement("div");
    divPrecio.classList.add("divPrecio");

    // Precio
    const precio = document.createElement("p");
    precio.classList.add("card-precio");
    precio.textContent = `$${producto.precio}`;

    //  // Crear el input de cantidad y el botón
    //  const labelCantidad = document.createElement("label");
    //  labelCantidad.textContent = "Cantidad:";

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
// cardBody.appendChild(labelCantidad);
divPrecio.appendChild(divInputButton);
divInputButton.appendChild(inputCantidad);
divInputButton.appendChild(btnAgregar);

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
    actualizarEstadoBotonPagar();  // Actualizar estado del botón de pago
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
    
    // // crear boton de ir a pagar
    // const botonFinalizar = document.createElement("button");
    // botonFinalizar.id = "botonFinalizarCompra"; // le asignamos un id
    // botonFinalizar.textContent = "Proceder al pago"; // le asignamos un texto dentro del botón.
    // botonFinalizar.classList.add("checkout-btn");

   
//   // Añadir el evento de finalizar compra
//     botonFinalizar.addEventListener("click", function() {
//         finalizarCompra(); // Llamar a la función de finalizar compra
//     });

  //Añadimos el botón al contenedor si el array carrito esta lleno
  
//   const contenedorBotonFinalizar = document.querySelector(".botonFinalizarContenedor");
//   contenedorBotonFinalizar.innerHTML = '';
//   contenedorBotonFinalizar.appendChild(botonFinalizar);   
  
//   actualizarEstadoBotonFinalizar(); // Llamamos para que el botón esté actualizado cada vez que se muestra el carrito
}

// // Función que verifica si el formulario está completo
// function formularioCompleto() {
//     const nombre = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const telefono = document.getElementById("phone").value;
//     const direccion = document.getElementById("address").value;

//     // Verificamos si ambos campos tienen valor
//     return nombre !== "" && email !== "" && telefono !== "" && direccion !== "" ;
// }

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
      
              // Actualizar la vista del carrito (vaciar el carrito visualmente)
              mostrarCarrito();  // Esta función debería mostrar el carrito vacío ahora
              actualizarCarrito();  // Actualiza el contador de productos en el carrito (debe mostrar 0)
              actualizarEstadoBotonPagar();  // Actualiza el estado del botón de pago (debe estar deshabilitado)
    } else {
        Swal.fire('El carrito está vacío', 'Agrega productos antes de finalizar la compra.', 'warning');
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

botonPagar.addEventListener('click', () => {
    // Lanza el modal de SweetAlert2
    Swal.fire({
      title: 'Completa tu información',
      html: `
        <form id="formularioPago">
          <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" required>
          <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico" required>
          <input type="text" id="direccion" class="swal2-input" placeholder="Dirección" required>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        // Usamos setTimeout para asegurarnos de que los inputs estén disponibles
        setTimeout(() => {
          const nombre = document.getElementById('nombre');
          const email = document.getElementById('email');
          const direccion = document.getElementById('direccion');
  
          // Comprobamos si los elementos existen
          if (!nombre || !email || !direccion) {
            console.error('No se encontraron los elementos del formulario');
            return Swal.showValidationMessage('Por favor completa todos los campos');
          }
  
          // Obtener los valores de los inputs
          const nombreValue = nombre.value;
          const emailValue = email.value;
          const direccionValue = direccion.value;
  
          // Mostrar los valores para depuración
          console.log('Nombre:', nombreValue);
          console.log('Email:', emailValue);
          console.log('Dirección:', direccionValue);
  
          // Verificar si algún campo está vacío
          if (!nombreValue || !emailValue || !direccionValue) {
            Swal.showValidationMessage('Por favor completa todos los campos');
            return false;
          }
  
          // Si todo está bien, devolver los valores
          return { nombre: nombreValue, email: emailValue, direccion: direccionValue };
        }, 100); // Dar tiempo para que SweetAlert renderice los inputs
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Datos del formulario:', result.value);
        Swal.fire('¡Gracias por tu compra!', '', 'success');
      }
    });
  });

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



