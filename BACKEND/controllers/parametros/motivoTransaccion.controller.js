const { dbConnection } = require("../../config/db");

const getMotivoTransacciones = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    const result = await request.query(
      `SELECT [idMotivoTransaccion]
        ,[idTipoTransaccion]
        ,[codigoMotivoTransaccion]
        ,[nombreMotivoTransaccion]
      FROM 
        [PruebaDesarrollo].[Parametros].[MotivoTransaccion]`
    );
    res.json(result.recordset);
  } catch (error) {
    // console.error("Error al obtener los clientes:", error);
    res
      .status(400)
      .json({ message: "Error al obtener los tipos de transaccion" });
  }
};

const getMotivoTransaccionById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("id", id);
    const result = await request.query(
      `SELECT 
        [idTipoTransaccion]
        ,[codigoMotivoTransaccion]
        ,[nombreMotivoTransaccion]
      FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] 
      WHERE [idMotivoTransaccion] = @id`
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
const getMotivoTransaccionByIdTipoTransaccion = async (req, res = response) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("id", id);
    const result = await request.query(
      `SELECT 
        [idMotivoTransaccion]
        ,[codigoMotivoTransaccion]
        ,[nombreMotivoTransaccion]
      FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] 
      WHERE [idTipoTransaccion] = @id`
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

const getMotivoTransaccionByCodigo = async (req, res = response) => {
  const { codigo } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("codigo", codigo);
    const result = await request.query(
      `SELECT 
      [idMotivoTransaccion]
      ,[idTipoTransaccion]
      ,[nombreMotivoTransaccion] FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] 
      WHERE [codigoMotivoTransaccion] = @codigo`
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

const updateMotivoTransaccionById = async (req, res = response) => {
  const { idMotivoTransaccion } = req.params;
  const { idTipoTransaccion, codigoMotivoTransaccion, nombreMotivoTransaccion, } =
    req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] WHERE idMotivoTransaccion = @idMotivoTransaccion`;

    const request = pool.request();
    request.input("idMotivoTransaccion", idMotivoTransaccion);
    const resultQuery = await request.query(query);
    const motivo = resultQuery.recordset[0];

    if (!motivo) {
      res
        .status(400)
        .json({ message: `No existe un motivo con ese id: ${idMotivoTransaccion}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];

    if (idTipoTransaccion !== undefined) {
      updateFields.push("idTipoTransaccion = @idTipoTransaccion");
      updateValues.push(idTipoTransaccion);
    }

    if (codigoMotivoTransaccion !== undefined) {
      updateFields.push("codigoMotivoTransaccion = @codigoMotivoTransaccion");
      updateValues.push(codigoMotivoTransaccion);
    }

    if (nombreMotivoTransaccion !== undefined) {
      updateFields.push("nombreMotivoTransaccion = @nombreMotivoTransaccion");
      updateValues.push(nombreMotivoTransaccion);
    }

    const updateQuery = `
      UPDATE [PruebaDesarrollo].[Parametros].[MotivoTransaccion]
      SET
        ${updateFields.join(", ")},
        fechaModificado = GETDATE()
      WHERE
      idMotivoTransaccion = @idMotivoTransaccion
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idMotivoTransaccion", idMotivoTransaccion);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Motivo actualizado correctamente" });
  } catch (error) {
    console.error("Error al obtener el Motivo ", error);
    res
      .status(400)
      .json({ message: `No se pudo actualizar el Motivo`, error });
  }
};

const deleteMotivoTransaccionById = async (req, res = response) => {
  const { idMotivoTransaccion } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] WHERE idMotivoTransaccion = @idMotivoTransaccion`;

    const request = pool.request();
    request.input("idMotivoTransaccion", idMotivoTransaccion);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (!cliente) {
      res
        .status(400)
        .json({ message: `No existe un motivo con ese id: ${idMotivoTransaccion}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] WHERE idMotivoTransaccion = @idMotivoTransaccion`;

    const deleteRequest = pool.request();
    deleteRequest.input("idMotivoTransaccion", idMotivoTransaccion);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Motivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al obtener el Motivo ", error);
    res.status(400).json({ message: `No se pudo Eliminar el Motivo`, error });
  }
};

const createMotivoTransaccion = async (req, res = response) => {
  const { idTipoTransaccion, codigoMotivoTransaccion, nombreMotivoTransaccion, idUsuario } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Parametros].[MotivoTransaccion] WHERE codigoMotivoTransaccion = @codigoMotivoTransaccion`;

    const request = pool.request();
    request.input("codigoMotivoTransaccion", codigoMotivoTransaccion);
    const resultQuery = await request.query(query);
    const motivo = resultQuery.recordset[0];

    if (motivo) {
      res.status(400).json({
        ok: false,
        message: `Ya existe un motivo con el codigo: ${codigoMotivoTransaccion}`,
      });
      return;
    }

    const createQuery = `
      INSERT INTO [PruebaDesarrollo].[Parametros].[MotivoTransaccion]
      (idTipoTransaccion, codigoMotivoTransaccion, nombreMotivoTransaccion, fechaRegistro, fechaModificado, idUsuario)
      VALUES
      (@idTipoTransaccion, @codigoMotivoTransaccion, @nombreMotivoTransaccion, GETDATE(), NULL, @idUsuario)
    `;

    const createRequest = pool.request();
    createRequest.input("idTipoTransaccion", idTipoTransaccion);
    createRequest.input("codigoMotivoTransaccion", codigoMotivoTransaccion);
    createRequest.input("nombreMotivoTransaccion", nombreMotivoTransaccion);
    createRequest.input("idUsuario", idUsuario);

    await createRequest.query(createQuery);

    res.json({ ok: true, message: "Motivo creado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo crear el motivo`, error });
  }
};

module.exports = {
  getMotivoTransaccionByCodigo,
  getMotivoTransaccionById,
  getMotivoTransaccionByIdTipoTransaccion,
  getMotivoTransacciones,
  createMotivoTransaccion,
  updateMotivoTransaccionById,
  deleteMotivoTransaccionById,
};
