import React, { useEffect, useState, useRef } from 'react';
import { 
  getFicheSemesPostes, 
  enregistrerFicheSemesPostes, 
  envoyerFicheSemesPostes 
} from './apiservices/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from 'react-signature-canvas';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FicheSemesPostes.css';

export default function FicheSemesPostes() {
  const [fiche, setFiche] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(null);
  const signatureRef = useRef();

  useEffect(() => {
    const fetchFiche = async () => {
      try {
        const data = await getFicheSemesPostes();
        setFiche(data);
        if (data.date) setDate(new Date(data.date));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiche();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!fiche) return <p>Aucune fiche trouvée</p>;

  const handleChange = (poste, index, field, value) => {
    const newFiche = { ...fiche };
    newFiche[poste].controles[index][field] = value;
    setFiche(newFiche);
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: { scale: 1.03, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
  };

  const renderTable = (titre, posteKey) => (
    <motion.div className="poste-card" variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
      <h3>{titre}</h3>
      <table className="inspection-table">
        <thead>
          <tr>
            <th>Element</th>
            <th>Etat</th>
            <th>Interventions</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {fiche[posteKey].controles.map((c, index) => (
            <tr key={index}>
              <td>{c.element}</td>
              <td>
                <select value={c.etat} onChange={(e) => handleChange(posteKey, index, 'etat', e.target.value)}>
                  <option value=""></option>
                  <option value="OK">OK</option>
                  <option value="HS">HS</option>
                  <option value="A_VERIFIER">A vérifier</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={c.interventions}
                  onChange={(e) => handleChange(posteKey, index, 'interventions', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={c.observations}
                  onChange={(e) => handleChange(posteKey, index, 'observations', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );

  // Enregistrer la fiche
  const handleSave = async () => {
    try {
      const updatedFiche = {
        ...fiche,
        date: date ? date.toISOString() : fiche.date,
        signature: signatureRef.current.isEmpty() ? '' : signatureRef.current.toDataURL(),
      };
      await enregistrerFicheSemesPostes(fiche._id, updatedFiche);
      alert('Fiche enregistrée avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  // Envoyer la fiche
  const handleSend = async () => {
    try {
      if (!fiche.technicien_operateures || fiche.technicien_operateures.trim() === '') {
        return alert('Veuillez renseigner le nom du technicien avant d\'envoyer la fiche.');
      }
      await envoyerFicheSemesPostes(fiche._id);
      alert('Fiche envoyée avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'envoi de la fiche');
    }
  };

  return (
    <motion.div className="fiche-container" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <div className="fiche-header">
        <h2>
          Fiche Inspection Semestrielle des Postes
          {date && <span className="date-affiche"> - {date.toLocaleDateString()}</span>}
        </h2>
        <DatePicker selected={date} onChange={(date) => setDate(date)} placeholderText="Choisir la date" />
      </div>

      {/* POSTES */}
      <AnimatePresence>
        {renderTable('POSTE SST1', 'posteSST1')}
        {renderTable('POSTE SST2', 'posteSST2')}
        {renderTable('POSTE TC', 'posteTC')}
      </AnimatePresence>

      {/* Observations générales */}
      <div className="obs-section">
        <h3>Observations Générales</h3>
        <textarea
          value={fiche.observations_generales}
          onChange={(e) => setFiche({ ...fiche, observations_generales: e.target.value })}
        />
      </div>

      {/* Technicien opérateur */}
      <div className="technicien-section">
        <h3>Technicien opérateur</h3>
        <input
          type="text"
          value={fiche.technicien_operateures || ''}
          onChange={(e) => setFiche({ ...fiche, technicien_operateures: e.target.value })}
          placeholder="Nom du technicien"
        />
      </div>

      {/* Signature */}
      <div className="signature-section">
        <h3>Signature du technicien</h3>
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: 'signature-canvas' }}
          ref={signatureRef}
        />
        <button className="clear-btn" onClick={() => signatureRef.current.clear()}>
          Effacer
        </button>
      </div>

      {/* Boutons Enregistrer et Envoyer */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button className="clear-btn" onClick={handleSave} style={{ backgroundColor: '#2ecc71' }}>
          Enregistrer
        </button>
        <button className="clear-btn" onClick={handleSend} style={{ backgroundColor: '#3498db' }}>
          Envoyer
        </button>
      </div>
    </motion.div>
  );
}