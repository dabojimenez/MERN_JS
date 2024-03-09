import { useState } from 'react'
import Formulario from '../components/Formulario'
import ListadoPacientes from '../components/ListadoPacientes'


function AdministrarPacientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <div className='flex flex-col md:flex-row'>
      {/* Formulario de pacientes */}

      <button
        type='button'
        className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden'
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
      {/* le agregamos el siguiente codigo, para mostrar o ocultar el formulario */}
      <div className={`${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario/>
      </div>
      {/* Fin Formulario de pacientes */}


      {/* Listado pacientes */}
      <div className='md:w-1/2 lg:w-3/5'>
        <ListadoPacientes/>
      </div >
      {/* Fin Listado pacientes */}

    </div>
  )
}

export default AdministrarPacientes