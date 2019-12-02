const express = require("express");
const db = require("../queries/queries");
var router = express.Router();
bodyParser = require("body-parser");
jwt = require("jsonwebtoken");
config = require("../configs/config");
let app = express();

const JWTMiddleware = express.Router();
JWTMiddleware.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, app.get("llave"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída."
    });
  }
});

app.set("llave", config.llave);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

/* ROUTES NAV*/

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function(req, res, next) {
  res.render("login");
});
router.get("/editar", function(req, res, next) {
  res.render("editar");
});
router.get("/ingresar", function(req, res, next) {
  res.render("ingresar");
});
/* API ROUTES*/
module.exports = router;
