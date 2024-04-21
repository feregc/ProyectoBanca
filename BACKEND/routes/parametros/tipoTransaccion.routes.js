const { Router } = require("express");
const { check } = require("express-validator");

const {
  getTipoTransacciones,
  getTipoTransaccionById,
  getTipoTransaccionByCodigo,
  createTipoTransaccion,
  updateTipoTransaccionById,
  deleteTipoTransaccionById,
} = require("../../controllers/parametros/tipoTransaccion.controller");

const router = Router();

router.get("/", getTipoTransacciones);
router.get("/id/:id", getTipoTransaccionById);
router.get("/codigo/:codigo", getTipoTransaccionByCodigo);
router.post("/crear", createTipoTransaccion);
router.put("/actualizar/:idTipoTransaccion", updateTipoTransaccionById);
router.delete("/eliminar/:idTipoTransaccion", deleteTipoTransaccionById);

module.exports = router;
