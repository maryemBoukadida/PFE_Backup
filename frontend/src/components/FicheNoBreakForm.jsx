import React, { useState, useEffect } from 'react';
import {
  enregistrerFicheNoBreak,
  envoyerFicheNoBreak,
} from './apiservices/api';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import '../styles/FicheNoBreakForm.css';

const initialControles = [
  {
    specification: '',
    designation: "Contrôler l'écran de l'UNIBLOCK et d'armoire groupe Easy gen",
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: "Pression d'hélium en bar",
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Détendeur 1 0-200bar',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Détendeur 2  5 bar',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Détendeur 3 0,2,0,3bar',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Etat de graissage PB',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Température de préchauffage',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Niveau d’huile DIESEL et EMBRAYAGE',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Niveau d’eau radiateur ',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: "Etat du séparateur d'eau",
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Niveau de gasoil  dans la nourrisse en %',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Etat  de la pompe à gasoil',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation:
      'Etat des batteriEtat  de la pompe à gasoiles et cosses de Diesel +UNIBLOCK',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: "Etat d'indicateur de colmatage de filtre à air Diesel ",
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Etat des Filtres à air UNIBLOCK',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation:
      'Etat des connections, branchements des câbles électriques, relais , Fusibles et cartes électroniques',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  {
    specification: '',
    designation: 'Etat du disjoncteur de couplage',
    matin: { normal: false, anomalie: false },
    apresMidi: { normal: false, anomalie: false },
    nuit: { normal: false, anomalie: false },
  },
  // Ajouter d'autres contrôles ici
];

const initialFiche = {
  date: new Date(),
  designation: '',
  lieuInstallation: '',
  controles: initialControles,
  tempsInspection: {
    matin: { debut: '', fin: '', tempsAlloue: '' },
    apresMidi: { debut: '', fin: '', tempsAlloue: '' },
    nuit: { debut: '', fin: '', tempsAlloue: '' },
    total: '',
  },
  observations: { matin: '', apresMidi: '', nuit: '' },
  techniciens: { matin: [], apresMidi: [], nuit: [] },
};

export default function FicheNoBreakForm() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);
  const isDisabled = (periode) => shift !== periode;

  // === Gestion des cases normal/anomalie ===

  const handleCheckbox = (index, period, type) => {
    const newControles = [...fiche.controles];
    newControles[index][period][type] = !newControles[index][period][type];
    setFiche({ ...fiche, controles: newControles });
  };

  // === Calcul automatique du temps alloué ===
  useEffect(() => {
    const calcTemps = (debut, fin) => {
      if (!debut || !fin) return '00:00';
      const [h1, m1] = debut.split(':').map(Number);
      const [h2, m2] = fin.split(':').map(Number);
      let diff = h2 * 60 + m2 - (h1 * 60 + m1);
      if (diff < 0) diff += 24 * 60;
      const h = Math.floor(diff / 60)
        .toString()
        .padStart(2, '0');
      const m = (diff % 60).toString().padStart(2, '0');
      return `${h}:${m}`;
    };

    const tempsMatin = calcTemps(
      fiche.tempsInspection.matin.debut,
      fiche.tempsInspection.matin.fin
    );
    const tempsApres = calcTemps(
      fiche.tempsInspection.apresMidi.debut,
      fiche.tempsInspection.apresMidi.fin
    );
    const tempsNuit = calcTemps(
      fiche.tempsInspection.nuit.debut,
      fiche.tempsInspection.nuit.fin
    );

    const [h1, m1] = tempsMatin.split(':').map(Number);
    const [h2, m2] = tempsApres.split(':').map(Number);
    const [h3, m3] = tempsNuit.split(':').map(Number);
    const totalMinutes = h1 * 60 + m1 + h2 * 60 + m2 + h3 * 60 + m3;
    const total = `${Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, '0')}:${(totalMinutes % 60).toString().padStart(2, '0')}`;
    setFiche({
      ...fiche,
      tempsInspection: {
        matin: { ...fiche.tempsInspection.matin, tempsAlloue: tempsMatin },
        apresMidi: {
          ...fiche.tempsInspection.apresMidi,
          tempsAlloue: tempsApres,
        },
        nuit: { ...fiche.tempsInspection.nuit, tempsAlloue: tempsNuit },
        total,
      },
    });
  }, [
    fiche.tempsInspection.matin.debut,
    fiche.tempsInspection.matin.fin,
    fiche.tempsInspection.apresMidi.debut,
    fiche.tempsInspection.apresMidi.fin,
    fiche.tempsInspection.nuit.debut,
    fiche.tempsInspection.nuit.fin,
  ]);
  // === Gestion des champs simples ===
  const handleChange = (field, value) => {
    setFiche({ ...fiche, [field]: value });
  };

  const handleChangeNested = (section, field, value) => {
    setFiche({ ...fiche, [section]: { ...fiche[section], [field]: value } });
  };

  // === Enregistrement ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await enregistrerFicheNoBreak(fiche);
      setFicheId(res._id);
      alert('Fiche No-Break enregistrée ✅');
    } catch (err) {
      console.error(err);
      alert('Erreur enregistrement ❌');
    }
  };

  // === Envoi ===
  const handleEnvoyer = async () => {
    if (!ficheId) return alert("Enregistrer d'abord !");
    try {
      await envoyerFicheNoBreak(ficheId);
      alert('Fiche No-Break envoyée ✅');
    } catch (err) {
      console.error(err);
      alert('Erreur envoi ❌');
    }
  };
  const getCurrentShift = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 14) return 'matin';
    if (hour >= 14 && hour < 22) return 'apresMidi';
    return 'nuit';
  };
  const [shift, setShift] = useState(getCurrentShift());
  useEffect(() => {
    const interval = setInterval(() => {
      setShift(getCurrentShift());
    }, 60000); // update chaque minute

    return () => clearInterval(interval);
  }, []);
  // === UI ===
  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '1000px', margin: 'auto' }}
    >
      <h2>Fiche No-Break</h2>

      {/* Infos Générales */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>Date</label>
          <DatePicker
            selected={fiche.date}
            onChange={(date) => handleChange('date', date)}
            className="input"
          />
          <label>Désignation</label>
          <input
            value={fiche.designation}
            onChange={(e) => handleChange('designation', e.target.value)}
            className="input"
          />
          <label>Lieu d'installation</label>
          <input
            value={fiche.lieuInstallation}
            onChange={(e) => handleChange('lieuInstallation', e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Contrôles */}
      <h3>Contrôles</h3>
      <table className="table-controle">
        <thead>
          <tr>
            <th>Spécification</th>
            <th>Désignation</th>

            <th colSpan="2">Matin</th>
            <th colSpan="2">Après-midi</th>
            <th colSpan="2">Nuit</th>
          </tr>

          <tr>
            <th></th>
            <th></th>

            <th>Normal</th>
            <th>Anomalie</th>

            <th>Normal</th>
            <th>Anomalie</th>

            <th>Normal</th>
            <th>Anomalie</th>
          </tr>
        </thead>

        <tbody>
          {fiche.controles.map((c, i) => (
            <tr key={i}>
              <td>{c.specification}</td>
              <td>{c.designation}</td>

              {/* MATIN */}
              <td>
                <input
                  type="checkbox"
                  checked={c.matin.normal}
                  onChange={() => handleCheckbox(i, 'matin', 'normal')}
                  disabled={isDisabled('matin')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={c.matin.anomalie}
                  onChange={() => handleCheckbox(i, 'matin', 'anomalie')}
                  disabled={isDisabled('matin')}
                />
              </td>

              {/* APRES MIDI */}
              <td>
                <input
                  type="checkbox"
                  checked={c.apresMidi.normal}
                  onChange={() => handleCheckbox(i, 'apresMidi', 'normal')}
                  disabled={isDisabled('apresMidi')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={c.apresMidi.anomalie}
                  onChange={() => handleCheckbox(i, 'apresMidi', 'anomalie')}
                  disabled={isDisabled('apresMidi')}
                />
              </td>

              {/* NUIT */}
              <td>
                <input
                  type="checkbox"
                  checked={c.nuit.normal}
                  onChange={() => handleCheckbox(i, 'nuit', 'normal')}
                  disabled={isDisabled('nuit')}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={c.nuit.anomalie}
                  onChange={() => handleCheckbox(i, 'nuit', 'anomalie')}
                  disabled={isDisabled('nuit')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Temps inspection */}
      <h3>Temps inspection</h3>
      {['matin', 'apresMidi', 'nuit'].map((period) => (
        <div key={period}>
          <label>{period} Début</label>
          <TimePicker
            value={fiche.tempsInspection[period].debut}
            onChange={(t) =>
              handleChangeNested('tempsInspection', period, {
                ...fiche.tempsInspection[period],
                debut: t,
              })
            }
            disabled={isDisabled(period)} // <-- ici
          />
          <label>{period} Fin</label>
          <TimePicker
            value={fiche.tempsInspection[period].fin}
            onChange={(t) =>
              handleChangeNested('tempsInspection', period, {
                ...fiche.tempsInspection[period],
                fin: t,
              })
            }
            disabled={isDisabled(period)} // <-- ici
          />
          <span>Alloué: {fiche.tempsInspection[period].tempsAlloue}</span>
        </div>
      ))}

      {/* Observations */}
      <h3>Observations</h3>
      {['matin', 'apresMidi', 'nuit'].map((period) => (
        <div key={period}>
          <label>{period}</label>
          <textarea
            value={fiche.observations[period]}
            onChange={(e) =>
              handleChangeNested('observations', period, e.target.value)
            }
            disabled={isDisabled(period)} // <-- ici
          />
        </div>
      ))}

      {/* Techniciens */}
      <h3>Techniciens</h3>
      {['matin', 'apresMidi', 'nuit'].map((period) => (
        <div key={period}>
          <label>{period}</label>
          <input
            value={fiche.techniciens[period].join(', ')}
            onChange={(e) =>
              handleChangeNested(
                'techniciens',
                period,
                e.target.value.split(',').map((s) => s.trim())
              )
            }
            placeholder="Nom technicien(s), séparé par virgule"
            disabled={isDisabled(period)} // <-- ici
          />
        </div>
      ))}

      {/* Actions */}
      <div style={{ marginTop: '20px' }}>
        <button type="submit">Enregistrer</button>

        <button
          type="button"
          onClick={handleEnvoyer}
          style={{ marginLeft: '10px' }}
        >
          Envoyer
        </button>
        <button type="button" onClick={() => window.location.reload()}>
          Retour
        </button>
      </div>
      <div
        style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '2px solid #ddd',
          textAlign: 'center',
          fontSize: '12px',
          color: '#666',
          fontStyle: 'italic',
        }}
      >
        <p style={{ margin: '0' }}>Doc N°: TAVTUN/NBE.TD.BAL.FM.029</p>
      </div>
    </form>
  );
}
