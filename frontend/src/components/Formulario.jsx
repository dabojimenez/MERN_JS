import React from 'react'

function Formulario() {
    return (
        <>
            <p className='text-lg text-center mb-10'>
                Añade tus pacientes y
                {' '}
                <span className='text-indigo-600'>Administralos</span>
            </p>

            {/* Formulario de inputs */}
            <form
                className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
            >
                <div className='mb-5'>
                    <label
                        htmlFor='mascota'
                        className='text-gray-700 uppercase font-bold'
                    >
                        Nombre Mascota
                    </label>
                    <input
                        id='mascota'
                        type='text'
                        placeholder='Nombre de la Mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='propietario'
                        className='text-gray-700 uppercase font-bold'
                    >
                        Nombre Propietario
                    </label>
                    <input
                        id='propietario'
                        type='text'
                        placeholder='Nombre del Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='email'
                        className='text-gray-700 uppercase font-bold'
                    >
                        Email Propietario
                    </label>
                    <input
                        id='email'
                        type='email'
                        placeholder='Email del Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='fecha'
                        className='text-gray-700 uppercase font-bold'
                    >
                        Fecha Alta
                    </label>
                    <input
                        id='fecha'
                        type='date'
                        placeholder='Nombre de la Mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor='sintomas'
                        className='text-gray-700 uppercase font-bold'
                    >
                        Sintomas
                    </label>
                    <textarea
                        id='sintomas'
                        placeholder='Describe los Síntomas'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>

                <input
                    type='submit'
                    value={'Agregar Paciente'}
                    className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
                />
            </form>
        </>
    )
}

export default Formulario