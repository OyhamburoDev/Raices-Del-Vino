


// // Arrays de los productos 
// const vinos = [
//     { nombre: "Vino Tinto", precio: 5000},
//     { nombre: "Vino Blanco", precio: 4000},
//     { nombre: "Vino Rosado", precio: 4500},
// ];


// // En este array guardamos el pedido del cliente
// let pedidosSolicitados =[];


// // Funcion que llama a todas las demas funciones
// function iniciar (){

// const quieroComprar = confirm("¿Quieres comprar un producto?");
// if(quieroComprar){
//   elegirVino() // Llamamos a la función para que el usuario elija los vinos
// }else{
//   return;
// }

// const total = sumaDePedidos (pedidosSolicitados); // Luego de elegir los vinos, llamamos a la función que suma los precios, la guardamos en una variable y le pasamos un argumento real.
// alert(`El total de tu pedido es de $${total}`);
// alert("Recuerda que el cupón de descuento se encuentra en un alert de advertencia en la página.");
// const quieroDescuento = confirm("¿Tienes un cupón de descuento?");
// if(quieroDescuento){
//     const cupones = prompt("Escribi tu cupón").toLocaleLowerCase();
//     const precioFinalConDescuento = calcularDescuentos(total, cupones);
//     alert(`Tu precio final con descuento es de $${precioFinalConDescuento}`);
//     alert(`Gracias por tu compra.`);
// }else{
//   alert("Gracias por tu compra");
// }

// }


// // Función para elegir el tipo de vino y cantidad de botellas.
// function elegirVino(){
//   let deseaPedirDenuevo = true; // Valor verdadero para comenzar el ciclo while.
    
//     while(deseaPedirDenuevo){
//     const tipoDeVino = parseInt(prompt("Elija un número del 1 al 3 para seleccionar su vino: \n 1) Vino Tinto $5000\n 2) Vino Blanco $4000 \n 3) Vino Rosado $4500"));
//     const cantidadDeBotellas = parseInt(prompt("Por favor, ingresa la cantidad de botellas (en números):"));

//     if ( tipoDeVino >= 1 && tipoDeVino <= 3){
//       const elegirDeLaLista = vinos[tipoDeVino -1];   // Aquí elijo el elemento de la lista de arrays y le resto 1, ya que comienzan en 0.
      
//       pedidosSolicitados.push({ //Aquí estoy mandando los elementos de la lista de vinos finamente seleccionados, a un array donde guardo todo.
//         nombre: elegirDeLaLista.nombre,
//         cantidad: cantidadDeBotellas,
//         precio: elegirDeLaLista.precio*cantidadDeBotellas,
//       });
      
//       alert(`Has seleccionado ${cantidadDeBotellas} botellas de ${elegirDeLaLista.nombre} por un valor de $${elegirDeLaLista.precio * cantidadDeBotellas}`);  
//     } 

//     if (isNaN(tipoDeVino) || tipoDeVino < 1 || tipoDeVino > 3){
//       alert("Debes colocar un número valido");
//       continue;
//     }
  
//     deseaPedirDenuevo = confirm("Quieres hacer otro pedido?")  // Aquí si lo deseo transformo el ciclo en falso, para que termine.
//     }
// }


// // Función para sumar todos los pedidos
// function sumaDePedidos (ejemploPractico){
// let suma = 0;

// for(let i = 0; i < ejemploPractico.length; i++){ // Utilizo un bucle for para que valla sumando todo lo que el usuario le envia
//   suma += ejemploPractico[i].precio;
// }
// return suma;
// }


// // Función para aplicar descuentos
// function calcularDescuentos(ejemploUno, ejemploDos){  //Utilize la palabra "ejemplo@" para guiarme y trabajar el tema de argumentos y propiedades
//    if (ejemploDos === "mendoza2025"){
//     return  ejemploUno - ejemploUno * 0.1;
//    } else{
//     alert("El codigo no existe")
//    }
//    return ejemploUno;
// }


// // Iniciamos el programa llamando a la función principal
// iniciar();
 



window.onload = function() {
    cargarCarritoDeLocalStorage(); // Cargar el carrito desde Local Storage cuando la página se carga
}

let carrito = []; // Inicializamos el carrito como un array vacío

class Producto {
    constructor(nombre, tipoDeVino, precio, cantidad) {
        this.nombre = nombre;
        this.tipoDeVino = tipoDeVino;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const botonesAgregar = document.querySelectorAll('.btn-primary');

// Recorrer cada botón y asignarle el evento click
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", function(e) {
        e.preventDefault(); // Evitar que el enlace haga su acción por defecto

        // Encontrar la card de la que se hizo clic
        const card = boton.closest('.card'); 

        // Obtener los datos de la card
        const nombre = card.querySelector('.card-title').textContent; // Nombre del producto
        const tipoDeVino = card.querySelector('.card-text').textContent;
        const precioTexto = card.querySelector('.card-precio').textContent; 
        const precio = parseInt(precioTexto.split('$')[1].trim());
        const cantidad = parseInt(card.querySelector('input[name="cantidad"]').value); // Obtener la cantidad seleccionada

        // Crear un nuevo producto
        const producto = new Producto(nombre, tipoDeVino, precio, cantidad);

        // Agregar el producto al carrito
        agregarProducto(producto);
    });
});

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

function agregarProducto(producto) {
    carrito.push(producto); // Añadimos el producto al carrito
    mostrarCarrito(); // Mostramos el carrito actualizado en la página
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
}

function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminamos el producto
    mostrarCarrito(); // Mostramos el carrito actualizado
    guardarCarritoEnLocalStorage(); // Guardamos el carrito actualizado en Local Storage
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito como texto JSON
}

function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito"); // Obtenemos el carrito del Local Storage
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Convertimos el string de vuelta a un objeto
        mostrarCarrito(); // Mostramos el carrito recuperado
    }
}