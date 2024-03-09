import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RutaProtegida() {
    const { auth, cargando } = useAuth(); // extraemos toda la ifnromacion pertenenciente a ese context
    // console.log(auth);
    // console.log(auth.veterinario.nombre);
    // console.log(cargando);

    if (cargando) return 'Cargando...';

    return (
        <>
            <Header/>

            {/* validmaos que si auth tiene la ifnromacion del usuario, muetsre e autlet, caso contrario se lo redirige a otra apgina con Navigate */}
            {/* auth?._id, le colocamos ?, permitiendo que no sea null y no truene la palicacion  */}
            {auth?._id ? (<main className='container mx-auto mt-10'> <Outlet /> </main>) : <Navigate to={'/'}/>}
            <Footer/>
        </>
    )
}

export default RutaProtegida