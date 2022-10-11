const print = (arrayCategory) => {
  container.innerHTML = '';

  arrayCategory.forEach(item => {

    let article = document.createElement("article");
    article.classList.add("shop__card", "animate__animated", "animate__fadeIn", "my-4");

    article.innerHTML += `<div class="shop__card__product style">
                                      <div class="img-container">
                                          <img src="${item.img}">
                                      </div>
                                      <span class="price">$${item.precio}</span>
                                      <span class="brand brand-${item.categoria.toLowerCase()}">${item.marca}</span>

                                      <span id="stock-${item.id}">${item.stock}</span>

                                      <div class="like d-flex justify-content-center align-items-center">
                                          <iconify-icon icon="ant-design:heart-outlined"></iconify-icon>
                                      </div>
                                      <p>${item.nombre}</p>
                                      <span class="description">${item.descripcion}</span>
                                  </div>
                                  <button id="btn-${item.id}" class="d-flex justify-content-around align-items-center mt-3">
                                      <iconify-icon class="market" icon="map:grocery-or-supermarket"></iconify-icon>
                                      <span>Agregar</span>
                                  </button>`;
    container.appendChild(article);

    //Eventos
    const btn = document.getElementById(`btn-${item.id}`);
    const span = document.getElementById(`stock-${item.id}`);

    if (item.stock < 1) {
      span.classList.add("sinStock");
      span.innerText = `Sin Stock`;
      btn.setAttribute("disabled", "");
      btn.innerText = "Sin Stock";
      btn.classList.add("btn-disabled");
    } else {
      span.innerText = `Stock: ${item.stock}un.`;
      span.classList.add("enStock");
    }

    btn.addEventListener("click", () => {
      carritoIndex(item.id);
      const span = document.getElementById(
        `stock-${item.id}`
      );

      span.innerText = `Stock: ${item.stock}un.`;
    });

  });
}

const categoria = async () => {
  const respuesta = await fetch("./js/json/data.json");
  const data = await respuesta.json();

  let lechesFilter = data.filter(item => item.categoria === 'Leches');
  const btnLeches = document.getElementById(`btn-leches`);
  let chocolatesFilter = data.filter(item => item.categoria === 'Chocolates');
  const btnChocolates = document.getElementById(`btn-chocolates`);
  let infusionesFilter = data.filter(item => item.categoria === 'Infusiones');
  const btnInfusiones = document.getElementById(`btn-infusiones`);
  const btnTodos = document.getElementById(`btn-todos`);

    btnLeches.addEventListener("click", () => {
      print(lechesFilter);
    });
    btnChocolates.addEventListener("click", () => {
      print(chocolatesFilter);
    });
    btnInfusiones.addEventListener("click", () => {
      print(infusionesFilter);
    });
    btnTodos.addEventListener("click", () => {
      print(data);
    });


}

categoria();
