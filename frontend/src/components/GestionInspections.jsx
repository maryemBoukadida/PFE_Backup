import React, { useState, useEffect } from 'react';
import './../styles/Inspection.css';
import { getInspections } from './apiservices/api';

export default function GestionInspections() {
  const [periode, setPeriode] = useState('JOURNALIERE');
  const [inspectionsData, setInspectionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Nombre de lignes par page
  const [activeTab, setActiveTab] = useState('inspections'); // "inspections" ou "historiques"

  // Transformer les inspections pour la pagination
  const allRows = inspectionsData.flatMap((insp, index) =>
    insp.inspections.map((item, i) => ({
      ...item,
      inspIndex: index,
      itemIndex: i,
    }))
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(allRows.length / rowsPerPage);

  // Fetch data depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInspections();
        console.log('DATA BACKEND:', data);
        setInspectionsData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Ajouter une nouvelle ligne
  const handleAddRow = () => {
    const newInspectionsData = [...inspectionsData];
    if (newInspectionsData.length === 0) {
      newInspectionsData.push({ inspections: [] });
    }
    newInspectionsData[0].inspections.push({
      zone: '',
      element: '',
      matin: { etat: '', observation: '', intervention: '' },
      nuit: { etat: '', observation: '', intervention: '' },
      date: new Date().toLocaleDateString(),
      user: 'Admin',
    });
    setInspectionsData(newInspectionsData);
  };

  return (
    <div className="inspection-container">
      <h2>Fiche inspection journalière balisage</h2>

      

      {/* Vue Gestion Inspections */}
      {activeTab === 'inspections' && (
        <>
          <div className="inspection-header">
            <button className="add-btn" onClick={handleAddRow}>
              + Ajouter ligne
            </button>
            <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
              <option value="JOURNALIERE">Journalière</option>
              <option value="HEBDOMADAIRE">Hebdomadaire</option>
              <option value="Annuelle">Annuelle</option>
              <option value="Mensuelle">Mensuelle</option>
              <option value="Semestrielle">Semestrielle</option>
            </select>
          </div>

          <table className="inspection-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Élément</th>
                <th>État Matin</th>
                <th>Observation</th>
                <th>Intervention</th>
                <th>État Nuit</th>
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
                        className={`etat-select ${
                          item.matin?.etat === 'OK'
                            ? 'etat-ok'
                            : item.matin?.etat === 'HS'
                            ? 'etat-hs'
                            : ''
                        }`}
                        value={item.matin?.etat || ''}
                        onChange={(e) => {
                          const newInspectionsData = [...inspectionsData];
                          newInspectionsData[index].inspections[i].matin.etat = e.target.value;
                          setInspectionsData(newInspectionsData);
                        }}
                      >
                        <option value="">--</option>
                        <option value="OK">OK</option>
                        <option value="HS">HS</option>
                      </select>
                    </td>
                    <td>
                      {item.matin?.etat === 'OK' ? null : (
                        <input
                          type="text"
                          value={item.matin?.observation || ''}
                          onChange={(e) => {
                            const newInspectionsData = [...inspectionsData];
                            newInspectionsData[index].inspections[i].matin.observation =
                              e.target.value;
                            setInspectionsData(newInspectionsData);
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {item.matin?.etat === 'OK' ? null : (
                        <input
                          type="text"
                          value={item.matin?.intervention || ''}
                          onChange={(e) => {
                            const newInspectionsData = [...inspectionsData];
                            newInspectionsData[index].inspections[i].matin.intervention =
                              e.target.value;
                            setInspectionsData(newInspectionsData);
                          }}
                        />
                      )}
                    </td>

                    {/* Nuit */}
                    <td>
                      <select
                        className={`etat-select ${
                          item.nuit?.etat === 'OK'
                            ? 'etat-ok'
                            : item.nuit?.etat === 'HS'
                            ? 'etat-hs'
                            : ''
                        }`}
                        value={item.nuit?.etat || ''}
                        onChange={(e) => {
                          const newInspectionsData = [...inspectionsData];
                          newInspectionsData[index].inspections[i].nuit.etat = e.target.value;
                          setInspectionsData(newInspectionsData);
                        }}
                      >
                        <option value="">--</option>
                        <option value="OK">OK</option>
                        <option value="HS">HS</option>
                      </select>
                    </td>
                    <td>
                      {item.nuit?.etat === 'OK' ? null : (
                        <input
                          type="text"
                          value={item.nuit?.observation || ''}
                          onChange={(e) => {
                            const newInspectionsData = [...inspectionsData];
                            newInspectionsData[index].inspections[i].nuit.observation = e.target.value;
                            setInspectionsData(newInspectionsData);
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {item.nuit?.etat === 'OK' ? null : (
                        <input
                          type="text"
                          value={item.nuit?.intervention || ''}
                          onChange={(e) => {
                            const newInspectionsData = [...inspectionsData];
                            newInspectionsData[index].inspections[i].nuit.intervention = e.target.value;
                            setInspectionsData(newInspectionsData);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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