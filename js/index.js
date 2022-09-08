class Producto {
  constructor(obj) {
    this.id = obj.id;
    this.marca = obj.marca;
    this.nombre = obj.nombre;
    this.img = obj.img;
    this.precio = obj.precio;
    this.stock = obj.stock;
    this.vendidos = obj.vendidos;
    this.categoria = obj.categoria;
  }

  vendido(cantidad) {
    if (cantidad <= this.stock) {
      this.stock = this.stock - cantidad;
      this.vendidos = this.vendidos + cantidad;

      alert(
        `Agregado al carrito!\nHas comprado ${cantidad} unidades de ${this.nombre}\nQuedan ${this.stock} unidades disponibles`
      );
    } else {
      alert("No hay suficiente stock para esta compra");
    }
  }

  imprimirProducto() {
    console.log(`Producto ${this.id}\nNombre: ${this.nombre}\nMarca: ${this.marca}\nCategoria: ${this.categoria}\nPrecio: ${this.precio}\nVendidos: ${this.vendidos}\nStock: ${this.stock}
    `)
  }

}

////////////////////////////////////////////////////////////////////
/* VARIABLES */
let productos = [];

let producto1 = new Producto({
  id: 1,
  marca: 'Inti Zen',
  nombre: "Ilumine",
  img: "https://url.com/imagen_producto.jpg",
  precio: 254.45,
  stock: 200,
  vendidos: 0,
  categoria: "Infusiones",
});
let producto2 = new Producto({
  id: 2,
  marca: 'Inti Zen',
  nombre: "Inca Rose",
  img: "https://url.com/imagen_producto.jpg",
  precio: 254.45,
  stock: 0,
  vendidos: 0,
  categoria: "Infusiones",
});
let producto3 = new Producto({
  id: 3,
  marca: 'Chocolate Colonial',
  nombre: "Chocolate para Taza",
  img: "https://url.com/imagen_producto.jpg",
  precio: 210.23,
  stock: 0,
  vendidos: 0,
  categoria: "Chocolates",
});
let producto4 = new Producto({
  id: 4,
  marca: 'Chocolate Colonial',
  nombre: "Chocolate 55% sin Azucar",
  img: "https://url.com/imagen_producto.jpg",
  precio: 225.78,
  stock: 240,
  vendidos: 0,
  categoria: "Chocolates",
});
let producto5 = new Producto({
  id: 5,
  marca: 'Cocoon',
  nombre: "Leche de Almendras s/Azucar",
  img: "https://url.com/imagen_producto.jpg",
  precio: 255.78,
  stock: 360,
  vendidos: 0,
  categoria: "Leches de Almendra",
});
let producto6 = new Producto({
  id: 6,
  marca: "Cocoon",
  nombre: "Leche de Almendras Original",
  img: "https://url.com/imagen_producto.jpg",
  precio: 255.78,
  stock: 120,
  vendidos: 0,
  categoria: "Leches de Almendra",
});
let producto7 = new Producto({
  id: 7,
  marca: "Cocoon",
  nombre: "Leche de Almendras Chocolatada",
  img: "https://url.com/imagen_producto.jpg",
  precio: 278.25,
  stock: 0,
  vendidos: 0,
  categoria: "Leches de Almendra",
});


productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);
productos.push(producto7);

////////////////////////////////////////////////////////////////////
/* FUNCIONES */
//Buscar productos desde un precio y que tenga stock disponible

function hayStock() {

  let filtroStock = productos.filter((item) => {
    return item.stock > 0;
  });

  //Ordeno de menor a mayor
  filtroStock.sort((a, b) => a.stock - b.stock);

  //Imprime productos que cumplen la condicion
  for (const item of filtroStock) {
    item.imprimirProducto();
  }

}

//Elegir un Producto
function seleccionarProducto() {
  let productoElegido = Number(
    prompt("Ingrese el numero del producto deseado (1 a 7)")
  );

  while (productoElegido < 1 || productoElegido > 7) {
    alert("Numero invalido. Debes ingresar numeros del 1 al 7 inclusives");

    productoElegido = Number(
      prompt("Ingrese un numero nuevamente")
    );
  }

  let match = productos.find(producto => {
    return producto.id === productoElegido;
  });

  if (match.stock <= 0) {
    alert(`No hay stock disponible`);
    return undefined;
  } else {
    return match;
  }

}

//Comprar Producto
function comprar() {
  let cantidad = Number(prompt("Ingrese la cantidad a comprar"));

  while (cantidad <= 0) {
    alert('Has ingresado un valor invalido. La cantidad debe ser mayor a 0.');

    cantidad = Number(prompt("Ingrese la cantidad a comprar"));
  }

  return cantidad;
}


////////////////////////////////////////////////////////////////////
/* DESARROLLO */
//Listado de Productos
for (const item of productos) {
  item.imprimirProducto();
}

//Eleccion de productos
let carrito = [];
let opcion = confirm("Desea elegir un producto?");

while (opcion) {
    const itemElegido = seleccionarProducto();

    if (itemElegido === undefined) {
      carrito;
    } else {
      const existe = carrito.some((producto) => producto.id === itemElegido.id);

      if(existe){
        alert('El producto ingresado ya existe en el carrito');
      }else{
        alert(`Has agregado al carrito ${itemElegido.nombre}`);
        carrito.push(itemElegido);
      }

    }

  opcion = confirm("Desea agregar otro producto?");

}

//Productos elegidos
console.log(carrito);
for (const producto of carrito) {
  producto.imprimirProducto();
}

//Muestra solo los productos que tienen stock
//hayStock()

