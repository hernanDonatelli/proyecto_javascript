const carritoIndex = (productoId) => {

    const renderProductosCarrito = () => {
        let producto = productos.find((producto) => producto.id === productoId);
        const existe = getCarrito.some((producto) => producto.id === productoId);

        if (existe) {
            Toastify({
                className: "warningToasty",
                text: "El producto ya existe en el carrito",
                node: "section",
                offset: {
                    x: 50,
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

            divSinProducto ? divSinProducto.style.display = "none" : '';

            calculoPrecioTotal(getCarrito);

        }
    };
    renderProductosCarrito();
};
