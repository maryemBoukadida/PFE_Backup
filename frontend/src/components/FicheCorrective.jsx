import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import SignatureCanvas from 'react-signature-canvas';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/FicheCorrective.css';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css'; // IMPORTANT pour l'horloge

import {
  enregistrerFicheCorrective,
  envoyerFicheCorrective,
} from './apiservices/api';

// ================= COMPOSANT SÉLECTEUR DE GRAVITÉ =================
const GraviteSelector = ({ valeur, onChange, index }) => {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOuvert(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Options de gravité
  const options = [
    { value: 'Faible', label: 'Faible', couleur: 'faible' },
    { value: 'Moyenne', label: 'Moyenne', couleur: 'moyenne' },
    { value: 'Élevée', label: 'Élevée', couleur: 'elevee' },
  ];

  const handleSelect = (value) => {
    onChange(value);
    setMenuOuvert(false);
  };

  return (
    <div className="gravite-selecteur-container" ref={menuRef}>
      <div 
        className="gravite-label-cliquable"
        onClick={() => setMenuOuvert(!menuOuvert)}
      >
        <span>Gravité</span>
        {valeur && (
          <span className={`gravite-valeur-selectionnee ${
            valeur === 'Faible' ? 'faible' : 
            valeur === 'Moyenne' ? 'moyenne' : 'elevee'
          }`}>
            {valeur === 'Faible' ? '🟢' : 
             valeur === 'Moyenne' ? '🟡' : '🔴'} {valeur}
          </span>
        )}
      </div>

      <div className={`gravite-options-menu ${menuOuvert ? 'visible' : ''}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`gravite-option ${option.couleur} ${valeur === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option.value)}
          >
            <span className={`gravite-cercle ${option.couleur}`} />
            <span className="gravite-option-texte">{option.label}</span>
            {valeur === option.value && (
              <span className="gravite-checkmark">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ================= INITIAL STATE =================
const initialFiche = {
  type: 'corrective',
  ficheCorrective: [
    {
date: new Date(),
      designation: '',
      lieuInstallation: '',
      dateDetection: '',
      reclamationPar: '',
      personneContactee: '',
      debutIntervention: '',
      remiseEnService: null,
      diagnostic: [{ panneCause: '', effet: '', gravite: '' }],
      depannageReparation: [{ piecesDeRechange: '' }],
      tempsAlloue: '',
      observationsGenerales: '',
techniciensOperateurs: [{ nom: '' }],
      signature: '',
    },
  ],
};

export default function FicheCorrective() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  const sigRef = useRef();

  const fc = fiche.ficheCorrective[0];

  // ================= UPDATE =================
  const updateField = (champ, valeur) => {
    setFiche((prev) => ({
      ...prev,
      ficheCorrective: [
        {
          ...prev.ficheCorrective[0],
          [champ]: valeur,
        },
      ],
    }));
  };

  // ================= SIGNATURE =================
  const saveSignature = () => {
    const signature = sigRef.current.toDataURL();
    updateField('signature', signature);
  };

  const clearSignature = () => {
    sigRef.current.clear();
    updateField('signature', '');
  };

  // ================= SUBMIT =================
 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("DATA ENVOYÉE :", fiche);

  try {
    const res = await enregistrerFicheCorrective(fiche);
    setFicheId(res._id);
    alert('Fiche enregistrée ✅');
  } catch (err) {
    console.error(err);
    alert('Erreur ❌');
  }
};

  const handleEnvoyer = async () => {
    if (!ficheId) return alert("Enregistrer d'abord !");
    await envoyerFicheCorrective(ficheId);
    alert('Fiche envoyée ✅');
  };

  // ================= CALCUL DU TEMPS ALLOUÉ =================
  const calculerTempsAlloue = () => {
    if (fc.debutIntervention && fc.remiseEnService) {
      // Convertir les heures en minutes pour le calcul
      const [debutHeure, debutMinute] = fc.debutIntervention.split(':').map(Number);
      const [remiseHeure, remiseMinute] = fc.remiseEnService.split(':').map(Number);
      
      // Calculer en minutes
      const debutTotalMinutes = debutHeure * 60 + debutMinute;
      const remiseTotalMinutes = remiseHeure * 60 + remiseMinute;
      
      // Calculer la différence
      let differenceMinutes = remiseTotalMinutes - debutTotalMinutes;
      
      // Gérer le cas où la remise est le lendemain
      if (differenceMinutes < 0) {
        differenceMinutes += 24 * 60; // Ajouter 24 heures
      }
      
      // Convertir en heures et minutes
      const heures = Math.floor(differenceMinutes / 60);
      const minutes = differenceMinutes % 60;
      
      // Formater le résultat
      return `${heures}h ${minutes.toString().padStart(2, '0')}min`;
    }
    return '';
  };

  // Mettez à jour le temps alloué quand debutIntervention ou remiseEnService change
  useEffect(() => {
    const tempsCalcule = calculerTempsAlloue();
    if (tempsCalcule !== fc.tempsAlloue) {
      updateField('tempsAlloue', tempsCalcule);
    }
  }, [fc.debutIntervention, fc.remiseEnService]);

  // ================= UI =================
  return (
    <div className="container">
      <h2 className="title">Fiche Corrective</h2>

      <form onSubmit={handleSubmit}>
        {/* ===== CARD 1 ===== */}
        <div className="row-2-cards">
          <div className="card grid-2 full-width">
            <div>
              <label>Date</label>
              <DatePicker
                selected={fc.date}
                onChange={(date) => updateField('date', date)}
                className="input"
              />
            </div>

            <div>
              <label>Désignation</label>
              <input
                className="input"
                value={fc.designation}
                onChange={(e) => updateField('designation', e.target.value)}
              />
            </div>

            <div>
              <label>Lieu d'installation</label>
              <input
                className="input"
                value={fc.lieuInstallation}
                onChange={(e) =>
                  updateField('lieuInstallation', e.target.value)
                }
              />
            </div>

            <div>
              <label>Date détection</label>
              <DatePicker
                selected={fc.dateDetection}
                onChange={(date) => updateField('dateDetection', date)}
                className="input"
              />
            </div>
          </div>

          {/* ===== CARD 2 ===== */}
          <div className="card grid-2 full-width">
            <input
              className="input"
              placeholder="Réclamation par"
              value={fc.reclamationPar}
              onChange={(e) => updateField('reclamationPar', e.target.value)}
            />

            <input
              className="input"
              placeholder="Personne contactée"
              value={fc.personneContactee}
              onChange={(e) => updateField('personneContactee', e.target.value)}
            />

            <div>
              <label>Début intervention</label>
              <TimePicker
                onChange={(time) => updateField('debutIntervention', time)}
                value={fc.debutIntervention || '08:00'}
                format="HH:mm"
                clockIcon={<div className="custom-clock-icon" />}
                clearIcon={null}
                disableClock={false}
                hourPlaceholder="HH"
                minutePlaceholder="MM"
              />
            </div>
            <div>
              <label>Remise en service</label>
              <TimePicker
                onChange={(time) => updateField('remiseEnService', time)}
                value={fc.remiseEnService || '17:00'}
                format="HH:mm"
                clockIcon={<div className="custom-clock-icon" />}
                clearIcon={null}
                disableClock={false}
                hourPlaceholder="HH"
                minutePlaceholder="MM"
              />
            </div>
          </div>
        </div>

        {/* ===== DIAGNOSTIC ===== */}
        <div className="card full-width">
          <h3>Diagnostic</h3>

          {fc.diagnostic.map((d, i) => (
            <div key={i} className="grid-3">
              <input
                className="input"
                placeholder="Panne"
                value={d.panneCause}
                onChange={(e) => {
                  const newDiag = [...fc.diagnostic];
                  newDiag[i].panneCause = e.target.value;
                  updateField('diagnostic', newDiag);
                }}
              />

              <input
                className="input"
                placeholder="Effet"
                value={d.effet}
                onChange={(e) => {
                  const newDiag = [...fc.diagnostic];
                  newDiag[i].effet = e.target.value;
                  updateField('diagnostic', newDiag);
                }}
              />

              {/* SÉLECTEUR DE GRAVITÉ */}
              <GraviteSelector
                valeur={d.gravite}
                onChange={(value) => {
                  const newDiag = [...fc.diagnostic];
                  newDiag[i].gravite = value;
                  updateField('diagnostic', newDiag);
                }}
                index={i}
              />
            </div>
          ))}

          <span
            className="add-btn"
            onClick={() =>
              updateField('diagnostic', [
                ...fc.diagnostic,
                { panneCause: '', effet: '', gravite: '' },
              ])
            }
          >
            ➕
          </span>
        </div>

        {/* ===== DEPANNAGE ===== */}
        <div className="card full-width">
          <h3>Dépannage</h3>

          {fc.depannageReparation.map((d, i) => (
            <input
              key={i}
              className="input"
              placeholder="Pièces"
              value={d.piecesDeRechange}
              onChange={(e) => {
                const newDep = [...fc.depannageReparation];
                newDep[i].piecesDeRechange = e.target.value;
                updateField('depannageReparation', newDep);
              }}
            />
          ))}

          <span
            className="add-btn"
            onClick={() =>
              updateField('depannageReparation', [
                ...fc.depannageReparation,
                { piecesDeRechange: '' },
              ])
            }
          >
            ➕
          </span>
        </div>

        {/* ===== FINAL ===== */}
        <div className="card grid-4 full-width">
          <div className="temps-alloue-container">
            <div className="temps-alloue-label">
              <span>Temps alloué</span>
              {fc.tempsAlloue && <span className="duree-badge">Durée</span>}
            </div>

            <input
              className="input-temps-alloue"
              placeholder="⏱️ Calcul automatique"
              value={fc.tempsAlloue || ''}
              readOnly
            />
            {fc.debutIntervention && fc.remiseEnService && (
              <div className="temps-alloue-calculation">
                <span>Calcul:</span> {fc.debutIntervention} - {fc.remiseEnService}
              </div>
            )}
            <div className="temps-alloue-tooltip">
              Calculé automatiquement (Remise en service - Début intervention)
            </div>
          </div>

          <textarea
            className="input"
            placeholder="Observations"
            value={fc.observationsGenerales}
            onChange={(e) =>
              updateField('observationsGenerales', e.target.value)
            }
          />

          <input
            className="input"
            placeholder="Technicien"
            value={fc.techniciensOperateurs[0].nom}
            onChange={(e) =>
              updateField('techniciensOperateurs', [{ nom: e.target.value }])
            }
          />

          <div>
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              canvasProps={{ className: 'signature' }}
            />
            <button type="button" onClick={clearSignature}>
              Effacer
            </button>
            <button type="button" onClick={saveSignature}>
              Signer
            </button>
          </div>
        </div>

        <div className="actions">
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={handleEnvoyer}>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}