const carrito = [];

const carritoIndex = (productoId) => {
  const contenedorCarrito = document.getElementById("carritoContainer");

  const renderProductosCarrito = () => {
    let producto = productos.find(producto => producto.id === productoId);
    carrito.push(producto);

    producto.cantidad = 1;

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

  renderProductosCarrito();
}