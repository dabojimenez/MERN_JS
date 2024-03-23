import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    // Nos permitira mostrar los pacientes del veterinario
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [])

    // Funcion nueva, que guardara a los pacientes
    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                console.log(data);
                // cOMO NOS REGRESA EL PACIENTE ACTUALIZADO, filtraremos de los pacientes del provider del listado que tenemos para actualizar en la UI
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; // de esta forma eliminamos los valores de createAt, __v, etc, ya que creara un objeto con los valores que no se encuentran seleccionados
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    // funcion que nos permitira editar
    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    // Eliminar un paciente
    const eliminarPaciente = async (id) => {
        const confirmar = confirm('Deseas eliminar este paciente?')
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                
                // refrescamos la vista para el usuario
                const pacientesActualizados = pacientes.filter( pacientesState => pacientesState._id !== id); // obtenemso todos los pacientes menos el paciente del id que se envio ayer
                // actualziamos la vista del usuario
                setPacientes( pacientesActualizados );
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <PacientesContext.Provider
            value={{
                pacientes, // hacemos disponible sus valores
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
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