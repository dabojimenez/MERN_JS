import {
  BrowserRouter, // Siempre debe estar, ya que es el padre
  Routes, // Permite agrupar diferentes rutas
  Route  // Es para una ruta en especifico
} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import OlvidePassword from "./pages/OlvidePassword";
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import NuevoPassword from "./pages/NuevoPassword";
import { AuthProvider } from './context/AuthProvider';

function App() {

  // Obtencion de los valores de variables de entorno
  // console.log(import.meta.env.VITE_BACKEND_URL); // valida
  // console.log(import.meta.env.IMAGENES_URL); // No valida
  return (
    <BrowserRouter>
      {/* // Debemos rodear todo con el provider o el contexto */}
      <AuthProvider>
        <Routes>
          {/* Route, lo podmeos definir como ciertos layouts para determinado grupo de páginas. Podemos definir cierto diseno en comun */}
          {/* element => va a ser la pagina principal y cargara lo que se le pasa en el element*/}
          {/* Route, nos permite agrupar lo que este relacionado con la autenticacion */}
          {/* AuthLayout, es el componente padre y sus hijos pueden tener su diseno individial, biene a ser como el master pages */}
          <Route path="/" element={<AuthLayout />}>
            {/* index, le dice que es el primer componente */}
            <Route index element={<Login />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          {/* Podremos tener un dasbor totalmente diferente al del area publica de esta forma */}
          {/* <Route path="/admin" element={<AuthLayout/>}>
          <Route index element={<Login/>} />
          <Route path="olvide-password" element={<OlvidePassword/>}/>
          <Route path="registrar" element={<Registrar/>}/>
          <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
        </Route> */}

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
