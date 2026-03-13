import React, { useEffect, useState, useRef } from 'react';
import {
  getFicheFeuxEncastres,
  enregistrerFicheFeuxEncastres,
  envoyerFicheFeuxEncastres,
} from './apiservices/api';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from 'react-signature-canvas';

import '../styles/FicheFeuxEncastres.css';

export default function FicheFeuxEncastresSemesterielle() {

  const [fiche, setFiche] = useState(null);
  const sigCanvas = useRef(null);

  const emplacements = [
    'Fin de la Piste 27',
    'Fin de la Piste 09',
    'Seuil de la Piste 27',
    'Seuil de la Piste 09',
    'Zone de touchée des roues',
    'Axe de la Piste',
    'Retil',
    'CL EAST TAXI WAY',
    'CL WEST TAXI WAY',
  ];

  useEffect(() => {
    const fetchFiche = async () => {
      const data = await getFicheFeuxEncastres();
      setFiche(data);
    };

    fetchFiche();
  }, []);

  if (!fiche) return <p>Chargement...</p>;

  const handleChange = (emp, field, key, value) => {

    const updated = { ...fiche };

    updated.feuxEncastres[emp][field][key] = value;

    setFiche(updated);

  };

  const handleSave = async () => {

    try {

      let signatureData = fiche.signature;

      if (sigCanvas.current && !sigCanvas.current.isEmpty()) {

        signatureData = sigCanvas.current
          .getTrimmedCanvas()
          .toDataURL("image/png");

      }

      const ficheToSave = {
        ...fiche,
        signature: signatureData
      };

      await enregistrerFicheFeuxEncastres(fiche._id, ficheToSave);

      alert("Fiche enregistrée avec succès");

    } catch (error) {

      console.error(error);
      alert("Erreur lors de l'enregistrement");

    }

  };

  const handleSend = async () => {

    try {

      await envoyerFicheFeuxEncastres(fiche._id);

      alert("Fiche envoyée à l'administrateur");

    } catch (error) {

      console.error(error);
      alert("Erreur lors de l'envoi");

    }

  };

  const renderRows = (emplacement) => {

    return Object.keys(fiche.feuxEncastres[emplacement]).map((field, index) => {

      const row = fiche.feuxEncastres[emplacement][field];

      return (

        <tr key={index}>

          {index === 0 && (
            <td rowSpan={Object.keys(fiche.feuxEncastres[emplacement]).length}>
              {emplacement}
            </td>
          )}

          <td>{field}</td>

          <td>

            <select
              value={row.etat}
              onChange={(e) =>
                handleChange(emplacement, field, 'etat', e.target.value)
              }
            >

              <option value="">--</option>
              <option value="OK">OK</option>
              <option value="HS">HS</option>

            </select>

          </td>

          <td>

            <input
              type="text"
              value={row.intervention}
              onChange={(e) =>
                handleChange(emplacement, field, 'intervention', e.target.value)
              }
            />

          </td>

          <td>

            <input
              type="text"
              value={row.observations}
              onChange={(e) =>
                handleChange(emplacement, field, 'observations', e.target.value)
              }
            />

          </td>

        </tr>

      );

    });

  };

  return (

    <div className="ficheContainer">

      <h2 className="ficheTitle">

        Fiche Feux Encastres Semestrielle

        {fiche.date && (
          <span> - {new Date(fiche.date).toLocaleDateString()}</span>
        )}

      </h2>

      <table className="ficheTable">

        <thead>

          <tr>

            <th>Emplacement</th>
            <th>Elément</th>
            <th>Etat</th>
            <th>Intervention</th>
            <th>Observations</th>

          </tr>

        </thead>

        <tbody>

          {emplacements.map((emp) => renderRows(emp))}

        </tbody>

      </table>

      <div className="infos">

        <div>

          <label>Date :</label>

          <DatePicker
            selected={fiche.date ? new Date(fiche.date) : null}
            onChange={(date) => setFiche({ ...fiche, date })}
            dateFormat="dd/MM/yyyy"
          />

        </div>

        <div>

          <label>Observations générales :</label>

          <textarea
            value={fiche.observationsGenerales}
            onChange={(e) =>
              setFiche({ ...fiche, observationsGenerales: e.target.value })
            }
          />

        </div>

        <div>

          <label>Technicien :</label>

          <input
            type="text"
            value={fiche.technicienOperateurs}
            onChange={(e) =>
              setFiche({ ...fiche, technicienOperateurs: e.target.value })
            }
          />

        </div>

        <div>

          <label>Signature :</label>

          <div className="signatureBox">

            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 150
              }}
            />

          </div>

        </div>

        <div className="buttons">

          <button
            className="btn btnClear"
            onClick={() => sigCanvas.current.clear()}
          >
            Effacer
          </button>

          <button
            className="btn btnSave"
            onClick={handleSave}
          >
            Enregistrer
          </button>

          <button
            className="btn btnSend"
            onClick={handleSend}
          >
            Envoyer
          </button>

        </div>

      </div>

    </div>

  );

}