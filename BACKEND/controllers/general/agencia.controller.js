// const { dbConnection } = require("../../config/db");

// const getAgencias = async (req, res = response) => {
//   try {
//     const pool = await dbConnection();
//     if (!pool) {
//       throw new Error("No se pudo establecer conexión con la base de datos.");
//     }
//     const request = pool.request();
//     const result = await request.query(
//       "SELECT * FROM [PruebaDesarrollo].[General].[Agencias]"
//     );
//     res.json(result.recordset);
//   } catch (error) {
//     // console.error("Error al obtener los clientes:", error);
//     res.status(400).json({ message: "Error al obtener las agencias" });
//   }
// };

// const getAgenciaById = async (req, res = response) => {
//   const { idAgencia } = req.params;
//   try {
//     const pool = await dbConnection();
//     if (!pool) {
//       throw new Error("No se pudo establecer conexión con la base de datos.");
//     }
//     const request = pool.request();
//     request.input("idAgencia", idAgencia);
//     const result = await request.query(
//       "SELECT  * FROM [PruebaDesarrollo].[General].[Agencias] WHERE idAgencia = @idAgencia"
//     );

//     if (result.recordset.length === 0) {
//       res
//         .status(400)
//         .json({ message: `No existe una agencia con ese id: ${idAgencia}` });
//       return;
//     }

//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error al obtener el cliente ", error);
//     res
//       .status(400)
//       .json({ message: `No existe una agencia con ese id : ${idAgencia}` });
//   }
// };

// const getAgenciaByCodigo = async (req, res = response) => {
//   const { codigoAgencia } = req.params;
//   try {
//     const pool = await dbConnection();
//     if (!pool) {
//       throw new Error("No se pudo establecer conexión con la base de datos.");
//     }
//     const request = pool.request();
//     request.input("codigoAgencia", codigoAgencia);
//     const result = await request.query(
//       "SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE codigoAgencia = @codigoAgencia"
//     );

//     if (result.recordset.length === 0) {
//       res.status(400).json({
//         message: `No existe una agencia con ese código: ${codigoAgencia}`,
//       });
//       return;
//     }

//     res.json(result.recordset);
//   } catch (error) {
//     console.error("Error al obtener el cliente ", error);
//     res.status(400).json({
//       message: `No existe una agencia con ese código : ${codigoAgencia}`,
//     });
//   }
// };

// const updateAgenciaById = async (req, res = response) => {
//   const { idAgencia } = req.params;
//   const {
//     codigoAgencia,
//     nombreAgencia,
//     direccionAgencia,
//     telefonoAgencia,
//     idUsuario,
//   } = req.body;
//   try {
//     const pool = await dbConnection();
//     if (!pool) {
//       throw new Error("No se pudo establecer conexión con la base de datos.");
//     }

//     const query = `SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE idAgencia = @idAgencia`;

//     const request = pool.request();
//     request.input("idAgencia", idAgencia);
//     const resultQuery = await request.query(query);
//     const agencia = resultQuery.recordset[0];

//     if (!agencia) {
//       res
//         .status(400)
//         .json({ message: `No existe una agencia con ese id: ${idAgencia}` });
//       return;
//     }

//     const updateFields = [];
//     const updateValues = [];


//     if (codigoAgencia !== undefined) {
//       updateFields.push("codigoAgencia = @codigoAgencia");
//       updateValues.push(codigoAgencia);
//     }

//     if (nombreAgencia !== undefined) {
//       updateFields.push("nombreAgencia = @nombreAgencia");
//       updateValues.push(nombreAgencia);
//     }

//     if (direccionAgencia !== undefined) {
//       updateFields.push("direccionAgencia = @direccionAgencia");
//       updateValues.push(direccionAgencia);
//     }

//     if (telefonoAgencia !== undefined) {
//       updateFields.push("telefonoAgencia = @telefonoAgencia");
//       updateValues.push(telefonoAgencia);
//     }
//     if (idUsuario !== undefined) {
//       updateFields.push("idUsuario = @idUsuario");
//       updateValues.push(idUsuario);
//     }

//     const updateQuery = `
//       UPDATE [PruebaDesarrollo].[General].[Agencias]
//       SET
//         ${updateFields.join(", ")},
//         fechaModificado = GETDATE()
//       WHERE
//         idAgencia = @idAgencia
//     `;

//     const updateRequest = pool.request();

//     updateFields.forEach((field, index) => {
//       updateRequest.input(
//         field.substring(0, field.indexOf(" ")),
//         updateValues[index]
//       );
//     });

//     updateRequest.input("idAgencia", idAgencia);

//     await updateRequest.query(updateQuery);

