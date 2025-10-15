import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registro.css';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState('usuario');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('tipo', tipo);

    try {
      const res = await axios.post('http://localhost/api_tickets/registro.php', formData);

      if (res.data.status === 'success') {
        alert('Registro exitoso');
        navigate('/');
      } else {
        alert(res.data.message || 'Error en el registro');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="registro-wrapper">
      <div className="registro-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegistro}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="usuario">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
