// rafce + tab => nos crea un componente de forma directa con su export defaul

import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    // de esta forma es un fragment y no generara codigo html
    <>
        <h1>Administrar de Pacientes de Veterinario</h1>
        {/* Muestra el contenido de lo que tiene como hijos*/}
        <Outlet />
    </>
  )
};

export default AuthLayout;