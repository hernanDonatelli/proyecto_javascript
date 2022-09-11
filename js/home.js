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

    /* articulo.innerHTML = `<div class="brand brand-${producto.categoria}">
                        <h2>${producto.marca}</h2>
                    </div>

                    <div class="shop__card__header">
                        <img src="${producto.img}" alt="${producto.marca} - ${producto.nombre}">
                    </div>

                    <div class="shop__card__content">
                        <div class="content__price">
                            <span class="title">${producto.nombre}</span>
                            <span class="price mt-3">$${producto.precio}</span>
                        </div>
                    </div>

                    <div class="shop__card__actions my-3">
                        <button id=btn-${producto.id} class="btn_shop_card">
                            <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                            <span>Agregar al carrito</span>
                        </button>
                    </div>`; */

    container.append(articulo);
/*
    //Eventos
    const boton = document.getElementById(`btn-${producto.id}`);

    boton.addEventListener('click', () => {
        alert(`Has agregado ${producto.nombre}`);
    })
 */
}

