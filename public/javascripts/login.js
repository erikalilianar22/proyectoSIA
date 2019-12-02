var contenido = document.getElementsByClassName("btn-iniciar");
function log() {
  fetch("https:/randomuser.me/api/")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}
ingresarUsuarioRegion = async function(url, data, config) {
  let res = 0,
    response;
  try {
    response = await axios.post(url, data, config);
    res = response.data;
  } catch (error) {
    console.log(error);
  }
  return res;
};

async function agregarUsuarioRegion() {
  let res = 0,
    data = {
      IdUsuario: this.idUsuario,
      IdRegion: this.idRegion
    },
    config = {
      Authorization: `Bearer ${this.entrada.token}`
    },
    url = `${rutas.uriBase}/api/UsuarioRegion`;

  res = await ingresarUsuarioRegion(url, data, config);
  if (res > 0) {
    /* if (this.idRol == 3 || this.idRol == 6) {
          this.agregarUsuarioLugar();
      }*/
    // else {
    $("#addUser").modal("hide");
    this.cargarUsuarios();
    alert.success("Ha creado el usuario correctamente");
    // }
  } else {
    this.exito(
      "Error",
      "A ocurrido un error al momento de listar los roles",
      "error"
    );
  }
}

