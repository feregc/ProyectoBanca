const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCanalServicio,
  getCanalServicioByCodigo,
  getCanalServicioById,
  updateCanalById,
  deleteCanalById,
  createCanal,
} = require("../../controllers/general/canalServicio.controller");

const router = Router();

router.get("/", getCanalServicio);
router.get("/codigo/:codigoCanalServicio", getCanalServicioByCodigo);
router.get("/:idCanalServicio", getCanalServicioById);
router.put("/actualizar/:idCanalServicio", updateCanalById);
router.delete("/eliminar/:idCanalServicio", deleteCanalById);
router.post(
  "/crear",
  [
    check("codigoCanalServicio", "El código del canal es obligatorio")
      .not()
      .isEmpty(),
    check("nombreCanalServicio", "El nombre del canal es obligatorio")
      .not()
      .isEmpty(),
    check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(),
  ],
  createCanal
);

module.exports = router;
