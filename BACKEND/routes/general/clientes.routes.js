const { Router } = require("express");
const { check } = require("express-validator");
const {
  getClientes,
  getClienteById,
  getClienteByDni,
  updateClienteById,
  deleteClienteById,
  createCliente,
} = require("../../controllers/general/cliente.controller");

const router = Router();

router.get("/", getClientes);
router.get("/:idCliente", getClienteById);
router.get("/dni/:numeroIdentidad", getClienteByDni);
router.put("/actualizar/:idCliente", updateClienteById);
router.delete("/eliminar/:idCliente", deleteClienteById);
router.post("/crear", createCliente);

module.exports = router;
