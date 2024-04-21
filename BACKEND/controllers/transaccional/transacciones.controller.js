const { dbConnection } = require("../../config/db");

const createTransaction = async (req, res = response) => {
  const {
    idMotivoTransaccion,
    idAgencia,
    idCliente,
    montoTransaccion,
    idUsuario,
  } = req.body;

  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const insertQuery = `
    INSERT INTO [Transaccional].[Transacciones] (idMotivoTransaccion, idAgencia, idCliente, fechaTransaccion, montoTransaccion, idUsuario)
      VALUES (
        @idMotivoTransaccion,
        @idAgencia,
        @idCliente,
        @fechaTransaccion,
        @montoTransaccion,
        @idUsuario)
    `;
    const insertRequest = pool.request();
    insertRequest.input("idMotivoTransaccion", idMotivoTransaccion);
    insertRequest.input("idAgencia", idAgencia);
    insertRequest.input("idCliente", idCliente);
    insertRequest.input("fechaTransaccion", new Date());
    insertRequest.input("montoTransaccion", montoTransaccion);
    insertRequest.input("idUsuario", idUsuario);
    await insertRequest.query(insertQuery);

    res.status(200).json({
      ok: true,
      msg: "Transaccion realizada exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDatesTransactions = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `
    SELECT idTransaccion, CONVERT(varchar, fechaTransaccion, 103) as fechaTransaccion FROM [Transaccional].[Transacciones]
    `;
    const request = pool.request();
    const result = await request.query(query);

    res.status(200).json({
      ok: true,
      transactions: result.recordset,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDataReporte = async (req, res = response) => {
  const { idTransaccion } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `
    SELECT 
	CONVERT(varchar, tr.fechaTransaccion, 103) as fechaTransaccion
	,tc.nombreTipoCliente
	,c.numeroIdentidad
	,c.nombreCliente
	,a.codigoAgencia
	,a.nombreAgencia
	,cs.nombreCanalServicio
	,tr.idTransaccion
    ,m.nombreMotivoTransaccion
	,m.codigoMotivoTransaccion
	,tr.montoTransaccion
  FROM [PruebaDesarrollo].[Transaccional].[Transacciones] tr
  LEFT JOIN Parametros.MotivoTransaccion m ON tr.idMotivoTransaccion = m.idMotivoTransaccion
  LEFT JOIN General.Agencias a ON tr.idAgencia = a.idAgencia
  LEFT JOIN General.Clientes c ON tr.idCliente = c.idCliente
  LEFT JOIN Seguridad.Usuarios u ON tr.idUsuario = u.idUsuarioRegistro
  LEFT JOIN General.TipoCliente tc ON c.idTipoCliente = tc.idTipoCliente
  LEFT JOIN General.CanalServicio cs ON a.idCanalServicio = cs.idCanalServicio
  WHERE 
    tr.idTransaccion = ${idTransaccion}`;
    const request = pool.request();
    const result = await request.query(query);

    res.status(200).json({
      ok: true,
      transactions: result.recordset,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createTransaction, getDatesTransactions, getDataReporte};
