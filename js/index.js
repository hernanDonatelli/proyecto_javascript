//Navbar
const menuSide = document.getElementById("menu__side");
const btnOpen = document.getElementById("btn-open-menu");
const body = document.getElementById("body");

const open_close_menu = () => {
    menuSide.classList.toggle("menu__side__move");
    body.classList.toggle("body__move");
};
btnOpen.addEventListener("click", open_close_menu);

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
const btnEndFinal = document.getElementById("btn-end-final");
const modalFinal = document.getElementById("modal__final");

/* Funciones */

//Agrega o saca cantidad de items en el carrito y muestra subtotales
const agregarQuitarItem = (producto) => {
    let cantidad = document.getElementById(`cantidades-${producto.id}`);
    cantidad.innerText = producto.cantidad;
    let subtotal = (parseInt(cantidad.innerText) * producto.precio).toFixed(2);

    let printSubTotal = document.getElementById(`unitario-${producto.id}`);
    printSubTotal.innerText = `Subtotal: $${subtotal}`;
};

//Calcula el precio total y formas de pago
const calculoPrecioTotal = (arrayCarrito) => {
    let printTotal = arrayCarrito
        .reduce(
            (total, producto) => (total += producto.precio * producto.cantidad),
            0
        )
        .toFixed(2);
    total.innerText = `Subtotal: $${printTotal}`;

    let printImpuestos = (printTotal * 0.21).toFixed(2);
    impuestos.innerText = `IVA 21%: $${printImpuestos}`;

    let printTotalFinal = parseFloat(printTotal * 1.21).toFixed(2);
    totalFinal.innerText = `Total: $${printTotalFinal}`;

    let printEfectivo10 = (printTotalFinal * 0.9).toFixed(2);
    efectivo10.innerText = `Total: $${printEfectivo10}`;

    let printTarjeta3 = (printTotalFinal * 1.15).toFixed(2);
    tarjeta3.innerText = `Total: $${printTarjeta3}`;

    let printTarjeta6 = (printTotalFinal * 1.3).toFixed(2);
    tarjeta6.innerText = `Total: $${printTarjeta6}`;
};

