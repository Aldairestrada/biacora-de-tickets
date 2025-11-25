import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Sidebar from '../components/Sidebar_admin';
import './Configuracion.css';

function Configuracion() {
  const { t, i18n } = useTranslation();
  const [idioma, setIdioma] = useState('es');
  const [mensajeExito, setMensajeExito] = useState(false);

  const [adminNombre, setAdminNombre] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [adminConfirmacionVisible, setAdminConfirmacionVisible] = useState(false);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem('configuracion'));
    if (savedConfig?.idioma) {
      setIdioma(savedConfig.idioma);
      i18n.changeLanguage(savedConfig.idioma);
    }
  }, [i18n]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { idioma };
    localStorage.setItem('configuracion', JSON.stringify(config));
    i18n.changeLanguage(idioma);
    localStorage.setItem('lang', idioma);

    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3000);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', adminNombre);
    formData.append('email', adminEmail);
    formData.append('password', adminPassword);
    formData.append('tipo', 'admin');

    try {
      const res = await axios.post('http://localhost/api_tickets/registro_admin.php', formData);
      if (res.data.status === 'success') {
        setAdminNombre('');
        setAdminEmail('');
        setAdminPassword('');
        setAdminModalVisible(false);
        setAdminConfirmacionVisible(true);
        setTimeout(() => setAdminConfirmacionVisible(false), 3000);
      } else {
        alert(res.data.message || t('admin.errorRegister'));
      }
    } catch (err) {
      console.error(err);
      alert(t('admin.connectionError'));
    }
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
                <option value="ja">japones</option>

              </select>
            </div>
            <button type="submit" className="config-btn">
              {t('guardar')}
            </button>
          </form>
        </section>

        {mensajeExito && (
          <div className="mensaje-flotante">
            {t('admin.translationSuccess')}
          </div>
        )}

        <section className="config-section">
          <h3>{t('admin.sectionTitle')}</h3>
          <button className="config-btn" onClick={() => setAdminModalVisible(true)}>
            {t('admin.openModal')}
          </button>
        </section>

        {adminModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{t('admin.modalTitle')}</h3>
              <form className="config-form" onSubmit={handleAdminSubmit}>
                <div className="form-group">
                  <label>{t('admin.nameLabel')}</label>
                  <input
                    type="text"
                    value={adminNombre}
                    onChange={(e) => setAdminNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('admin.emailLabel')}</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('admin.passwordLabel')}</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="config-btn">{t('admin.submit')}</button>
                  <button type="button" className="cancel-btn" onClick={() => setAdminModalVisible(false)}>
                    {t('admin.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {adminConfirmacionVisible && (
          <div className="modal-confirmacion">
            <div className="confirmacion-content">
              {t('admin.successMessage')}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Configuracion;
