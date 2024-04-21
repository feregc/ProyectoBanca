const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./config/db");
const app = express();

dbConnection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/general/agencias", require("./routes/general/agencia.routes"));
app.use("/seguridad/auth", require("./routes/seguridad/auth.routes"));
app.use("/general/canalServicio", require("./routes/general/canalServicio.routes"));
app.use("/general/clientes", require("./routes/general/clientes.routes"));
app.use("/general/tipoCliente", require("./routes/general/tipoCliente.routes"));
app.use("/parametros/tipoTransaccion", require("./routes/parametros/tipoTransaccion.routes"));
app.use("/parametros/motivoTransaccion", require("./routes/parametros/motivoTransaccion.routes"));
app.use("/transaccional/transacciones", require("./routes/transaccional/transaccion.routes"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/public/index.html' );
});

const port = 3005;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
