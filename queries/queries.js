jwt = require("jsonwebtoken");
const express = require("express");
let app = express();
config = require("../configs/config");
const Pool = require("pg").Pool;
bodyParser = require("body-parser");

app.set("llave", config.llave);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "proyectoSIA",
  password: "",
  port: 5432
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM usuario", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const Login = (request, response) => {
  const query = {
    // give the query a unique name
    name: 'login',
    text: 'SELECT * FROM usuario where correo = $1 and contrasenna = $2',
    values: [request.body.usuario, request.body.contrasena],
  }
  pool.query(query, (error, results) => {
    if (error) {
      response.status(500).json("Fallo!");
    }
    if(results.rows.length > 0){

      const payload = {
        check: true
      };
      const token = jwt.sign(payload, app.get("llave"), {
        expiresIn: 1440
      });
      response.json({
        mensaje: "Autenticación correcta",
        token: token
      });
    }
    else{
      response.status(401).json("Unauthorized");
    }
  });
};
/*
const getIngresar = document.getElementById("btnIT");
function guardarIT(){
  fetch("INSERT INTO informacion_taxonomica (codigo,especie,nombre_cientifico,familia,division) VALUES ('','','','','')")
  .then(res => res.json())
  .then(data =>{
    console.log("hola");
  });
}*/
module.exports = {
  getUsers,
  Login
};
