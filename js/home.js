class Producto {
    constructor(obj) {
        this.id = obj.id;
        this.marca = obj.marca;
        this.nombre = obj.nombre;
        this.img = obj.img;
        this.descripcion = obj.descripcion;
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
    `);
    }
}

////////////////////////////////////////////////////////////////////
/* VARIABLES */
let productos = [];

let producto1 = new Producto({
    id: 1,
    marca: "Inti Zen",
    nombre: "Ilumine",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion:
        "Breakfast Tea que combina un té negro de Ceylon cosechado en altura bajo el sol tibio y aire puro, con notas bien definidas de un té negro de Assam que le dan cuerpo, sabor y aroma a la taza.",
    precio: 254.45,
    stock: 200,
    vendidos: 0,
    categoria: "Infusiones",
});
let producto2 = new Producto({
    id: 2,
    marca: "Inti Zen",
    nombre: "Inti Grey",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion:'Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.',
    precio: 254.45,
    stock: 0,
    vendidos: 0,
    categoria: "Infusiones",
});
let producto3 = new Producto({
    id: 3,
    marca: "Chocolate Colonial",
    nombre: "Chocolate para Taza",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion: "Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.",
    precio: 210.23,
    stock: 0,
    vendidos: 0,
    categoria: "Chocolates",
});
let producto4 = new Producto({
    id: 4,
    marca: "Chocolate Colonial",
    nombre: "Chocolate 55% sin Azucar",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion: "Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.",
    precio: 225.78,
    stock: 240,
    vendidos: 0,
    categoria: "Chocolates",
});
let producto5 = new Producto({
    id: 5,
    marca: "Cocoon",
    nombre: "Leche de Almendras s/Azucar",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion: "Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.",
    precio: 255.78,
    stock: 360,
    vendidos: 0,
    categoria: "Leches de Almendra",
});
let producto6 = new Producto({
    id: 6,
    marca: "Cocoon",
    nombre: "Leche de Almendras Original",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion: "Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.",
    precio: 255.78,
    stock: 120,
    vendidos: 0,
    categoria: "Leches de Almendra",
});
let producto7 = new Producto({
    id: 7,
    marca: "Cocoon",
    nombre: "Leche de Almendras Chocolatada",
    img: "https://hernandonatelli.github.io/proyecto_javascript/img/ilumine.png",
    descripcion: "Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.",
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
console.log(productos);

//Pintar productos en el website
for (const producto of productos) {
  let container = document.querySelector(".shop.container");
  let articulo = document.createElement("article");
  articulo.className = "shop__card";

  if (producto.marca == "Chocolate Colonial") {
      articulo.className = "shop__card colonial";
  }else if (producto.marca == "Cocoon"){
      articulo.className = "shop__card cocoon";
  }else{
    articulo.className = "shop__card inti";
  }


articulo.innerHTML = `<div class="brand">
                        <h2>${producto.marca}</h2>
                    </div>

                    <div class="shop__card__header">
                        <img src="${producto.img}" alt="${producto.marca} - ${producto.nombre}">
                    </div>

                    <div class="shop__card__content">
                        <div class="content__price">
                            <span class="title">${producto.nombre}</span>
                            <span class="price">$${producto.precio}</span>
                        </div>
                        <div class="description mt-2">
                            <p>${producto.descripcion}</p>
                        </div>
                    </div>

                    <div class="shop__card__actions">
                        <button class="btn_shop_card">
                            <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                            <span>Agregar al carrito</span>
                        </button>
                    </div>`;

container.append(articulo);
}