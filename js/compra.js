//Validacion formulario
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const confirmarCompra = document.querySelector('.swal2-actions button.swal2-confirm');
const cancelarCompra = document.querySelector('.swal2-actions button.swal2-cancel');

const finalizarCompra = () => {

  const pago = findSelected();

  if (campos.email && campos.nombre && campos.apellido && campos.telefono && campos.documento) {
    formulario.reset();

    document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
      icono.classList.remove("formulario__grupo-correcto");
    });
    document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-active");

  } else {
    document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-active");
  }

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

  modalOverlay.classList.remove("modal__overlay__active");
  btnVaciarCarrito.setAttribute("disabled", "");
  btnVaciarCarrito.innerText = "Carrito Vacío";
  btnVaciarCarrito.classList.add("disabled");

}

//Expresiones regulares
const expresiones = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios.
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios.
  documento: /^\d{7,8}$/, //Solo numeros para documento
  telefono: /^\d{7,12}$/, // 7 a 12 numeros, con codigo de pais y area.
  pago: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}

//Validar campos completos
const campos = {
  email: false,
  nombre: false,
  apellido: false,
  documento: false,
  telefono: false,
  pago: false
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre');
      break;

    case "apellido":
      validarCampo(expresiones.apellido, e.target, 'apellido');
      break;

    case "email":
      validarCampo(expresiones.email, e.target, 'email');
      break;

    case "documento":
      validarCampo(expresiones.documento, e.target, 'documento');
      break;

    case "telefono":
      validarCampo(expresiones.telefono, e.target, 'telefono');
      break;
  }

  if (campos.email && campos.nombre && campos.apellido && campos.telefono && campos.documento) {
    btnEndFinal.removeAttribute("disabled");
    btnEndFinal.classList.remove("formulario__btn-disabled");
  }else{
    btnEndFinal.setAttribute("disabled", '');
    btnEndFinal.classList.add("formulario__btn-disabled");
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
    document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-check");
    document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-xmark");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-active");
    campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
    document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
    document.querySelector(`#grupo__${campo} i`).classList.remove("fa-circle-check");
    document.querySelector(`#grupo__${campo} i`).classList.add("fa-circle-xmark");
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-active");
    campos[campo] = false;
  }
};

//Capturar valor de los radiobuttons en forma de pago
let radioBtns = document.querySelectorAll("input[name='pago']");

let findSelected = () => {
  let selected = document.querySelector("input[name='pago']:checked");
  return selected.value;
}

radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("change", findSelected);
})

findSelected();

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

//Compra y envio de mail al usuario
document.getElementById('formulario').addEventListener("submit", function (e) {
  e.preventDefault();

  btnEndFinal.value = 'Finalizando Compra...';


  const serviceID = 'default_service';
  const templateID = 'template_nq0hg0m';
  emailjs.sendForm(serviceID, templateID, this).then(() => {
    finalizarCompra();

    btnEndFinal.value = 'Email Enviado';

    Swal.fire({
      title: "La compra ha sido exitosa!",
      text: "Se ha enviado un mail con tu compra. Te esperamos nuevamente!",
      icon: "success",
      timer: 5000,
      showConfirmButton: false,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }, /* (err) => {
    btnEndFinal.value = 'Ha ocurrido un error';
    alert(JSON.stringify(err));
  } */);
});