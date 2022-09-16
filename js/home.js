//Pintar en Home los productos
const container = document.getElementById("shop");

productos.forEach(producto => {
    let articulo = document.createElement("article");
    articulo.classList.add("shop__card");

    articulo.innerHTML += `<div class="shop__card__product style">
                                <div class="img-container">
                                    <img src="${producto.img}">
                                    <div class="overlay_product"></div>
                                </div>
                                <span class="price">$${producto.precio}</span>
                                <span class="brand brand-${producto.categoria}">${producto.marca}</span>

                                <span id="stock-${producto.id}">${producto.sinStock()}</span>

                                <div class="like d-flex justify-content-center align-items-center">
                                    <iconify-icon icon="ant-design:heart-outlined"></iconify-icon>
                                </div>
                                <p>${producto.nombre}</p>
                                <span class="description">${producto.descripcion}</span>
                                <button id="btn-${producto.id}" class="d-flex justify-content-around align-items-center mt-3">
                                    <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                                    <span>Agregar</span>
                                </button>
                            </div>`;

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

        //Pintar cantidades en carrito
        const totalCarrito = document.getElementById("countCart");
        totalCarrito.innerText = carrito.length;
    });
});