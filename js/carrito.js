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

            printCart(producto);

            let noProduct = document.getElementById("noProduct");
            noProduct ? noProduct.classList.add("hide") : '';

            //Total de la compra
            let total = document.getElementById("total");
            total.innerText = 'Subtotal: $' + getCarrito.reduce((total, producto) => (total += producto.precio), 0);

        }
    };
    renderProductosCarrito();
};
