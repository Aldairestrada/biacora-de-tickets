import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './Documentacion.css';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import { useTranslation } from 'react-i18next';

function Documentacion() {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generarGuiaPDF = () => {
    applyPlugin(jsPDF);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(t('documentation.pdfTitle'), 14, 20);

    const contenido = [
      [t('documentation.whatIs'), t('documentation.whatIsDesc')],
      [t('documentation.ticketTypes'), t('documentation.ticketTypesDesc')],
      [t('documentation.flow'), t('documentation.flowDesc')],
      [t('documentation.fields'), t('documentation.fieldsDesc')]
    ];

    doc.autoTable({
      startY: 30,
      head: [[t('documentation.tableHeaderTopic'), t('documentation.tableHeaderDescription')]],
      body: contenido,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: 50 },
        1: { textColor: 80 }
      }
    });

    doc.save('guia_documentacion_tickets.pdf');
  };

  return (
    <div className="dashboard-container">
      {window.innerWidth <= 768 && (
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {isSidebarOpen && <Sidebar />}

      <main className={`main-content ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <h2 className="doc-title">{t('documentation.title')}</h2>

        <section className="doc-section">
          <h3>🎯 {t('documentation.objectiveTitle')}</h3>
          <p>{t('documentation.objectiveDesc')}</p>
        </section>

        <section className="doc-section">
          <h3>✅ {t('documentation.correctExample')}</h3>
          <div className="doc-card doc-correct">
            <strong>{t('titulo')}:</strong> {t('documentation.correctTitle')}<br />
            <strong>{t('dashboard.description')}:</strong> {t('documentation.correctDescription')}<br />
            <strong>{t('dashboard.priority')}:</strong> {t('dashboard.priority_alta')}<br />
            <strong>{t('categoria')}:</strong> {t('documentation.correctCategory')}
          </div>
        </section>

        <section className="doc-section">
          <h3>⚠️ {t('documentation.incorrectExample')}</h3>
          <div className="doc-card doc-incorrect">
            <strong>{t('titulo')}:</strong> {t('documentation.incorrectTitle')}<br />
            <strong>{t('dashboard.description')}:</strong> {t('documentation.incorrectDescription')}<br />
            <strong>{t('dashboard.priority')}:</strong> {t('dashboard.priority_media')}<br />
            <strong>{t('categoria')}:</strong> —
          </div>
        </section>

        <section className="doc-section">
          <h3>📝 {t('documentation.fieldsTitle')}</h3>
          <ul>
            <li><strong>{t('titulo')}:</strong> {t('documentation.fieldTitleDesc')}</li>
            <li><strong>{t('dashboard.description')}:</strong> {t('documentation.fieldDescriptionDesc')}</li>
            <li><strong>{t('dashboard.priority')}:</strong> {t('documentation.fieldPriorityDesc')}</li>
            <li><strong>{t('categoria')}:</strong> {t('documentation.fieldCategoryDesc')}</li>
          </ul>
        </section>

        <section className="doc-section">
          <h3>📄 {t('documentation.downloadableGuide')}</h3>
          <button onClick={generarGuiaPDF} className="btn-pdf">
            {t('documentation.downloadPDF')}
          </button>
        </section>
      </main>
    </div>
  );
}

export default Documentacion;
