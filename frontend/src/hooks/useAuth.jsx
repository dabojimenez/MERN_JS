import { useContext } from 'react'; // Con este useContext, es como podriamos obtener los datos
import AuthContext from '../context/AuthProvider';

const useAuth = () => {

    return useContext(AuthContext); // le pasamos los valores del provider
}

export default useAuth;