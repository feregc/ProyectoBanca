const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMotivoTransacciones,
  getMotivoTransaccionById,
  getMotivoTransaccionByIdTipoTransaccion,
  getMotivoTransaccionByCodigo,
  createMotivoTransaccion,
  updateMotivoTransaccionById,
  deleteMotivoTransaccionById,
} = require("../../controllers/parametros/motivoTransaccion.controller");

const router = Router();

router.get("/", getMotivoTransacciones);
router.get("/motivo/:id", getMotivoTransaccionById);
router.get("/tipo/:id", getMotivoTransaccionByIdTipoTransaccion);
router.get("/codigo/:codigo", getMotivoTransaccionByCodigo);
router.post("/crear", createMotivoTransaccion);
router.put("/actualizar/:idMotivoTransaccion", updateMotivoTransaccionById);
router.delete("/eliminar/:idMotivoTransaccion", deleteMotivoTransaccionById);

module.exports = router;
