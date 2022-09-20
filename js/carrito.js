const carritoIndex = (productoId) => {

    const renderProductosCarrito = () => {
        let producto = productos.find((producto) => producto.id === productoId);
        const existe = getCarrito.some((producto) => producto.id === productoId);

        if (existe) {
            alert("El producto ingresado ya existe en el carrito");
        } else {
            getCarrito.push(producto);

            localStorage.setItem("cartStorage", JSON.stringify(getCarrito));

            totalCarrito.innerText = getCarrito.length;

            producto.cantidad = 1;
            producto.vendido(producto.cantidad);

            let div = document.createElement("div");
            div.classList.add("productoEnCarrito");

            div.innerHTML = `<div class="inCart">
                                    <p>Nombre: ${producto.nombre}</p>
                                    <p>Precio: ${producto.precio}</p>
                                    <p>
                                        Cantidad: <input id="cantidad-${producto.id}" min="1" type="number" value="${producto.cantidad}">
                                    </p>
                                </div>
                                <button id="btn-eliminar-${producto.id}" class="btn-eliminar">
                                    <iconify-icon icon="bi:trash"></iconify-icon>
                                </button>
                                <hr>`;

            contenedorCarrito.appendChild(div);

        }

        /*
        //Eliminar producto del carrito
        const btn_eliminar = document.getElementById(`btn-eliminar-${producto.id}`);
        btn_eliminar.addEventListener("click", () => {
            carrito.splice(carrito.indexOf(producto), 1);
            total.innerText = 'Total: $' + carrito.reduce((total, producto) => (total += producto.precio), 0);
            div.remove();
            totalCarrito.innerText = carrito.length;
        }); */

        //Agregar cantidades
        /* const agregar = document.getElementById(`cantidad-${producto.id}`);
        const valor = parseInt(document.getElementById(`cantidad-${producto.id}`).value);

        agregar.addEventListener("click", () => {
            producto.cantidad = producto.cantidad + valor;
            console.log(producto.cantidad);
        }); */


    };
    renderProductosCarrito();

    //Total de la compra
    let total = document.getElementById("total");
    total.innerText = 'Subtotal: $' + getCarrito.reduce((total, producto) => (total += producto.precio), 0);

};
