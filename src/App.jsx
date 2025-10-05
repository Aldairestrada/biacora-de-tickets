import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Reporte from './views/Reporte';
import Seguimiento from './views/Seguimiento';
import HistorialCorreos from './views/HistorialCorreos';
import Configuracion from './views/Configuracion';
import Documentacion from './views/Documentacion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './views/Login';

function App() {
  return (
<Router basename="/biacora-de-tickets">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="/reportes" element={<Reporte />} />
        <Route path='/seguimiento' element={<Seguimiento/>}/>
        <Route path='/HistorialCorreos' element={<HistorialCorreos/>} />
        <Route path="/documentacion" element={<Documentacion />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </Router>
  );
}

export default App;
