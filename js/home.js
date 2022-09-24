//Pintar en Home los productos
const container = document.getElementById("shop");
let getCarrito = [];
let totalCarrito = document.getElementById("countCart");
let total = document.getElementById("total");
let impuestos = document.getElementById("impuestos");
let containerTotales = document.getElementById("total");
let containerImpuestos = document.getElementById("impuestos");
let div = document.createElement("div");
let divSinProducto = document.getElementById("noProducto");

const agregarQuitarItem = (producto) => {
    let cantidad = document.getElementById(`cantidades-${producto.id}`);
    cantidad.innerText = producto.cantidad;
    let subtotal = (parseInt(cantidad.innerText) * producto.precio).toFixed(2);

    let printSubTotal = document.getElementById(`unitario-${producto.id}`);
    printSubTotal.innerText = `Subtotal: $${subtotal}`;
}

const calculoPrecioTotal = (arrayCarrito) => {
    let printTotal = (arrayCarrito.reduce((total, producto) => total += producto.precio * producto.cantidad, 0)).toFixed(2);
    total.innerText = `Subtotal: $${printTotal}`;

    let printImpuestos = (printTotal * 0.21).toFixed(2);
    impuestos.innerText = `IVA 21%: $${printImpuestos}`;
}

productos.forEach(producto => {
    let articulo = document.createElement("article");
    articulo.classList.add("shop__card");
    articulo.classList.add("my-4");

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

//Pintar carrito
let printCart = (producto) => {
    divSinProducto ? divSinProducto.style.display = "none" : '';
    containerTotales.style.display = "block";
    containerImpuestos.style.display = "block";

    let div = document.createElement("div");
    div.classList.add("productoEnCarrito");

    div.innerHTML = `<div class="inCart">
                        <p>Producto: ${producto.nombre}</p>
                        <p>Precio: $${producto.precio}</p>
                        <p id="unitario-${producto.id}">Subtotal: $${producto.precio}</p>
                    </div>
                    <p class="cantidades mt-2">
                        <span>Cantidad: <span id="cantidades-${producto.id}">${producto.cantidad = 1}</span></span>
                        <button id="agregarCantidad-${producto.id}" class="btn-cantidades" type="button">
                        <iconify-icon icon="carbon:shopping-cart-plus"></iconify-icon>
                        </button>
                        <button id="quitarCantidad-${producto.id}" class="btn-cantidades" type="button">
                            <iconify-icon icon="carbon:shopping-cart-minus"></iconify-icon>
                        </button>
                    </p>
                    <button id="btn-eliminar-${producto.id}" class="btn-eliminar">
                        <iconify-icon icon="bi:trash"></iconify-icon>
                    </button>
                    <hr>`;

    contenedorCarrito.appendChild(div);

    //Agregar o quitar cantidades
    let agregarCantidad = document.getElementById(`agregarCantidad-${producto.id}`);
    let quitarCantidad = document.getElementById(`quitarCantidad-${producto.id}`);

    agregarCantidad.addEventListener("click", () => {
        producto.cantidad++;
        agregarQuitarItem(producto);
        calculoPrecioTotal(getCarrito);
    });

    quitarCantidad.addEventListener("click", () => {
        cantidad = document.getElementById(`cantidades-${producto.id}`);

        if (cantidad.innerText <= 1) {
            alert('El pedido minimo es 1 unidad.');
        } else {
            producto.cantidad--;
            agregarQuitarItem(producto);
            calculoPrecioTotal(getCarrito);
        }
    });

    //Eliminar producto del carrito y del Storage
    let deleteItemStorage = (productoID) => {

        const btn_eliminar = document.getElementById(`btn-eliminar-${productoID}`);
        btn_eliminar.addEventListener("click", () => {
            let index = getCarrito.indexOf(producto);
            getCarrito.splice(index, 1);

            let elemento = JSON.parse(localStorage.getItem("cartStorage"));
            elemento.splice(index, 1);
            let elementoJSON = JSON.stringify(elemento);
            localStorage.setItem("cartStorage", elementoJSON)

            calculoPrecioTotal(getCarrito);

            div.remove();

            totalCarrito.innerText = getCarrito.length;

            if (getCarrito.length === 0) {
                divSinProducto ? divSinProducto.style.display = "block" : '';
                containerTotales.style.display = "none";
                containerImpuestos.style.display = "none";
            }else{
                calculoPrecioTotal(getCarrito);
            }

        });

    }

    deleteItemStorage(producto.id);

}

//LocalStorage
const contenedorCarrito = document.getElementById("carritoContainer");
getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

if (getCarrito.length === 0) {
    divSinProducto ? divSinProducto.style.display = "block" : '';
} else {
    getCarrito.forEach(item => {
        // item.cantidad = 1
        printCart(item);
    });

    calculoPrecioTotal(getCarrito);

}

totalCarrito.innerText = getCarrito.length;



