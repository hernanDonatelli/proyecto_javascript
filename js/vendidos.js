const masVendidos = async () => {
  const respuesta = await fetch("./js/json/data.json");
  const data = await respuesta.json();

  const filtrados = data.filter(el => el.vendidos > 150);

  const ordenados = filtrados.sort((a, b) => b.vendidos - a.vendidos);

  const containerCarousel = document.getElementById("carousel-inner");

  for (let i = 0; i < 3; i++) {
    //Items del carousel
    const containerItemCarousel = document.createElement("div");
    containerItemCarousel.classList.add("carousel-item");
    containerItemCarousel.innerHTML = `<img src="${ordenados[i].img}" alt="${ordenados[i].nombre}">
                                      <div class="carousel-caption">
                                        <h5>${ordenados[i].nombre}</h5>
                                        <p>${ordenados[i].descripcion}</p>
                                        <span class="price">$${ordenados[i].precio}</span>
                                        <p class="vendidos">(Vendidos: ${ordenados[i].vendidos}un.)</p>
                                      </div>`;

    containerCarousel.append(containerItemCarousel);
  }

  const active = document.querySelector("div.carousel-item");
  active.classList.add("active");

}
masVendidos();