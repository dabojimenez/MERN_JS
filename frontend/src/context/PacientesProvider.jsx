import { createContext, useState, useEffect} from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);

    // Funcion nueva, que guardara a los pacientes
    const guardarPaciente = async (paciente) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/pacientes', paciente, config);

            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; // de esta forma eliminamos los valores de createAt, __v, etc, ya que creara un objeto con los valores que no se encuentran seleccionados
            setPacientes([pacienteAlmacenado, ...pacientes])
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
    return(
        <PacientesContext.Provider
            value={{
                pacientes, // hacemos disponible sus valores
                guardarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider,
}

export default PacientesContext;