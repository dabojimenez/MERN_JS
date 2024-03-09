import { useState, useEffect, createContext} from 'react'; // createContext, nos permite crear un contexto para poder acceder al state de forma global
import clienteAxios from '../config/axios';

const AuthContext = createContext();// tendra ciertas funciones para habilitar contextApi

// funcion similar a un componente, en el cual podra tener a los hijos
// children => defnimos los hijos
const AuthProvider = ({children}) => {
    // Aqui arriba podemos definir el state que estara de forma global
    const [auth, setAuth] = useState({});
    // para validar el inico d ela carga
    const [cargando, setCargando] = useState(true);

    // useefect, para cuando cargue la app
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            // si no hay un token detiene la ejecucion
            if (!token) {
                setCargando(false);
                return;
            }

            // creamos los headers
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // le pasamos la autorización bearer
                    Authorization: `Bearer ${token}`,
                }
            }
            
            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data); // enviamso al state la informacion del usuario
            } catch (error) {
                console.log(error.response);
                // console.log(error.esponse.data.msg);
                setAuth({}); // si algo pasa lo mantendremos vacio
            }

            // Si ya finalizo la carga cambiamos el statado
            setCargando(false);
        }

        autenticarUsuario();
    }, [])

    
    return(
        // Retornamos el context y con el provider
        <AuthContext.Provider
            // le pasaos un objeto, y le indicamos que se pone a dispocicion. Podemos pasar funciones, que deben ser como expresions lambda
            value={{
                auth,
                setAuth,
                cargando, // lo hacemos disponible en los otros componentes
            }}
        >
            {/* Aqui se colocan todo los hijos que este rodeando el <AuthProvider> */}
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider, // es el que hara disponible los datos en todos los componentes
}

export default AuthContext;