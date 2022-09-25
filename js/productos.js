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
        this.cantidad = obj.cantidad;
        this.categoria = obj.categoria;
        this.subtotal = obj.subtotal;
    }

    subtotales(){
        this.precio = this.precio * this.cantidad;
        console.log(this.precio);
    }

    sinStock(){
        if(this.stock <= 0){
            return 'Sin stock';
        }else{
            return '';
        }
    }

    cantidad(){
        return this.cantidad;
    }

    vendido() {
        this.stock = this.stock - this.cantidad;
        this.vendidos = this.vendidos + this.cantidad;

        alert(
            `Agregado al carrito!\n${this.cantidad} unidad/es de ${this.nombre}\nQuedan ${this.stock} unidades disponibles`
        );

    }

}

////////////////////////////////////////////////////////////////////
/* ARRAY DE PRODUCTOS */
let productos = [];

let producto1 = new Producto({
    id: 1,
    marca: "Inti Zen",
    nombre: "Ilumine",
    img: "./img/ilumine.png",
    descripcion:
        "Breakfast Tea que combina un té negro de Ceylon cosechado en altura y aire puro, con notas bien definidas de un té negro de Assam que le dan cuerpo, sabor y aroma a la taza.",
    precio: 254.45,
    stock: 5,
    vendidos: 0,
    cantidad: 0,
    categoria: "Infusiones",
    subtotal: 0
});
let producto2 = new Producto({
    id: 2,
    marca: "Inti Zen",
    nombre: "Inti Grey",
    img: "./img/intiGrey.png",
    descripcion:
        "Clásico Earl Grey sutilmente perfumado con bergamota, prensada a frío, que aporta notas cítricas a la base de té negro de Oriente. Cada taza es un encuentro con la tradición.",
    precio: 254.45,
    stock: 10,
    vendidos: 0,
    cantidad: 0,
    categoria: "Infusiones",
    subtotal: 0
});
let producto3 = new Producto({
    id: 3,
    marca: "Chocolate Colonial",
    nombre: "Chocolate para Taza",
    img: "./img/colonial_taza.jpg",
    descripcion:
        "El clásico chocolate en tabletas de 100gr para disfrutar de un buen desayuno y/o merienda. Chocolate semiamargo aromatizado con vainillina, libre de gluten, SIN TACC.",
    precio: 210.23,
    stock: 0,
    vendidos: 0,
    cantidad: 0,
    categoria: "Chocolates",
    subtotal: 0
});
let producto4 = new Producto({
    id: 4,
    marca: "Chocolate Colonial",
    nombre: "Chocolate 55% sin Azucar",
    img: "./img/colonial_sin_azucar.png",
    descripcion:
        "Sin agregado de azúcar. No es un alimento libre de azúcares, contiene azúcares propios de los ingredientes. No es un alimento reducido en calorías.",
    precio: 225.78,
    stock: 240,
    vendidos: 0,
    cantidad: 0,
    categoria: "Chocolates",
    subtotal: 0
});
let producto5 = new Producto({
    id: 5,
    marca: "Cocoon",
    nombre: "Leche de Almendras s/Azucar",
    img: "./img/cocoon_sin_azucar.png",
    descripcion:
        "Bebida de almendras con verdadero sabor a almendras. Sin azúcar, sin saborizantes, sin aditivos artificiales. ¡Naturalmente rica!",
    precio: 255.78,
    stock: 360,
    vendidos: 0,
    cantidad: 0,
    categoria: "Leches",
    subtotal: 0
});
let producto6 = new Producto({
    id: 6,
    marca: "Cocoon",
    nombre: "Leche de Almendras Original",
    img: "./img/cocoon_original.png",
    descripcion:
        "100% natural, de extractos vegetales. Nuestra bebida original es la alternativa saludable y liviana para agregarle a tu café o disfrutarla sola, tomala bien fría!",
    precio: 255.78,
    stock: 120,
    vendidos: 0,
    cantidad: 0,
    categoria: "Leches",
    subtotal: 0
});
let producto7 = new Producto({
    id: 7,
    marca: "Cocoon",
    nombre: "Leche de Almendras Chocolatada",
    img: "./img/cocoon_chocolatada.png",
    descripcion:
        "Disfrutá del mejor sabor a chocolate intenso en nuestra chocolatada de almendras. Un sabor equilibrado y liviano para los amantes de lo dulce, y sin culpa!",
    precio: 278.25,
    stock: 0,
    vendidos: 0,
    cantidad: 0,
    categoria: "Leches",
    subtotal: 0
});

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);
productos.push(producto7);

