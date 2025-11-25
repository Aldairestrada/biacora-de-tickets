import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar_admin";
import "./HistorialCorreos.css";
import { useTranslation } from "react-i18next";

const HistorialCorreos = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost/api_tickets/getEmailLogs.php")
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(t('emailHistory.loadError'), err));
  }, []);

  const handleExportCSV = () => {
    window.open("http://localhost/api_tickets/exportEmailLogsCSV.php", "_blank");
  };

  const handleExportPDF = () => {
    window.open("http://localhost/api_tickets/exportEmailLogsPDF.php", "_blank");
  };

  return (
    <div className="seguimiento-layout">
      <Sidebar />
      <main className="seguimiento-main">
        <h1> {t('emailHistory.title')}</h1>
        <div className="export-buttons">
          <button onClick={handleExportCSV}>📄 {t('emailHistory.exportCSV')}</button>
          <button onClick={handleExportPDF}>🧾 {t('emailHistory.exportPDF')}</button>
        </div>
        <table className="task-table">
          <thead>
            <tr>
              <th>{t('emailHistory.id')}</th>
              <th>{t('emailHistory.ticket')}</th>
              <th>{t('emailHistory.recipient')}</th>
              <th>{t('emailHistory.date')}</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4">{t('emailHistory.noRecords')}</td>
              </tr>
            ) : (
              logs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.ticket_title || log.ticket_id}</td>
                  <td>{log.recipient_email}</td>
                  <td>{log.sent_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default HistorialCorreos;
