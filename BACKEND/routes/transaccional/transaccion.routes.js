const { Router } = require("express");

const {
  createTransaction,
  getDatesTransactions,
  getDataReporte,
} = require("../../controllers/transaccional/transacciones.controller");

const router = Router();

router.get("/", getDatesTransactions);
router.get("/:idTransaccion", getDataReporte);
router.post("/new", createTransaction);

module.exports = router;
