const { dbConnection } = require("../../config/db");

const getTipoClientes = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    const result = await request.query(
      "SELECT [idTipoCliente], [codigoTipoCliente], [nombreTipoCliente] FROM [PruebaDesarrollo].[General].[TipoCliente]"
    );
    res.json(result.recordset);
  } catch (error) {
    // console.error("Error al obtener los clientes:", error);
    res.status(400).json({ message: "Error al obtener las agencias" });
  }
};

const getTipoClienteById = async (req, res = response) => {
  const { id } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("id", id);
    const result = await request.query(
      "SELECT [codigoTipoCliente], [nombreTipoCliente] FROM [PruebaDesarrollo].[General].[TipoCliente] WHERE idTipoCliente = @id"
    );

    if (result.recordset.length === 0) {
      res
        .status(400)
        .json({ message: `No existe un tipo de cliente con ese id: ${id}` });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No existe un tipo de cliente con ese id : ${id}` });
  }
};

const getTipoClienteByCodigo = async (req, res = response) => {
  const { codigo } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("codigo", codigo);
    const result = await request.query(
      "SELECT [idTipoCliente] , [nombreTipoCliente] FROM [PruebaDesarrollo].[General].[TipoCliente] WHERE codigoTipoCliente = @codigo"
    );

    if (result.recordset.length === 0) {
      res.status(400).json({
        message: `No existe un tipo cliente con ese código: ${codigo}`,
      });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({
      message: `No existe un tipo cliente con ese código : ${codigo}`,
    });
  }
};

const updateTipoClienteById = async (req, res = response) => {
  const { idTipoCliente } = req.params;
  const { codigoTipoCliente, nombreTipoCliente, } =
    req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[TipoCliente] WHERE idTipoCliente = @idTipoCliente`;

    const request = pool.request();
    request.input("idTipoCliente", idTipoCliente);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (!cliente) {
      res
        .status(400)
        .json({ message: `No existe un cliente con ese id: ${idTipoCliente}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];

    if (codigoTipoCliente !== undefined) {
      updateFields.push("codigoTipoCliente = @codigoTipoCliente");
      updateValues.push(codigoTipoCliente);
    }

    if (nombreTipoCliente !== undefined) {
      updateFields.push("nombreTipoCliente = @nombreTipoCliente");
      updateValues.push(nombreTipoCliente);
    }

    const updateQuery = `
      UPDATE [PruebaDesarrollo].[General].[TipoCliente]
      SET
        ${updateFields.join(", ")},
        fechaModificado = GETDATE()
      WHERE
      idTipoCliente = @idTipoCliente
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idTipoCliente", idTipoCliente);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Cliente actualizado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No se pudo actualizar el Cliente`, error });
  }
};

const deleteTipoClienteById = async (req, res = response) => {
  const { idTipoCliente } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[TipoCliente] WHERE idTipoCliente = @idTipoCliente`;

    const request = pool.request();
    request.input("idTipoCliente", idTipoCliente);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (!cliente) {
      res
        .status(400)
        .json({ message: `No existe un cliente con ese id: ${idTipoCliente}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[General].[TipoCliente] WHERE idTipoCliente = @idTipoCliente`;

    const deleteRequest = pool.request();
    deleteRequest.input("idTipoCliente", idTipoCliente);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo Eliminar el Cliente`, error });
  }
};

const createTipoCliente = async (req, res = response) => {
  const { codigoTipoCliente, nombreTipoCliente, idUsuario } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[TipoCliente] WHERE codigoTipoCliente = @codigoTipoCliente`;

    const request = pool.request();
    request.input("codigoTipoCliente", codigoTipoCliente);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (cliente) {
      res.status(400).json({
        ok: false,
        message: `Ya existe un canal con el codigo: ${codigoTipoCliente}`,
      });
      return;
    }

    const createQuery = `
      INSERT INTO [PruebaDesarrollo].[General].[TipoCliente]
      (codigoTipoCliente, nombreTipoCliente, fechaRegistro, fechaModificado, idUsuario)
      VALUES
      (@codigoTipoCliente, @nombreTipoCliente, GETDATE(), NULL, @idUsuario)
    `;

    const createRequest = pool.request();
    createRequest.input("codigoTipoCliente", codigoTipoCliente);
    createRequest.input("nombreTipoCliente", nombreTipoCliente);
    createRequest.input("idUsuario", idUsuario);

    await createRequest.query(createQuery);

    res.json({ ok: true, message: "Cliente creado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo crear el Cliente`, error });
  }
};

module.exports = {
  getTipoClientes,
  getTipoClienteById,
  getTipoClienteByCodigo,
  updateTipoClienteById,
  deleteTipoClienteById,
  createTipoCliente,
};
