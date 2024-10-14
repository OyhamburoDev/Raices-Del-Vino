

// // ARRAYS DE PRODUCTOS.
// const vinos = [
//     { nombre: "Vino Tinto", precio: 5000},
//     { nombre: "Vino Blanco", precio: 4000},
//     { nombre: "Vino Rosado", precio: 4500}
// ];

// let pedidos = [];

// // Función para elegir el tipo de vino y cantidad de botellas.
// function seleccionarVinos (){
//     let seguirPidiendo = true;
//     pedidos = [];

//     while(seguirPidiendo){
//         let seleccion = parseInt(prompt("Elige que vino quieres:\n 1) Vino Tinto $5000.\n 2) Vino Blanco $4000.\n 3) Vino Rosado $4500."));
//         let cantidad = parseInt(prompt("Ahora elige la cantidad de botellas"));
    
//         if(seleccion >= 1 && seleccion <= 3){
//           // Agregar el vino seleccionado al array de pedidos
//           pedidos.push({
//             nombre: vinos[seleccion - 1].nombre,
//             precio: vinos[seleccion - 1].precio * cantidad,
//             cantidades: cantidad,
//         });
//           alert(`Has seleccionado ${cantidad} botellas de ${vinos[seleccion - 1].nombre}`);
//         } else{
//             alert("Selección no válida. Por favor elige un número entre 1 y 3.");
//         }
//         seguirPidiendo = confirm("¿Deseas hacer otro pedido?");
// }
// }


// function sumaDePrecios(){
//     let suma = 0;

//     for (let i = 0; i < pedidos.length; i++) {
//         suma += pedidos[i].precio; // Sumar el precio del pedido actual
//     }
//     calcularDescuentos(suma, descuento);
// }



// function calcularDescuentos(suma, descuento){
//  descuento = 0;
//  let codigo = prompt("Si sabes el código de descuento escribelo aquí");

// if (codigo === "mendoza2025"){
//     descuento =  suma * 10;
// }
// return descuento;
// }


// seleccionarVinos();
// console.log (sumaDePrecios());



// ARRAYS DE PRODUCTOS.
const vinos = [
    { nombre: "Vino Tinto", precio: 5000 },
    { nombre: "Vino Blanco", precio: 4000 },
    { nombre: "Vino Rosado", precio: 4500 },
  ];
  
  // Funcion que llama a todas las demas funciones
  function iniciar() {
    let pedidos = seleccionarVinos();
    console.log("linea 10 pedidos--->", pedidos);
  
    let precioTotal = sumaDePrecios(pedidos);
    console.log("linea 13 suma de precioTotal--->", precioTotal);
  
    alert("Tu precio final es: " + precioTotal + "$");
    const quieroDescuento = confirm("Tenes un cupon de descuento?");
    console.log(quieroDescuento);
  
    if (quieroDescuento) {
      let cupones = prompt("Escribi tu cupon");
      let precioTotalConDescuento = calcularDescuentos(precioTotal, cupones);
      alert(`tu precio con el descuento es de ${precioTotalConDescuento} $`);
    } else {
      alert("Gracias por tu compra");
    }
  }
  
  // Función para elegir el tipo de vino y cantidad de botellas.
  function seleccionarVinos() {
    let pedidos = [];
    let seguirPidiendo = true;
    pedidos = [];
  
    while (seguirPidiendo) {
      let seleccion = parseInt(
        prompt(
          "Elige que vino quieres:\n 1) Vino Tinto $5000.\n 2) Vino Blanco $4000.\n 3) Vino Rosado $4500."
        )
      );
      let cantidad = parseInt(prompt("Ahora elige la cantidad de botellas"));
  
      if (seleccion >= 1 && seleccion <= 3) {
        // Agregar el vino seleccionado al array de pedidos
        pedidos.push({
          nombre: vinos[seleccion - 1].nombre,
          precio: vinos[seleccion - 1].precio * cantidad,
          cantidades: cantidad,
        });
        alert(
          `Has seleccionado ${cantidad} botellas de ${
            vinos[seleccion - 1].nombre
          }`
        );
      } else {
        alert("Selección no válida. Por favor elige un número entre 1 y 3.");
      }
      seguirPidiendo = confirm("¿Deseas hacer otro pedido?");
    }
    return pedidos;
  }
  
  // Funcion para sumar los pedidos
  function sumaDePrecios(pedidos) {
    let suma = 0;
  
    for (let i = 0; i < pedidos.length; i++) {
      suma += pedidos[i].precio; // Sumar el precio del pedido actual
    }
    return suma;
  }
  
  // Funcion para aplicar descuentos
  function calcularDescuentos(suma, codigo) {
    let descuento = 0;
  
    if (codigo === "mendoza2025") {
      // Aplica el 10% si se escribe la palabra "mendoza2025"
      descuento = suma - suma * 0.1;
    } else {
      alert("codigo no existe!");
    }
    return descuento;
  }
  
  // Llama a la funcion
  iniciar();

