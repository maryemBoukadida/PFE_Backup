import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notification.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedFiche, setSelectedFiche] = useState(null);
  const navigate = useNavigate();
  const FICHE_PISTE_API = 'http://localhost:5000/api/fiche-piste';
  const FICHE_DGS_API = 'http://localhost:5000/api/fiche-dgs';
  const FICHE_FEUX_API = 'http://localhost:5000/api/feux-obstacles';
  // ===================== CHARGER NOTIFICATIONS =====================
  const fetchNotifications = async () => {
    try {
      const res1 = await fetch(
        'http://localhost:5000/api/inspections/tech/notifications'
      );
      const res2 = await fetch(
        'http://localhost:5000/api/fiche_papi/notifications'
      );
      const res3 = await fetch(
        'http://localhost:5000/api/feux-obstacles/notifications'
      );

      const data1 = res1.ok ? await res1.json() : [];
      const data2 = res2.ok ? await res2.json() : [];
      const data3 = res3.ok ? await res3.json() : [];

      setNotifications([
        ...(Array.isArray(data1) ? data1 : []),
        ...(Array.isArray(data2) ? data2 : []),
        ...(Array.isArray(data3) ? data3 : []),
      ]);
    } catch (err) {
      console.error('Erreur notifications :', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ===================== VOIR FICHE =====================
  const voirFiche = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/inspections/tech/${id}`
      );
      if (!res.ok)
        return console.error('Erreur récupération fiche :', res.status);
      const data = await res.json();
      setSelectedFiche(data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const voirFichePiste = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_PISTE_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche Piste');
      const data = await res.json();
      setSelectedFiche(data);

      await fetch(`http://localhost:5000/api/notifications/${notifId}/read`, {
        method: 'PUT',
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };
  const voirFicheDGS = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_DGS_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche DGS');
      const data = await res.json();
      setSelectedFiche(data);

      // Marquer la notification comme lue
      if (notifId) {
        await fetch(`http://localhost:5000/api/notifications/${notifId}/read`, {
          method: 'PUT',
        });
        fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const voirFicheFeux = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_FEUX_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche Feux');
      const data = await res.json();
      setSelectedFiche(data);
      if (notifId)
        await fetch(`http://localhost:5000/api/notifications/${notifId}/read`, {
          method: 'PUT',
        });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // ===================== VALIDER FICHE =====================
  const validerFiche = async (id) => {
    try {
      let url = '';
      let body = {};

      if (selectedFiche?.verifications) {
        url = 'http://localhost:5000/api/fiche_papi/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.zonePrincipale) {
        url = 'http://localhost:5000/api/fiche-piste/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.dgs) {
        url = 'http://localhost:5000/api/fiche-dgs/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.feuxObstacles) {
        url = 'http://localhost:5000/api/feux-obstacles/valider';
        body = { ficheId: id };
      } else {
        url = 'http://localhost:5000/api/inspections/valider';
        body = { inspectionId: id };
      }

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      alert("Fiche validée et enregistrée dans l'historique ✅");
      setSelectedFiche(null);
      fetchNotifications();
      navigate('/historiques', {
        state: {
          alertMessage: "Nouvelle fiche validée et ajoutée à l'historique",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ===================== EXPORT PDF =====================
  const exportPDF = () => {
    if (!selectedFiche) return;

    const doc = new jsPDF();
    doc.setFontSize(14);

    if (selectedFiche?.verifications) {
      doc.text(`Fiche PAPI Mensuelle`, 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleDateString()}`,
        14,
        22
      );
      doc.text(`👨‍🔧 Techniciens : ${selectedFiche.techniciens || ''}`, 14, 28);
      doc.text(`📝 Observations : ${selectedFiche.observations || ''}`, 14, 34);

      const tableColumn = [
        'Élément',
        '11',
        '12',
        '21',
        '22',
        '31',
        '32',
        '41',
        '42',
      ];
      const tableRows09 = (selectedFiche.verifications || []).map((v) => [
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

      const startY = doc.lastAutoTable.finalY + 10;
      const tableRows27 = (selectedFiche.verifications || []).map((v) => [
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
    } else if (selectedFiche?.zonePrincipale) {
      doc.text(`Fiche Piste : ${selectedFiche.zonePrincipale}`, 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleString()}`,
        14,
        22
      );

      const tableColumn = [
        'Zone',
        'Élément',
        'État',
        'Observation',
        'Intervention',
      ];
      let tableRows = [];
      (selectedFiche.zones || []).forEach((zone) => {
        (zone.verifications || []).forEach((v) => {
          tableRows.push([
            zone.nom,
            v.element,
            v.etat,
            v.observation,
            v.intervention,
          ]);
        });
      });
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });
      doc.save(`Fiche_Piste_${new Date(selectedFiche.date).toISOString()}.pdf`);
    } else {
      doc.text(
        `Fiche Inspection journalière ${selectedFiche.matricule}`,
        14,
        15
      );
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleString()}`,
        14,
        22
      );
      doc.text(`📌 Période : ${selectedFiche.periode || ''}`, 14, 28);

      const tableColumn = [
        'Zone',
        'Élément',
        'État Matin',
        'Nbr NF',
        'Observation',
        'Intervention',
        'État Nuit',
        'Nbr NF',
        'Observation',
        'Intervention',
      ];
      const tableRows = (selectedFiche.inspections || []).map((item) => [
        item.zone,
        item.element,
        item.matin?.etat || '',
        item.matin?.nbrNF || 0,
        item.matin?.observation || '',
        item.matin?.intervention || '',
        item.nuit?.etat || '',
        item.nuit?.nbrNF || 0,
        item.nuit?.observation || '',
        item.nuit?.intervention || '',
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
                onClick={() => {
                  const ficheId = n.dataId || n.ficheId;

                  if (!ficheId) {
                    console.error('ID de fiche manquant :', n);
                    alert("Impossible d'afficher la fiche (ID manquant)");
                    return;
                  }

                  if (n.type === 'fiche_papi') {
                    voirFichePapi(ficheId, n._id);
                  } else if (n.type === 'fichePiste') {
                    voirFichePiste(ficheId, n._id);
                  } else if (n.type === 'fiche_dgs') {
                    voirFicheDGS(ficheId, n._id);
                  } else if (n.type.toLowerCase() === 'feuxobstacles') {
                    voirFicheFeux(ficheId, n._id);
                  } else {
                    voirFiche(ficheId);
                  }
                }}
              >
                Voir fiche
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedFiche && (
        <div className="modal">
          <div className="modal-content large">
            {/* --- FICHE DGS --- */}
            {selectedFiche.dgs ? (
              <>
                <h3>Fiche DGS Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicien || ''}</p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observationGenerale || ''}
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>DGS</th>
                      <th>Fenêtre</th>
                      <th>Afficheur</th>
                      <th>Boitier</th>
                      <th>Observation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedFiche.dgs || []).map((d, i) => (
                      <tr key={i}>
                        <td>{d.numero}</td>
                        <td>{d.propreteFenetreFrontale}</td>
                        <td>{d.propreteAfficheur}</td>
                        <td>{d.boitierCommande}</td>
                        <td>{d.observation}</td>
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
            ) : selectedFiche.verifications?.length > 0 ? (
              <>
                <h3>Fiche PAPI Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Techniciens : {selectedFiche.techniciens || ''}</p>
                <p>📝 Observations : {selectedFiche.observations || ''}</p>

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
                    {(selectedFiche.verifications || []).map((v, i) => (
                      <tr key={i}>
                        <td>{v.element}</td>
                        <td>{v.v11_09 || ''}</td>
                        <td>{v.v12_09 || ''}</td>
                        <td>{v.v21_09 || ''}</td>
                        <td>{v.v22_09 || ''}</td>
                        <td>{v.v31_09 || ''}</td>
                        <td>{v.v32_09 || ''}</td>
                        <td>{v.v41_09 || ''}</td>
                        <td>{v.v42_09 || ''}</td>
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
                    {(selectedFiche.verifications || []).map((v, i) => (
                      <tr key={i}>
                        <td>{v.element}</td>
                        <td>{v.v11_27 || ''}</td>
                        <td>{v.v12_27 || ''}</td>
                        <td>{v.v21_27 || ''}</td>
                        <td>{v.v22_27 || ''}</td>
                        <td>{v.v31_27 || ''}</td>
                        <td>{v.v32_27 || ''}</td>
                        <td>{v.v41_27 || ''}</td>
                        <td>{v.v42_27 || ''}</td>
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
            ) : selectedFiche.zonePrincipale ? (
              <>
                <h3>Fiche Piste : {selectedFiche.zonePrincipale}</h3>
                <p>📅 Date : {new Date(selectedFiche.date).toLocaleString()}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Élément</th>
                      <th>État</th>
                      <th>Observation</th>
                      <th>Intervention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedFiche.zones || []).map((zone, i) =>
                      (zone.verifications || []).map((v, j) => (
                        <tr key={`${i}-${j}`}>
                          <td>{zone.nom}</td>
                          <td>{v.element}</td>
                          <td>{v.etat}</td>
                          <td>{v.observation}</td>
                          <td>{v.intervention}</td>
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
            ) : selectedFiche.installations?.length > 0 ? (
              <>
                <h3>Fiche Feux Obstacles</h3>

                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicien || ''}</p>
                <p>
                  📝 Observation générale :{' '}
                  {selectedFiche.observationGenerale || ''}
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Lieu</th>
                      <th>Alimentation</th>
                      <th>Lampe</th>
                      <th>Observations</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(selectedFiche.installations || []).map((f, i) => (
                      <tr key={i}>
                        <td>{f.lieuInstallation}</td>
                        <td>{f.alimentation}</td>
                        <td>{f.lampe}</td>
                        <td>{f.observations}</td>
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
                <h3>Fiche Inspection journalière {selectedFiche.matricule}</h3>
                <p>📅 Date : {new Date(selectedFiche.date).toLocaleString()}</p>
                <p>📌 Période : {selectedFiche.periode || ''}</p>
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
                    {!(selectedFiche.inspections || []).length ? (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>
                          Aucune inspection envoyée
                        </td>
                      </tr>
                    ) : (
                      (selectedFiche.inspections || []).map((item, i) => (
                        <tr key={i}>
                          <td>{item.zone}</td>
                          <td>{item.element}</td>
                          <td>{item.matin?.etat || ''}</td>
                          <td>{item.matin?.nbrNF || 0}</td>
                          <td>{item.matin?.observation || ''}</td>
                          <td>{item.matin?.intervention || ''}</td>
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
