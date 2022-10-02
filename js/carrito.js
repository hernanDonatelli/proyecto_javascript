const carritoIndex = (productoId) => {

    const renderProductosCarrito = async() => {
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
