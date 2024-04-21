import { useAuthStore } from "../../hooks";

export const Navbar = () => {

  const { startLogout, user } = useAuthStore();

  const regresar = () => {
    window.history.back();
  }


  return (
    <>
      <div className="navbar navbar-dark bg-primary mb-4 px-4">
        <button className="btn btn-light" onClick={regresar}>
        <i className="fa-solid fa-arrow-left"></i>
        &nbsp;
        Regresar
        </button>
        <span className="navbar-brand">
        <i className="fa-solid fa-building-columns"></i>
          &nbsp;
          &nbsp;
          { user.name }
        </span>

        <button onClick={ startLogout } className="btn btn-danger">
          <i className="fa fa-sign-out-alt"></i>
          &nbsp;
          <span>Salir</span>
        </button>
      </div>
    </>
  );
};
