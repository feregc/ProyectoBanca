## Instalación de Dependencias

Para instalar las dependencias, ejecutar los siguientes comandos en tu terminal:

````
npm install cors@^2.8.5 express@^4.19.2 express-validator@^7.0.1 jsonwebtoken@^9.0.2 mssql@^10.0.2 nodemon@^3.1.0 uuid@^9.0.1 --save```
````

## Cadena de Conexión para SQL Server en Node.js

Para conectarse a la base de datos remplazar los siguientes valores en la cadena de conexión:

```javascript
const sql = require("mssql");

const dbConnection = async () => {
  try {
    const pool = await sql.connect(
      "Server=nombre_servidor\\nombre_instancia,1433;Database=PruebaDesarrollo;User Id=Usuario;Password=Contraseña;Encrypt=true;TrustServerCertificate=true"
    );
    console.log("Conectado a la base de datos");
    return pool;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

module.exports = {
  dbConnection,
};
```



Para utilizar copiar el siguinete url en su navegador: `http://localhost:3005/seguridad/auth`


## Repositorio

`https://github.com/feregc/ProyectoBanca.git`
