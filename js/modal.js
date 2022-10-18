const modalContainer = document.querySelector(".modal__product");
const abrirModal = document.getElementById("open");
const cerrarModal = document.getElementById("close");
const modalCarrito = document.querySelector(".modal__carrito");
const modalOverlay = document.getElementById("modal__overlay");

abrirModal.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.toggle("modal__product__active");
  modalOverlay.classList.toggle("modal__overlay__active");
});

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  modalContainer.classList.remove("modal__product__active");
  modalOverlay.classList.remove("modal__overlay__active");
});

btnEnd.addEventListener("click", () => {
  modalFinal.classList.toggle("modal__final__active");
});