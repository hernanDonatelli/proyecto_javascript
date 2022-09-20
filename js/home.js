//Pintar en Home los productos
const container = document.getElementById("shop");
let totalCarrito = document.getElementById("countCart");
let carrito = [];

productos.forEach(producto => {
    let articulo = document.createElement("article");
    articulo.classList.add("shop__card");

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
                            <p>Nombre: ${item.nombre}</p>
                            <p>Precio: ${item.precio}</p>
                            <p>
                                Cantidad: <input id="cantidad-${item.id}" min="1" type="number" value="${item.cantidad}">
                            </p>
                        </div>
                        <button id="btn-eliminar-${item.id}" class="btn-eliminar">
                            <iconify-icon icon="bi:trash"></iconify-icon>
                        </button>
                        <hr>`;

        contenedorCarrito.appendChild(div);

    });
}

totalCarrito.innerText = getCarrito.length;