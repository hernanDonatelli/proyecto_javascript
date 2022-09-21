//Pintar en Home los productos
const container = document.getElementById("shop");
let totalCarrito = document.getElementById("countCart");
let carrito = [];

productos.forEach(producto => {
    let articulo = document.createElement("article");
    articulo.classList.add("shop__card");
    articulo.classList.add("my-3");

    articulo.innerHTML += `<div class="shop__card__product style">
                                <div class="img-container">
                                    <img src="${producto.img}">
                                </div>
                                <span class="price">$${producto.precio}</span>
                                <span class="brand brand-${producto.categoria}">${producto.marca}</span>

                                <span id="stock-${producto.id}">${producto.sinStock()}</span>

                                <div class="like d-flex justify-content-center align-items-center">
                                    <iconify-icon icon="ant-design:heart-outlined"></iconify-icon>
                                </div>
                                <p>${producto.nombre}</p>
                                <span class="description">${producto.descripcion}</span>
                            </div>
                            <button id="btn-${producto.id}" class="d-flex justify-content-around align-items-center mt-3">
                                <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                                <span>Agregar</span>
                            </button>
                            `;

    container.appendChild(articulo);

    //Eventos
    const btn = document.getElementById(`btn-${producto.id}`);
    const span = document.getElementById(`stock-${producto.id}`);

    if (producto.sinStock()) {
        span.classList.add("sinStock");
        btn.setAttribute("disabled", "");
    }

    btn.addEventListener("click", () => {
        carritoIndex(producto.id);

    });
});

//LocalStorage
const contenedorCarrito = document.getElementById("carritoContainer");
let getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

if(getCarrito.length === 0){
    let div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `<p>No hay productos en el carrito</p>`;
    contenedorCarrito.append(div);
}else{
    getCarrito.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        item.cantidad = 1;
        div.innerHTML = `<div class="inCart">
                            <p>Producto: ${item.nombre}</p>
                            <p>Precio: ${item.precio}</p>
                        </div>
                        <p class="cantidades mt-2">
                            <span>Cantidad: <span>${item.cantidad}</span></span>
                            <button id="masCantidad-${item.id}" class="btn-cantidades" type="button">
                            <iconify-icon icon="carbon:shopping-cart-plus"></iconify-icon>
                            </button>
                            <button id="menosCantidad-${item.id}" class="btn-cantidades" type="button">
                                <iconify-icon icon="carbon:shopping-cart-minus"></iconify-icon>
                            </button>
                        </p>
                        <button id="btn-eliminar-${item.id}" class="btn-eliminar">
                            <iconify-icon icon="bi:trash"></iconify-icon>
                        </button>
                        <hr>`;

        contenedorCarrito.appendChild(div);

    });

    //Total de la compra
    let total = document.getElementById("total");
    total.innerText = 'Subtotal: $' + getCarrito.reduce((total, producto) => (total += producto.precio), 0);
}

totalCarrito.innerText = getCarrito.length;