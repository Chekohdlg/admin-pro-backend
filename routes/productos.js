/*
    Ruta: /api/productos
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarr-campos");

const {
  crearProducto, 
  getProductos,
  deleteProducto,
  actualizarProducto
} = require("../controllers/productos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getProductos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),    
    validarCampos,
  ],
  crearProducto
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),    

    validarCampos,
  ],
  actualizarProducto
);

 router.delete("/:id", validarJWT, deleteProducto);

module.exports = router;
