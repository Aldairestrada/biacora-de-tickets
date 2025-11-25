import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Registro from './views/REGISTRO_US-ADM/registro'; // Asegúrate de tener este componente
import Reporte from './views/Reporte';
import Seguimiento from './views/Seguimiento';
import HistorialCorreos from './views/HistorialCorreos';
import Configuracion from './views/Configuracion';
import Documentacion from './views/Documentacion';
import AdminDashboard from './views/admin_dashboard';
import ConfiguracionAdmin from './views/Configuracion_admin';
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
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/reportes" element={<Reporte />} />
                <Route path="/registro" element={<Registro />} />
        <Route path='/seguimiento' element={<Seguimiento/>}/>
        <Route path='/HistorialCorreos' element={<HistorialCorreos/>} />
        <Route path="/documentacion" element={<Documentacion />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/configuracion_admin" element={<ConfiguracionAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
