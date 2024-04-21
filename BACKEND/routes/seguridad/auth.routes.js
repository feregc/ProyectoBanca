const { Router } = require("express");
const { check } = require("express-validator");

const {
  createUser,
  loginUser,
  updateUsuarioById,
  deleteUsuarioById,
  getUsuarios,
  revalidarToken,
} = require("../../controllers/seguridad/auth.controller");
const { validarJWT } = require("../../middlewares/validar-jwt");

const router = Router();

router.post(
  "/register",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El password es obligatorio").not().isEmpty(),
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUser
);

router.get(
  '/renew',
  [
    validarJWT,
  ], 
  revalidarToken
);

router.get("/usuario", getUsuarios);

router.put("/actualizar/:idUsuario", updateUsuarioById);
router.delete("/eliminar/:idUsuario", deleteUsuarioById);

module.exports = router;
