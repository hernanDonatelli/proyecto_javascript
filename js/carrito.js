const carrito = [];

const carritoIndex = (productoId) => {
  const contenedorCarrito = document.getElementById("carritoContainer");

  const renderProductosCarrito = () => {
    let producto = productos.find(producto => producto.id === productoId);

    //Verifico si hay stock
    if (producto.stock <= 0) {
        alert(`No hay stock disponible`);
    } else {
        const existe = carrito.some(producto => producto.id === productoId);
        //console.log(existe);

        if (existe) {
            alert("El producto ingresado ya existe en el carrito");
        } else {
            carrito.push(producto);
            //console.log(carrito);

            producto.cantidad = 1;
            producto.vendido(producto.cantidad);

            let div = document.createElement("div");
            div.classList.add("productoEnCarrito");

            div.innerHTML = `<div class="inCart">
                                <p>Nombre: ${producto.nombre}</p>
                                <p>Precio: ${producto.precio}</p>
                                <p id="cantidad-${producto.id}">Cantidad: ${producto.cantidad}</p>
                            </div>
                            <button id="eliminar${producto.id}" class="btn-eliminar">
                              <iconify-icon icon="bi:trash"></iconify-icon>
                            </button>
                            <hr>`;

            contenedorCarrito.appendChild(div);
        }

    }

  }

  renderProductosCarrito();
}

