const modalContainer = document.querySelector(".modal__product");
const abrirModal = document.getElementById("open");
const cerrarModal = document.getElementById("close");
const modalCarrito = document.querySelector(".modal__carrito");

abrirModal.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.toggle("modal__product__active")
});

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.remove("modal__product__active");
});

/* modalContainer.addEventListener("click", () => {
  cerrarModal.click();
}); */

/* modalCarrito.addEventListener("click", (e) => {
  if(modalCarrito){
    e.stopPropagation();
  }
}); */