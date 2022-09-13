const modalContainer = document.querySelector(".modal__product");
const abrirModal = document.getElementById("open");
const cerrarModal = document.getElementById("close");
const modalCarrito = document.querySelector(".modal__carrito");

abrirModal.addEventListener("click", () => {
  modalContainer.classList.toggle("modal__product__active")
})

cerrarModal.addEventListener("click", () => {
  modalContainer.classList.remove("modal__product__active");
})

modalContainer.addEventListener("click", () => {
  cerrarModal.click();
})

/* modalCarrito.addEventListener("click", (e) => {
  e.stopPropagation();

}) */