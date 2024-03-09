import { useContext } from 'react'; // Con este useContext, es como podriamos obtener los datos
import PacientesContext from '../context/PacientesProvider';

const usePacientes = () => {

    return useContext(PacientesContext); // le pasamos los valores del provider
}

export default usePacientes;