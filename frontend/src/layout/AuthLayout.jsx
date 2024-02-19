// rafce + tab => nos crea un componente de forma directa con su export defaul

import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
    return (
        // de esta forma es un fragment y no generara codigo html
        <>
            <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center'>
                {/* Muestra el contenido de lo que tiene como hijos*/}
                <Outlet />
            </main>

        </>
    )
};

export default AuthLayout;