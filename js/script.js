


// Arrays de los productos 
const vinos = [
    { nombre: "Vino Tinto", precio: 5000},
    { nombre: "Vino Blanco", precio: 4000},
    { nombre: "Vino Rosado", precio: 4500},
];


// En este array guardamos el pedido del cliente
let pedidosSolicitados =[];


// Funcion que llama a todas las demas funciones
function iniciar (){

const quieroComprar = confirm("¿Quieres comprar un producto?");
if(quieroComprar){
  elegirVino() // Llamamos a la función para que el usuario elija los vinos
}else{
  return;
}

const total = sumaDePedidos (pedidosSolicitados); // Luego de elegir los vinos, llamamos a la función que suma los precios, la guardamos en una variable y le pasamos un argumento real.
alert(`El total de tu pedido es de $${total}`);
alert("Recuerda que el cupón de descuento se encuentra en un alert de advertencia en la página.");
const quieroDescuento = confirm("¿Tienes un cupón de descuento?");
if(quieroDescuento){
    const cupones = prompt("Escribi tu cupón").toLocaleLowerCase();
    const precioFinalConDescuento = calcularDescuentos(total, cupones);
    alert(`Tu precio final es de $${precioFinalConDescuento}`);
    alert(`Gracias por tu compra.`);
}


}


// Función para elegir el tipo de vino y cantidad de botellas.
function elegirVino(){
  let deseaPedirDenuevo = true; // Valor verdadero para comenzar el ciclo while.
    
    while(deseaPedirDenuevo){
    const tipoDeVino = parseInt(prompt("Elija un número del 1 al 3 para seleccionar su vino: \n 1) Vino Tinto $5000\n 2) Vino Blanco $4000 \n 3) Vino Rosado $4500"));
    const cantidadDeBotellas = parseInt(prompt("Coloque la cantidad de botellas:"));

    if ( tipoDeVino >= 1 && tipoDeVino <= 3){
      const elegirDeLaLista = vinos[tipoDeVino -1];   // Aquí elijo el elemento de la lista de arrays y le resto 1, ya que comienzan en 0.
      
      pedidosSolicitados.push({ //Aquí estoy mandando los elementos de la lista de vinos finamente seleccionados, a un array donde guardo todo.
        nombre: elegirDeLaLista.nombre,
        cantidad: cantidadDeBotellas,
        precio: elegirDeLaLista.precio*cantidadDeBotellas,
      });
      
      alert(`Has seleccionado ${cantidadDeBotellas} botellas de ${elegirDeLaLista.nombre} por un valor de $${elegirDeLaLista.precio * cantidadDeBotellas}`);  
    } 

    if (isNaN(tipoDeVino) || tipoDeVino < 1 || tipoDeVino > 3){
      tipoDeVino = alert("Debes colocar un número valido");
      continue;
    }
  
    deseaPedirDenuevo = confirm("Quieres hacer otro pedido?")  // Aquí si lo deseo transformo el ciclo en falso, para que termine.
    }
}


// Función para sumar todos los pedidos
function sumaDePedidos (ejemploPractico){
let suma = 0;

for(let i = 0; i < ejemploPractico.length; i++){ // Utilizo un bucle for para que valla sumando todo lo que el usuario le envia
  suma += ejemploPractico[i].precio;
}
return suma;
}


// Función para aplicar descuentos
function calcularDescuentos(ejemploUno, ejemploDos){  //Utilize la palabra "ejemplo@" para guiarme y trabajar el tema de argumentos y propiedades
   if (ejemploDos === "mendoza2025"){
    return  ejemploUno - ejemploUno * 0.1;
   } else{
    alert("El codigo no existe")
   }
   return ejemploUno;
}


// Iniciamos el programa llamando a la función principal
iniciar();
 