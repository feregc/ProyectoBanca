const { Router } = require("express");
const { check } = require("express-validator");

const {
  getAgencias,
  getAgenciaById,
  getAgenciaByCodigo,
  updateAgenciaById,
  deleteAgenciaById,
  createAgencia,
} = require("../../controllers/general/agencia.controller");

const router = Router();

router.get("/", getAgencias);
router.get("/id/:idAgencia", getAgenciaById);
router.get("/codigo/:codigoAgencia", getAgenciaByCodigo);
router.put("/actualizar/:idAgencia", updateAgenciaById);
router.delete("/eliminar/:idAgencia", deleteAgenciaById);
router.post("/crear", createAgencia);

module.exports = router;