//     res.json({ ok: true, message: "Agencia actualizada correctamente" });
//   } catch (error) {
//     console.error("Error al obtener el cliente ", error);
//     res
//       .status(400)
//       .json({ message: `No existe una agencia con ese id : ${idAgencia}` });
//   }
// };

// const deleteAgenciaById = async (req, res = response) => {
//   const { idAgencia } = req.params;
//   try {
//     const pool = await dbConnection();
//     if (!pool) {
//       throw new Error("No se pudo establecer conexión con la base de datos.");
//     }

//     const query = `SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE idAgencia = @idAgencia`;

//     const request = pool.request();
//     request.input("idAgencia", idAgencia);
//     const resultQuery = await request.query(query);
//     const agencia = resultQuery.recordset[0];

//     if (!agencia) {
//       res
//         .status(400)
//         .json({ message: `No existe una agencia con ese id: ${idAgencia}` });
//       return;
//     }

//     const deleteQuery = `
//       DELETE FROM [PruebaDesarrollo].[General].[Agencias]
//       WHERE
//         idAgencia = @idAgencia
//     `;

//     const deleteRequest = pool.request();
//     deleteRequest.input("idAgencia", idAgencia);

//     await deleteRequest.query(deleteQuery);

//     res.json({ ok: true, message: "Agencia eliminada correctamente" });
//   } catch (error) {
//     console.error("Error al obtener el cliente ", error);
//     res
//       .status(400)
//       .json({ message: `No existe una agencia con ese id : ${idAgencia}` });
//   }
// };

// const createAgencia = async (req, res = response) => {
//   const {
//     idCanalServicio,
//     codigoAgencia,
//     nombreAgencia,
//     direccionAgencia,
//     telefonoAgencia,
//     idUsuario,
//   } = req.body;
//   try {
//     const pool = await dbConnection();
//     if (!pool) {
//       throw new Error("No se pudo establecer conexión con la base de datos.");
//     }

//     const query = `SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE codigoAgencia = @codigoAgencia`;

//     const request = pool.request();
//     request.input("codigoAgencia", codigoAgencia);
//     const resultQuery = await request.query(query);
//     const agencia = resultQuery.recordset[0];

//     if (agencia) {
//       res.status(400).json({
//         ok: false,
//         message: `Ya existe una agencia con el codigo: ${codigoAgencia}`,
//       });
//       return;
//     }

//     const createQuery = `
//       INSERT INTO [PruebaDesarrollo].[General].[Agencias]
//       (idCanalServicio, codigoAgencia, nombreAgencia, direccionAgencia, telefonoAgencia, fechaRegistro, fechaModificado, idUsuario)
//       VALUES
//       (@idCanalServicio, @codigoAgencia, @nombreAgencia, @direccionAgencia, @telefonoAgencia, GETDATE(), null, @idUsuario)
//     `;

//     const createRequest = pool.request();
//     createRequest.input("idCanalServicio", idCanalServicio);
//     createRequest.input("codigoAgencia", codigoAgencia);
//     createRequest.input("nombreAgencia", nombreAgencia);
//     createRequest.input("direccionAgencia", direccionAgencia);
//     createRequest.input("telefonoAgencia", telefonoAgencia);
//     createRequest.input("idUsuario", idUsuario);

//     await createRequest.query(createQuery);

//     res.json({ ok: true, message: "Agencia creada correctamente" });
//   } catch (error) {
//     console.error("Error al obtener el cliente ", error);
//     res.status(400).json({ message: `No se pudo crear la agencia` });
//   }
// };

// module.exports = {
//   getAgencias,
//   getAgenciaById,
//   getAgenciaByCodigo,
//   updateAgenciaById,
//   deleteAgenciaById,
//   createAgencia,
// };


const { dbConnection } = require("../../config/db");

const getAgencias = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    const result = await request.query(
      "SELECT * FROM [PruebaDesarrollo].[General].[Agencias]"
    );
    res.json(result.recordset);
  } catch (error) {
    // console.error("Error al obtener los clientes:", error);
    res.status(400).json({ message: "Error al obtener las agencias" });
  }
};

