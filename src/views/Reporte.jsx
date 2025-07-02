import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import './Reporte.css';

function Reporte() {
  const [tasks, setTasks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost/api_tickets/get_tasks.php');
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.error('Respuesta inesperada:', res.data);
        }
      } catch (err) {
        console.error('Error al cargar datos del reporte:', err);
      }
    };
    fetchData();
  }, []);

  const totalPorEstado = estado => tasks.filter(t => t.status === estado).length;
  const totalPorPrioridad = prioridad => tasks.filter(t => t.priority === prioridad).length;
  const totalPorCategoria = categoria => tasks.filter(t => t.category === categoria).length;
  const categorias = [...new Set(tasks.map(t => t.category).filter(Boolean))];

  const generarReporteGeneral = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(18);
    doc.text(t('reporte_general_titulo'), 14, 20);

    const fecha = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`${t('generado_el')}: ${fecha}`, 14, 28);

    const rows = tasks.map(t => [
      t.id.slice(0, 6),
      t.title,
      t.priority,
      t.status,
      t.category || '—',
      t.dueDate || '—'
    ]);

    doc.autoTable({
      startY: 35,
      head: [[t('id'), t('titulo'), t('prioridad'), t('estado'), t('categoria'), t('fecha_limite')]],
      body: rows,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: 'center' },
      bodyStyles: { textColor: 50 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.text(`${t('firma')}: ___________________________`, 14, pageHeight - 20);
    doc.text("Sistema de Tickets - © 2025", 14, pageHeight - 10);
    doc.save("reporte_general_tickets.pdf");
  };

  const generarReporteIndividual = (id) => {
    const ticket = tasks.find(t => t.id === id);
    if (!ticket) return alert(t('ticket_no_encontrado'));

    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(16);
    doc.text(t('reporte_individual_titulo'), 14, 20);

    const fecha = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`${t('generado_el')}: ${fecha}`, 14, 28);

    const detalles = [
      [t('id'), ticket.id],
      [t('titulo'), ticket.title],
      [t('descripcion'), ticket.description || '—'],
      [t('prioridad'), ticket.priority],
      [t('estado'), ticket.status],
      [t('categoria'), ticket.category || '—'],
      [t('fecha_limite'), ticket.dueDate || '—']
    ];

    doc.autoTable({
      startY: 35,
      body: detalles,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', halign: 'right', textColor: [41, 128, 185] },
        1: { textColor: 50 }
      }
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.text(`${t('firma')}: ___________________________`, 14, pageHeight - 20);
    doc.text("Sistema de Tickets - © 2025", 14, pageHeight - 10);

    doc.save(`ticket_${ticket.id}.pdf`);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <h2 className="reporte-title">📊 {t('reporte_general_titulo')}</h2>

        <div style={{ marginBottom: '2rem' }}>
          <button onClick={generarReporteGeneral} className="btn-reporte">
            📄 {t('generar_reporte_general')}
          </button>

          <select
            onChange={(e) => e.target.value && generarReporteIndividual(e.target.value)}
            className="select-ticket"
            defaultValue=""
          >
            <option value="" disabled>🔍 {t('selecciona_ticket')}</option>
            {tasks.map(t => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.id.slice(0, 6)})
              </option>
            ))}
          </select>
        </div>

        <section className="reporte-section">
          <h3>{t('por_estado')}</h3>
          <div className="reporte-cards">
            <div className="card estado-pendiente">{t('pendientes')}: {totalPorEstado('pendiente')}</div>
            <div className="card estado-proceso">{t('en_proceso')}: {totalPorEstado('proceso')}</div>
            <div className="card estado-resuelto">{t('resueltos')}: {totalPorEstado('resuelto')}</div>
          </div>
        </section>

        <section className="reporte-section">
          <h3>{t('por_prioridad')}</h3>
          <div className="reporte-cards">
            <div className="card prioridad-alta">{t('alta')}: {totalPorPrioridad('alta')}</div>
            <div className="card prioridad-media">{t('media')}: {totalPorPrioridad('media')}</div>
            <div className="card prioridad-baja">{t('baja')}: {totalPorPrioridad('baja')}</div>
          </div>
        </section>

        <section className="reporte-section">
          <h3>{t('por_categoria')}</h3>
          <ul className="reporte-categorias">
            {categorias.map(cat => (
              <li key={cat}><strong>{cat}</strong>: {totalPorCategoria(cat)}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Reporte;
