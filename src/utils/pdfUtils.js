import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';

export function generarPDFTicket(task) {
  console.log("📄 Generando ticket para:", task);

  if (!task) return toast.error("❌ Ticket no válido");

  const doc = new jsPDF();

  // 🎨 Encabezado corporativo
  doc.setFillColor(33, 150, 243); // Azul corporativo
  doc.rect(0, 0, 210, 25, 'F');

  doc.setFontSize(18);
  doc.setTextColor(255);
  doc.setFont('helvetica', 'bold');
  doc.text("SISTEMA DE TICKETS", 105, 16, { align: 'center' });

  // 🕒 Fecha
  const fecha = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha de generación: ${fecha}`, 20, 35);

  // 🧾 Título del documento
  doc.setFontSize(14);
  doc.setTextColor(33, 33, 33);
  doc.setFont('helvetica', 'bold');
  doc.text("Ticket de Tarea", 20, 45);

  // 📋 Datos de la tarea
  const datos = [
    ["ID", task.id],
    ["Título", task.title],
    ["Descripción", task.description || "—"],
    ["Prioridad", task.priority],
    ["Estado", task.status],
    ["Categoría", task.category || "—"],
    ["Fecha límite", task.dueDate || "—"]
  ];

  autoTable(doc, {
    startY: 55,
    body: datos,
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 4,
      textColor: 50,
      font: 'helvetica'
    },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: [33, 150, 243], cellWidth: 40 },
      1: { textColor: 80 }
    },
    headStyles: { fillColor: [240, 240, 240] },
    alternateRowStyles: { fillColor: [250, 250, 250] }
  });

  // ✍️ Firma y pie de página
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("Firma del responsable: ___________________________", 20, pageHeight - 30);

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text("Sistema de Tickets • Todos los derechos reservados © 2025", 20, pageHeight - 15);

  // 💾 Guardar PDF
  doc.save(`ticket_${task.id}.pdf`);
  toast.success("🎉 Ticket generado con éxito");
}
