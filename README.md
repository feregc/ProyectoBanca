# Frontend

## Instalación de Dependencias

Para instalar las dependencias, ejecutar los siguientes comandos en tu terminal:

````
yarn 
````

Para iniciar en desarrollo:

````
yarn dev
````

## Para crear la carpeta de distribución

```
yarn build
```

# Backend

## Instalación de Dependencias

Para instalar las dependencias, ejecutar los siguientes comandos en tu terminal:

````
npm i
````

Para iniciar en desarrollo:

````
npm run dev
````

Iniciar la app y usar el url 
```
npm start
```

Asegurese de haber hecho `yarn build` y copiar el contenido en la carpeta `/frontend/dist` en `/backend/public`, para utilizar copiar el siguinete url en su navegador: `http://localhost:3005/`

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



# Repositorio

## https://github.com/feregc/BancoOccPT.git