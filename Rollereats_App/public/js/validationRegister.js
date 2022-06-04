//alert("si entro registro");
window.addEventListener("load", function () {
  let form = document.querySelector("form.formulario");

  form.addEventListener("submit", function (e) {
    let errores = [];
    let campoEmail = document.querySelector("input.email");
    if (campoEmail.value == "") {
      errores.push("El Campo de nombre tiene que estar completo");
    } else if (campoEmail.value.length < 8) {
      errores.push("El campo de nombre debe tener al menos 8 caracteres");
    }
    let campoPassword = document.querySelector("input.password");
    if (campoPassword.value == "") {
      errores.push("El Campo de contraseña tiene que estar completo");
    }
    let campoNumero = document.querySelector("input.numero");
    if (campoNumero.value == "") {
      errores.push(
        "El numero de telefono es obligatorio para comprobar tu identidad"
      );
    }
    let campoPais = document.querySelector("input.pais");
    if (campoPais.value == "") {
      errores.push(
        "Saber tu ubicacion para nosotros es importante y asi ofrecerte los mejores servicios, por favor completalo!"
      );
    }
    let campoAvatar = document.querySelector("input.avatar");
    if (campoAvatar.value == "") {
      errores.push("Por favor sube una imagen!");
    }

    console.log(errores);

    if (errores.length > 0) {
      e.preventDefault();

      let ulErrores = document.querySelector("div.errores ul");
      ulErrores.innerHTML = "";
      for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
      }
    }
  });
});
