const { dbConnection } = require("../../config/db");
const { generarJWT } = require('../../helpers/jwt');


const createUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query =
      "SELECT * FROM [PruebaDesarrollo].[Seguridad].[Usuarios] WHERE [nombreUsuario] = @email";
    const request = pool.request();
    request.input("email", email);
    const result = await request.query(query);
    const usuario = result.recordset[0];

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    const insertQuery = `
      INSERT INTO [PruebaDesarrollo].[Seguridad].[Usuarios] ([codigoUsuario]
        ,[nombreUsuario]
        ,[passwordUsuario]
        ,[isActivo]
        ,[ultimaConexion]
        ,[fechaRegistro]
        ,[fechaModificado]
        ,[idUsuarioRegistro])
      VALUES (
        @codigoUsuario,
        @email,
        @password,
        @isActivo,
        GETDATE(),
        GETDATE(),
        NULL,
        @idUsuarioRegistro)
    `;
    const insertRequest = pool.request();
    insertRequest.input("email", email);
    insertRequest.input("codigoUsuario", isAdmin ? "admin" : "user");
    insertRequest.input("password", password);
    insertRequest.input("isActivo", 1);
    insertRequest.input("idUsuarioRegistro", new Date().getMilliseconds());
    await insertRequest.query(insertQuery);

    const name = email;
    const uid = new Date().getMilliseconds();
    const codUsuario = isAdmin ? "admin" : "user";

    const token = await generarJWT( uid, codUsuario );
    res.status(201).json({
      ok: true,
      msg: "Usuario creado exitosamente",
      token,
      name,
      uid,
      codUsuario,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Seguridad].[Usuarios] WHERE [nombreUsuario] = @email AND [passwordUsuario] = @password
      UPDATE [PruebaDesarrollo].[Seguridad].[Usuarios] SET [ultimaConexion] = GETDATE() WHERE [nombreUsuario] = @email`;
    const request = pool.request();
    request.input("email", email);
    request.input("password", password);
    const result = await request.query(query);
    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    if (usuario.passwordUsuario !== password) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña o el nombre de usuario es incorrecto",
      });
    }

    const {
      nombreUsuario: name,
      idUsuarioRegistro: uid,
      codigoUsuario: ucod,
    } = usuario;

    const token = await generarJWT( ucod, uid );

    res.status(200).json({
      ok: true,
      msg: "Usuario logueado exitosamente",
      token,
      name,
      uid,
      ucod,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const revalidarToken = async(req, res = response) => {

  const { email, codigoUsuario } = req;

  //* Generar un nuevo JWT y retornarlo en la respuesta
  const token = await generarJWT( email, codigoUsuario );

  res.json({
    ok: true,
    token
  });

}

const updateUsuarioById = async (req, res = response) => {
  const { idUsuario } = req.params;
  const { codigoUsuario, nombreUsuario, passwordUsuario, isActivo } = req.body;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Seguridad].[Usuarios] WHERE idUsuario = @idUsuario`;

    const request = pool.request();
    request.input("idUsuario", idUsuario);
    const resultQuery = await request.query(query);
    const usuario = resultQuery.recordset[0];

    if (!usuario) {
      res
        .status(400)
        .json({ message: `No existe un usuario con ese id: ${idUsuario}` });
      return;
    }

    const updateFields = [];
    const updateValues = [];

    if (codigoUsuario !== undefined) {
      const rol = codigoUsuario === true ? "admin" : "user";
      updateFields.push("codigoUsuario = @codigoUsuario");
      updateValues.push(rol);
    }

    if (nombreUsuario !== undefined) {
      updateFields.push("nombreUsuario = @nombreUsuario");
      updateValues.push(nombreUsuario);
    }

    if (passwordUsuario !== undefined) {
      updateFields.push("passwordUsuario = @passwordUsuario");
      updateValues.push(passwordUsuario);
    }

    if (isActivo !== undefined) {
      updateFields.push("isActivo = @isActivo");
      updateValues.push(isActivo);
    }

    const updateQuery = `
    UPDATE [PruebaDesarrollo].[Seguridad].[Usuarios]
    SET
      ${updateFields.length > 0 ? updateFields.join(", ") + "," : ""} 
      fechaModificado = GETDATE()
    WHERE
      idUsuario = @idUsuario
    `;

    const updateRequest = pool.request();

    updateFields.forEach((field, index) => {
      updateRequest.input(
        field.substring(0, field.indexOf(" ")),
        updateValues[index]
      );
    });

    updateRequest.input("idUsuario", idUsuario);

    await updateRequest.query(updateQuery);

    res.json({ ok: true, message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res
      .status(400)
      .json({ message: `No se pudo actualizar el usuario`, error });
  }
};

const deleteUsuarioById = async (req, res = response) => {
  const { idUsuario } = req.params;
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Seguridad].[Usuarios] WHERE idUsuario = @idUsuario`;

    const request = pool.request();
    request.input("idUsuario", idUsuario);
    const resultQuery = await request.query(query);
    const usuario = resultQuery.recordset[0];

    if (!usuario) {
      res
        .status(400)
        .json({ message: `No existe un usuario con ese id: ${idUsuario}` });
      return;
    }

    const deleteQuery = `
      DELETE FROM [PruebaDesarrollo].[Seguridad].[Usuarios] WHERE idUsuario = @idUsuario `;

    const deleteRequest = pool.request();
    deleteRequest.input("idUsuario", idUsuario);

    await deleteRequest.query(deleteQuery);

    res.json({ ok: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo eliminar el usuario`, error });
  }
};

const getUsuarios = async (req, res = response) => {
  try {
    const pool = await dbConnection();
    if (!pool) {
      throw new Error("No se pudo establecer conexión con la base de datos.");
    }

    const query = `SELECT * FROM [PruebaDesarrollo].[Seguridad].[Usuarios]`;

    const request = pool.request();
    const resultQuery = await request.query(query);
    const usuarios = resultQuery.recordset;

    res.json({ usuarios });
  } catch (error) {
    console.error("Error al obtener el cliente ", error);
    res.status(400).json({ message: `No se pudo obtener los usuarios`, error });
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUsuarioById,
  deleteUsuarioById,
  getUsuarios,
  revalidarToken,
};
