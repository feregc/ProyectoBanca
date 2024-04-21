const { dbConnection } = require("../../config/db");

const getClientes = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM [PruebaDesarrollo].[General].[Clientes]"
    );
    res.json(result.recordset);
  } catch (error) {
    // console.error("Error al obtener los clientes:", error);
    res.status(400).json({ message: "Error al obtener los clientes" });
  }
};

const getClienteById = async (req, res = response) => {
  const { idCliente } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("idCliente", idCliente);
    const result = await request.query(
      "SELECT * FROM [PruebaDesarrollo].[General].[Clientes] WHERE idCliente = @idCliente"
    );

    if (result.recordset.length === 0) {
      res
        .status(400)
        .json({ message: `No existe un cliente con ese id: ${idCliente}` });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No existe un cliente con ese id: ${idCliente}` });
  }
};

const getClienteByDni = async (req, res = response) => {
  const { numeroIdentidad } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();

    request.input("numeroIdentidad", numeroIdentidad);
    const result = await request.query(
      "SELECT * FROM [PruebaDesarrollo].[General].[Clientes] WHERE numeroIdentidad = @numeroIdentidad"
    );
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({
        message: `No existe un cliente con ese número de identidad: ${numeroIdentidad}`,
      });
  }
};

const updateClienteById = async (req, res = response) => {
  const { idCliente } = req.params;
  const { idTipoCliente, codigoCliente, numeroIdentidad, nombreCliente } =
    req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[Clientes] WHERE idCliente = @idCliente`;

    const request = pool.request();
    request.input("idCliente", idCliente);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (!cliente) {
      res
        .status(400)
        .json({ message: `No existe un cliente con ese id: ${idCliente}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];

    if (idTipoCliente !== undefined) {
      updateFields.push("idTipoCliente = @idTipoCliente");
      updateValues.push(idTipoCliente);
    }

    if (codigoCliente !== undefined) {
      updateFields.push("codigoCliente = @codigoCliente");
      updateValues.push(codigoCliente);
    }

    if (numeroIdentidad !== undefined) {
      updateFields.push("numeroIdentidad = @numeroIdentidad");
      updateValues.push(numeroIdentidad);
    }

    if (nombreCliente !== undefined) {
      updateFields.push("nombreCliente = @nombreCliente");
      updateValues.push(nombreCliente);
    }

    const updateQuery = `
      UPDATE [PruebaDesarrollo].[General].[Clientes]
      SET
        ${updateFields.join(", ")},
        fechaModificado = GETDATE()
      WHERE
      idCliente = @idCliente
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idCliente", idCliente);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Cliente actualizado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No se pudo actualizar el Cliente`, error });
  }
};

const deleteClienteById = async (req, res = response) => {
  const { idCliente } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[Clientes] WHERE idCliente = @idCliente`;

    const request = pool.request();
    request.input("idCliente", idCliente);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (!cliente) {
      res
        .status(400)
        .json({ message: `No existe un cliente con ese id: ${idCliente}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[General].[Clientes] WHERE idCliente = @idCliente`;

    const deleteRequest = pool.request();
    deleteRequest.input("idCliente", idCliente);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo Eliminar el Cliente`, error });
  }
};

const createCliente = async (req, res = response) => {
  const {
    idTipoCliente,
    codigoCliente,
    numeroIdentidad,
    nombreCliente,
    idUsuario,
  } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[Clientes] WHERE numeroIdentidad = @numeroIdentidad`;

    const request = pool.request();
    request.input("numeroIdentidad", numeroIdentidad);
    const resultQuery = await request.query(query);
    const cliente = resultQuery.recordset[0];

    if (cliente) {
      res.status(400).json({
        ok: false,
        message: `Ya existe un canal con el codigo: ${numeroIdentidad}`,
      });
      return;
    }

    const createQuery = `
      INSERT INTO [PruebaDesarrollo].[General].[Clientes]
      (idTipoCliente, codigoCliente, numeroIdentidad, nombreCliente, fechaRegistro, fechaModificado, idUsuario)
      VALUES
      (@idTipoCliente, @codigoCliente, @numeroIdentidad, @nombreCliente, GETDATE(), NULL, @idUsuario)
    `;

    const createRequest = pool.request();
    createRequest.input("idTipoCliente", idTipoCliente);
    createRequest.input("codigoCliente", codigoCliente);
    createRequest.input("numeroIdentidad", numeroIdentidad);
    createRequest.input("nombreCliente", nombreCliente);
    createRequest.input("idUsuario", idUsuario);

    await createRequest.query(createQuery);

    res.json({ ok: true, message: "Cliente creado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo crear el Cliente`,error });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  getClienteByDni,
  updateClienteById,
  deleteClienteById,
  createCliente,
};
