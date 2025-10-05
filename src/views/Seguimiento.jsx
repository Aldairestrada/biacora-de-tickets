import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
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
      })
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
    } catch (_) {
      setStatus(t('seguimiento.connectionError'));
    }
  };

  return (
    <div className="seguimiento-layout">
      <Sidebar />
      <main className="seguimiento-main">
        <h1> {t('seguimiento.title')}</h1>

        <section className="seguimiento-lista">
          {tickets.length === 0 ? (
            <p>{t('seguimiento.noTickets')}</p>
          ) : (
            tickets.map(ticket => (
              <div
                key={ticket.id}
                className={`seguimiento-ticket ${ticket.prioridad}`}
                onClick={() => setSelectedTicket(ticket)}
              >
                <h3>{ticket.asunto}</h3>
                <p>{ticket.descripcion.slice(0, 80)}...</p>
                <p><strong>{t('dashboard.status')}:</strong> {ticket.status}</p>
              </div>
            ))
          )}
        </section>

        {selectedTicket && (
          <section className="seguimiento-preview">
            <h2>{selectedTicket.asunto}</h2>
            <p><strong>{t('dashboard.description')}:</strong> {selectedTicket.descripcion}</p>
            <p><strong>{t('dashboard.priority')}:</strong> {selectedTicket.prioridad}</p>
            <p><strong>{t('dashboard.category')}:</strong> {selectedTicket.category}</p>
            <p><strong>{t('dashboard.dueDate')}:</strong> {selectedTicket.dueDate}</p>
            <p><strong>{t('dashboard.status')}:</strong> {selectedTicket.status}</p>
          </section>
        )}

        <section className="seguimiento-formulario">
          <input
            type="email"
            placeholder={t('seguimiento.emailPlaceholder')}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleSend}>{t('seguimiento.sendButton')}</button>
          {status && <p className="seguimiento-status">{status}</p>}
        </section>
      </main>
    </div>
  );
};

export default Seguimiento;
