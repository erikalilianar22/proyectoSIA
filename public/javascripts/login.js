var contenido = document.getElementsByClassName("btn-iniciar");
function log() {
  fetch("https:/randomuser.me/api/")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}
