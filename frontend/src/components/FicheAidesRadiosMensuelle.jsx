import React, { useEffect, useState, useRef } from 'react';
import { getFicheAidesRadios, enregistrerFicheAidesRadios ,envoyerFicheAidesRadios  } from './apiservices/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from 'react-signature-canvas';
import "../styles/FicheAidesRadios.css";

export default function FicheAidesRadios() {
  const [fiche, setFiche] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const sigCanvas = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFicheAidesRadios();
        setFiche(data);
        if (data.date) setSelectedDate(new Date(data.date));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!fiche) return <p>Chargement...</p>;

  // sauvegarder signature
  const saveSignature = () => {
    if (!sigCanvas.current) return;
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setFiche((prev) => ({ ...prev, signature: signatureData }));
  };

  const clearSignature = () => {
    if (!sigCanvas.current) return;
    sigCanvas.current.clear();
    setFiche((prev) => ({ ...prev, signature: '' }));
  };

  const handleChange = (posteKey, index, field, value) => {
    const updated = { ...fiche };
    updated[posteKey][index][field] = value;
    setFiche(updated);
  };

  const handleSubChange = (posteKey, index, subIndex, field, value) => {
    const updated = { ...fiche };
    updated[posteKey][index].sous_elements[subIndex][field] = value;
    setFiche(updated);
  };

  const countRows = (elements) => {
    let total = 0;
    elements.forEach((el) => {
      total += el.sous_elements?.length || 1;
    });
    return total;
  };
     const handleEnvoyer = async () => {
  if (!fiche._id) return alert("Fiche introuvable !");
  try {
    await envoyerFicheAidesRadios(fiche._id);
    alert("Fiche envoyée à l'admin avec succès !");
    // Mettre à jour le statut localement
    setFiche({ ...fiche, statut: "envoyee" });
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'envoi de la fiche");
  }
};
  const renderPoste = (title, elements, posteKey) => {
    let firstRow = true;
    const totalRows = countRows(elements);
    return elements.flatMap((item, index) => {
      if (item.sous_elements?.length > 0) {
        return item.sous_elements.map((sub, i) => (
          <tr key={index + '-' + i}>
            {firstRow && <td rowSpan={totalRows} className="poste-column">{title}</td>}
            {firstRow && (firstRow = false)}
            {i === 0 && <td rowSpan={item.sous_elements.length}>{item.element}</td>}
            <td>{sub.type}</td>
            <td>
              <select
                value={sub.etat || ''}
                onChange={(e) => handleSubChange(posteKey, index, i, 'etat', e.target.value)}
              >
                <option value="">--</option>
                <option value="OK">OK</option>
                <option value="HS">HS</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={sub.interventions || ''}
                onChange={(e) => handleSubChange(posteKey, index, i, 'interventions', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={sub.observations || ''}
                onChange={(e) => handleSubChange(posteKey, index, i, 'observations', e.target.value)}
              />
            </td>
          </tr>
        ));
      }
 
      return (
        <tr key={index}>
          {firstRow && (
            <td
              rowSpan={totalRows}
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                background: '#3a7c84',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              {title}
            </td>
          )}
          {firstRow && (firstRow = false)}
          <td>{item.element}</td>
          <td></td>
          <td>
            <select
              value={item.etat || ''}
              onChange={(e) => handleChange(posteKey, index, 'etat', e.target.value)}
            >
              <option value="">--</option>
              <option value="OK">OK</option>
              <option value="HS">HS</option>
            </select>
          </td>
          <td>
            <input
              type="text"
              value={item.interventions || ''}
              onChange={(e) => handleChange(posteKey, index, 'interventions', e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={item.observations || ''}
              onChange={(e) => handleChange(posteKey, index, 'observations', e.target.value)}
            />
          </td>
        </tr>
      );
    });
  };

  // fonction pour enregistrer la fiche dans la base
  const handleSave = async () => {
    try {
      await enregistrerFicheAidesRadios(fiche._id, fiche); // <-- envoie la fiche complète
      alert("Fiche enregistrée avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement de la fiche");
    }
  };

  return (
    <div className="fiche-container">
      <h2 className="fiche-title">{fiche.fiche} - {selectedDate.toLocaleDateString()}</h2>

      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Poste</th>
            <th>Element</th>
            <th>Type</th>
            <th>Etat</th>
            <th>Interventions</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {renderPoste('POSTE MT SST2', fiche.poste_MT_SST2, 'poste_MT_SST2')}
          {renderPoste('POSTE BT GLIDE09', fiche.TGBT_Aides_Radios.poste_BT_GLIDE09, 'TGBT_Aides_Radios.poste_BT_GLIDE09')}
          {renderPoste('POSTE BT GLIDE027', fiche.TGBT_Aides_Radios.poste_BT_GLIDE027, 'TGBT_Aides_Radios.poste_BT_GLIDE027')}
          {renderPoste('POSTE BT LOC09', fiche.TGBT_Aides_Radios.poste_BT_LOC09, 'TGBT_Aides_Radios.poste_BT_LOC09')}
          {renderPoste('POSTE BT LOC27', fiche.TGBT_Aides_Radios.poste_BT_LOC27, 'TGBT_Aides_Radios.poste_BT_LOC27')}
          {renderPoste('POSTE BT DVOR', fiche.TGBT_Aides_Radios.poste_BT_DVOR, 'TGBT_Aides_Radios.poste_BT_DVOR')}
        </tbody>
      </table>

      <div className="form-section">
        <h3>Observations générales</h3>
        <textarea
          style={{ width: '100%', height: '80px' }}
          value={fiche.observations_generales || ''}
          onChange={(e) => setFiche({ ...fiche, observations_generales: e.target.value })}
        />

        <p><strong>Date :</strong></p>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setFiche({ ...fiche, date });
          }}
          dateFormat="dd/MM/yyyy"
        />

        <p style={{ marginTop: '15px' }}><strong>Technicien opérateur :</strong></p>
        <input
          type="text"
          value={fiche.technicien_operateur || ''}
          onChange={(e) => setFiche({ ...fiche, technicien_operateur: e.target.value })}
        />

        <p style={{ marginTop: '15px' }}><strong>Signature :</strong></p>
        <div style={{ border: '1px solid black', width: '400px', height: '150px' }}>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 400, height: 150, className: 'sigCanvas' }}
          />
        </div>

        <div className="signature-box">
          <button className="btn btn-primary" type="button" onClick={saveSignature}>
            Sauvegarder Signature
          </button>
          <button className="btn btn-danger" type="button" onClick={clearSignature}>
            Effacer
          </button>
        </div>
      </div>

      <button className="btn btn-save" onClick={handleSave}>
        Enregistrer
      </button>
      <button className="btn btn-send" onClick={handleEnvoyer}>
  Envoyer à l'admin
</button>
    </div>
  );
}