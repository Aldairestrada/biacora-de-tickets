import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar_admin";
import "./Seguimiento.css";
import { useTranslation } from "react-i18next";

const Seguimiento = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost/api_tickets/getTickets.php")
      .then(res => res.json())
      .then(data => {
        console.log("Tickets cargados:", data);
        setTickets(data);
      });
  }, []);

  const handleSend = async () => {
    if (!email || !selectedTicket) {
      setStatus(t('seguimiento.validationError'));
      return;
    }

    try {
      const res = await fetch("http://localhost/api_tickets/sendTicket.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: selectedTicket.id,
          to: email
        })
      });

      if (res.ok) {
        setStatus(t('seguimiento.success'));
        setEmail("");
        setSelectedTicket(null);
      } else {
        setStatus(t('seguimiento.sendError'));
      }
    } catch {
      setStatus(t('seguimiento.connectionError'));
    }
  };

  return (
    <div className="seguimiento-layout">
      <Sidebar />
      <main className="seguimiento-main">
        <h1 className="seguimiento-title">{t('seguimiento.title')}</h1>

        <section className="seguimiento-panel">
          <div className="ticket-selector">
            <label>{t('seguimiento.selectTicket')}</label>
            <select
              value={selectedTicket?.id || ""}
              onChange={(e) => {
                const ticket = tickets.find(t => t.id === e.target.value);
                setSelectedTicket(ticket || null);
              }}
            >
              <option value="">{t('seguimiento.selectPlaceholder')}</option>
              {tickets.map(ticket => (
                <option key={ticket.id} value={ticket.id}>
                  {ticket.asunto} ({ticket.prioridad})
                </option>
              ))}
            </select>
          </div>

          <div className="email-form">
            <label>{t('seguimiento.emailLabel')}</label>
            <input
              type="email"
              placeholder={t('seguimiento.emailPlaceholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="send-btn" onClick={handleSend}>
              {t('seguimiento.sendButton')}
            </button>
            {status && <p className="seguimiento-status">{status}</p>}
          </div>
        </section>

        {selectedTicket && (
          <section className="ticket-details">
            <h2>{selectedTicket.asunto}</h2>
            <ul>
              <li><strong>{t('dashboard.description')}:</strong> {selectedTicket.descripcion}</li>
              <li><strong>{t('dashboard.priority')}:</strong> {selectedTicket.prioridad}</li>
              <li><strong>{t('dashboard.category')}:</strong> {selectedTicket.category}</li>
              <li><strong>{t('dashboard.dueDate')}:</strong> {selectedTicket.dueDate}</li>
              <li><strong>{t('dashboard.status')}:</strong> {selectedTicket.status}</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default Seguimiento;