const getAgenciaById = async (req, res = response) => {
  const { idAgencia } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("idAgencia", idAgencia);
    const result = await request.query(
      "SELECT  * FROM [PruebaDesarrollo].[General].[Agencias] WHERE idAgencia = @idAgencia"
    );

    if (result.recordset.length === 0) {
      res
        .status(400)
        .json({ message: `No existe una agencia con ese id: ${idAgencia}` });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No existe una agencia con ese id : ${idAgencia}` });
  }
};

const getAgenciaByCodigo = async (req, res = response) => {
  const { codigoAgencia } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }
    const request = pool.request();
    request.input("codigoAgencia", codigoAgencia);
    const result = await request.query(
      "SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE codigoAgencia = @codigoAgencia"
    );

    if (result.recordset.length === 0) {
      res.status(400).json({
        message: `No existe una agencia con ese código: ${codigoAgencia}`,
      });
      return;
    }

    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({
      message: `No existe una agencia con ese código : ${codigoAgencia}`,
    });
  }
};

const updateAgenciaById = async (req, res = response) => {
  const { idAgencia } = req.params;
  const {
    codigoAgencia,
    nombreAgencia,
    direccionAgencia,
    telefonoAgencia,
    idUsuario,
  } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE idAgencia = @idAgencia`;

    const request = pool.request();
    request.input("idAgencia", idAgencia);
    const resultQuery = await request.query(query);
    const agencia = resultQuery.recordset[0];

    if (!agencia) {
      res
        .status(400)
        .json({ message: `No existe una agencia con ese id: ${idAgencia}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];


    if (codigoAgencia !== undefined) {
      updateFields.push("codigoAgencia = @codigoAgencia");
      updateValues.push(codigoAgencia);
    }

    if (nombreAgencia !== undefined) {
      updateFields.push("nombreAgencia = @nombreAgencia");
      updateValues.push(nombreAgencia);
    }

    if (direccionAgencia !== undefined) {
      updateFields.push("direccionAgencia = @direccionAgencia");
      updateValues.push(direccionAgencia);
    }

    if (telefonoAgencia !== undefined) {
      updateFields.push("telefonoAgencia = @telefonoAgencia");
      updateValues.push(telefonoAgencia);
    }
    if (idUsuario !== undefined) {
      updateFields.push("idUsuario = @idUsuario");
      updateValues.push(idUsuario);
    }

    const updateQuery = `
      UPDATE [PruebaDesarrollo].[General].[Agencias]
      SET
        ${updateFields.join(", ")},
        fechaModificado = GETDATE()
      WHERE
        idAgencia = @idAgencia
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idAgencia", idAgencia);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Agencia actualizada correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No existe una agencia con ese id : ${idAgencia}` });
  }
};

const deleteAgenciaById = async (req, res = response) => {
  const { idAgencia } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE idAgencia = @idAgencia`;

    const request = pool.request();
    request.input("idAgencia", idAgencia);
    const resultQuery = await request.query(query);
    const agencia = resultQuery.recordset[0];

    if (!agencia) {
      res
        .status(400)
        .json({ message: `No existe una agencia con ese id: ${idAgencia}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[General].[Agencias]
      WHERE
        idAgencia = @idAgencia
    `;

    const deleteRequest = pool.request();
    deleteRequest.input("idAgencia", idAgencia);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Agencia eliminada correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No existe una agencia con ese id : ${idAgencia}` });
  }
};

const createAgencia = async (req, res = response) => {
  const {
    idCanalServicio,
    codigoAgencia,
    nombreAgencia,
    direccionAgencia,
    telefonoAgencia,
    idUsuario,
  } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[General].[Agencias] WHERE codigoAgencia = @codigoAgencia`;

    const request = pool.request();
    request.input("codigoAgencia", codigoAgencia);
    const resultQuery = await request.query(query);
    const agencia = resultQuery.recordset[0];

    if (agencia) {
      res.status(400).json({
        ok: false,
        message: `Ya existe una agencia con el codigo: ${codigoAgencia}`,
      });
      return;
    }

    const createQuery = `
      INSERT INTO [PruebaDesarrollo].[General].[Agencias]
      (idCanalServicio, codigoAgencia, nombreAgencia, direccionAgencia, telefonoAgencia, fechaRegistro, fechaModificado, idUsuario)
      VALUES
      (@idCanalServicio, @codigoAgencia, @nombreAgencia, @direccionAgencia, @telefonoAgencia, GETDATE(), null, @idUsuario)
    `;

    const createRequest = pool.request();
    createRequest.input("idCanalServicio", idCanalServicio);
    createRequest.input("codigoAgencia", codigoAgencia);
    createRequest.input("nombreAgencia", nombreAgencia);
    createRequest.input("direccionAgencia", direccionAgencia);
    createRequest.input("telefonoAgencia", telefonoAgencia);
    createRequest.input("idUsuario", idUsuario);

    await createRequest.query(createQuery);

    res.json({ ok: true, message: "Agencia creada correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo crear la agencia` });
  }
};

module.exports = {
  getAgencias,
  getAgenciaById,
  getAgenciaByCodigo,
  updateAgenciaById,
  deleteAgenciaById,
  createAgencia,
};
