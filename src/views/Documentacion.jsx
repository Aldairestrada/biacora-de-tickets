import Sidebar from '../components/Sidebar';
import './Documentacion.css';
import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';

function Documentacion() {
  const generarGuiaPDF = () => {
    applyPlugin(jsPDF);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Guía de uso del sistema de tickets', 14, 20);

    const contenido = [
      ['¿Qué es?', 'Sistema para gestionar reportes e incidencias'],
      ['Tipos de Tickets', 'Error técnico, solicitud interna, sugerencia'],
      ['Flujo de atención', 'Creación → Asignación → Resolución → Cierre'],
      ['Campos importantes', 'Título, descripción, prioridad, categoría']
    ];

    doc.autoTable({
      startY: 30,
      head: [['Tema', 'Descripción']],
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
      <Sidebar />
      <main className="main-content">
        <h2 className="doc-title"> Guía de documentación de tickets</h2>

        <section className="doc-section">
          <h3>🎯 Objetivo del sistema</h3>
          <p>Registrar, atender y resolver reportes internos de forma organizada.</p>
        </section>

        <section className="doc-section">
          <h3>✅ Ejemplo correcto</h3>
          <div className="doc-card doc-correct">
            <strong>Título:</strong> Error al subir archivo<br />
            <strong>Descripción:</strong> Al subir archivo .png muestra error 500<br />
            <strong>Prioridad:</strong> Alta<br />
            <strong>Categoría:</strong> Carga
          </div>
        </section>

        <section className="doc-section">
          <h3>⚠️ Ejemplo incorrecto</h3>
          <div className="doc-card doc-incorrect">
            <strong>Título:</strong> Ayuda<br />
            <strong>Descripción:</strong> No carga<br />
            <strong>Prioridad:</strong> Media<br />
            <strong>Categoría:</strong> —
          </div>
        </section>

        <section className="doc-section">
          <h3>📝 Campos y significados</h3>
          <ul>
            <li><strong>Título:</strong> Breve resumen del incidente</li>
            <li><strong>Descripción:</strong> Explicación clara y detallada</li>
            <li><strong>Prioridad:</strong> Nivel de urgencia (Alta, Media, Baja)</li>
            <li><strong>Categoría:</strong> Área afectada (Login, Reportes, Configuración…)</li>
          </ul>
        </section>

        <section className="doc-section">
          <h3>📄 Guía descargable</h3>
          <button onClick={generarGuiaPDF} className="btn-pdf">Descargar PDF</button>
        </section>
      </main>
    </div>
  );
}

export default Documentacion;