//Agrega el producto seleccionado al carrito y lo pinta
const carritoIndex = (productoId) => {

    const renderProductosCarrito = async () => {
        const respuesta = await fetch("./js/json/data.json");
        const data = await respuesta.json();
        let producto = data.find((producto) => producto.id === productoId);
        const existe = getCarrito.some((producto) => producto.id === productoId);

        if (existe) {
            Toastify({
                className: "warningToasty",
                text: "El producto ya existe en el carrito",
                node: "section",
                offset: {
                    x: 0,
                    y: 10
                },
                duration: 2000,
                gravity: "top",
                position: "center",
            }).showToast();
        } else {
            getCarrito.push(producto);

            localStorage.setItem("cartStorage", JSON.stringify(getCarrito));

            totalCarrito.innerText = getCarrito.length;

            printCart(producto);

            Toastify({
                className: "successToasty",
                text: "Producto agregado!",
                offset: {
                    x: 0,
                    y: 10
                },
                duration: 2000,
                gravity: "top",
                position: "center",
            }).showToast();

            divSinProducto ? divSinProducto.style.display = "none" : '';

            calculoPrecioTotal(getCarrito);

        }
    };
    renderProductosCarrito();
};
//Funcionalidad del carrito al modificarse cantidades y totales
let printCart = (producto) => {
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
                        <p id="unitario-${producto.id}">Subtotal: $${producto.precio
        }</p>
                    </div>
                    <p class="cantidades mt-2">
                        <span>Cantidad: <span id="cantidades-${producto.id
        }">${(producto.cantidad = 1)}</span></span>
                        <button id="agregarCantidad-${producto.id
        }" class="btn-cantidades" type="button">
                        <iconify-icon icon="carbon:shopping-cart-plus"></iconify-icon>
                        </button>
                        <button id="quitarCantidad-${producto.id
        }" class="btn-cantidades" type="button">
                            <iconify-icon icon="carbon:shopping-cart-minus"></iconify-icon>
                        </button>
                    </p>
                    <button id="btn-eliminar-${producto.id
        }" class="btn-eliminar">
                        <iconify-icon icon="bi:trash"></iconify-icon>
                    </button>
                    <hr>`;

    contenedorCarrito.append(div);

    //Agregar o quitar cantidades
    let agregarCantidad = document.getElementById(
        `agregarCantidad-${producto.id}`
    );
    let quitarCantidad = document.getElementById(
        `quitarCantidad-${producto.id}`
    );

    agregarCantidad.addEventListener("click", () => {
        if (producto.stock > 1) {
            const span = document.getElementById(`stock-${producto.id}`);
            producto.cantidad++;
            producto.stock--;
            span.innerText = `Stock: ${producto.stock}un.`;
            agregarQuitarItem(producto);
            calculoPrecioTotal(getCarrito);
        } else {
            Toastify({
                className: "warningToasty",
                text: `No tenemos suficiente stock de ${producto.nombre}.`,
                offset: {
                    x: 0,
                    y: 10,
                },
                duration: 3500,
                gravity: "top",
                position: "center",
            }).showToast();
        }
    });

    quitarCantidad.addEventListener("click", () => {
        cantidad = document.getElementById(`cantidades-${producto.id}`);
        const span = document.getElementById(`stock-${producto.id}`);

        if (cantidad.innerText > 1) {
            producto.cantidad--;
            producto.stock++;
            span.innerText = `Stock: ${producto.stock}un.`;
            agregarQuitarItem(producto);
            calculoPrecioTotal(getCarrito);
        } else {
            Toastify({
                className: "warningToasty",
                text: "La cantidad mínima es 1 unidad.",
                offset: {
                    x: 0,
                    y: 10,
                },
                duration: 2000,
                gravity: "top",
                position: "center",
            }).showToast();
        }
    });

    //Eliminar item del carrito y del Storage
    let deleteItemStorage = (productoID) => {
        const btn_eliminar = document.getElementById(
            `btn-eliminar-${productoID}`
        );
        btn_eliminar.addEventListener("click", () => {
            Swal.fire({
                title: "Desea eliminar este producto del Carrito?",
                text: "No te preocupes, lo podés volver a agregar :)",
                icon: "question",
                background: "#eaf1f1",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminarlo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    let index = getCarrito.indexOf(producto);
                    getCarrito.splice(index, 1);

                    let elemento = JSON.parse(
                        localStorage.getItem("cartStorage")
                    );
                    elemento.splice(index, 1);
                    let elementoJSON = JSON.stringify(elemento);
                    localStorage.setItem("cartStorage", elementoJSON);

                    calculoPrecioTotal(getCarrito);

                    div.remove();

                    totalCarrito.innerText = getCarrito.length;

                    if (getCarrito.length === 0) {
                        divSinProducto.style.display = "block";
                        containerTotales.style.display = "none";
                        containerImpuestos.style.display = "none";
                        containerTotalFinal.style.display = "none";
                        divCuotas.style.display = "none";
                        btnEnd.style.display = "none";
                        btnVaciarCarrito.setAttribute("disabled", "");
                        btnVaciarCarrito.innerText = "Carrito Vacío";
                        btnVaciarCarrito.classList.add("disabled");
                    } else {
                        calculoPrecioTotal(getCarrito);
                    }

                    Swal.fire({
                        title: "Eliminado!",
                        text: "El producto ha sido eliminado del carrito",
                        icon: "success",
                        timer: 4000,
                        timerProgressBar: "true",
                    });
                }
            });
        });
    };
    deleteItemStorage(producto.id);

    //Vaciar Carrito
    let deleteCarrito = () => {
        if (getCarrito.length > 0) {
            btnVaciarCarrito.removeAttribute("disabled", "");
            btnVaciarCarrito.innerText = "Vaciar Carrito";
            btnVaciarCarrito.classList.remove("disabled");
        }
        btnVaciarCarrito.addEventListener("click", () => {
            Swal.fire({
                title: "Desea vaciar el Carrito?",
                text: "Esta acción eliminará todos los items del carrito.",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, vaciarlo!",
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear("cartStorage");
                    getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

                    (divSinProducto.style.display === 'none') ? (divSinProducto.style.display = "block") : "";
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

                    Swal.fire(
                        "Carrito sin productos!",
                        "El Carrito ahora está vacío.",
                        "success"
                    );

                    btnVaciarCarrito.setAttribute("disabled", "");
                    btnVaciarCarrito.innerText = "Carrito Vacío";
                    btnVaciarCarrito.classList.add("disabled");
                }
            });
        });
    };
    deleteCarrito();

};



///////////////////////////////////////////////////////////

/* Ejecucion */
const search = async () => {
    const respuesta = await fetch("./js/json/data.json");
    const data = await respuesta.json();

    const inputSearch = document.querySelector("#inputSearch");

    const inputFiltrado = () => {
        container.innerHTML = "";
        const ingresousuario = inputSearch.value.toLowerCase();

        data.forEach((producto) => {
            let { id, nombre, img, descripcion, marca, categoria, precio, stock } = producto;

            nombre = nombre.toLowerCase();
            categoria = categoria.toLowerCase();
            marca = marca.toLowerCase();

            let article = document.createElement("article");
            article.classList.add("shop__card", "animate__animated", "animate__fadeIn", "my-4");

            if (
                nombre.indexOf(ingresousuario) !== -1 ||
                categoria.indexOf(ingresousuario) !== -1 ||
                precio > Number(ingresousuario) ||
                marca.indexOf(ingresousuario) !== -1
            ) {
                article.innerHTML += `<div class="shop__card__product style">
                                <div class="img-container">
                                    <img src="${img}">
                                </div>
                                <span class="price">$${precio}</span>
                                <span class="brand brand-${categoria}">${marca}</span>

                                <span id="stock-${id}">${stock}</span>

                                <div class="like d-flex justify-content-center align-items-center">
                                    <iconify-icon icon="ant-design:heart-outlined"></iconify-icon>
                                </div>
                                <p>${nombre}</p>
                                <span class="description">${descripcion}</span>
                            </div>
                            <button id="btn-${id}" class="d-flex justify-content-around align-items-center mt-3">
                                <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                                <span>Agregar</span>
                            </button>`;
                container.appendChild(article);

                //Eventos
                const btn = document.getElementById(`btn-${id}`);
                const span = document.getElementById(`stock-${id}`);

                if (stock < 1) {
                    span.classList.add("sinStock");
                    span.innerText = `Sin Stock`;
                    btn.setAttribute("disabled", "");
                    btn.innerText = "Sin Stock";
                    btn.classList.add("btn-disabled");
                } else {
                    span.innerText = `Stock: ${stock}un.`;
                    span.classList.add("enStock");
                }

                btn.addEventListener("click", () => {
                    carritoIndex(id);
                    const span = document.getElementById(
                        `stock-${id}`
                    );

                    span.innerText = `Stock: ${stock}un.`;
                });
            }
        });

        if (container.innerHTML === "") {
            container.innerHTML += `<p class="description my-4">No hay coincidencias.</p>`;
        }
    };
    inputSearch.addEventListener("keyup", inputFiltrado);

    inputFiltrado();
};
search();

//LocalStorage
const contenedorCarrito = document.getElementById("carritoContainer");
getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

containerTotales.style.display = "none";
containerImpuestos.style.display = "none";
containerTotalFinal.style.display = "none";
divCuotas.style.display = "none";
btnEnd.style.display = "none";

getCarrito.forEach((item) => {
    printCart(item);
});

calculoPrecioTotal(getCarrito);

totalCarrito.innerText = getCarrito.length;
