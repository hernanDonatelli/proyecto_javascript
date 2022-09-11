//Pintar en Home los productos

let container = document.getElementById("shop");

for (const producto of productos) {
    let articulo = document.createElement("article");
    articulo.classList.add("shop__card");

    articulo.innerHTML = `<div class="shop__card__product style">
                            <div class="img-container">
                                <img src="http://placekitten.com/g/640/380">
                            </div>
                            <span class="price">$${producto.precio}</span>
                            <span class="brand brand-${producto.categoria}">${producto.marca}</span>
                            <span class="like">
                                <iconify-icon icon="ant-design:heart-outlined"></iconify-icon>
                                <!-- <iconify-icon icon="ant-design:heart-filled"></iconify-icon> -->
                            </span>
                            <p>${producto.nombre}</p>
                            <a class="d-flex justify-content-around align-items-center" href="#">
                                <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                                <span>Agregar</span>
                            </a>

                        </div>`;

    container.append(articulo);

    //Eventos
    const boton = document.getElementById(`btn-${producto.id}`);

    boton.addEventListener('click', () => {
        alert(`Has agregado ${producto.nombre}`);
    })

}

