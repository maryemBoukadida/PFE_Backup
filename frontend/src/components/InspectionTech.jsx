import React, { useState, useEffect } from 'react';
import { getInspections, envoyerInspectionTech } from './apiservices/api';
import '../styles/InspectionTech.css';
import FichePapiMensuelle from './FichePapiMensuelle';
import FichePisteMensuelle from './FichePisteMensuelle';
import FicheDGSMensuelle from './FicheDGSMensuelle';
import FicheFeuxObstaclesMensuelle from './FicheFeuxObstaclesMensuelle';
import FicheLVPMensuelle from './FicheLVPMensuelle'; // 🔹 important
import FicheRegulateuresMensuelle from './FicheRegulateuresMensuelle';
import FichePostesMensuelle from './FichePostesMensuelle';
export default function InspectionTech() {
  const [periode, setPeriode] = useState('JOURNALIERE');
  const [typeFiche, setTypeFiche] = useState('');
  const [inspectionsData, setInspectionsData] = useState([]); // tableau de fiches complètes
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [ficheEnvoyee, setFicheEnvoyee] = useState(false);
  const [technicienType, setTechnicienType] = useState('matin');
  const currentHour = 22;

  const typesFiches = [
    { value: 'PAPI', label: 'Papi' },
    { value: 'PISTE', label: 'Piste' },
    { value: 'ECLARAGE PARKING AVION ', label: 'Eclairage parking avion' },
    { value: 'VOIES DE CERCULATION', label: 'Voies de circulation' },
    { value: 'DGS', label: 'DGS' },
    { value: 'FEUX DOBSTACLES', label: 'Feux d obstacles' },
    { value: 'LVP', label: 'LVP' },
    { value: 'REGULATEURES', label: 'Approche des Regulateures' },
    { value: 'POSTES', label: 'Postes' },
  ];

  // 🔹 Récupération des inspections depuis l’API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInspections('A002', periode);
        console.log('Données récupérées :', data);
        if (data) {
          setInspectionsData(Array.isArray(data) ? data : [data]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [periode]);

  // Flatten toutes les inspections pour le tableau
  const allRows = inspectionsData.flatMap((fiche, inspIndex) =>
    fiche.inspections.map((item, itemIndex) => ({
      ...item,
      inspIndex,
      itemIndex,
      ficheId: fiche._id,
      matricule: fiche.matricule,
    }))
  );

  const filteredRows =
    periode === 'MENSUELLE' && typeFiche
      ? allRows.filter((item) => item.type === typeFiche)
      : allRows;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const hasMatinHS = allRows.some((item) => item.matin?.etat === 'HS');
  const hasNuitHS = allRows.some((item) => item.nuit?.etat === 'HS');

  // 🔹 Vérrouillage par heure et envoi
  const isLocked = (cellType, periodeJour) => {
    if (ficheEnvoyee) return true;
    if (currentHour < 20) return periodeJour === 'nuit';
    return periodeJour === 'matin';
  };

  // 🔹 Enregistrer / Envoyer fiche
  const handleEnvoyer = async () => {
    try {
      const ficheAEnvoyer = {
        ...inspectionsData[0],
        matricule: inspectionsData[0].matricule || 'A002',
        date: inspectionsData[0].date || new Date(),
        sauvegardeSeule: false,
      };
      const data = await envoyerInspectionTech(ficheAEnvoyer);
      alert(data.message || 'Fiche envoyée !');
      setFicheEnvoyee(true);
    } catch (err) {
      console.error('Erreur serveur :', err);
      alert(err.message || 'Erreur serveur');
    }
  };

  const handleEnregistrer = async () => {
    try {
      const ficheAEnvoyer = {
        ...inspectionsData[0],
        matricule: inspectionsData[0].matricule || 'A002',
        date: inspectionsData[0].date || new Date(),
        sauvegardeSeule: true,
      };
      await envoyerInspectionTech(ficheAEnvoyer);
      alert('Travail enregistré !');
    } catch (err) {
      console.error('Erreur serveur :', err);
      alert(err.message || 'Erreur serveur');
    }
  };

  // 🔹 Rend le composant principal
  return (
    <div className="inspection-container">
      {/* 🔹 Affichage des fiches mensuelles séparées */}
      {periode === 'MENSUELLE' && typeFiche === 'PAPI' ? (
        <FichePapiMensuelle />
      ) : periode === 'MENSUELLE' && typeFiche === 'PISTE' ? (
        <FichePisteMensuelle />
      ) : periode === 'MENSUELLE' && typeFiche === 'LVP' ? (
        <FicheLVPMensuelle />
      ) : periode === 'MENSUELLE' && typeFiche === 'DGS' ? (
        <FicheDGSMensuelle />
      ) : periode === 'MENSUELLE' && typeFiche === 'REGULATEURES' ? (
        <FicheRegulateuresMensuelle />
      ) :periode === 'MENSUELLE' && typeFiche === 'POSTES' ? (
        <FichePostesMensuelle />
     ): periode === 'MENSUELLE' && typeFiche === 'FEUX DOBSTACLES' ? (
        <FicheFeuxObstaclesMensuelle />
      ) : (
        // 🔹 Interface journalière / hebdo / annuelle
        <>
          <h2>Fiche inspection journalière balisage</h2>

          {/* 🔹 Filtres */}
          <div className="inspection-header">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            >
              <option value="JOURNALIERE">Journalière</option>
              <option value="HEBDOMADAIRE">Hebdomadaire</option>
              <option value="MENSUELLE">Mensuelle</option>
              <option value="ANNUELLE">Annuelle</option>
            </select>

            {periode === 'MENSUELLE' && (
              <select
                value={typeFiche}
                onChange={(e) => setTypeFiche(e.target.value)}
              >
                <option value="">-- Type fiche --</option>
                {typesFiches.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 🔹 Tableau */}
          <table className="inspection-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Élément</th>
                <th>État Matin</th>
                {hasMatinHS && <th>Nbr NF</th>}
                <th>Observation</th>
                <th>Intervention</th>
                <th>État Nuit</th>
                {hasNuitHS && <th>Nbr NF</th>}
                <th>Observation</th>
                <th>Intervention</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item) => {
                const index = item.inspIndex;
                const i = item.itemIndex;
                return (
                  <tr key={`${index}-${i}`}>
                    <td>{item.zone}</td>
                    <td>{item.element}</td>

                    {/* Matin */}
                    <td>
                      <select
                        className={`etat-select ${item.matin?.etat === 'OK' ? 'etat-ok' : item.matin?.etat === 'HS' ? 'etat-hs' : ''}`}
                        value={item.matin?.etat || ''}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].matin.etat =
                            e.target.value;
                          if (e.target.value !== 'HS')
                            newData[index].inspections[i].matin.nbrNF = 0;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked('etat', 'matin')}
                      >
                        <option value="">--</option>
                        <option value="OK">OK</option>
                        <option value="HS">HS</option>
                      </select>
                    </td>

                    {hasMatinHS && (
                      <td>
                        {item.matin?.etat === 'HS' && (
                          <input
                            type="number"
                            placeholder="Nbr NF"
                            value={item.matin?.nbrNF || ''}
                            onChange={(e) => {
                              const newData = [...inspectionsData];
                              newData[index].inspections[i].matin.nbrNF =
                                e.target.value;
                              setInspectionsData(newData);
                            }}
                            disabled={isLocked('nbrNF', 'matin')}
                          />
                        )}
                      </td>
                    )}

                    <td>
                      <input
                        type="text"
                        value={item.matin?.observation || ''}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].matin.observation =
                            e.target.value;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked('observation', 'matin')}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        value={item.matin?.intervention || ''}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].matin.intervention =
                            e.target.value;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked('intervention', 'matin')}
                      />
                    </td>

                    {/* Nuit */}
                    <td>
                      <select
                        className={`etat-select ${item.nuit?.etat === 'OK' ? 'etat-ok' : item.nuit?.etat === 'HS' ? 'etat-hs' : ''}`}
                        value={item.nuit?.etat || ''}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].nuit.etat =
                            e.target.value;
                          if (e.target.value !== 'HS')
                            newData[index].inspections[i].nuit.nbrNF = 0;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked('etat', 'nuit')}
                      >
                        <option value="">--</option>
                        <option value="OK">OK</option>
                        <option value="HS">HS</option>
                      </select>
                    </td>

                    {hasNuitHS && (
                      <td>
                        {item.nuit?.etat === 'HS' && (
                          <input
                            type="number"
                            placeholder="Nbr NF"
                            value={item.nuit?.nbrNF || ''}
                            onChange={(e) => {
                              const newData = [...inspectionsData];
                              newData[index].inspections[i].nuit.nbrNF =
                                e.target.value;
                              setInspectionsData(newData);
                            }}
                            disabled={isLocked('nbrNF', 'nuit')}
                          />
                        )}
                      </td>
                    )}

                    <td>
                      <input
                        type="text"
                        value={item.nuit?.observation || ''}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].nuit.observation =
                            e.target.value;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked('observation', 'nuit')}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        value={item.nuit?.intervention || ''}
                        onChange={(e) => {
                          const newData = [...inspectionsData];
                          newData[index].inspections[i].nuit.intervention =
                            e.target.value;
                          setInspectionsData(newData);
                        }}
                        disabled={isLocked('intervention', 'nuit')}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* 🔹 Boutons */}
          <div className="send-container">
            <button className="save-btn" onClick={handleEnregistrer}>
              Enregistrer
            </button>
            <button className="send-btn" onClick={handleEnvoyer}>
              Envoyer
            </button>
          </div>

          {/* 🔹 Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}
