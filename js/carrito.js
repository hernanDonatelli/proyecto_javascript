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

            printCart(producto);

            divSinProducto ? divSinProducto.style.display = "none" : '';

            calculoPrecioTotal(getCarrito);

        }
    };
    renderProductosCarrito();
};
