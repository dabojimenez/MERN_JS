import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // el hook de useParams, nos permite leer los parametros de la ruta
import axios from 'axios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  // UseState
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);// por defecto la cuenta aun no va estar confirmada
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState([]);

  
  // Parametros de la url
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;
        const { data } = await axios(url);

        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      setCargando(false);
    }

    confirmarCuenta();
  }, [])


  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Comienza a Administrar <span className='text-black'>tus Pacientes</span> </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando &&
          <Alerta
            alerta={alerta}
          />
        }

        {cuentaConfirmada &&
          <Link
          className='block text-center my-5 text-gray-500'
          to='/'>Iniciar Sesión</Link>
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta