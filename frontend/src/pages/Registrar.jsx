import { useState } from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
// import axios from 'axios';


const Registrar = () => {
  // definimso el state para nombre y asi con los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: 'Los Password no son iguales', error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: 'El password es muy corto, agregar minimo 6 caracteres', error: true });
      return;
    }

    setAlerta({});

    // Crear al usuario en la api
    try {
      // Importamos el valor de la variable de entorno
      // const urlBackend = import.meta.env.VITE_BACKEND_URL;
      // const url = `${clienteAxios}/veterinarios`;

      // axios.post => envia una peticion post
      // axios() => es una peticion get por defecto
      // el segundo argumento que toma es la data, pero podemos crear un objeto al vuelo
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      // Los CORS es una forma de proteger la API y esto se define en el bacend
      setAlerta({
        msg : 'Creado Correctamente, revisa tu email',
        error : false
      })
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg,
        error : true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y administra <span className='text-black'>tus Pacientes</span> </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {/* Mostraremos de ofrma condicional, si existe mendaje se muestra si no existe mensaje no se muestra */}
        {/* Alerta que se mostrara en la pantalla */}
        {msg &&
          <Alerta
            alerta={alerta}
          />
        }

        <form
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Tu Nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email de Registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'>
              Password
            </label>
            <input
              type='password'
              placeholder='Tu Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'>
              Repetir Password
            </label>
            <input
              type='password'
              placeholder='Repite tu Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value={'Crear Cuenta'}
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto '
          >
          </input>
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-500'
            to='/'>Ya tienes una cuenta? Inicia Sesión</Link>
          <Link
            className='block text-center my-5 text-gray-500'
            to='/olvide-password'>Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar