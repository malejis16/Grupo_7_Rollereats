// alert("si entro");
window.addEventListener("load", function () {
  let form = document.querySelector("form.formulario");

  form.addEventListener("submit", function (e) {
    let errores = [];

    let campoNombre = document.querySelector("input.name");
    if (campoNombre.value == "") {
      errores.push("El Campo de nombre tiene que estar completo");
    } else if (campoNombre.value.length < 8) {
      errores.push("El campo de nombre debe tener al menos 8 caracteres");
    }
    let campoPassword = document.querySelector("input.password");
    if (campoPassword.value == "") {
      errores.push("El Campo de contraseña tiene que estar completo");
    }

    console.log(errores);

    if (errores.length > 0) {
      e.preventDefault();
      let ulErrores = document.querySelector("div.errores ul");
      for (let i = 0; i < errores.length; i++) {
        ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
      }
      errores = [];
    }
  });
});
