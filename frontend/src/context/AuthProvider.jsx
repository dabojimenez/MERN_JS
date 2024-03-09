import { useState, useEffect, createContext} from 'react'; // createContext, nos permite crear un contexto para poder acceder al state de forma global

const AuthContext = createContext();// tendra ciertas funciones para habilitar contextApi

// funcion similar a un componente, en el cual podra tener a los hijos
// children => defnimos los hijos
const AuthProvider = ({children}) => {
    // Aqui arriba podemos definir el state que estara de forma global
    const [auth, setAuth] = useState({});

    
    return(
        // Retornamos el context y con el provider
        <AuthContext.Provider
            // le pasaos un objeto, y le indicamos que se pone a dispocicion. Podemos pasar funciones, que deben ser como expresions lambda
            value={{
                auth,
                setAuth
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