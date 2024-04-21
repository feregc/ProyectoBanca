// import { Link } from "react-router-dom";

// import { Navbar } from "./Navbar";

// export const Administrador = () => {


//   return (
//     <>
//       <Navbar />
//       <div className="container d-flex flex-column align-items-center">
//         {/* Agencias */}
//         <div className="row my-2">
//           <div className="col-12 my-1 py-2">
//             <h3 className="text-center">Acciones con Agencias</h3>
//           </div>
//           <div className="row m-1 p-1">
//             <div className="col-4">
//               <Link
//                 className="btn btn-primary"
//                 to="/administrar/agencias/crear"
//               >
//                 <h5>Crear Agencia</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//               <Link
//                 className="btn btn-primary"
//                 to="/administrar/agencias/actualizar"
//               >
//                 <h5>Actualizar Agencia</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//               <Link
//                 className="btn btn-primary"
//                 to="/administrar/agencias/eliminar"
//               >
//                 <h5>Eliminar Agencia</h5>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Canal de Servicio */}
//         <div className="row my-2">
//           <div className="col-12 my-1 py-2">
//             <h3 className="text-center">Acciones con Canales de Servicio</h3>
//           </div>
//           <div className="row m-1 p-1">
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/canales/crear"
//               >
//                 <h5>Crear Canal</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/canales/actualizar"
//               >
//                 <h5>Actualizar Canal</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/canales/eliminar"
//               >
//                 <h5>Eliminar Canal</h5>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Clientes y Tipo de Cliente */}
//         <div className="row my-2">
//           <div className="col-12 my-1 py-2">
//             <h3 className="text-center">
//               Acciones con Cliente y Tipo de Cliente
//             </h3>
//           </div>
//           {/* Cliente */}
//           <div className="row m-1 p-1">
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/clientes/crear"
//               >
//                 <h5>Crear Cliente</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/clientes/actualizar"
//               >
//                 <h5>Actualizar Cliente</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/clientes/eliminar"
//               >
//                 <h5>Eliminar Cliente</h5>
//               </Link>
//             </div>
//           </div>
//           {/* Tipo de Cliente */}
//           <div className="row m-3 p-1">
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/tipoClientes/crear"
//               >
//                 <h5>Crear Tipo de Cliente</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/tipoClientes/actualizar"
//               >
//                 <h5>Actualizar Tipo de Cliente</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/tipoClientes/eliminar"
//               >
//                 <h5>Eliminar Tipo de Cliente</h5>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Motivo de Transacciones y Tipo de Transacciones */}
//         <div className="row my-2">
//           <div className="col-12 my-1 py-2">
//             <h3 className="text-center">
//               Acciones con Motivo de Transacciones y Tipo de Transacciones
//             </h3>
//           </div>
//           {/* Motivo de Transacciones */}
//           <div className="row m-1 p-1">
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/motivoTransaccion/crear"
//               >
//                 <h5>Crear Motivo de Transaccion</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/motivoTransaccion/actualizar"
//               >
//                 <h5>Actualizar Motivo de Transaccion</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/motivoTransaccion/eliminar"
//               >
//                 <h5>Eliminar Motivo de Transaccion</h5>
//               </Link>
//             </div>
//           </div>
//           {/* Tipo de Transacciones */}
//           <div className="row m-3 p-1">
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/tipoTransaccion/crear"
//               >
//                 <h5>Crear Tipo de Transacción</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/tipoTransaccion/actualizar"
//               >
//                 <h5>Actualizar Tipo de Transacción</h5>
//               </Link>
//             </div>
//             <div className="col-4">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/tipoTransaccion/eliminar"
//               >
//                 <h5>Eliminar Tipo de Transacción</h5>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Usuarios */}
//         <div className="row my-2">
//           <div className="col-12 my-1 py-2">
//             <h3 className="text-center">Acciones con Usuarios</h3>
//           </div>
//           <div className="row m-1 p-1">
//             <div className="col-6">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/usuario/actualizar"
//               >
//                 <h5>Actualizar Usuario</h5>
//               </Link>
//             </div>
//             <div className="col-6">
//             <Link
//                 className="btn btn-primary"
//                 to="/administrar/usuario/eliminar"
//               >
//                 <h5>Eliminar Usuario</h5>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// };


import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Administrador = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {/* Acciones con Agencias */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="text-center mb-3">Acciones con Agencias</h3>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/agencias/crear">
              Crear Agencia
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/agencias/actualizar">
              Actualizar Agencia
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/agencias/eliminar">
              Eliminar Agencia
            </Link>
          </div>
        </div>

        {/* Acciones con Canales de Servicio */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="text-center mb-3">Acciones con Canales de Servicio</h3>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/canales/crear">
              Crear Canal
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/canales/actualizar">
              Actualizar Canal
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/canales/eliminar">
              Eliminar Canal
            </Link>
          </div>
        </div>

        {/* Acciones con Cliente y Tipo de Cliente */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="text-center mb-3">Acciones con Cliente y Tipo de Cliente</h3>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/clientes/crear">
              Crear Cliente
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/clientes/actualizar">
              Actualizar Cliente
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/clientes/eliminar">
              Eliminar Cliente
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/tipoClientes/crear">
              Crear Tipo de Cliente
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/tipoClientes/actualizar">
              Actualizar Tipo de Cliente
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/tipoClientes/eliminar">
              Eliminar Tipo de Cliente
            </Link>
          </div>
        </div>

        {/* Acciones con Motivo de Transacciones y Tipo de Transacciones */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="text-center mb-3">Acciones con Motivo de Transacciones y Tipo de Transacciones</h3>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/motivoTransaccion/crear">
              Crear Motivo de Transacción
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/motivoTransaccion/actualizar">
              Actualizar Motivo de Transacción
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/motivoTransaccion/eliminar">
              Eliminar Motivo de Transacción
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/tipoTransaccion/crear">
              Crear Tipo de Transacción
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/tipoTransaccion/actualizar">
              Actualizar Tipo de Transacción
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/tipoTransaccion/eliminar">
              Eliminar Tipo de Transacción
            </Link>
          </div>
        </div>

        {/* Acciones con Usuarios */}
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="text-center mb-3">Acciones con Usuarios</h3>
          </div>
          <div className="col-md-6 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/usuario/actualizar">
              Actualizar Usuario
            </Link>
          </div>
          <div className="col-md-6 mb-3">
            <Link className="btn btn-primary btn-block" to="/administrar/usuario/eliminar">
              Eliminar Usuario
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
