import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import './Configuracion.css';

function Configuracion() {
  const { t, i18n } = useTranslation();

  const [nombre, setNombre] = useState('');
  const [idioma, setIdioma] = useState('es');
  const [notificaciones, setNotificaciones] = useState(false);

  // Cargar configuración almacenada
  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('configuracion'));
    if (savedConfig) {
      setNombre(savedConfig.nombre);
      setIdioma(savedConfig.idioma);
      setNotificaciones(savedConfig.notificaciones);
      i18n.changeLanguage(savedConfig.idioma || 'es');
    }
  }, [i18n]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      nombre,
      idioma,
      notificaciones
    };
    localStorage.setItem('configuracion', JSON.stringify(config));
    i18n.changeLanguage(idioma);
    localStorage.setItem('lang', idioma);
    alert(t('guardar') + ' ✅');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="config-title">⚙️ {t('configuracion')}</h2>

        <section className="config-section">
          <h3>{t('preferencias')}</h3>
          <form className="config-form" onSubmit={handleSubmit}>
          

            <div className="form-group">
              <label>{t('idioma')}:</label>
              <select
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            

            <button type="submit" className="config-btn">
              {t('guardar')}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Configuracion;
