import React, { useEffect, useState } from "react";
import { getHistorique } from "./apiservices/api"; 

export default function Historiques() {
  const [historiqueData, setHistoriqueData] = useState([]);

  useEffect(() => {
    const fetchHistoriques = async () => {
      const data = await getHistorique();
      setHistoriqueData(Array.isArray(data) ? data : []);
    };
    fetchHistoriques();
  }, []);

  return (
    <div className="historique-page">
      <h2>📜 Historique des inspections balisage</h2>

      {historiqueData.length === 0 ? (
        <p>Aucune fiche validée</p>
      ) : (
        <ul>
          {historiqueData.map((fiche) => (
            <li key={fiche._id}>
              <strong>📄 Période : {fiche.periode}</strong> <br />
              👷 Matricule : {fiche.matricule} <br />
              📅 Date : {new Date(fiche.date).toLocaleString()} <br />
              <details>
                <summary>📝 Détails des inspections ({fiche.inspections.length})</summary>
                <ul>
                  {fiche.inspections.map((item, idx) => (
                    <li key={idx}>
                      Zone : {item.zone || "-"}, Élément : {item.element || "-"} <br />
                      Matin : {item.matin?.etat || "-"} / NF : {item.matin?.nbrNF || 0} <br />
                      Nuit : {item.nuit?.etat || "-"} / NF : {item.nuit?.nbrNF || 0}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
