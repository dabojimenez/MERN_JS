import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RutaProtegida() {
    const { auth, cargando } = useAuth(); // extraemos toda la ifnromacion pertenenciente a ese context
    // console.log(auth);
    // console.log(auth.veterinario.nombre);
    // console.log(cargando);

    if (cargando) return 'Cargando...';

    return (
        <>
            <h1>Esta es una ruta protegida</h1>

            {/* validmaos que si auth tiene la ifnromacion del usuario, muetsre e autlet, caso contrario se lo redirige a otra apgina con Navigate */}
            {/* auth?._id, le colocamos ?, permitiendo que no sea null y no truene la palicacion  */}
            {auth.veterinario?._id ? <Outlet /> : <Navigate to={'/'}/>}

        </>
    )
}

export default RutaProtegida