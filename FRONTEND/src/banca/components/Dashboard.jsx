import { Link } from "react-router-dom";

export const Dashboard = () => {

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
            <i className="p-4 text-center fa-solid fa-screwdriver-wrench fa-10x" ></i>
              <div className="card-body">
                <h5 className="card-title">Administrar</h5>
                <p className="card-text">
                  Administrar los usuarios, esquemas, etc.
                </p>
                <Link className="btn btn-primary" to="/administrar">Ir</Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
            <i className=" p-4 text-center fa-solid fa-money-bill-transfer fa-10x"></i>
              <div className="card-body">
                <h5 className="card-title">Transacciones</h5>
                <p className="card-text">
                  Realizar Transacciones, ACH, Pago de Servicios, etc.
                </p>
                <Link className="btn btn-primary" to="/transaccional/transacciones"> Ir </Link>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
            <i className="p-4 text-center fa-solid fa-chart-line fa-10x"></i>
              <div className="card-body">
                <h5 className="card-title">Reportes</h5>
                <p className="card-text">
                  Visualización de Reportes.
                </p>
                <Link className="btn btn-primary" to="/general/reportes"> Ir </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
