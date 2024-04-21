const { dbConnection } = require("../../config/db");

const getTipoTransacciones = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    const result = await request.query(
      "SELECT [idTipoTransaccion] ,[codigoTipoMovimiento], [codigoTipoTransaccion], [nombreTipoTransaccion] FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion]"
    );
    res.json(result.recordset);
  } catch (error) {
    // console.error("Error al obtener los clientes:", error);
    res
      .status(400)
      .json({ message: "Error al obtener los tipos de transaccion" });
  }
};

const getTipoTransaccionById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("id", id);
    const result = await request.query(
      "SELECT [codigoTipoMovimiento], [codigoTipoTransaccion], [nombreTipoTransaccion] FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion] WHERE idTipoTransaccion = @id"
    );

    if (result.recordset.length === 0) {
      res
        .status(400)
        .json({
          message: `No existe un tipo de transaccion con ese id: ${id}`,
        });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el tipo de transaccion ", error);
    res
      .status(400)
      .json({ message: `No existe un tipo de transaccion con ese id : ${id}` });
  }
};

const getTipoTransaccionByCodigo = async (req, res = response) => {
  const { codigo } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("codigo", codigo);
    const result = await request.query(
      "SELECT [idTipoTransaccion], [codigoTipoTransaccion], [nombreTipoTransaccion] FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion] WHERE [codigoTipoMovimiento] = @codigo"
    );

    if (result.recordset.length === 0) {
      res.status(400).json({
        message: `No existe un tipo de transaccion con ese codigo: ${codigo}`,
      });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el tipo de transaccion ", error);
    res
      .status(400)
      .json({
        message: `No existe un tipo de transaccion con ese codigo : ${codigo}`,
      });
  }
};

const updateTipoTransaccionById = async (req, res = response) => {
  const { idTipoTransaccion } = req.params;
  const { codigoTipoMovimiento, codigoTipoTransaccion, nombreTipoTransaccion } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion] WHERE idTipoTransaccion = @idTipoTransaccion`;

    const request = pool.request();
    request.input("idTipoTransaccion", idTipoTransaccion);
    const resultQuery = await request.query(query);
    const tipoTransaccion = resultQuery.recordset[0];

    if (!tipoTransaccion) {
      res.status(400).json({ message: `No existe un tipo de transacción con ese id: ${idTipoTransaccion}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];

    if (codigoTipoMovimiento !== undefined) {
      updateFields.push("codigoTipoMovimiento = @codigoTipoMovimiento");
      updateValues.push(codigoTipoMovimiento);
    }

    if (codigoTipoTransaccion !== undefined) {
      updateFields.push("codigoTipoTransaccion = @codigoTipoTransaccion");
      updateValues.push(codigoTipoTransaccion);
    }

    if (nombreTipoTransaccion !== undefined) {
      updateFields.push("nombreTipoTransaccion = @nombreTipoTransaccion");
      updateValues.push(nombreTipoTransaccion);
    }

    const updateQuery = `
      UPDATE [PruebaDesarrollo].[Parametros].[TipoTransaccion]
      SET
        ${updateFields.join(", ")},
        fechaModificacion = GETDATE()
      WHERE
        idTipoTransaccion = @idTipoTransaccion
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idTipoTransaccion", idTipoTransaccion);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Tipo de transacción actualizado correctamente" });
  } catch (error) {
    console.error("Error al obtener el tipo de transacción", error);
    res.status(400).json({ message: "No se pudo actualizar el tipo de transacción", error });
  }
};


const deleteTipoTransaccionById = async (req, res = response) => {
  const { idTipoTransaccion } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion] WHERE idTipoTransaccion = @idTipoTransaccion`;

    const request = pool.request();
    request.input("idTipoTransaccion", idTipoTransaccion);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (!cliente) {
      res
        .status(400)
        .json({ message: `No existe un motivo con ese id: ${idTipoTransaccion}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion] WHERE idTipoTransaccion = @idTipoTransaccion`;

    const deleteRequest = pool.request();
    deleteRequest.input("idTipoTransaccion", idTipoTransaccion);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Tipo Transaccion eliminado correctamente" });
  } catch (error) {
    console.error("Error al obtener el Tipo Transaccion ", error);
    res.status(400).json({ message: `No se pudo Eliminar el Tipo Transaccion`, error });
  }
};

const createTipoTransaccion = async (req, res = response) => {
  const { codigoTipoMovimiento, codigoTipoTransaccion, nombreTipoTransaccion, idUsuario } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Parametros].[TipoTransaccion] WHERE codigoTipoTransaccion = @codigoTipoTransaccion`;

    const request = pool.request();
    request.input("codigoTipoTransaccion", codigoTipoTransaccion);
    const resultQuery = await request.query(query);
    const motivo = resultQuery.recordset[0];

    if (motivo) {
      res.status(400).json({
        ok: false,
        message: `Ya existe un motivo con el codigo: ${codigoTipoTransaccion}`,
      });
      return;
    }

    const createQuery = `
      INSERT INTO [PruebaDesarrollo].[Parametros].[TipoTransaccion]
      (codigoTipoMovimiento, codigoTipoTransaccion, nombreTipoTransaccion, fechaRegistro, fechaModificacion, idUsuario)
      VALUES
      (@codigoTipoMovimiento, @codigoTipoTransaccion, @nombreTipoTransaccion, GETDATE(), NULL, @idUsuario)
    `;

    const createRequest = pool.request();
    createRequest.input("codigoTipoMovimiento", codigoTipoMovimiento);
    createRequest.input("codigoTipoTransaccion", codigoTipoTransaccion);
    createRequest.input("nombreTipoTransaccion", nombreTipoTransaccion);
    createRequest.input("idUsuario", idUsuario);

    await createRequest.query(createQuery);

    res.json({ ok: true, message: "Tipo Transaccion creado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo crear el Tipo Transaccion`, error });
  }
};

module.exports = {
  getTipoTransacciones,
  getTipoTransaccionById,
  getTipoTransaccionByCodigo,
  createTipoTransaccion,
  updateTipoTransaccionById,
  deleteTipoTransaccionById,
};
