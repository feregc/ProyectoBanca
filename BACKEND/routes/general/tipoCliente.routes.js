const { Router } = require("express");
const { check } = require("express-validator");
const {
  getTipoClientes,
  getTipoClienteById,
  getTipoClienteByCodigo,
  updateTipoClienteById,
  deleteTipoClienteById,
  createTipoCliente,
} = require("../../controllers/general/tipoCliente.controller");

const router = Router();

router.get("/", getTipoClientes);
router.get("/id/:id", getTipoClienteById);
router.get("/codigo/:codigo", getTipoClienteByCodigo);
router.put("/actualizar/:idTipoCliente", updateTipoClienteById);
router.delete("/eliminar/:idTipoCliente", deleteTipoClienteById);
router.post("/crear", createTipoCliente);

module.exports = router;
