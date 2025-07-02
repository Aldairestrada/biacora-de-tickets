import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Reporte from './views/Reporte';
import Configuracion from './views/Configuracion'; // 👈 importa tu nueva vista


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reportes" element={<Reporte />} />
        <Route path="/configuracion" element={<Configuracion />} /> {/* ✅ nueva ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
