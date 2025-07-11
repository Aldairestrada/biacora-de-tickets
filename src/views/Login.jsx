import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await axios.post('http://localhost/api_tickets/login.php', formData);

      if (res.data.status === 'success') {
        localStorage.setItem('auth', 'true');
        navigate('/dashboard');
      } else {
        alert(res.data.message || 'Error en el inicio de sesión');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="login-wrapper"> {/* Nuevo contenedor para estilos exclusivos */}
      <div className="login-container">
        <h2>Acceso Empresarial</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo corporativo"
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
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
