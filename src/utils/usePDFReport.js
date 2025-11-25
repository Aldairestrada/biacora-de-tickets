import { jsPDF } from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';

export function generarReporteGeneral(tickets = [], t) {
  applyPlugin(jsPDF); // ✅ Enlaza el plugin correctamente

  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setFontSize(18);
  doc.text(t('reporte_general_titulo'), 14, 20);

  const fecha = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`${t('generado_el')}: ${fecha}`, 14, 28);

  // 🧾 Tabla principal con todos los tickets
  const rows = tickets.map(ticket => [
  String(ticket.id || '').slice(0, 6),
    ticket.title,
    ticket.priority,
    ticket.status,
    ticket.category || '—',
    ticket.dueDate || '—'
  ]);

  doc.autoTable({
    startY: 35,
    head: [[t('id'), t('titulo'), t('prioridad'), t('estado'), t('categoria'), t('fecha_limite')]],
    body: rows,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255, halign: 'center' },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });

  // 📊 Resumen de totales por prioridad y estado
  const prioridades = ['alta', 'media', 'baja'];
  const estados = ['pendiente', 'proceso', 'resuelto'];

  const resumen = [
    [t('prioridad'), ...prioridades.map(p => t(p)), t('total')],
    [
      t('cantidad'),
      ...prioridades.map(p => tickets.filter(tk => tk.priority === p).length),
      tickets.length
    ],
    [],
    [t('estado'), ...estados.map(e => t(e)), t('total')],
    [
      t('cantidad'),
      ...estados.map(e => tickets.filter(tk => tk.status === e).length),
      tickets.length
    ]
  ];

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    body: resumen,
    theme: 'plain',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold' } }
  });

  // 🖊️ Pie de firma y cierre
  const pageHeight = doc.internal.pageSize.height;
  doc.text(`${t('firma')}: ___________________________`, 14, pageHeight - 20);
  doc.text('Sistema de Tickets - © 2025', 14, pageHeight - 10);
  doc.save('reporte_general_tickets.pdf');
}

export function generarReporteIndividual(ticket, t) {
  applyPlugin(jsPDF);

  const doc = new jsPDF('p', 'mm', 'a4');
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
  doc.text('Sistema de Tickets - © 2025', 14, pageHeight - 10);
  doc.save(`ticket_${ticket.id}.pdf`);
}
