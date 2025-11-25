import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

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
        const tipo = res.data.tipo; // ✅ El backend devuelve el tipo de usuario

        localStorage.setItem('auth', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userTipo', tipo);

        if (tipo === 'admin') {
          navigate('/admin_dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(res.data.message || 'Error en el inicio de sesión');
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Acceso al Sistema de Tickets</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Ingresar</button>
        </form>

        <div className="register-link">
          <p>¿No tienes cuenta?</p>
          <button onClick={() => navigate('/registro')}>Registrarse</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
