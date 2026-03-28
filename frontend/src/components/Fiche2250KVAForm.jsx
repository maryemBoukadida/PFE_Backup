
import React, { useState, useEffect } from "react";
import { enregistrerFiche2250KVA, envoyerFiche2250KVA } from "./apiservices/api";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "../styles/FicheNoBreakForm.css";

// =======================
// POINTS DE CONTROLE
// =======================
const initialPointsControle = [
  { specification:"", designation:'Etat du panneau de contrôle "CAT EMCP"', matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Température de préchauffage", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Tension Batterie", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Niveau de gasoil (%)", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Niveau d’eau radiateur", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Niveau d’huile", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat des vannes et pompe gasoil", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat séparateur d'eau", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat batteries et cosses", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat disjoncteur GCB", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat des circuits de commande des pompes et indicateur jaugeage des citernes", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat du panneau de synchronisation DST4601/PX", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Horaire de GPE", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat de commutateur ", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat des connections, branchements des câbles électriques, relais et cartes électroniques", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
  { specification:"", designation:"Etat de commutateur PIX 12 ", matin:{normal:false,anomalie:false}, apresMidi:{normal:false,anomalie:false}, nuit:{normal:false,anomalie:false} },
];

// =======================
// FICHE INITIALE
// =======================
const initialFiche = {
  date: new Date(),
designation: "",
  lieuInstallation: "",
  pointsControle: initialPointsControle,
  tempsInspection: {
    matin: { debut: "", fin: "", tempsAlloue: "" },
    apresMidi: { debut: "", fin: "", tempsAlloue: "" },
    nuit: { debut: "", fin: "", tempsAlloue: "" },
    total: "",
  },
  observations: { matin: "", apresMidi: "", nuit: "" },
  techniciens: { matin: [], apresMidi: [], nuit: [] },
};

export default function Fiche2250KVAForm() {
  const [fiche, setFiche] = useState(initialFiche);
  const [ficheId, setFicheId] = useState(null);

  // ================= SHIFT =================
  const getCurrentShift = () => {
    const h = new Date().getHours();
    if (h >= 6 && h < 14) return "matin";
    if (h >= 14 && h < 22) return "apresMidi";
    return "nuit";
  };

  const [shift, setShift] = useState(getCurrentShift());

  useEffect(() => {
    const interval = setInterval(() => setShift(getCurrentShift()), 60000);
    return () => clearInterval(interval);
  }, []);

  const isDisabled = (periode) => shift !== periode;

  // ================= CHECKBOX =================
  const handleCheckbox = (index, period, type) => {
    const data = [...fiche.pointsControle];
    data[index][period][type] = !data[index][period][type];
    setFiche({ ...fiche, pointsControle: data });
  };

  // ================= TEMPS AUTO =================
  useEffect(() => {
    const calc = (d, f) => {
      if (!d || !f) return "00:00";
      const [h1,m1]=d.split(":").map(Number);
      const [h2,m2]=f.split(":").map(Number);
      let diff = h2*60+m2 - (h1*60+m1);
      if(diff<0) diff+=1440;
      return `${String(Math.floor(diff/60)).padStart(2,"0")}:${String(diff%60).padStart(2,"0")}`;
    };

    const m = calc(fiche.tempsInspection.matin.debut, fiche.tempsInspection.matin.fin);
    const a = calc(fiche.tempsInspection.apresMidi.debut, fiche.tempsInspection.apresMidi.fin);
    const n = calc(fiche.tempsInspection.nuit.debut, fiche.tempsInspection.nuit.fin);

    const totalMin =
      m.split(":")[0]*60 + +m.split(":")[1] +
      a.split(":")[0]*60 + +a.split(":")[1] +
      n.split(":")[0]*60 + +n.split(":")[1];

    const total = `${String(Math.floor(totalMin/60)).padStart(2,"0")}:${String(totalMin%60).padStart(2,"0")}`;

    setFiche({
      ...fiche,
      tempsInspection: {
        matin: { ...fiche.tempsInspection.matin, tempsAlloue: m },
        apresMidi: { ...fiche.tempsInspection.apresMidi, tempsAlloue: a },
        nuit: { ...fiche.tempsInspection.nuit, tempsAlloue: n },
        total
      }
    });
  }, [
    fiche.tempsInspection.matin.debut,
    fiche.tempsInspection.matin.fin,
    fiche.tempsInspection.apresMidi.debut,
    fiche.tempsInspection.apresMidi.fin,
    fiche.tempsInspection.nuit.debut,
    fiche.tempsInspection.nuit.fin
  ]);

  // ================= CHAMPS =================
  const handleChange = (f, v) => setFiche({ ...fiche, [f]: v });
const handleChangeNested = (section, field, value) => {
    setFiche({ ...fiche, [section]: { ...fiche[section], [field]: value } });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await enregistrerFiche2250KVA(fiche);
    setFicheId(res._id);
    alert("Fiche enregistrée ✅");
  };

  const handleEnvoyer = async () => {
    if (!ficheId) return alert("Enregistrer d'abord !");
    await envoyerFiche2250KVA(ficheId);
    alert("Fiche envoyée ✅");
  };

  // ================= UI =================
  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '1000px', margin: 'auto' }}
    >
      <h2>Fiche 2250KVA</h2>

      <label>Date</label>
      <DatePicker
        selected={fiche.date}
        onChange={(d) => handleChange('date', d)}
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

      <h3>Points de contrôle</h3>

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
          {fiche.pointsControle.map((c, i) => (
            <tr key={i}>
              {/* SPECIFICATION */}
              <td>{c.specification}</td>

              {/* DESIGNATION */}
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

      <button type="submit">Enregistrer</button>
      <button type="button" onClick={handleEnvoyer}>
        Envoyer
      </button>
      <button type="button" onClick={() => window.location.reload()}>
        Retour
      </button>
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
        <p style={{ margin: '0' }}>Doc N°:TAVTUN/NBE.TD.BAL.FM.075</p>
      </div>
    </form>
  );
}

