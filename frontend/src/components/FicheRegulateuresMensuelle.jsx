import React, { useEffect, useState, useRef } from 'react';
import {
  getFicheRegulateures,
  enregistrerFicheRegulateures,
  envoyerFicheRegulateures,
} from './apiservices/api';
import SignatureCanvas from 'react-signature-canvas';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import '../styles/FicheRegulateuresMensuelle.css';

export default function FicheRegulateuresMensuelle() {
  const [fiche, setFiche] = useState(null);
  const [technicien, setTechnicien] = useState('');
  const [date, setDate] = useState(new Date());
  const sigCanvas = useRef({});
  const [observationsGenerales, setObservationsGenerales] = useState('');
  useEffect(() => {
    const fetchFiche = async () => {
      try {
        const data = await getFicheRegulateures();
        setFiche(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFiche();
  }, []);

  if (!fiche) return <p>Chargement...</p>;

  const zoneRowspan = {};
  fiche.boucles.forEach((b) => {
    zoneRowspan[b.zone] = (zoneRowspan[b.zone] || 0) + 1;
  });

  const renderedZones = {};
  const clearSignature = () => sigCanvas.current.clear();
  //enregistrer fiche

  const handleSave = async () => {
    try {
      const signatureDataUrl = sigCanvas.current.toDataURL(); // récupère la signature

      const updatedFiche = {
        ...fiche,
        technicienOperateur: technicien,
        date: date,
        observationsGenerales: observationsGenerales,
        signature: signatureDataUrl,
      };

      await enregistrerFicheRegulateures(fiche._id, updatedFiche);
      alert('Fiche enregistrée avec succès !');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'enregistrement");
    }
  };
  const handleEnvoyer = async () => {
    try {
      if (!technicien) {
        alert("Veuillez remplir le nom du technicien avant d'envoyer !");
        return;
      }

      const res = await envoyerFicheRegulateures(fiche._id);
      alert(res.message);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de la fiche");
    }
  };
  return (
    <div className="fiche-container">
      <h2 className="fiche-title">
        FICHE D’INSPECTION MENSUELLE DES REGULATEURS –{' '}
        <span>{date ? date.toLocaleDateString() : ''}</span>
      </h2>

      <table className="fiche-table">
        <thead>
          <tr>
            <th rowSpan="2">ZONE</th>
            <th rowSpan="2">BOUCLE</th>
            <th rowSpan="2">TYPE / PUISSANCE</th>
            <th rowSpan="2">ISOLEMENT</th>
            <th rowSpan="2">CHARGE</th>
            <th colSpan="5">Iout</th>
            <th colSpan="2">InVin</th>
            <th rowSpan="2">TÉLÉCOMMANDE</th>
            <th rowSpan="2">AFFICHEUR</th>
            <th rowSpan="2">CLAVIER</th>
          </tr>
          <tr>
            <th>B1</th>
            <th>B2</th>
            <th>B3</th>
            <th>B4</th>
            <th>B5</th>
            <th>A</th>
            <th>V</th>
          </tr>
        </thead>
        <tbody>
          {fiche.boucles.map((b, index) => (
            <tr key={index}>
              {!renderedZones[b.zone] ? (
                <td rowSpan={zoneRowspan[b.zone]}>{b.zone}</td>
              ) : null}
              {(renderedZones[b.zone] = true)}

              <td>{b.BOUCLE}</td>

              <td>
                <input
                  type="text"
                  value={b.typePuissance}
                  onChange={(e) => {
                    const updatedBoucles = [...fiche.boucles];
                    updatedBoucles[index].typePuissance = e.target.value;
                    setFiche({ ...fiche, boucles: updatedBoucles });
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={b.ISOLEMENT}
                  onChange={(e) => {
                    const updatedBoucles = [...fiche.boucles];
                    updatedBoucles[index].ISOLEMENT = e.target.value;
                    setFiche({ ...fiche, boucles: updatedBoucles });
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={b.charge}
                  onChange={(e) => {
                    const updatedBoucles = [...fiche.boucles];
                    updatedBoucles[index].charge = e.target.value;
                    setFiche({ ...fiche, boucles: updatedBoucles });
                  }}
                />
              </td>

              {/* Pour Iout */}
              {['B1', 'B2', 'B3', 'B4', 'B5'].map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={b.Iout?.[key] || ''}
                    onChange={(e) => {
                      const updatedBoucles = [...fiche.boucles];
                      updatedBoucles[index].Iout = {
                        ...updatedBoucles[index].Iout,
                        [key]: e.target.value,
                      };
                      setFiche({ ...fiche, boucles: updatedBoucles });
                    }}
                  />
                </td>
              ))}

              {/* Pour InVin */}
              {['A', 'V'].map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={b.InVin?.[key] || ''}
                    onChange={(e) => {
                      const updatedBoucles = [...fiche.boucles];
                      updatedBoucles[index].InVin = {
                        ...updatedBoucles[index].InVin,
                        [key]: e.target.value,
                      };
                      setFiche({ ...fiche, boucles: updatedBoucles });
                    }}
                  />
                </td>
              ))}

              <td>
                <input
                  type="text"
                  value={b.telecommande}
                  onChange={(e) => {
                    const updatedBoucles = [...fiche.boucles];
                    updatedBoucles[index].telecommande = e.target.value;
                    setFiche({ ...fiche, boucles: updatedBoucles });
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={b.afficheur}
                  onChange={(e) => {
                    const updatedBoucles = [...fiche.boucles];
                    updatedBoucles[index].afficheur = e.target.value;
                    setFiche({ ...fiche, boucles: updatedBoucles });
                  }}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={b.clavier}
                  onChange={(e) => {
                    const updatedBoucles = [...fiche.boucles];
                    updatedBoucles[index].clavier = e.target.value;
                    setFiche({ ...fiche, boucles: updatedBoucles });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fiche-observations">
        <b>Observations générales :</b>
        <textarea
          placeholder="Écrire les observations ici..."
          rows="4"
          value={observationsGenerales}
          onChange={(e) => setObservationsGenerales(e.target.value)}
        />{' '}
      </div>
      <div className="fiche-inputs">
        <label>
          Sélectionner la date :{' '}
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="dd/MM/yyyy"
          />
        </label>
      </div>

      <div className="fiche-inputs">
        <label>
          Technicien :{' '}
          <input
            type="text"
            value={technicien}
            onChange={(e) => setTechnicien(e.target.value)}
            placeholder="Nom du technicien"
          />
        </label>
      </div>

      <div className="fiche-signature">
        <b>Signature :</b>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ className: 'sigCanvas' }}
        />
        <button onClick={clearSignature}>Effacer</button>
      </div>
      <button onClick={handleSave}>Enregistrer</button>
      <button onClick={handleEnvoyer}>Envoyer</button>
    </div>
  );
}
