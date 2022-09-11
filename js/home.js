//Pintar en Home los productos

let container = document.getElementById("shop");

for (const producto of productos) {
    let articulo = document.createElement("article");
    articulo.classList.add("shop__card");

    if (producto.marca == "Chocolate Colonial") {
        articulo.classList.add("colonial");
    } else if (producto.marca == "Cocoon") {
        articulo.classList.add("cocoon");
    } else {
        articulo.classList.add("inti");
    }


    articulo.innerHTML = `<div class="brand">
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

                    <div class="shop__card__actions mt-3">
                        <button id=${producto.id} class="btn_shop_card">
                            <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                            <span>Agregar al carrito</span>
                        </button>
                    </div>`;

    container.append(articulo);
}