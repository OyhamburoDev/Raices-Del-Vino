


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

elegirVino() // Llamamos a la función para que el usuario elija los vinos

let total = sumaDePedidos (pedidosSolicitados); // Luego de elegir los vinos, llamamos a la función que suma los precios, la guardamos en una variable y le pasamos un argumento real.
alert(`El total de tu pedido es de $${total}`);

const quieroDescuento = confirm("¿Tienes un cupón de descuento?");
if(quieroDescuento){
    let cupones = prompt("Escribi tu cupón");
    let precioFinalConDescuento = calcularDescuentos(total, cupones);
    alert(`Tu precio final con descuento es de $${precioFinalConDescuento}`);
    alert(`Gracias por tu compra.`);
}else{
    alert("Gracias por tu compra");
}
}


// Función para elegir el tipo de vino y cantidad de botellas.
function elegirVino(){
    let deseaPedirDenuevo = true; // Valor verdadero para comenzar el ciclo while.
    
    while(deseaPedirDenuevo){
    let tipoDeVino = parseInt(prompt("Elige un tipo de vino: \n 1) Vino Tinto $5000\n 2) Vino Blanco $4000 \n 3) Vino Rosado $4500"));
    let cantidadDeBotellas = parseInt(prompt("Coloque la cantidad de botellas:"));

    if (tipoDeVino >= 1 && tipoDeVino <= 3){
      let elegirDeLaLista = vinos[tipoDeVino -1];   // Aquí elijo el elemento de la lista de arrays y le resto 1, ya que comienzan en 0.
      
      pedidosSolicitados.push({ //Aquí estoy mandando los elementos de la lista de vinos finamente seleccionados, a un array donde guardo todo.
        nombre: elegirDeLaLista.nombre,
        cantidad: cantidadDeBotellas,
        precio: elegirDeLaLista.precio*cantidadDeBotellas,
      });
      
      alert(`Has seleccionado ${cantidadDeBotellas} botellas de ${elegirDeLaLista.nombre} por un valor de $${elegirDeLaLista.precio * cantidadDeBotellas}`);  
    } else{
      alert("Coloque un número válido, del 1 al 3");
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
function calcularDescuentos(ejemploUno, ejemploDos){ 
    let descuento = 0;
   if (ejemploDos === "mendoza2025"){
    descuento = ejemploUno - ejemploUno * 0.1;
   } else{
    alert("El codigo no existe")
   }
   return descuento;
}


// Iniciamos el programa llamando a la función principal
iniciar();
 