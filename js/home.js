//Pintar en Home los productos
const container = document.getElementById("shop");
let getCarrito = [];
const totalCarrito = document.getElementById("countCart");
const total = document.getElementById("total");
const impuestos = document.getElementById("impuestos");
const totalFinal = document.getElementById("totalFinal");
const containerTotales = document.getElementById("total");
const containerImpuestos = document.getElementById("impuestos");
const containerTotalFinal = document.getElementById("totalFinal");
const divSinProducto = document.getElementById("noProducto");
const efectivo10 = document.getElementById("efectivo10");
const tarjeta3 = document.getElementById("tarjeta3");
const tarjeta6 = document.getElementById("tarjeta6");
const divCuotas = document.getElementById("pagoEnCuotas");
const btnEnd = document.getElementById("btn-end");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");


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

    let printTotalFinal = parseFloat(printTotal * 1.21).toFixed(2);
    totalFinal.innerText = `Total: $${printTotalFinal}`;

    let printEfectivo10 = (printTotalFinal * 0.9).toFixed(2);
    efectivo10.innerText = `Total: $${printEfectivo10}`;

    let printTarjeta3 = (printTotalFinal * 1.15).toFixed(2);
    tarjeta3.innerText = `Total: $${printTarjeta3}`;

    let printTarjeta6 = (printTotalFinal * 1.30).toFixed(2);
    tarjeta6.innerText = `Total: $${printTarjeta6}`;
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
    // carritoContainer.innerHTML = ' ';
    containerTotales.style.display = "block";
    containerImpuestos.style.display = "block";
    containerTotalFinal.style.display = "block";
    divCuotas.style.display = "flex";
    btnEnd.style.display = "block";

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

    contenedorCarrito.append(div);

    //Agregar o quitar cantidades
    let agregarCantidad = document.getElementById(`agregarCantidad-${producto.id}`);
    let quitarCantidad = document.getElementById(`quitarCantidad-${producto.id}`);

    agregarCantidad.addEventListener("click", () => {
        if (producto.stock > producto.cantidad) {
            producto.cantidad++;
            agregarQuitarItem(producto);
            calculoPrecioTotal(getCarrito);
        } else {
            Toastify({
                className: "warningToasty",
                text: `Por el momento solo contamos con ${producto.stock} unidades de ${producto.nombre}.`,
                offset: {
                    x: 0,
                    y: 10
                },
                duration: 3500,
                gravity: "top",
                position: "center",
            }).showToast();
        }

    });

    quitarCantidad.addEventListener("click", () => {
        cantidad = document.getElementById(`cantidades-${producto.id}`);

        if (cantidad.innerText <= 1) {
            Toastify({
                className: "warningToasty",
                text: "El pedido minimo es 1 unidad",
                offset: {
                    x: 0,
                    y: 10
                },
                duration: 2000,
                gravity: "top",
                position: "center",
            }).showToast();
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
            Swal.fire({
                title: 'Desea eliminar este producto del Carrito?',
                text: "Una vez eliminado se recalculan los precios",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {

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
                        containerTotalFinal.style.display = "none";
                        divCuotas.style.display = "none";
                        btnEnd.style.display = "none";
                    } else {
                        calculoPrecioTotal(getCarrito);
                    }

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })

        });
    }
    deleteItemStorage(producto.id);
}

//Vaciar Carrito
let deleteCarrito = () => {
    btnVaciarCarrito.addEventListener("click", () => {
        localStorage.clear("cartStorage");
        getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

        divSinProducto ? divSinProducto.style.display = "block" : '';
        containerTotales.style.display = "none";
        containerImpuestos.style.display = "none";
        containerTotalFinal.style.display = "none";
        divCuotas.style.display = "none";
        btnEnd.style.display = "none";
        let carritoContainer = document.getElementById("carritoContainer");

        while (carritoContainer.firstChild) {
            carritoContainer.removeChild(carritoContainer.firstChild);
        }

        totalCarrito.innerText = getCarrito.length;
    });
}
deleteCarrito();

//LocalStorage
const contenedorCarrito = document.getElementById("carritoContainer");
getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

getCarrito.length === 0 && divSinProducto ? divSinProducto.style.display = "block" : '';
containerTotales.style.display = "none";
containerImpuestos.style.display = "none";
containerTotalFinal.style.display = "none";
divCuotas.style.display = "none";
btnEnd.style.display = "none";

getCarrito.forEach(item => {
    printCart(item);
});

calculoPrecioTotal(getCarrito);

totalCarrito.innerText = getCarrito.length;