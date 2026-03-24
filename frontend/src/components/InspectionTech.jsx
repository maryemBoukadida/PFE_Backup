import React, { useState, useEffect } from 'react';
import { getInspections, envoyerInspectionTech } from './apiservices/api';
import '../styles/InspectionTech.css';
import { FaBatteryFull, FaTrafficLight, FaTools, FaBolt } from 'react-icons/fa';

import FichePapiMensuelle from './FichePapiMensuelle';
import FichePisteMensuelle from './FichePisteMensuelle';
import FicheDGSMensuelle from './FicheDGSMensuelle';
import FicheFeuxObstaclesMensuelle from './FicheFeuxObstaclesMensuelle';
import FicheLVPMensuelle from './FicheLVPMensuelle'; // 🔹 important
import FicheRegulateuresMensuelle from './FicheRegulateuresMensuelle';
import FichePostesMensuelle from './FichePostesMensuelle';
import FicheAidesRadiosMensuelle from './FicheAidesRadiosMensuelle';
import FicheFeuxEncastresSemesterielle from './FicheFeuxEncastresSemesterielle';
import FicheSemesRegulateures from './FicheSemesRegulateures';
import FicheSemesPostes from './FicheSemesPostes';
import FicheSemesDgs from './FicheSemesDgs';
import FicheTGBTAnnuelle from './FicheTGBTAnnuelle';
import FicheVoieAnnuelle from './FicheVoieAnnuelle';
import FicheAnnPaMa from './ficheAnnPaMa';
import FicheAnnInfrastructure from './FicheAnnInfrastructure';
import FicheFeuxHorsSql from './FicheFeuxHorsSql';
import FicheEffar from './FicheEffar';
import FicheAnnObs from './FicheAnnObs';
import FicheAnnCable from './FicheAnnCable';
import FicheAnnFeuxSeq from './FicheAnnFeuxSeq';
import FicheQuinquennalePapi from './FicheQuinquennalePapi';
import FicheCorrective from './FicheCorrective';
import FicheNoBreakForm from './FicheNoBreakForm';
import FicheBalisageForm from './FicheBalisageForm';
import Fiche2250KVAForm from './Fiche2250KVAForm';
import FicheOlapionForm from './FicheOlapionForm';
export default function InspectionTech({ activeMenu, activeSubMenu }) {
  const [periode, setPeriode] = useState('JOURNALIERE');
  const [typeFiche, setTypeFiche] = useState('');
  const [inspectionsData, setInspectionsData] = useState([]); // tableau de fiches complètes
const [showNoBreak, setShowNoBreak] = useState(false);
const [show2250KVA, setShow2250KVA] = useState(false);
const [showOlapion, setShowOlapion] = useState(false);
const [showBalisage, setShowBalisage] = useState(false);
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
    { value: 'AIDES RADIOS', label: 'Aides Radios' },
    { value: 'APPROCHE COTE 09', label: 'Approche cote 09' },
  ];
  const typesFichesSemestrielles = [
    { value: 'FEUX ENCASTRES', label: 'Feux Encastres' },
    { value: 'REGULATEURES', label: 'Regulateures' },
    { value: 'POSTES', label: 'Postes' },
    { value: 'DGS', label: 'DGS' },
  ];

  const typesFichesAnnuelles = [
    { value: 'TGBT', label: 'TGBT' },
    {
      value: 'PANNEAUX DES INDICTAUERE SUR VOIE',
      label: 'Panneaux indicateur sur voie',
    },
    { value: 'PAPI ET MANCHE AVANT', label: 'Papi et manches avant' },
    { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
    { value: 'FEUX HORS SQL', label: 'Feux Hors SQL' },
    { value: 'EFFAROUCHEUR', label: 'Effaroucheur' },
    { value: 'FEUX OBSTACLES', label: 'Feux Obstacle' },
    { value: 'CABLES', label: 'Cables' },
    { value: 'FEUX SEQUENTIELLES', label: 'Feux Sequentielles' },
  ];
  const typesFichesQuinquennale = [{ value: 'PAPI', label: 'PaPi' }];
  const [interventionTab, setInterventionTab] = useState('preventif');
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

  // 🔹 Rend le composant principal
  return (
    <div className="inspection-container">
      {/* MAINTENANCE PREVENTIVE */}

      {activeMenu === 'intervention' && activeSubMenu === 'preventif' && (
        <>
          <h3>Maintenance Préventive</h3>

          <div className="inspection-header">
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            >
             {/* <option value="MENSUELLE">Mensuelle</option>*/}
              <option value="ANNUELLE">Annuelle</option>
              <option value="SEMESTRIELLE">Semestrielle</option>
              <option value="QUINQUENNALE">Quinquennale</option>
            </select>
 {/*
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
* */}
            {periode === 'SEMESTRIELLE' && (
              <select
                value={typeFiche}
                onChange={(e) => setTypeFiche(e.target.value)}
              >
                <option value="">-- Type fiche --</option>
                {typesFichesSemestrielles.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            )}
            {periode === 'ANNUELLE' && (
              <select
                value={typeFiche}
                onChange={(e) => setTypeFiche(e.target.value)}
              >
                <option value="">-- Type fiche --</option>
                {typesFichesAnnuelles.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            )}
            {periode === 'QUINQUENNALE' && (
              <select
                value={typeFiche}
                onChange={(e) => setTypeFiche(e.target.value)}
              >
                <option value="">-- Type fiche --</option>

                {typesFichesQuinquennale.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            )}
          </div>

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
          ) : periode === 'MENSUELLE' && typeFiche === 'POSTES' ? (
            <FichePostesMensuelle />
          ) : periode === 'MENSUELLE' && typeFiche === 'AIDES RADIOS' ? (
            <FicheAidesRadiosMensuelle />
          ) : periode === 'SEMESTRIELLE' && typeFiche === 'FEUX ENCASTRES' ? (
            <FicheFeuxEncastresSemesterielle />
          ) : periode === 'SEMESTRIELLE' && typeFiche === 'REGULATEURES' ? (
            <FicheSemesRegulateures />
          ) : periode === 'SEMESTRIELLE' && typeFiche === 'POSTES' ? (
            <FicheSemesPostes />
          ) : periode === 'SEMESTRIELLE' && typeFiche === 'DGS' ? (
            <FicheSemesDgs />
          ) : periode === 'MENSUELLE' && typeFiche === 'FEUX DOBSTACLES' ? (
            <FicheFeuxObstaclesMensuelle />
          ) : periode === 'ANNUELLE' &&
            typeFiche === 'PANNEAUX DES INDICTAUERE SUR VOIE' ? (
            <FicheVoieAnnuelle />
          ) : periode === 'ANNUELLE' && typeFiche === 'TGBT' ? (
            <FicheTGBTAnnuelle />
          ) : periode === 'ANNUELLE' && typeFiche === 'PAPI ET MANCHE AVANT' ? (
            <FicheAnnPaMa />
          ) : periode === 'ANNUELLE' && typeFiche === 'EFFAROUCHEUR' ? (
            <FicheEffar /> // 🔹 Utilise le nouveau composant
          ) : periode === 'ANNUELLE' && typeFiche === 'FEUX HORS SQL' ? (
            <FicheFeuxHorsSql />
          ) : periode === 'ANNUELLE' && typeFiche === 'INFRASTRUCTURE' ? (
            <FicheAnnInfrastructure />
          ) : periode === 'ANNUELLE' && typeFiche === 'FEUX OBSTACLES' ? (
            <FicheAnnObs />
          ) : periode === 'ANNUELLE' && typeFiche === 'CABLES' ? (
            <FicheAnnCable />
          ) : periode === 'ANNUELLE' && typeFiche === 'FEUX SEQUENTIELLES' ? (
            <FicheAnnFeuxSeq />
          ) : periode === 'QUINQUENNALE' && typeFiche === 'PAPI' ? (
            <FicheQuinquennalePapi />
          ) : null}
          {/** ) : ( */}
        </>
      )}
      {/* MAINTENANCE CORRECTIVE */}

     {activeMenu === 'intervention' && activeSubMenu === 'correctif' && (
  <>
    <h3>Maintenance Corrective</h3>
    <FicheCorrective />
  </>
)}
      {/* INSPECTIONS */}

     {activeMenu === 'inspection' && (
  <>
    <h3>Gestion des inspections</h3>
    {showNoBreak ? (
      <FicheNoBreakForm />
    ) : show2250KVA ? (
  <Fiche2250KVAForm />  
  ) : showOlapion ? (
  <FicheOlapionForm />
  ) : showBalisage ? (
  <FicheBalisageForm />
    ):(
<div className="cards-container">
  <div className="card"
    onClick={() => setShowNoBreak(true)}
    style={{ cursor: "pointer" }}
    >
    <FaBatteryFull size={40} color="#f39c12" />
    <h4>Inspection des groupes NOBREAK</h4>
  </div>

  <div 
  className="card"
  onClick={() => {
    setShowBalisage(true);
    setShowNoBreak(false);
    setShow2250KVA(false);
    setShowOlapion(false);
  }}
  style={{ cursor: "pointer" }}
>
  <FaTrafficLight size={40} color="#27ae60" />
  <h4>Inspection de balisage</h4>
</div>

  <div 
  className="card"
  onClick={() => {
    setShowOlapion(true);
    setShowNoBreak(false);
    setShow2250KVA(false);
  }}
  style={{ cursor: "pointer" }}
>
  <FaTools size={40} color="#3498db" />
  <h4>Inspection Olapion</h4>
</div>

<div 
  className="card"
  onClick={() => {
    setShow2250KVA(true);
    setShowNoBreak(false);
    setShowOlapion(false);
    setShowBalisage(false);
  }}
  style={{ cursor: "pointer" }}
>
  <FaBolt size={40} color="#e74c3c" />
  <h4>Inspection 2250 KVA</h4>
</div>
</div>
    )}
  </>
)}
     
    </div>
  );
}
