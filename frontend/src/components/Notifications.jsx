import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notification.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // plugin pour générer les tableaux automatiquement
import autoTable from 'jspdf-autotable';

// importe la fonction autoTable
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedFiche, setSelectedFiche] = useState(null);
  const navigate = useNavigate(); // <- initialisation du hook
  /* ===================== CHARGER NOTIFICATIONS ===================== */

  const fetchNotifications = async () => {
    try {
      const res1 = await fetch(
        'http://localhost:5000/api/inspections/tech/notifications'
      );

      const res2 = await fetch(
        'http://localhost:5000/api/fiche_papi/notifications'
      );

      const data1 = res1.ok ? await res1.json() : [];
      const data2 = res2.ok ? await res2.json() : [];

      setNotifications([
        ...(Array.isArray(data1) ? data1 : []),
        ...(Array.isArray(data2) ? data2 : []),
      ]);
    } catch (err) {
      console.error('Erreur notifications :', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  /* ===================== VOIR INSPECTION ===================== */

  const voirFiche = async (id) => {
    try {
      // ✅ Utiliser la route tech correcte
      const res = await fetch(
        `http://localhost:5000/api/inspections/tech/${id}`
      );

      if (!res.ok) {
        console.error('Erreur récupération fiche :', res.status);
        return;
      }

      const data = await res.json();
      console.log('FICHE RECUE 👉', data);

      setSelectedFiche(data);

    } catch (err) {
      console.error(err);
    }
  };
  /* ===================== VOIR PAPI ===================== */

  const voirFichePapi = async (ficheId, notifId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/fiche_papi/${ficheId}`
      );

      const data = await res.json();
      setSelectedFiche(data);

      await fetch(
        `http://localhost:5000/api/fiche_papi/notifications/${notifId}/read`,
        { method: 'PUT' }
      );

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };
  /* ===================== VALIDATION ===================== */
/*
  const validerFiche = async (id) => {
    try {
      await fetch('http://localhost:5000/api/inspections/valider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inspectionId: id }),
      });
      alert('Fiche validée ✅');
      setSelectedFiche(null);
      fetchNotifications();

      // Rediriger vers l'historique admin
      navigate('/historiques');
    } catch (err) {
      console.error(err);
    }
  };
  */
 
 const validerFiche = async (id) => {
  try {

    let url = "";
    let body = {};

    // déterminer le type de fiche
    if (selectedFiche.verifications) {
      // FICHE PAPI
      url = "http://localhost:5000/api/fiche_papi/valider";
      body = { ficheId: id };
    } else {
      // INSPECTION JOURNALIERE
      url = "http://localhost:5000/api/inspections/valider";
      body = { inspectionId: id };
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    alert("Fiche validée et enregistrée dans l'historique ✅");

    setSelectedFiche(null);

    fetchNotifications();

    navigate("/historiques", {
      state: { alertMessage: "Nouvelle fiche validée et ajoutée à l'historique" }
    });

  } catch (err) {
    console.error(err);
  }
};

  /* ===================== PDF ===================== */
 const exportPDF = () => {
  if (!selectedFiche) return;

  const doc = new jsPDF();
  doc.setFontSize(14);

  if (selectedFiche.verifications) {
    // ===== PDF FICHE PAPI =====
    doc.text(`Fiche PAPI Mensuelle`, 14, 15);
    doc.setFontSize(11);
    doc.text(`📅 Date : ${new Date(selectedFiche.date).toLocaleDateString()}`, 14, 22);
    doc.text(`👨‍🔧 Techniciens : ${selectedFiche.techniciens}`, 14, 28);
    doc.text(`📝 Observations : ${selectedFiche.observations}`, 14, 34);

    // Colonnes pour PAPI
    const tableColumn = ['Élément', '11', '12', '21', '22', '31', '32', '41', '42'];

    // Approche 09
    const tableRows09 = selectedFiche.verifications.map(v => [
      v.element,
      v.v11_09 || '',
      v.v12_09 || '',
      v.v21_09 || '',
      v.v22_09 || '',
      v.v31_09 || '',
      v.v32_09 || '',
      v.v41_09 || '',
      v.v42_09 || '',
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows09,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 10 },
    });

    // Approche 27
    const startY = doc.lastAutoTable.finalY + 10; // pour éviter chevauchement
    const tableRows27 = selectedFiche.verifications.map(v => [
      v.element,
      v.v11_27 || '',
      v.v12_27 || '',
      v.v21_27 || '',
      v.v22_27 || '',
      v.v31_27 || '',
      v.v32_27 || '',
      v.v41_27 || '',
      v.v42_27 || '',
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows27,
      startY,
      theme: 'grid',
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 10 },
    });

    doc.save(`Fiche_PAPI_${new Date(selectedFiche.date).toISOString()}.pdf`);

  } else {
    // ===== PDF INSPECTION =====
    doc.text(`Fiche Inspection journalière ${selectedFiche.matricule}`, 14, 15);
    doc.setFontSize(11);
    doc.text(`📅 Date : ${new Date(selectedFiche.date).toLocaleString()}`, 14, 22);
    doc.text(`📌 Période : ${selectedFiche.periode}`, 14, 28);

    const tableColumn = [
      'Zone', 'Élément', 'État Matin', 'Nbr NF', 'Observation', 'Intervention',
      'État Nuit', 'Nbr NF', 'Observation', 'Intervention'
    ];

    const tableRows = (selectedFiche.inspections || []).map(item => [
      item.zone,
      item.element,
      item.matin?.etat || '',
      item.matin?.nbrNF || 0,
      item.matin?.observation || '',
      item.matin?.intervention || '',
      item.nuit?.etat || '',
      item.nuit?.nbrNF || 0,
      item.nuit?.observation || '',
      item.nuit?.intervention || ''
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 10 },
    });

    doc.save(`Fiche_Inspection_${selectedFiche.matricule}.pdf`);
  }
};

  return (
    <div className="notification-page">
      <h2>🔔 Notifications</h2>

      <div className="notif-list">
        {notifications.length === 0 ? (
          <p>Aucune notification</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="notif-card">
              <p>{n.message}</p>
              <button
                onClick={() =>
                  n.type === 'fiche_papi'
                    ? voirFichePapi(n.dataId, n._id)
                    : voirFiche(n.dataId, n._id)
                }
              >
                Voir fiche
              </button>
            </div>
          ))
        )}
      </div>

      {/* ===================== MODAL ===================== */}

      {selectedFiche && (
        <div className="modal">
          <div className="modal-content large">
            {/* ================= FICHE PAPI ================= */}
            {selectedFiche.verifications ? (
              <>
                <h3>Fiche PAPI Mensuelle</h3>

                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Techniciens : {selectedFiche.techniciens}</p>
                <p>📝 Observations : {selectedFiche.observations}</p>

                <h4>Approche 09</h4>

                <table>
                  <thead>
                    <tr>
                      <th>Élément</th>
                      <th>11</th>
                      <th>12</th>
                      <th>21</th>
                      <th>22</th>
                      <th>31</th>
                      <th>32</th>
                      <th>41</th>
                      <th>42</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.verifications.map((v, i) => (
                      <tr key={i}>
                        <td>{v.element}</td>
                        <td>{v.v11_09}</td>
                        <td>{v.v12_09}</td>
                        <td>{v.v21_09}</td>
                        <td>{v.v22_09}</td>
                        <td>{v.v31_09}</td>
                        <td>{v.v32_09}</td>
                        <td>{v.v41_09}</td>
                        <td>{v.v42_09}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4>Approche 27</h4>

                <table>
                  <thead>
                    <tr>
                      <th>Élément</th>
                      <th>11</th>
                      <th>12</th>
                      <th>21</th>
                      <th>22</th>
                      <th>31</th>
                      <th>32</th>
                      <th>41</th>
                      <th>42</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.verifications.map((v, i) => (
                      <tr key={i}>
                        <td>{v.element}</td>
                        <td>{v.v11_27}</td>
                        <td>{v.v12_27}</td>
                        <td>{v.v21_27}</td>
                        <td>{v.v22_27}</td>
                        <td>{v.v31_27}</td>
                        <td>{v.v32_27}</td>
                        <td>{v.v41_27}</td>
                        <td>{v.v42_27}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : (
              <>
                {/* ===================== FICHE INSPECTION ===================== */}

                <h3>
                  Fiche Inspection journaliere de balisage{' '}
                  {selectedFiche.matricule}
                </h3>
                <p>📅 Date : {new Date(selectedFiche.date).toLocaleString()}</p>
                <p>📌 Période : {selectedFiche.periode}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Élément</th>

                      <th>État Matin</th>
                      <th>Nbr NF</th>
                      <th>Observation</th>
                      <th>Intervention</th>

                      <th>État Nuit</th>
                      <th>Nbr NF</th>
                      <th>Observation</th>
                      <th>Intervention</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/**  {selectedFiche.inspections.length === 0 ? (*/}
                    {!selectedFiche?.inspections ||
                    selectedFiche.inspections.length === 0 ? (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>
                          Aucune inspection envoyée
                        </td>
                      </tr>
                    ) : (
                      selectedFiche.inspections.map((item, i) => (
                        <tr key={i}>
                          <td>{item.zone}</td>
                          <td>{item.element}</td>

                          {/* MATIN */}
                          <td>{item.matin?.etat || ''}</td>
                          <td>{item.matin?.nbrNF || 0}</td>
                          <td>{item.matin?.observation || ''}</td>
                          <td>{item.matin?.intervention || ''}</td>

                          {/* NUIT */}
                          <td>{item.nuit?.etat || ''}</td>
                          <td>{item.nuit?.nbrNF || 0}</td>
                          <td>{item.nuit?.observation || ''}</td>
                          <td>{item.nuit?.intervention || ''}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
