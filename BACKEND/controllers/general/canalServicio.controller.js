const { dbConnection } = require("../../config/db");

const getCanalServicio = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    const result = await request.query(
      "SELECT [idCanalServicio], [nombreCanalServicio], [codigoCanalServicio] FROM [PruebaDesarrollo].[General].[CanalServicio]"
    );
    res.json(result.recordset);
  } catch (error) {
    // console.error("Error al obtener los clientes:", error);
    res.status(400).json({ message: "Error al obtener el canal de servicio" });
  }
};

const getCanalServicioById = async (req, res = response) => {
  const { idCanalServicio } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("idCanalServicio", idCanalServicio);
    const result = await request.query(
      "SELECT [idCanalServicio], [nombreCanalServicio] FROM [PruebaDesarrollo].[General].[CanalServicio] WHERE idCanalServicio = @idCanalServicio"
    );

    if (result.recordset.length === 0) {
      res
        .status(400)
        .json({ message: `No existe un canal de servicio con ese id: ${id}` });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No existe un canal de servicio con ese id : ${id}` });
  }
};

const getCanalServicioByCodigo = async (req, res = response) => {
  const { codigoCanalServicio } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("codigoCanalServicio", codigoCanalServicio);
    const result = await request.query(
      "SELECT [idCanalServicio], [nombreCanalServicio] FROM [PruebaDesarrollo].[General].[CanalServicio] WHERE codigoCanalServicio = @codigoCanalServicio"
    );

    if (result.recordset.length === 0) {
      res
        .status(400)
        .json({
          message: `No existe un canal de servicio con ese código: ${codigoCanalServicio}`,
        });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({
        message: `No existe un canal de servicio con ese código : ${codigoCanalServicio}`,
      });
  }
};

const updateCanalById = async (req, res = response) => {
  const { idCanalServicio } = req.params;
  const { codigoCanalServicio, nombreCanalServicio } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[CanalServicio] WHERE idCanalServicio = @idCanalServicio`;

    const request = pool.request();
    request.input("idCanalServicio", idCanalServicio);
    const resultQuery = await request.query(query);
    const canal = resultQuery.recordset[0];

    if (!canal) {
      res
        .status(400)
        .json({ message: `No existe un canal con ese id: ${idCanalServicio}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];

    if (codigoCanalServicio !== undefined) {
      updateFields.push("codigoCanalServicio = @codigoCanalServicio");
      updateValues.push(codigoCanalServicio);
    }

    if (nombreCanalServicio !== undefined) {
      updateFields.push("nombreCanalServicio = @nombreCanalServicio");
      updateValues.push(nombreCanalServicio);
    }

    const updateQuery = `
      UPDATE [PruebaDesarrollo].[General].[CanalServicio]
      SET
        ${updateFields.join(", ")},
        fechaModificado = GETDATE()
      WHERE
      idCanalServicio = @idCanalServicio
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idCanalServicio", idCanalServicio);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Canal actualizado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo actualizar el Canal`, error });
  }
};

const deleteCanalById = async (req, res = response) => {
  const { idCanalServicio } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[CanalServicio] WHERE idCanalServicio = @idCanalServicio`;

    const request = pool.request();
    request.input("idCanalServicio", idCanalServicio);
    const resultQuery = await request.query(query);
    const canal = resultQuery.recordset[0];

    if (!canal) {
      res
        .status(400)
        .json({ message: `No existe un canal con ese id: ${idCanalServicio}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[General].[CanalServicio] WHERE idCanalServicio = @idCanalServicio`;

    const deleteRequest = pool.request();
    deleteRequest.input("idCanalServicio", idCanalServicio);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Canal eliminado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo Eliminar el Canal`, error });
  }
};

const createCanal = async (req, res = response) => {
  const { codigoCanalServicio, nombreCanalServicio, idUsuario } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[CanalServicio] WHERE codigoCanalServicio = @codigoCanalServicio`;

    const request = pool.request();
    request.input("codigoCanalServicio", codigoCanalServicio);
    const resultQuery = await request.query(query);
    const canal = resultQuery.recordset[0];

    if (canal) {
      res.status(400).json({
        ok: false,
        message: `Ya existe un canal con el codigo: ${codigoCanalServicio}`,
      });
      return;
    }

    const createQuery = `
      INSERT INTO [PruebaDesarrollo].[General].[CanalServicio]
      (codigoCanalServicio, nombreCanalServicio, fechaRegistro, fechaModificado, idUsuario)
      VALUES
      (@codigoCanalServicio, @nombreCanalServicio, GETDATE(), NULL, @idUsuario)
    `;

    const createRequest = pool.request();
    createRequest.input("codigoCanalServicio", codigoCanalServicio);
    createRequest.input("nombreCanalServicio", nombreCanalServicio);
    createRequest.input("idUsuario", idUsuario);

    await createRequest.query(createQuery);

    res.json({ ok: true, message: "Canal creado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo crear el canal` });
  }
};

module.exports = {
  getCanalServicio,
  getCanalServicioByCodigo,
  getCanalServicioById,
  updateCanalById,
  deleteCanalById,
  createCanal,
};
