import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import bancaApi from "../../api/bancaApi";

export const Reportes = () => {
  const [fechas, setFechas] = useState([]);
  const [value, setValue] = useState("");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bancaApi.get("/transaccional/transacciones");
        setFechas(data.transactions);
      } catch (error) {
        console.log({ error });
      }
    };

    fetchData();
  }, []);

  const onSelectChange = async (e) => {
    setValue(e.target.value);

    try {
      const data = await bancaApi.get(`/transaccional/transacciones/${value}`);
      setDatos(data.transactions); 
    } catch (error) {
      console.log({ error });
    }
  };

  const data = datos[0];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Reportes</h3>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Usuario:</label>
              <select
                className="form-select mt-3"
                name="idTransaccion"
                value={value}
                onChange={onSelectChange}
              >
                <option value="">Seleccione una fecha</option>
                {fechas.map((fecha) => (
                  <option key={fecha.idTransaccion} value={fecha.idTransaccion}>
                    {fecha.fechaTransaccion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {data && ( // Check if data exists
            <div className="container text-center">
              <div className="row mt-5 mb-5 justify-content-center">
                  <div className="col-md-8">
                      <div className="card">
                          <div className="card-body">
                              <h4 className="card-title">Detalles de la transacción del: {data.fechaTransaccion}</h4>
                              <p className="card-text">Fecha de la transacción: {data.fechaTransaccion}</p>
                              <p className="card-text">El cliente es de tipo: {data.nombreTipoCliente}</p>
                              <p className="card-text">Con número de identidad: {data.numeroIdentidad}</p>
                              <p className="card-text">Y nombre: {data.nombreCliente}</p>
                              <p className="card-text">Se realizó en: {data.codigoAgencia} - {data.nombreAgencia}</p>
                              <p className="card-text">Por medio de: {data.nombreCanalServicio}</p>
                              <p className="card-text">La transacción con ID: {data.idTransaccion}</p>
                              <p className="card-text">Por el motivo de {data.nombreMotivoTransaccion}</p>
                              <p className="card-text">Con código: {data.codigoMotivoTransaccion}</p>
                              <p className="card-text">La cantidad de LPS. {data.montoTransaccion}</p>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
