const sql = require("mssql");

const dbConnection = async () => {
  try {
    const pool = await sql.connect('Server=fer\\\\SQLEXPRESS,1433;Database=PruebaDesarrollo;User Id=sa;Password=asd123;Encrypt=true;TrustServerCertificate=true')
    console.log("Connected to the database");
    return pool;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

module.exports ={ 
  dbConnection
};
