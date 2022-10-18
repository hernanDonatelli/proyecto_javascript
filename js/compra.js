//Confirma la compra, cierra el modal
btnEndFinal.addEventListener("click", () => {
  Swal.fire({
    title: "Finalizar Compra?",
    text: "Click en Comprar para continuar!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, comprar!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear("cartStorage");
      getCarrito = JSON.parse(localStorage.getItem("cartStorage")) || [];

      modalContainer.classList.remove("modal__product__active");
      modalFinal.classList.remove("modal__final__active");

      (divSinProducto.style.display === 'none') ? (divSinProducto.style.display = "block") : "";
      containerTotales.style.display = "none";
      containerImpuestos.style.display = "none";
      containerTotalFinal.style.display = "none";
      divCuotas.style.display = "none";
      btnEnd.style.display = "none";
      let carritoContainer = document.getElementById("carritoContainer");

      while (carritoContainer.firstChild) {
        carritoContainer.removeChild(carritoContainer.firstChild);
      }

      totalCarrito.innerText = getCarrito.length;

      Swal.fire({
        title: "La compra ha sido exitosa!",
        text: "Te esperamos nuevamente en Shopping Gourmet.",
        icon: "success",
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false
    });

      modalOverlay.classList.remove("modal__overlay__active");
      btnVaciarCarrito.setAttribute("disabled", "");
      btnVaciarCarrito.innerText = "Carrito Vacío";
      btnVaciarCarrito.classList.add("disabled");
    }
  });
});