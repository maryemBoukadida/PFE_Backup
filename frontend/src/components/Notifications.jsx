import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notification.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import {
  fetchNotifications,
  marquerNotifCommeLue,
  ajouterHistoriqueAction,
} from './apiservices/api';
export default function Notifications() {
  const th = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };

  const td = {
    border: '1px solid #ccc',
    padding: '8px',
  };
  const [notifications, setNotifications] = useState([]);
  const [selectedFiche, setSelectedFiche] = useState(null);
  const navigate = useNavigate();
  const FICHE_PISTE_API = 'http://localhost:5000/api/fiche-piste';
  const FICHE_DGS_API = 'http://localhost:5000/api/fiche-dgs';
  const FICHE_FEUX_API = 'http://localhost:5000/api/feux-obstacles';
  const FICHE_LVP_API = 'http://localhost:5000/api/fiche-lvp';
  const FICHE_REGULATEURES_API = 'http://localhost:5000/api/fiche-regulateures';
  const FICHE_POSTES_API = 'http://localhost:5000/api/fiche-postes';
  const FICHE_AIDES_RADIOS_API = 'http://localhost:5000/api/fiche-aides-radios';
  const FICHE_FEUXEN_API = 'http://localhost:5000/api/fiche-feux-encastres';
  const FICHE_REGULATEURS_API =
    'http://localhost:5000/api/fiche-semes-regulateures';
  const FICHE_POSTESS_API = 'http://localhost:5000/api/fiche-semes-postes';
  const FICHE_DGSS_API = 'http://localhost:5000/api/fiche-semes-dgs';
  const FICHE_TGBT_API = 'http://localhost:5000/api/fiche-ann-tgbt';
  const FICHE_VOIE_API = 'http://localhost:5000/api/fiche-ann-voie';
  const FICHE_ANN_INFRASTRUCTURE_API =
    'http://localhost:5000/api/fiche-ann-infrastructure';
  const FICHE_HORS_SQL_API = 'http://localhost:5000/api/fiche-hors-sql';
  const FICHE_EFFAR_API = 'http://localhost:5000/api/fiche-effar';
  const FICHE_ANN_OBS_API = 'http://localhost:5000/api/fiche-ann-obs';
  const FICHE_ANN_CABLE_API = 'http://localhost:5000/api/fiche-ann-cable';
  const FICHE_ANN_FEUX_SEQ_API =
    'http://localhost:5000/api/fiche-ann-feux-sequentiels';
  const FICHE_QUI_PAPI_API = 'http://localhost:5000/api/fiche-qui-papi';
  const FICHE_CORRECTIVE_API = 'http://localhost:5000/api/fiche-corrective';
  const FICHE_NOBREAK_API = 'http://localhost:5000/api/fiche-nobreak';
  const FICHE_2250KVA_API = 'http://localhost:5000/api/fiche-2250kva';
  const FICHE_OLAPION_API = 'http://localhost:5000/api/fiche-olapion';
  const FICHE_BALISAGE_API = 'http://localhost:5000/api/fiche-balisage';
  const FICHE_ANN_PAMA_API = 'http://localhost:5000/api/fiche-ann-pa-ma';
  const BRIGADE_API = 'http://localhost:5000/api/fiche-brigade';

  // ===================== CHARGER NOTIFICATIONS =====================
  const fetchNotifications = async () => {
    try {
      const res1 = await fetch(
        'http://localhost:5000/api/inspections/tech/notifications'
      );
      const res2 = await fetch(
        'http://localhost:5000/api/fiche_papi/notifications'
      );
      const res3 = await fetch(
        'http://localhost:5000/api/feux-obstacles/notifications'
      );
      const res4 = await fetch(
        'http://localhost:5000/api/fiche-lvp/notifications'
      );
      const res5 = await fetch(
        'http://localhost:5000/api/fiche-regulateures/notifications'
      );
      const res6 = await fetch(
        'http://localhost:5000/api/fiche-postes/notifications'
      );
      const res7 = await fetch(
        'http://localhost:5000/api/fiche-aides-radios/notifications'
      );
      const res8 = await fetch(
        'http://localhost:5000/api/fiche-feux-encastres/notifications'
      );
      const res9 = await fetch(
        'http://localhost:5000/api/fiche-semes-regulateures/notifications'
      );
      const res10 = await fetch(
        'http://localhost:5000/api/fiche-semes-postes/notifications'
      );
      const res11 = await fetch(
        'http://localhost:5000/api/fiche-semes-dgs/notifications'
      );
      const res12 = await fetch(
        'http://localhost:5000/api/fiche-ann-tgbt/notifications'
      );
      const res13 = await fetch(
        'http://localhost:5000/api/fiche-ann-voie/notifications'
      );
      const res14 = await fetch(
        'http://localhost:5000/api/fiche-ann-infrastructure/notifications'
      );
      const res15 = await fetch(
        'http://localhost:5000/api/fiche-hors-sql/notifications'
      );
      const res16 = await fetch(
        'http://localhost:5000/api/fiche-effar/notifications'
      );
      const res17 = await fetch(
        'http://localhost:5000/api/fiche-ann-obs/notifications'
      );
      const res18 = await fetch(
        'http://localhost:5000/api/fiche-ann-cable/notifications'
      );
      const res19 = await fetch(
        'http://localhost:5000/api/fiche-ann-feux-sequentiels/notifications'
      );
      const res20 = await fetch(
        'http://localhost:5000/api/fiche-qui-papi/notifications'
      );
      const res21 = await fetch(
        'http://localhost:5000/api/fiche-corrective/notifications'
      );
      const res22 = await fetch(
        'http://localhost:5000/api/fiche-nobreak/notifications'
      );
      const res23 = await fetch(
        'http://localhost:5000/api/fiche-2250kva/notifications'
      );
      const res24 = await fetch(
        'http://localhost:5000/api/fiche-olapion/notifications'
      );
      const res25 = await fetch(
        'http://localhost:5000/api/fiche-balisage/notifications'
      );
      const res26 = await fetch(
        'http://localhost:5000/api/fiche-ann-pa-ma/notifications'
      );
      const res27 = await fetch(
        'http://localhost:5000/api/fiche-brigade/notifications'
      );

      const data1 = res1.ok ? await res1.json() : [];
      const data2 = res2.ok ? await res2.json() : [];
      const data3 = res3.ok ? await res3.json() : [];
      const data4 = res4.ok ? await res4.json() : [];
      const data5 = res5.ok ? await res5.json() : [];
      const data6 = res6.ok ? await res6.json() : [];
      const data7 = res7.ok ? await res7.json() : [];
      const data8 = res8.ok ? await res8.json() : [];
      const data9 = res9.ok ? await res9.json() : [];
      const data10 = res10.ok ? await res10.json() : [];
      const data11 = res11.ok ? await res11.json() : [];
      const data12 = res12.ok ? await res12.json() : [];
      const data13 = res13.ok ? await res13.json() : [];
      const data14 = res14.ok ? await res14.json() : [];
      const data15 = res15.ok ? await res15.json() : [];
      const data16 = res16.ok ? await res16.json() : [];
      const data17 = res17.ok ? await res17.json() : [];
      const data18 = res18.ok ? await res18.json() : [];
      const data19 = res19.ok ? await res19.json() : [];
      const data20 = res20.ok ? await res20.json() : [];
      const data21 = res21.ok ? await res21.json() : [];
      const data22 = res22.ok ? await res22.json() : [];
      const data23 = res23.ok ? await res23.json() : [];
      const data24 = res24.ok ? await res24.json() : [];
      const data25 = res25.ok ? await res25.json() : [];
      const data26 = res26.ok ? await res26.json() : [];
      const data27 = res27.ok ? await res27.json() : [];
      setNotifications([
        ...(Array.isArray(data1) ? data1 : []),
        ...(Array.isArray(data2) ? data2 : []),
        ...(Array.isArray(data3) ? data3 : []),
        ...(Array.isArray(data4) ? data4 : []),
        ...(Array.isArray(data5) ? data5 : []),
        ...(Array.isArray(data6) ? data6 : []),
        ...(Array.isArray(data7) ? data7 : []),
        ...(Array.isArray(data8) ? data8 : []),
        ...(Array.isArray(data9) ? data9 : []),
        ...(Array.isArray(data10) ? data10 : []),
        ...(Array.isArray(data11) ? data11 : []),
        ...(Array.isArray(data12) ? data12 : []),
        ...(Array.isArray(data13) ? data13 : []),
        ...(Array.isArray(data14) ? data14 : []),
        ...(Array.isArray(data15) ? data15 : []),
        ...(Array.isArray(data16) ? data16 : []),
        ...(Array.isArray(data17) ? data17 : []),
        ...(Array.isArray(data18) ? data18 : []),
        ...(Array.isArray(data19) ? data19 : []),
        ...(Array.isArray(data20) ? data20 : []),
        ...(Array.isArray(data21) ? data21 : []),
        ...(Array.isArray(data22) ? data22 : []),
        ...(Array.isArray(data23) ? data23 : []),
        ...(Array.isArray(data24) ? data24 : []),
        ...(Array.isArray(data25) ? data25 : []),
        ...(Array.isArray(data26) ? data26 : []),
        ...(Array.isArray(data27) ? data27 : []),
      ]);
    } catch (err) {
      console.error('Erreur notifications :', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ===================== VOIR FICHE =====================
  const voirFiche = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/inspections/tech/${id}`
      );
      if (!res.ok)
        return console.error('Erreur récupération fiche :', res.status);
      const data = await res.json();
      setSelectedFiche(data);
    } catch (err) {
      console.error(err);
    }
  };

  const voirFichePapi = async (ficheId, notifId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/fiche_papi/${ficheId}`
      );
      const data = await res.json();
      setSelectedFiche(data);

      await fetch(
        `http://localhost:5000/api/fiche_papi/notifications/${notifId}/read`,
        { method: 'PUT' }
      );
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const voirFichePiste = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_PISTE_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche Piste');
      const data = await res.json();
      setSelectedFiche(data);

      await fetch(`http://localhost:5000/api/notifications/${notifId}/read`, {
        method: 'PUT',
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };
  const voirFicheDGS = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_DGS_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche DGS');
      const data = await res.json();
      setSelectedFiche(data);
    } catch (err) {
      console.error(err);
    }
  };
  const voirFicheFeux = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_FEUX_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche Feux');
      const data = await res.json();
      setSelectedFiche(data);
      if (notifId)
        await fetch(`http://localhost:5000/api/notifications/${notifId}/read`, {
          method: 'PUT',
        });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };
  const voirFicheLVP = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_LVP_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche LVP');
      const data = await res.json();
      setSelectedFiche(data);
    } catch (err) {
      console.error('Erreur voir fiche LVP :', err);
    }
  };
  //voir fiche regulateuress
  const voirFicheRegulateures = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_REGULATEURES_API}/${ficheId}`);
      if (!res.ok)
        return console.error('Erreur récupération fiche régulateures');
      const data = await res.json();
      setSelectedFiche(data); // exemple
    } catch (err) {
      console.error('Erreur voir fiche régulateures :', err);
    }
  };
  //voir fiche POSTES
  const voirFichePostes = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_POSTES_API}/${ficheId}`);
      if (!res.ok) return console.error('Erreur récupération fiche postes');
      const data = await res.json();
      setSelectedFiche(data); // exemple
    } catch (err) {
      console.error('Erreur voir fiche postes :', err);
    }
  };
  //voir fiche aides radios
  const voirFicheAidesRadios = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_AIDES_RADIOS_API}/${ficheId}`);
      if (!res.ok)
        return console.error('Erreur récupération fiche aides radios');

      const data = await res.json();
      // Stocker notifId pour l’utiliser lors de la validation
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche aides radios :', err);
    }
  };
  // voir fiche feux encastres
  const voirFicheFeuxEncastres = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche par son ID
      const res = await fetch(`${FICHE_FEUXEN_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche feux encastrés');
        return;
      }

      const data = await res.json();

      // stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche feux encastrés :', err);
    }
  };

  const voirFicheSemesRegulateures = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche par son ID
      const res = await fetch(`${FICHE_REGULATEURS_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche régulateurs');
        return;
      }
      const data = await res.json();
      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche régulateurs :', err);
    }
  };
  const voirFicheSemesPostes = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche semestrielle postes par ID
      const res = await fetch(`${FICHE_POSTESS_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche semestrielle postes');
        return;
      }
      const data = await res.json();
      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche semestrielle postes :', err);
    }
  };
  const voirFicheSemesDgs = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche semestrielle DGS par ID
      const res = await fetch(`${FICHE_DGSS_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche semestrielle DGS');
        return;
      }
      const data = await res.json();
      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche semestrielle DGS :', err);
    }
  };
  const voirFicheAnnTgbt = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche annuelle TGBT par ID
      const res = await fetch(`${FICHE_TGBT_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche annuelle TGBT');
        return;
      }
      const data = await res.json();
      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche annuelle TGBT :', err);
    }
  };
  const voirFicheAnnVoie = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche annuelle voie par ID
      const res = await fetch(`${FICHE_VOIE_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche annuelle voie');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche annuelle voie :', err);
    }
  };
  const voirFicheAnnInfrastructure = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche Infrastructure par ID
      const res = await fetch(`${FICHE_ANN_INFRASTRUCTURE_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche Infrastructure');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche Infrastructure :', err);
    }
  };

  const voirFicheHorsSql = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche Hors SQL par ID
      const res = await fetch(`${FICHE_HORS_SQL_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche Hors SQL');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche Hors SQL :', err);
    }
  };
  const voirFicheEffar = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche Effaroucheur par ID
      const res = await fetch(`${FICHE_EFFAR_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche Effaroucheur');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche Effaroucheur :', err);
    }
  };
  const voirFicheAnnObs = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche FEUX OBSTACLES annuelles par ID
      const res = await fetch(`${FICHE_ANN_OBS_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche AnnObs');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche AnnObs :', err);
    }
  };

  const voirFicheAnnCable = async (ficheId, notifId) => {
    try {
      const res = await fetch(`${FICHE_ANN_CABLE_API}/${ficheId}`);
      if (!res.ok) {
        console.error('Erreur récupération fiche CABLE');
        return;
      }

      const data = await res.json();

      // ✅ Securiser les tableaux pour éviter le crash
      const safeData = {
        ...data,
        postes: Array.isArray(data.postes)
          ? data.postes.map((p) => ({
              ...p,
              equipements: Array.isArray(p.equipements) ? p.equipements : [],
            }))
          : [],
      };

      setSelectedFiche({ ...safeData, notifId });
    } catch (err) {
      console.error('Erreur voir fiche CABLE :', err);
    }
  };

  const voirFicheAnnFeuxSeq = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche FEUX SEQUENTIELS annuelle par ID
      const res = await fetch(`${FICHE_ANN_FEUX_SEQ_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche AnnFeuxSeq');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche AnnFeuxSeq :', err);
    }
  };

  const voirFicheQuiPapi = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche quinquennale PAPI par ID
      const res = await fetch(`${FICHE_QUI_PAPI_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche quinquennale PAPI');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche quinquennale PAPI :', err);
    }
  };
  const voirFicheCorrective = async (ficheId, notifId) => {
    try {
      // Récupérer la fiche corrective par ID
      const res = await fetch(`${FICHE_CORRECTIVE_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche corrective');
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche corrective :', err);
    }
  };
  const voirFicheNoBreak = async (ficheId, notifId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/fiche-nobreak/${ficheId}`
      );

      if (!res.ok) {
        console.error('Erreur récupération fiche NoBreak');
        return;
      }

      const data = await res.json();

      // 🔥 stocker fiche + notifId
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche NoBreak :', err);
    }
  };
  // fiche 2250 kva :
  const voirFiche2250KVA = async (ficheId, notifId) => {
    try {
      // 🔹 appel API fiche 2250KVA
      const res = await fetch(`${FICHE_2250KVA_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche 2250KVA');
        return;
      }

      const data = await res.json();

      // 🔹 stocker fiche + notifId (comme PAPI)
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche 2250KVA :', err);
    }
  };
  // fiche olapion

  const voirFicheOlapion = async (ficheId, notifId) => {
    try {
      // 🔹 appel API fiche Olapion
      const res = await fetch(`${FICHE_OLAPION_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche Olapion');
        return;
      }

      const data = await res.json();

      // 🔹 stocker fiche + notifId
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche Olapion :', err);
    }
  };
  const voirFicheBalisage = async (ficheId, notifId) => {
    try {
      // 🔹 Récupérer la fiche balisage
      const res = await fetch(`${FICHE_BALISAGE_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche balisage');
        return;
      }

      const data = await res.json();

      // 🔹 Stocker la fiche + notifId
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche balisage :', err);
    }
  };
  const voirFichePaMa = async (ficheId, notifId) => {
    try {
      // 🔹 appel API fiche PaMa
      const res = await fetch(`${FICHE_ANN_PAMA_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche PaMa');
        return;
      }

      const data = await res.json();

      // 🔹 stocker fiche + notifId
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche PaMa :', err);
    }
  };
  // fifhce brigade
  const voirFicheBrigade = async (ficheId, notifId) => {
    try {
      // 🔹 Récupérer la fiche brigade
      const res = await fetch(`${BRIGADE_API}/${ficheId}`);

      if (!res.ok) {
        console.error('Erreur récupération fiche Brigade');
        return;
      }

      const data = await res.json();

      // 🔹 Stocker la fiche + notifId
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error('Erreur voir fiche Brigade :', err);
    }
  };

  //marquer fiche comme lu
  const marquerNotifCommeLue = async (notifId) => {
    if (!notifId) return;
    try {
      await fetch(`http://localhost:5000/api/notifications/${notifId}/read`, {
        method: 'PUT',
      });
      fetchNotifications();
    } catch (err) {
      console.error('Erreur marquage notification :', err);
    }
  };

  // ===================== VALIDER FICHE =====================
  const validerFiche = async (id, notifId = null) => {
    try {
      let url = '';
      let body = {};
      let selectedFicheType = ''; // déclaration du type de fiche
      if (selectedFiche?.verifications) {
        url = 'http://localhost:5000/api/fiche_papi/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_papi';
      } else if (selectedFiche?.zones) {
        url = 'http://localhost:5000/api/fiche-piste/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_piste';
      } else if (selectedFiche?.dgs) {
        url = 'http://localhost:5000/api/fiche-dgs/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_dgs';
      } else if (selectedFiche?.installations) {
        url = 'http://localhost:5000/api/feux-obstacles/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_feux_obstacles';
      } else if (selectedFiche?.lvp) {
        url = 'http://localhost:5000/api/fiche-lvp/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_lvp';
      } else if (selectedFiche?.boucles) {
        url = 'http://localhost:5000/api/fiche-regulateures/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_regulateures';
      } else if (selectedFiche?.postes) {
        url = 'http://localhost:5000/api/fiche-postes/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_postes';
      } else if (selectedFiche?.aidesRadios) {
        url = 'http://localhost:5000/api/fiche-aides-radios/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_aides_radios';
      } else if (selectedFiche?.emplacements) {
        url = 'http://localhost:5000/api/fiche_feux_encastres/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_feux_encastres';
      } else if (selectedFiche?.boucles) {
        url = 'http://localhost:5000/api/fiche-semes-regulateures/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_semes_regulateures';
      } else if (selectedFiche?.postess) {
        url = 'http://localhost:5000/api/fiche-semes-postes/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_semes_postes';
      } else if (selectedFiche?.dgs) {
        url = 'http://localhost:5000/api/fiche_semes_dgs/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_semes_dgs';
      } else if (selectedFiche?.postesq) {
        url = 'http://localhost:5000/api/fiche-ann-tgbt/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_tgbt';
      } else if (selectedFiche?.panneaux) {
        url = 'http://localhost:5000/api/fiche-ann-voie/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_voie';
      } else if (selectedFiche?.PISTE) {
        url = 'http://localhost:5000/api/fiche-ann-infrastructure/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_infrastructure';
      } else if (selectedFiche?.feuxHorsSol) {
        url = 'http://localhost:5000/api/fiche-hors-sql/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_hors_sql';
      } else if (selectedFiche?.fiches) {
        url = 'http://localhost:5000/api/fiche-effar/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_effar';
      } else if (selectedFiche?.sections) {
        url = 'http://localhost:5000/api/fiche-ann-obs/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_obs';
      } else if (selectedFiche?.postesC) {
        url = 'http://localhost:5000/api/fiche-ann-cable/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_cable';
      } else if (selectedFiche?.blocs) {
        url = 'http://localhost:5000/api/fiche-ann-feux-sequentiels/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_feux_sequentiels';
      } else if (selectedFiche?.papi) {
        url = 'http://localhost:5000/api/fiche-qui-papi/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_quinquennale_papi';
      } else if (selectedFiche?.ficheCorrective) {
        url = 'http://localhost:5000/api/fiche-corrective/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_corrective';
      } else if (selectedFiche?.controles) {
        url = 'http://localhost:5000/api/fiche-nobreak/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_nobreak';
      } else if (selectedFiche?.pointsControle) {
        url = 'http://localhost:5000/api/fiche-2250kva/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_2250kva';
      } else if (selectedFiche?.operations) {
        url = 'http://localhost:5000/api/fiche-olapion/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_olapion';
      } else if (selectedFiche?.groupes) {
        url = 'http://localhost:5000/api/fiche-balisage/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_balisage';
      } else if (selectedFiche?.tableaux) {
        url = 'http://localhost:5000/api/fiche-ann-pa-ma/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_ann_pa_ma';
      } else if (selectedFiche?.blocsBrigade) {
        url = 'http://localhost:5000/api/fiche-brigade/valider';
        body = { ficheId: id };
        selectedFicheType = 'fiche_brigade';
      } else {
        url = 'http://localhost:5000/api/inspections/valider';
        body = { inspectionId: id };
        selectedFicheType = 'inspection';
      }
      // valider fiche
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (notifId) {
        await marquerNotifCommeLue(notifId);
      }

      // 🔹 Feedback utilisateur
      alert("Fiche validée et ajoutée à l'historique ✅");
      setSelectedFiche(null);
      fetchNotifications();
      navigate('/historique-actions', {
        state: {
          alertMessage: "Nouvelle fiche validée et ajoutée à l'historique",
        },
      });
    } catch (err) {
      console.error('Erreur validation fiche :', err);
      alert('Erreur lors de la validation');
    }
  };

  // ===================== EXPORT PDF =====================
  const exportPDF = () => {
    if (!selectedFiche) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    // ================= PAPI =================
    if (selectedFiche?.verifications) {
      doc.text(`Fiche PAPI Mensuelle`, 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleDateString()}`,
        14,
        22
      );
      doc.text(`👨‍🔧 Techniciens : ${selectedFiche.techniciens || ''}`, 14, 28);
      doc.text(`📝 Observations : ${selectedFiche.observations || ''}`, 14, 34);

      const tableColumn = [
        'Élément',
        '11',
        '12',
        '21',
        '22',
        '31',
        '32',
        '41',
        '42',
      ];
      const tableRows09 = (selectedFiche.verifications || []).map((v) => [
        v.element,
        v.v11_09 || '',
        v.v12_09 || '',
        v.v21_09 || '',
        v.v22_09 || '',
        v.v31_09 || '',
        v.v32_09 || '',
        v.v41_09 || '',
        v.v42_09 || '',
      ]);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows09,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      const startY = doc.lastAutoTable.finalY + 10;
      const tableRows27 = (selectedFiche.verifications || []).map((v) => [
        v.element,
        v.v11_27 || '',
        v.v12_27 || '',
        v.v21_27 || '',
        v.v22_27 || '',
        v.v31_27 || '',
        v.v32_27 || '',
        v.v41_27 || '',
        v.v42_27 || '',
      ]);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows27,
        startY,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      doc.save(`Fiche_PAPI_${new Date(selectedFiche.date).toISOString()}.pdf`);
    } else if (selectedFiche?.zonePrincipale) {
      doc.text(`Fiche Piste : ${selectedFiche.zonePrincipale}`, 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleString()}`,
        14,
        22
      );

      const tableColumn = [
        'Zone',
        'Élément',
        'État',
        'Observation',
        'Intervention',
      ];
      let tableRows = [];
      (selectedFiche.zones || []).forEach((zone) => {
        (zone.verifications || []).forEach((v) => {
          tableRows.push([
            zone.nom,
            v.element,
            v.etat,
            v.observation,
            v.intervention,
          ]);
        });
      });
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });
      doc.save(`Fiche_Piste_${new Date(selectedFiche.date).toISOString()}.pdf`);
      // ================= LVP =================
    } else if (selectedFiche?.feuxLVPEast || selectedFiche?.feuxLVPWest) {
      doc.text('Fiche LVP Mensuelle', 14, 15);
      doc.setFontSize(11);

      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleDateString()}`,
        14,
        22
      );

      doc.text(`👨‍🔧 Technicien : ${selectedFiche.technicien || ''}`, 14, 28);

      const tableColumn = [
        'Position',
        'Etat Général',
        'Interventions',
        'Observations',
      ];

      // -------- Feux Est --------
      if (selectedFiche.feuxLVPEast?.length > 0) {
        doc.text('Feux LVP Est', 14, 40);

        const rowsEast = selectedFiche.feuxLVPEast.map((f) => [
          f.position || '',
          f.etatGeneralBalise || '',
          f.interventions || '',
          f.observations || '',
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: rowsEast,
          startY: 45,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: 255 },
          styles: { fontSize: 10 },
        });
      }

      // -------- Feux Ouest --------
      if (selectedFiche.feuxLVPWest?.length > 0) {
        const startY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 45;

        doc.text('Feux LVP Ouest', 14, startY);

        const rowsWest = selectedFiche.feuxLVPWest.map((f) => [
          f.position || '',
          f.etatGeneralBalise || '',
          f.interventions || '',
          f.observations || '',
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: rowsWest,
          startY: startY + 5,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: 255 },
          styles: { fontSize: 10 },
        });
      }
      doc.text(
        `📝 Observations générales : ${selectedFiche.observationsGenerales || ''}`,
        14,
        34
      );
      doc.save(`Fiche_LVP_${new Date(selectedFiche.date).toISOString()}.pdf`);

      // ================= FEUX OBSTACLES =================
    } else if (selectedFiche?.installations?.length > 0) {
      doc.text(`Fiche Feux Obstacles`, 14, 15);
      doc.setFontSize(11);

      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleDateString()}`,
        14,
        22
      );

      doc.text(`👨‍🔧 Technicien : ${selectedFiche.technicien || ''}`, 14, 28);

      doc.text(
        `📝 Observation générale : ${selectedFiche.observationGenerale || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Lieu installation',
        'Alimentation',
        'Lampe',
        'Observations',
      ];

      const tableRows = (selectedFiche.installations || []).map((f) => [
        f.lieuInstallation || '',
        f.alimentation || '',
        f.lampe || '',
        f.observations || '',
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      doc.save(
        `Fiche_Feux_Obstacles_${new Date(selectedFiche.date).toISOString()}.pdf`
      );
      // ================= regulateuresss =================
    } else if (selectedFiche?.boucles?.length > 0) {
      doc.text('Fiche Régulateures Mensuelle', 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleDateString()}`,
        14,
        22
      );
      doc.text(`👨‍🔧 Technicien : ${selectedFiche.technicien || ''}`, 14, 28);
      doc.text(
        `📝 Observations générales : ${selectedFiche.observationsGenerales || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Zone',
        'Boucle',
        'Type / Puissance',
        'ISOLEMENT',
        'CHARGE',
        'B1',
        'B2',
        'B3',
        'B4',
        'B5',
        'A',
        'V',
        'TÉLÉCOMMANDE',
        'AFFICHEUR',
        'CLAVIER',
      ];
      const tableRows = (selectedFiche.boucles || []).map((b) => [
        b.zone || '',
        b.BOUCLE || '',
        b.typePuissance || '',
        b.ISOLEMENT || '',
        b.charge || '',
        b.Iout?.B1 || '',
        b.Iout?.B2 || '',
        b.Iout?.B3 || '',
        b.Iout?.B4 || '',
        b.Iout?.B5 || '',
        b.InVin?.A || '',
        b.InVin?.V || '',
        b.telecommande || '',
        b.afficheur || '',
        b.clavier || '',
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 8 },
      });

      doc.save(
        `Fiche_Regulateures_${new Date(selectedFiche.date).toISOString()}.pdf`
      );
      //inspectionss
    } // ===================== EXPORT PDF POSTE =====================
    else if (selectedFiche?.posteSST1?.length > 0) {
      doc.text('Fiche Poste Mensuelle - SST1', 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(`👨‍🔧 Technicien : ${selectedFiche.technicien || ''}`, 14, 28);
      doc.text(
        `📝 Observations générales : ${selectedFiche.observationsGenerales || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Poste',
        'Élément',
        'État',
        'Interventions',
        'Observations',
      ];

      const tableRows = selectedFiche.posteSST1.map((row) => [
        'posteSST1',
        row.element || '',
        row.etat || '',
        row.interventions || '',
        row.observations || '',
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      doc.save(
        `Fiche_Poste_SST1_${selectedFiche.date ? new Date(selectedFiche.date).toISOString() : 'date_inconnue'}.pdf`
      );
    }
    // ===================== EXPORT PDF POSTES =====================
    else if (
      selectedFiche?.posteSST1?.length > 0 ||
      selectedFiche?.posteSST2?.length > 0 ||
      selectedFiche?.posteTC?.length > 0
    ) {
      doc.text('Fiche Poste Mensuelle', 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${
          selectedFiche.date
            ? new Date(selectedFiche.date).toLocaleDateString()
            : ''
        }`,
        14,
        22
      );
      doc.text(`👨‍🔧 Technicien : ${selectedFiche.technicien || ''}`, 14, 28);
      doc.text(
        `📝 Observations générales : ${selectedFiche.observationsGenerales || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Poste',
        'Élément',
        'État',
        'Interventions',
        'Observations',
      ];
      const tableRows = [];

      // Fonction pour ajouter chaque poste
      const addRows = (posteName, data) => {
        if (!data || data.length === 0) return;
        data.forEach((row, i) => {
          tableRows.push([
            i === 0 ? posteName : '', // Poste seulement sur la première ligne (rowSpan visuel)
            row.element || '',
            row.etat || '',
            row.interventions || '',
            row.observations || '',
          ]);
        });
      };

      addRows('posteSST1', selectedFiche.posteSST1);
      addRows('posteSST2', selectedFiche.posteSST2);
      addRows('posteTC', selectedFiche.posteTC);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      doc.save(
        `Fiche_Postes_${selectedFiche.date ? new Date(selectedFiche.date).toISOString() : 'date_inconnue'}.pdf`
      );
      // ===================== EXPORT PDF aides radiso =====================
    } else if (
      selectedFiche?.poste_MT_SST2?.length > 0 ||
      selectedFiche?.TGBT_Aides_Radios?.poste_BT_GLIDE09?.length > 0 ||
      selectedFiche?.TGBT_Aides_Radios?.poste_BT_GLIDE027?.length > 0 ||
      selectedFiche?.TGBT_Aides_Radios?.poste_BT_LOC09?.length > 0 ||
      selectedFiche?.TGBT_Aides_Radios?.poste_BT_LOC27?.length > 0 ||
      selectedFiche?.TGBT_Aides_Radios?.poste_BT_DVOR?.length > 0
    ) {
      doc.text('Fiche Aides Radios Mensuelle', 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(
        `👨‍🔧 Technicien : ${selectedFiche.technicien_operateur || ''}`,
        14,
        28
      );
      doc.text(
        `📝 Observations générales : ${selectedFiche.observations_generales || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Poste',
        'Élément',
        'Type',
        'État',
        'Interventions',
        'Observations',
      ];
      const tableRows = [];

      const addRows = (posteName, data) => {
        if (!data || data.length === 0) return;
        data.forEach((item, index) => {
          if (item.sous_elements?.length > 0) {
            item.sous_elements.forEach((sub, subIndex) => {
              tableRows.push([
                subIndex === 0 ? posteName : '',
                subIndex === 0 ? item.element : '',
                sub.type || '',
                sub.etat || '',
                sub.interventions || '',
                sub.observations || '',
              ]);
            });
          } else {
            tableRows.push([
              index === 0 ? posteName : '',
              item.element || '',
              '',
              item.etat || '',
              item.interventions || '',
              item.observations || '',
            ]);
          }
        });
      };

      addRows('POSTE MT SST2', selectedFiche.poste_MT_SST2);
      addRows(
        'POSTE BT GLIDE09',
        selectedFiche.TGBT_Aides_Radios.poste_BT_GLIDE09
      );
      addRows(
        'POSTE BT GLIDE027',
        selectedFiche.TGBT_Aides_Radios.poste_BT_GLIDE027
      );
      addRows('POSTE BT LOC09', selectedFiche.TGBT_Aides_Radios.poste_BT_LOC09);
      addRows('POSTE BT LOC27', selectedFiche.TGBT_Aides_Radios.poste_BT_LOC27);
      addRows('POSTE BT DVOR', selectedFiche.TGBT_Aides_Radios.poste_BT_DVOR);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      // Ajouter la signature si elle existe
      if (selectedFiche.signature) {
        const imgProps = doc.getImageProperties(selectedFiche.signature);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const imgWidth = 100;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const startY = doc.lastAutoTable.finalY + 10;
        doc.text('Signature :', 14, startY + 6);
        doc.addImage(
          selectedFiche.signature,
          'PNG',
          14,
          startY + 10,
          imgWidth,
          imgHeight
        );
      }

      doc.save(
        `Fiche_Aides_Radios_${selectedFiche.date ? new Date(selectedFiche.date).toISOString() : 'date_inconnue'}.pdf`
      );
    }
    // ===================== EXPORT PDF FEUX ENCASTRES =====================
    else if (selectedFiche?.feuxEncastres) {
      doc.text('Fiche Feux Encastrés Semestrielle', 14, 15);
      doc.setFontSize(11);

      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(
        `👨‍🔧 Technicien : ${selectedFiche.technicienOperateurs || ''}`,
        14,
        28
      );
      doc.text(
        `📝 Observations générales : ${selectedFiche.observationsGenerales || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Emplacement',
        'Élément',
        'État',
        'Interventions',
        'Observations',
      ];
      const tableRows = [];

      // Parcours des emplacements
      Object.keys(selectedFiche.feuxEncastres).forEach((emp) => {
        const fields = selectedFiche.feuxEncastres[emp];
        Object.keys(fields).forEach((field, index) => {
          const row = fields[field];
          tableRows.push([
            index === 0 ? emp : '', // Emplacement seulement sur la première ligne
            field,
            row.etat || '',
            row.intervention || '',
            row.observations || '',
          ]);
        });
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });

      // Ajouter la signature si elle existe
      if (selectedFiche.signature) {
        const imgProps = doc.getImageProperties(selectedFiche.signature);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const imgWidth = 100;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const startY = doc.lastAutoTable.finalY + 10;
        doc.text('Signature :', 14, startY + 6);
        doc.addImage(
          selectedFiche.signature,
          'PNG',
          14,
          startY + 10,
          imgWidth,
          imgHeight
        );
      }

      doc.save(
        `Fiche_Feux_Encastres_${selectedFiche.date ? new Date(selectedFiche.date).toISOString() : 'date_inconnue'}.pdf`
      );
      // ===================== EXPORT PDF semseterilel postes  =====================
    } else if (selectedFiche?.posteSST1) {
      doc.text("Fiche d'inspection Semestrielle des Postes", 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(
        `👨‍🔧 Technicien : ${selectedFiche.technicien_operateures || ''}`,
        14,
        28
      );
      doc.text(
        `📝 Observations générales : ${selectedFiche.observations_generales || ''}`,
        14,
        34
      );

      const tableColumn = ['Element', 'Etat', 'Interventions', 'Observations'];
      let startY = 40;

      // Fonction pour ajouter un poste au PDF
      const addPoste = (posteName, posteData) => {
        if (
          !posteData ||
          !posteData.controles ||
          posteData.controles.length === 0
        )
          return;

        doc.text(posteName, 14, startY);
        startY += 6;

        const tableRows = posteData.controles.map((c) => [
          c.element || '',
          c.etat || '',
          c.interventions || '',
          c.observations || '',
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: 255 },
          styles: { fontSize: 10 },
        });

        startY = doc.lastAutoTable.finalY + 10; // mettre à jour la position pour le poste suivant
      };

      addPoste('POSTE SST1', selectedFiche.posteSST1);
      addPoste('POSTE SST2', selectedFiche.posteSST2);
      addPoste('POSTE TC', selectedFiche.posteTC);

      // Ajouter la signature si elle existe
      if (selectedFiche.signature) {
        const imgProps = doc.getImageProperties(selectedFiche.signature);
        const imgWidth = 100;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        doc.text('Signature :', 14, startY + 6);
        doc.addImage(
          selectedFiche.signature,
          'PNG',
          14,
          startY + 10,
          imgWidth,
          imgHeight
        );
      }

      doc.save(
        `Fiche_Semestrielle_Postes_${
          selectedFiche.date
            ? new Date(selectedFiche.date).toISOString()
            : 'date_inconnue'
        }.pdf`
      );
      // ===================== EXPORT PDF semestrielle DGS =====================
    } else if (selectedFiche?.Contrôle) {
      doc.text("Fiche d'inspection Semestrielle DGS", 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${selectedFiche.Date ? new Date(selectedFiche.Date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(
        `👨‍🔧 Technicien : ${selectedFiche['Technicien Operateures'] || ''}`,
        14,
        28
      );
      doc.text(
        `📝 Observations générales : ${selectedFiche['Observations générales'] || ''}`,
        14,
        34
      );

      const tableColumn = [
        'Contrôle / Élément',
        'Normal',
        'Anomalie',
        'Observations',
      ];
      let startY = 40;

      // Fonction pour ajouter chaque section de contrôle
      const addSection = (sectionName, sectionData) => {
        if (!sectionData) return;

        doc.text(sectionName, 14, startY);
        startY += 6;

        const tableRows = [];
        const isSimple = sectionData.Normal !== undefined;

        if (isSimple) {
          tableRows.push([
            sectionName,
            sectionData.Normal ? '✅' : '',
            sectionData.Anomalie ? '⚠️' : '',
            sectionData.Observations || '',
          ]);

          // TGBT ANNUELE
        } else {
          Object.keys(sectionData).forEach((element) => {
            const el = sectionData[element];
            tableRows.push([
              element,
              el.Normal ? '✅' : '',
              el.Anomalie ? '⚠️' : '',
              el.Observations || '',
            ]);
          });
        }

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: 255 },
          styles: { fontSize: 10 },
        });

        startY = doc.lastAutoTable.finalY + 10;
      };

      // Parcourir toutes les sections
      Object.keys(selectedFiche.Contrôle).forEach((section) => {
        addSection(section, selectedFiche.Contrôle[section]);
      });

      // Ajouter la signature si elle existe
      if (selectedFiche.Signature) {
        const imgProps = doc.getImageProperties(selectedFiche.Signature);
        const imgWidth = 100;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        doc.text('Signature :', 14, startY + 6);
        doc.addImage(
          selectedFiche.Signature,
          'PNG',
          14,
          startY + 10,
          imgWidth,
          imgHeight
        );
      }

      doc.save(
        `Fiche_Semestrielle_DGS_${
          selectedFiche.Date
            ? new Date(selectedFiche.Date).toISOString()
            : 'date_inconnue'
        }.pdf`
      );
      // ===================== EXPORT PDF TGBT =====================
    } else if (selectedFiche?.postes) {
      doc.text('Fiche Annuelle TGBT', 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(
        `👨‍🔧 Technicien / Opérateurs : ${selectedFiche.technicien_operateurs || ''}`,
        14,
        28
      );
      doc.text(
        `📝 Observations générales : ${selectedFiche.observations_generales || ''}`,
        14,
        34
      );

      const tableColumn = ['Élément', 'État', 'Interventions', 'Observations'];
      let startY = 40;

      selectedFiche.postes.forEach((poste) => {
        // Nom du poste en gras
        doc.setFont(undefined, 'bold');
        doc.text(poste.nom, 14, startY);
        doc.setFont(undefined, 'normal');
        startY += 6;

        const tableRows = poste.elements.map((el) => [
          el.nom || '',
          el.etat || '--',
          el.interventions || '',
          el.observations || '',
        ]);

        // Ajouter le tableau avec autoTable
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: 255 },
          styles: { fontSize: 10 },
        });

        startY = doc.lastAutoTable.finalY + 10; // espace après le poste
      });

      // Ajouter la signature si elle existe
      if (selectedFiche.signature) {
        const imgProps = doc.getImageProperties(selectedFiche.signature);
        const imgWidth = 100;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        doc.text('Signature :', 14, startY + 6);
        doc.addImage(
          selectedFiche.signature,
          'PNG',
          14,
          startY + 10,
          imgWidth,
          imgHeight
        );
      }

      // Sauvegarder le PDF
      doc.save(
        `Fiche_Annuelle_TGBT_${
          selectedFiche.date
            ? new Date(selectedFiche.date).toISOString().slice(0, 10)
            : 'date_inconnue'
        }.pdf`
      );

      // ===================== EXPORT PDF annuelle voie=====================
      // ===================== EXPORT PDF VOIE =====================
    } else if (selectedFiche?.panneaux) {
      doc.text('Fiche Annuelle Voie', 14, 15);
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}`,
        14,
        22
      );
      doc.text(
        `👨‍🔧 Technicien / Opérateurs : ${selectedFiche.techniciens_operateurs?.join(', ') || ''}`,
        14,
        28
      );
      doc.text(
        `📝 Observations générales : ${selectedFiche.observations_generales || ''}`,
        14,
        34
      );

      let startY = 40;

      // ===================== Panneaux =====================
      const panneauxColumn = [
        'Panneau',
        'Élément',
        'État',
        'Interventions',
        'Observations',
      ];

      Object.entries(selectedFiche.panneaux).forEach(
        ([panneauNom, elements]) => {
          // Nom du panneau en gras
          doc.setFont(undefined, 'bold');
          doc.text(panneauNom, 14, startY);
          doc.setFont(undefined, 'normal');
          startY += 6;

          const tableRows = Object.entries(elements).map(([elementNom, el]) => [
            '', // Le nom du panneau est déjà en titre
            elementNom || '',
            el.Etat || '--',
            el.Interventions || '',
            el.Observations || '',
          ]);

          autoTable(doc, {
            head: [panneauxColumn],
            body: tableRows,
            startY,
            theme: 'grid',
            headStyles: { fillColor: [52, 152, 219], textColor: 255 },
            styles: { fontSize: 10 },
          });

          startY = doc.lastAutoTable.finalY + 10; // espace après le panneau
        }
      );

      // ===================== ROTs =====================
      const rotColumn = [
        'ROT',
        'Élément',
        'État',
        'Interventions',
        'Observations',
      ];

      Object.entries(selectedFiche.ROTs).forEach(([rotNom, elements]) => {
        // Nom du ROT en gras
        doc.setFont(undefined, 'bold');
        doc.text(rotNom, 14, startY);
        doc.setFont(undefined, 'normal');
        startY += 6;

        const tableRows = Object.entries(elements).map(([elementNom, el]) => [
          '', // Le nom du ROT est déjà en titre
          elementNom || '',
          el.Etat || '--',
          el.Interventions || '',
          el.Observations || '',
        ]);

        autoTable(doc, {
          head: [rotColumn],
          body: tableRows,
          startY,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: 255 },
          styles: { fontSize: 10 },
        });

        startY = doc.lastAutoTable.finalY + 10; // espace après le ROT
      });

      // ===================== Signature =====================
      if (selectedFiche.signature) {
        const imgProps = doc.getImageProperties(selectedFiche.signature);
        const imgWidth = 100;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        doc.text('Signature :', 14, startY + 6);
        doc.addImage(
          selectedFiche.signature,
          'PNG',
          14,
          startY + 10,
          imgWidth,
          imgHeight
        );
      }

      // Sauvegarder le PDF
      doc.save(
        `Fiche_Annuelle_Voie_${
          selectedFiche.date
            ? new Date(selectedFiche.date).toISOString().slice(0, 10)
            : 'date_inconnue'
        }.pdf`
      );
    } else {
      doc.text(
        `Fiche Inspection journalière ${selectedFiche.matricule}`,
        14,
        15
      );
      doc.setFontSize(11);
      doc.text(
        `📅 Date : ${new Date(selectedFiche.date).toLocaleString()}`,
        14,
        22
      );
      doc.text(`📌 Période : ${selectedFiche.periode || ''}`, 14, 28);

      const tableColumn = [
        'Zone',
        'Élément',
        'État Matin',
        'Nbr NF',
        'Observation',
        'Intervention',
        'État Nuit',
        'Nbr NF',
        'Observation',
        'Intervention',
      ];
      const tableRows = (selectedFiche.inspections || []).map((item) => [
        item.zone,
        item.element,
        item.matin?.etat || '',
        item.matin?.nbrNF || 0,
        item.matin?.observation || '',
        item.matin?.intervention || '',
        item.nuit?.etat || '',
        item.nuit?.nbrNF || 0,
        item.nuit?.observation || '',
        item.nuit?.intervention || '',
      ]);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [52, 152, 219], textColor: 255 },
        styles: { fontSize: 10 },
      });
      doc.save(`Fiche_Inspection_${selectedFiche.matricule}.pdf`);
    }
  };

  return (
    <div className="notification-page">
      <h2>🔔 Notifications</h2>
      <div className="notif-list">
        {notifications.length === 0 ? (
          <p>Aucune notification</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="notif-card">
              <p>{n.message}</p>
              <button
                onClick={() => {
                  const ficheId = n.dataId || n.ficheId;

                  if (!ficheId) {
                    console.error('ID de fiche manquant :', n);
                    alert("Impossible d'afficher la fiche (ID manquant)");
                    return;
                  }

                  if (n.type === 'fiche_papi') {
                    voirFichePapi(ficheId, n._id);
                  } else if (n.type === 'fichePiste') {
                    voirFichePiste(ficheId, n._id);
                  } else if (n.type === 'fiche_dgs') {
                    voirFicheDGS(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'feuxobstacles') {
                    voirFicheFeux(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'lvp') {
                    voirFicheLVP(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_regulateures') {
                    voirFicheRegulateures(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_postes') {
                    voirFichePostes(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_aides_radios') {
                    voirFicheAidesRadios(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_feux_encastres') {
                    voirFicheFeuxEncastres(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_regulateurs') {
                    voirFicheSemesRegulateures(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_semes_postes') {
                    voirFicheSemesPostes(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_semes_dgs') {
                    voirFicheSemesDgs(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_ann_tgbt') {
                    voirFicheAnnTgbt(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_ann_voie') {
                    voirFicheAnnVoie(ficheId, n._id);
                  } else if (
                    n.type?.toLowerCase() === 'fiche_ann_infrastructure'
                  ) {
                    voirFicheAnnInfrastructure(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_hors_sql') {
                    voirFicheHorsSql(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_effar') {
                    voirFicheEffar(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_ann_obs') {
                    voirFicheAnnObs(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_ann_cable') {
                    voirFicheAnnCable(ficheId, n._id);
                  } else if (
                    n.type?.toLowerCase() === 'fiche_ann_feux_sequentiels'
                  ) {
                    voirFicheAnnFeuxSeq(ficheId, n._id);
                  } else if (
                    n.type?.toLowerCase() === 'fiche_quinquennale_papi'
                  ) {
                    voirFicheQuiPapi(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_corrective') {
                    voirFicheCorrective(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_nobreak') {
                    voirFicheNoBreak(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_2250kva') {
                    voirFiche2250KVA(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_olapion') {
                    voirFicheOlapion(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_balisage') {
                    voirFicheBalisage(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_ann_pa_ma') {
                    voirFichePaMa(ficheId, n._id);
                  } else if (n.type?.toLowerCase() === 'fiche_brigade') {
                    voirFicheBrigade(ficheId, n._id);
                  } else {
                    voirFiche(ficheId);
                  }
                }}
              >
                Voir fiche
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedFiche && (
        <div className="modal">
          <div className="modal-content large">
            {/* --- FICHE DGS --- */}
            {selectedFiche.dgs ? (
              <>
                <h3>Fiche DGS Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicien || ''}</p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observationGenerale || ''}
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>DGS</th>
                      <th>Fenêtre</th>
                      <th>Afficheur</th>
                      <th>Boitier</th>
                      <th>Observation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedFiche.dgs || []).map((d, i) => (
                      <tr key={i}>
                        <td>{d.numero}</td>
                        <td>{d.propreteFenetreFrontale}</td>
                        <td>{d.propreteAfficheur}</td>
                        <td>{d.boitierCommande}</td>
                        <td>{d.observation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : selectedFiche.verifications?.length > 0 ? (
              <>
                <h3>Fiche PAPI Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Techniciens : {selectedFiche.techniciens || ''}</p>
                <p>📝 Observations : {selectedFiche.observations || ''}</p>

                <h4>Approche 09</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Élément</th>
                      <th>11</th>
                      <th>12</th>
                      <th>21</th>
                      <th>22</th>
                      <th>31</th>
                      <th>32</th>
                      <th>41</th>
                      <th>42</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedFiche.verifications || []).map((v, i) => (
                      <tr key={i}>
                        <td>{v.element}</td>
                        <td>{v.v11_09 || ''}</td>
                        <td>{v.v12_09 || ''}</td>
                        <td>{v.v21_09 || ''}</td>
                        <td>{v.v22_09 || ''}</td>
                        <td>{v.v31_09 || ''}</td>
                        <td>{v.v32_09 || ''}</td>
                        <td>{v.v41_09 || ''}</td>
                        <td>{v.v42_09 || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h4>Approche 27</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Élément</th>
                      <th>11</th>
                      <th>12</th>
                      <th>21</th>
                      <th>22</th>
                      <th>31</th>
                      <th>32</th>
                      <th>41</th>
                      <th>42</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedFiche.verifications || []).map((v, i) => (
                      <tr key={i}>
                        <td>{v.element}</td>
                        <td>{v.v11_27 || ''}</td>
                        <td>{v.v12_27 || ''}</td>
                        <td>{v.v21_27 || ''}</td>
                        <td>{v.v22_27 || ''}</td>
                        <td>{v.v31_27 || ''}</td>
                        <td>{v.v32_27 || ''}</td>
                        <td>{v.v41_27 || ''}</td>
                        <td>{v.v42_27 || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : selectedFiche.zonePrincipale ? (
              <>
                <h3>Fiche Piste : {selectedFiche.zonePrincipale}</h3>
                <p>📅 Date : {new Date(selectedFiche.date).toLocaleString()}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Élément</th>
                      <th>État</th>
                      <th>Observation</th>
                      <th>Intervention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedFiche.zones || []).map((zone, i) =>
                      (zone.verifications || []).map((v, j) => (
                        <tr key={`${i}-${j}`}>
                          <td>{zone.nom}</td>
                          <td>{v.element}</td>
                          <td>{v.etat}</td>
                          <td>{v.observation}</td>
                          <td>{v.intervention}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : selectedFiche.feuxLVPEast || selectedFiche.feuxLVPWest ? (
              <>
                <h3>Fiche LVP Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicien || ''}</p>

                {/* Feux LVP Est */}
                {selectedFiche.feuxLVPEast &&
                  selectedFiche.feuxLVPEast.length > 0 && (
                    <div>
                      <h4>Feux Est</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>État Général</th>
                            <th>Interventions</th>
                            <th>Observations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFiche.feuxLVPEast.map((f, i) => (
                            <tr key={i}>
                              <td>{f.position}</td>
                              <td>{f.etatGeneralBalise || ''}</td>
                              <td>{f.interventions || ''}</td>
                              <td>{f.observations || ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                {/* Feux LVP Ouest */}
                {selectedFiche.feuxLVPWest &&
                  selectedFiche.feuxLVPWest.length > 0 && (
                    <div>
                      <h4>Feux Ouest</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>État Général</th>
                            <th>Interventions</th>
                            <th>Observations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFiche.feuxLVPWest.map((f, i) => (
                            <tr key={i}>
                              <td>{f.position}</td>
                              <td>{f.etatGeneralBalise || ''}</td>
                              <td>{f.interventions || ''}</td>
                              <td>{f.observations || ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : selectedFiche.boucles?.length > 0 ? (
              <>
                <h3>Fiche Régulateures Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicienOperateur || ''}</p>{' '}
                <p>
                  📝 Observations générales :
                  {selectedFiche.observationsGenerales || ''}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Boucle</th>
                      <th>Type / Puissance</th>
                      <th>ISOLEMENT</th>
                      <th>CHARGE</th>
                      <th>B1</th>
                      <th>B2</th>
                      <th>B3</th>
                      <th>B4</th>
                      <th>B5</th>
                      <th>A</th>
                      <th>V</th>
                      <th>TÉLÉCOMMANDE</th>
                      <th>AFFICHEUR</th>
                      <th>CLAVIER</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(selectedFiche.boucles || []).map((b, i) => (
                      <tr key={i}>
                        <td>{b.zone}</td>
                        <td>{b.BOUCLE}</td>
                        <td>{b.typePuissance}</td>
                        <td>{b.ISOLEMENT}</td>
                        <td>{b.charge}</td>
                        <td>{b.Iout?.B1}</td>
                        <td>{b.Iout?.B2}</td>
                        <td>{b.Iout?.B3}</td>
                        <td>{b.Iout?.B4}</td>
                        <td>{b.Iout?.B5}</td>
                        <td>{b.InVin?.A}</td>
                        <td>{b.InVin?.V}</td>
                        <td>{b.telecommande}</td>
                        <td>{b.afficheur}</td>
                        <td>{b.clavier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= aides radios  =================
            selectedFiche.poste_MT_SST2 || selectedFiche.TGBT_Aides_Radios ? (
              <>
                <h3>Fiche Aides Radios Mensuelle</h3>
                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>
                  👨‍🔧 Technicien : {selectedFiche.technicien_operateur || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>

                {/* Poste MT SST2 */}
                {selectedFiche.poste_MT_SST2 &&
                  selectedFiche.poste_MT_SST2.length > 0 && (
                    <div>
                      <h4>Poste MT SST2</h4>
                      <table>
                        <thead>
                          <tr>
                            <th>Élément</th>
                            <th>Type</th>
                            <th>État</th>
                            <th>Interventions</th>
                            <th>Observations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedFiche.poste_MT_SST2.map((el, i) => (
                            <React.Fragment key={i}>
                              <tr>
                                <td>{el.element}</td>
                                <td>-</td>
                                <td>{el.etat || ''}</td>
                                <td>{el.interventions || ''}</td>
                                <td>{el.observations || ''}</td>
                              </tr>
                              {el.sous_elements &&
                                el.sous_elements.map((se, j) => (
                                  <tr key={`sous-${i}-${j}`}>
                                    <td style={{ paddingLeft: '20px' }}>
                                      ↳ {se.type || ''}
                                    </td>
                                    <td>-</td>
                                    <td>{se.etat || ''}</td>
                                    <td>{se.interventions || ''}</td>
                                    <td>{se.observations || ''}</td>
                                  </tr>
                                ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                {/* TGBT Aides Radios */}
                {selectedFiche.TGBT_Aides_Radios &&
                  Object.entries(selectedFiche.TGBT_Aides_Radios).map(
                    ([poste, elements], idx) => (
                      <div key={idx}>
                        <h4>{poste}</h4>
                        <table>
                          <thead>
                            <tr>
                              <th>Élément</th>
                              <th>Type</th>
                              <th>État</th>
                              <th>Interventions</th>
                              <th>Observations</th>
                            </tr>
                          </thead>
                          <tbody>
                            {elements.map((el, i) => (
                              <React.Fragment key={i}>
                                <tr>
                                  <td>{el.element}</td>
                                  <td>-</td>
                                  <td>{el.etat || ''}</td>
                                  <td>{el.interventions || ''}</td>
                                  <td>{el.observations || ''}</td>
                                </tr>
                                {el.sous_elements &&
                                  el.sous_elements.map((se, j) => (
                                    <tr key={`sous-${i}-${j}`}>
                                      <td style={{ paddingLeft: '20px' }}>
                                        ↳ {se.type || ''}
                                      </td>
                                      <td>-</td>
                                      <td>{se.etat || ''}</td>
                                      <td>{se.interventions || ''}</td>
                                      <td>{se.observations || ''}</td>
                                    </tr>
                                  ))}
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  )}

                <div className="modal-actions">
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= FEUX ENCASTRES =================

            selectedFiche?.emplacements ? (
              <>
                <h3>Fiche Feux Encastrés Semestrielle</h3>

                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>

                <p>
                  👨‍🔧 Technicien : {selectedFiche.technicien_operateur || ''}
                </p>

                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Emplacement</th>
                      <th>Élément</th>
                      <th>État</th>
                      <th>Interventions</th>
                      <th>Observations</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.emplacements.map((emp, empIndex) => (
                      <React.Fragment key={empIndex}>
                        {emp.elements.map((el, elIndex) => (
                          <tr key={`${empIndex}-${elIndex}`}>
                            {elIndex === 0 && (
                              <td rowSpan={emp.elements.length}>{emp.nom}</td>
                            )}

                            <td>{el.nom}</td>
                            <td>{el.etat}</td>
                            <td>{el.interventions}</td>
                            <td>{el.observations}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= REGULATEURS =================
            selectedFiche?.boucles ? (
              <>
                <h3>Fiche d'inspection Semestrielle Régulateurs</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien : {selectedFiche.Technicien_Operateurs || ''}
                </p>
                <p>
                  📝 Observations générales : {selectedFiche.observations || ''}
                </p>

                {/* Vérifications générales */}
                <div className="verifications-generales">
                  <h4>Vérifications générales</h4>
                  <p>
                    Remontées défaut :{' '}
                    {selectedFiche.verifications_generales?.Remontees_defaut ||
                      ''}
                  </p>
                  <p>
                    État général :{' '}
                    {selectedFiche.verifications_generales
                      ?.Etat_general_equipements || ''}
                  </p>
                  <p>
                    Analyse archivage :{' '}
                    {selectedFiche.verifications_generales
                      ?.Analyse_archivage_cahiers || ''}
                  </p>
                </div>

                {/* Tableau des boucles */}
                <table>
                  <thead>
                    <tr>
                      <th>Catégorie</th>
                      <th>Boucle</th>
                      <th>Type Puissance</th>
                      <th>Longueur (m)</th>
                      <th>Continuité Théorique (Ω)</th>
                      <th>Continuité Mesurée (Ω)</th>
                      <th>Nombre de feux</th>
                      <th>Isolement (Ω)</th>
                      <th>Tension Test (Vcc)</th>
                      <th>Courant Test (Ac)</th>
                      <th>Durée Test</th>
                      <th>Vérification Parafoudres</th>
                      <th>Commentaires</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(selectedFiche.boucles).map(
                      ([categorie, boucles], i) =>
                        Object.entries(boucles).map(
                          ([nomBoucle, details], j) => (
                            <tr key={`${i}-${j}`}>
                              {j === 0 && (
                                <td rowSpan={Object.keys(boucles).length}>
                                  {categorie}
                                </td>
                              )}
                              <td>{nomBoucle}</td>
                              <td>{details.Type_Puissance}</td>
                              <td>{details.Longueur_M}</td>
                              <td>{details.Continuite_Theorique_Ohm}</td>
                              <td>{details.Continuite_Mesuree_Ohm}</td>
                              <td>{details.Nombre_de_feux}</td>
                              <td>{details.Resultats?.Isolement_Ohm}</td>
                              <td>{details.Resultats?.Tension_test_Vcc}</td>
                              <td>{details.Resultats?.Courant_test_Ac}</td>
                              <td>{details.Test?.Duree}</td>
                              <td>{details.Verification_parafoudres}</td>
                              <td>{details.Commentaires}</td>
                            </tr>
                          )
                        )
                    )}
                  </tbody>
                </table>

                {/* Signature */}
                {selectedFiche.signature && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>Signature :</h4>
                    <img
                      src={selectedFiche.signature}
                      alt="Signature"
                      style={{
                        border: '1px solid #000',
                        width: '400px',
                        height: '150px',
                      }}
                    />
                  </div>
                )}

                {/* Actions du modal */}
                <div
                  className="modal-actions"
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= semssterilel postes  =================
            selectedFiche?.posteSST1 ? (
              <>
                <h3>Fiche d'inspection Semestrielle des Postes</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien : {selectedFiche.technicien_operateures || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>

                {/* POSTE SST1 */}
                <h4>POSTE SST1</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Element</th>
                      <th>Etat</th>
                      <th>Interventions</th>
                      <th>Observations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche.posteSST1.controles.map((c, i) => (
                      <tr key={i}>
                        <td>{c.element}</td>
                        <td>{c.etat}</td>
                        <td>{c.interventions}</td>
                        <td>{c.observations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* POSTE SST2 */}
                <h4>POSTE SST2</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Element</th>
                      <th>Etat</th>
                      <th>Interventions</th>
                      <th>Observations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche.posteSST2.controles.map((c, i) => (
                      <tr key={i}>
                        <td>{c.element}</td>
                        <td>{c.etat}</td>
                        <td>{c.interventions}</td>
                        <td>{c.observations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* POSTE TC */}
                <h4>POSTE TC</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Element</th>
                      <th>Etat</th>
                      <th>Interventions</th>
                      <th>Observations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche.posteTC.controles.map((c, i) => (
                      <tr key={i}>
                        <td>{c.element}</td>
                        <td>{c.etat}</td>
                        <td>{c.interventions}</td>
                        <td>{c.observations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Signature */}
                {selectedFiche.signature && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>Signature :</h4>
                    <img
                      src={selectedFiche.signature}
                      alt="Signature"
                      style={{
                        border: '1px solid #000',
                        width: '400px',
                        height: '150px',
                      }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div
                  className="modal-actions"
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= semestrielle DGS =================
            selectedFiche?.Contrôle ? (
              <>
                <h3>Fiche d'inspection Semestrielle DGS</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.Date
                    ? new Date(selectedFiche.Date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien :{' '}
                  {selectedFiche['Technicien Operateures'] || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche['Observations générales'] || ''}
                </p>

                {/* Tableau de contrôle */}
                <table>
                  <thead>
                    <tr>
                      <th>Contrôle</th>
                      <th>Normal</th>
                      <th>Anomalie</th>
                      <th>Observations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche.Contrôle &&
                      Object.keys(selectedFiche.Contrôle).map((section) => {
                        const sectionData = selectedFiche.Contrôle[section];
                        const isSimple = sectionData.Normal !== undefined;

                        return (
                          <React.Fragment key={section}>
                            {/* Nom de la section */}
                            <tr>
                              <td
                                colSpan={4}
                                style={{
                                  fontWeight: 'bold',
                                  backgroundColor: '#eee',
                                }}
                              >
                                {section}
                              </td>
                            </tr>

                            {/* Si c'est un simple EtatSchema */}
                            {isSimple ? (
                              <tr>
                                <td>{section}</td>
                                <td>{sectionData.Normal ? '✅' : ''}</td>
                                <td>{sectionData.Anomalie ? '⚠️' : ''}</td>
                                <td>{sectionData.Observations}</td>
                              </tr>
                            ) : (
                              // Sinon, parcourir les sous-éléments
                              Object.keys(sectionData).map((element) => {
                                const el = sectionData[element];
                                return (
                                  <tr key={element}>
                                    <td>{element}</td>
                                    <td>{el.Normal ? '✅' : ''}</td>
                                    <td>{el.Anomalie ? '⚠️' : ''}</td>
                                    <td>{el.Observations}</td>
                                  </tr>
                                );
                              })
                            )}
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>

                {/* Signature */}
                {selectedFiche.Signature && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>Signature :</h4>
                    <img
                      src={selectedFiche.Signature}
                      alt="Signature"
                      style={{
                        border: '1px solid #000',
                        width: '400px',
                        height: '150px',
                      }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= Anuelle tgbt =================

            selectedFiche?.postesq ? (
              <>
                <h3>Fiche Annuelle TGBT</h3>
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateurs :{' '}
                  {selectedFiche.technicien_operateurs || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>
                <table
                  style={{
                    borderCollapse: 'collapse',
                    width: '100%',
                    marginTop: '15px',
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={{ border: '1px solid #000', padding: '5px' }}>
                        Élément
                      </th>
                      <th style={{ border: '1px solid #000', padding: '5px' }}>
                        État
                      </th>
                      <th style={{ border: '1px solid #000', padding: '5px' }}>
                        Interventions
                      </th>
                      <th style={{ border: '1px solid #000', padding: '5px' }}>
                        Observations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche.postesq.map((poste) => (
                      <React.Fragment key={poste.nom}>
                        <tr>
                          <td
                            colSpan={4}
                            style={{
                              fontWeight: 'bold',
                              backgroundColor: '#ddd',
                              padding: '5px',
                            }}
                          >
                            {poste.nom}
                          </td>
                        </tr>
                        {poste.elements.map((el) => (
                          <tr key={el.nom}>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.nom}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.etat || '--'}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.interventions || ''}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.observations || ''}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                {selectedFiche.signature && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>Signature :</h4>
                    <img
                      src={selectedFiche.signature}
                      alt="Signature"
                      style={{
                        border: '1px solid #000',
                        width: '400px',
                        height: '150px',
                      }}
                    />
                  </div>
                )}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : // ================= Anuelle voie =================
            selectedFiche?.panneaux ? (
              <>
                <h3>Fiche Annuelle Voie</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateurs :{' '}
                  {selectedFiche.techniciens_operateurs || ''}{' '}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>

                {/* Tableau Panneaux */}
                {selectedFiche.panneaux && (
                  <>
                    <h4>Panneaux indicateurs</h4>
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        marginTop: '10px',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Panneau
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Élément
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            État
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Interventions
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Observations
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedFiche.panneaux).map(
                          ([panneauNom, elements]) =>
                            Object.entries(elements).map(
                              ([elementNom, el], idx) => (
                                <tr key={panneauNom + elementNom}>
                                  {idx === 0 && (
                                    <td
                                      rowSpan={Object.keys(elements).length}
                                      style={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#ddd',
                                        padding: '5px',
                                      }}
                                    >
                                      {panneauNom}
                                    </td>
                                  )}
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {elementNom}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {el.Etat || '--'}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {el.Interventions || ''}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {el.Observations || ''}
                                  </td>
                                </tr>
                              )
                            )
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                {/* Tableau ROTs */}
                {selectedFiche.ROTs && (
                  <>
                    <h4>ROTs</h4>
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        marginTop: '10px',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            ROT
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Élément
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            État
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Interventions
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Observations
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedFiche.ROTs).map(
                          ([rotNom, elements]) =>
                            Object.entries(elements).map(
                              ([elementNom, el], idx) => (
                                <tr key={rotNom + elementNom}>
                                  {idx === 0 && (
                                    <td
                                      rowSpan={Object.keys(elements).length}
                                      style={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#ddd',
                                        padding: '5px',
                                      }}
                                    >
                                      {rotNom}
                                    </td>
                                  )}
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {elementNom}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {el.Etat || '--'}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {el.Interventions || ''}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {el.Observations || ''}
                                  </td>
                                </tr>
                              )
                            )
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                {/* Signature */}
                {selectedFiche.signature && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>Signature :</h4>
                    <img
                      src={selectedFiche.signature}
                      alt="Signature"
                      style={{
                        border: '1px solid #000',
                        width: '400px',
                        height: '150px',
                      }}
                    />
                  </div>
                )}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>{' '}
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : // infarstructure
            selectedFiche?.PISTE ? (
              <>
                <h3>Fiche Annuelle Infrastructure</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateurs :{' '}
                  {selectedFiche.techniciens_operateurs || ''}{' '}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observationsGenerales || ''}
                </p>

                {/* Tableau PISTE */}
                {selectedFiche.PISTE && (
                  <>
                    <h4>Inspection PISTE</h4>
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        marginTop: '10px',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Zone
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Vérification
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            État
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Interventions
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Observations
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(selectedFiche.PISTE).map(
                          ([zone, verifs]) =>
                            Object.entries(verifs).map(
                              ([verifNom, verif], idx) => (
                                <tr key={zone + verifNom}>
                                  {idx === 0 && (
                                    <td
                                      rowSpan={Object.keys(verifs).length}
                                      style={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#ddd',
                                        padding: '5px',
                                      }}
                                    >
                                      {zone}
                                    </td>
                                  )}
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {verifNom}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {verif.etat || '--'}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {verif.intervention_a_faire || ''}
                                  </td>
                                  <td
                                    style={{
                                      border: '1px solid #000',
                                      padding: '5px',
                                    }}
                                  >
                                    {verif.observation || ''}
                                  </td>
                                </tr>
                              )
                            )
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : //Fiche Feux Hors Sql
            selectedFiche?.feuxHorsSol ? (
              <>
                <h3>Fiche Feux Hors Sql</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateurs :{' '}
                  {selectedFiche.techniciens_operateurs?.join(', ') || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observationsGenerales || ''}
                </p>

                {/* Tableau pour chaque zone */}
                {Object.entries(selectedFiche.feuxHorsSol).map(
                  ([zone, lignes]) => (
                    <div key={zone} style={{ marginTop: '20px' }}>
                      <h4>
                        {zone === 'flash'
                          ? 'Inspection FLASH'
                          : `Inspection ${zone}`}
                      </h4>
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Contrôle
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              État
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Interventions
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Observations
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(lignes).map(
                            ([ligneNom, ligne], idx) => (
                              <tr key={ligneNom}>
                                <td
                                  style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                  }}
                                >
                                  {ligneNom}
                                </td>
                                <td
                                  style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                  }}
                                >
                                  {ligne?.Etat || '--'}
                                </td>
                                <td
                                  style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                  }}
                                >
                                  {ligne?.Interventions || ''}
                                </td>
                                <td
                                  style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                  }}
                                >
                                  {ligne?.Observations || ''}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )
                )}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : // Fiche Effaroucheur
            selectedFiche?.fiches ? (
              <>
                <h3>Fiche Effaroucheur</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateur :{' '}
                  {selectedFiche.technicien_operateur || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>

                {/* Tableau pour chaque fiche */}
                {selectedFiche.fiches.map((f, fi) => (
                  <div key={f.fiche} style={{ marginTop: '20px' }}>
                    <h4>{f.fiche}</h4>
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        marginTop: '10px',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Vérification
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Sub-item
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            État
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Interventions
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Observations
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(f.verifications).map(
                          ([verifKey, verifVal]) => {
                            if (typeof verifVal.etat !== 'undefined') {
                              // cas simple
                              return (
                                <tr key={`${fi}-${verifKey}`}>
                                  <td>{verifKey}</td>
                                  <td>-</td>
                                  <td>{verifVal.etat || '--'}</td>
                                  <td>{verifVal.intervention_a_faire || ''}</td>
                                  <td>{verifVal.observation || ''}</td>
                                </tr>
                              );
                            } else {
                              // cas sub-items (ex: haut_parleur)
                              return Object.entries(verifVal).map(
                                ([subKey, subVal]) => (
                                  <tr key={`${fi}-${verifKey}-${subKey}`}>
                                    <td>{verifKey}</td>
                                    <td>{subKey}</td>
                                    <td>{subVal.etat || '--'}</td>
                                    <td>{subVal.intervention_a_faire || ''}</td>
                                    <td>{subVal.observation || ''}</td>
                                  </tr>
                                )
                              );
                            }
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.sections ? (
              <>
                <h3>Fiche Annuelle Feux Obstacles</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateur :{' '}
                  {selectedFiche.technicien_operateur || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || ''}
                </p>

                {/* Tableau pour chaque section */}
                {selectedFiche.sections.map((section, si) => (
                  <div key={si} style={{ marginTop: '20px' }}>
                    <h4>{section.titre}</h4>
                    <table
                      style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        marginTop: '10px',
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Lieu
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Nettoyage
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Serrage Bornes
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Prise Terre
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Isolement Conducteurs
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Continuité Protection
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Vérification Schémas
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Intervention
                          </th>
                          <th
                            style={{ border: '1px solid #000', padding: '5px' }}
                          >
                            Observations
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.elements.map((el, ei) => (
                          <tr key={ei}>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.lieu}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.nettoyage}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.serrageBornes}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.priseDeTerre}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.isolementConducteurs}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.continuiteProtection}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.verificationSchemas}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.intervention}
                            </td>
                            <td
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              {el.observations}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : // ficeh anuelele cable
            selectedFiche?.postesC ? (
              <>
                <h3>📡 Fiche Annuelle Câbles</h3>

                {/* ================= INFOS ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : 'Non renseignée'}
                </p>

                <p>
                  👨‍🔧 Technicien / Opérateur :{' '}
                  {selectedFiche.technicien_operateur || 'Non renseigné'}
                </p>

                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || 'Aucune'}
                </p>

                {/* ================= POSTES ================= */}
                {selectedFiche.postesC.map((poste, pi) => (
                  <div key={pi} style={{ marginTop: '20px' }}>
                    <h4>{poste.titre}</h4>

                    {poste.equipements && poste.equipements.length > 0 ? (
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th style={th}>Équipement</th>
                            <th style={th}>État</th>
                            <th style={th}>Interventions</th>
                            <th style={th}>Observations</th>
                          </tr>
                        </thead>

                        <tbody>
                          {poste.equipements.map((equip, ei) => (
                            <tr key={ei}>
                              <td style={td}>{equip.nom}</td>
                              <td style={td}>{equip.etat || '-'}</td>
                              <td style={td}>{equip.interventions || '-'}</td>
                              <td style={td}>{equip.observations || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Aucun équipement disponible</p>
                    )}
                  </div>
                ))}

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.postes ? (
              <>
                <h3>Fiche Annuelle Câbles</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : 'Non renseignée'}
                </p>
                <p>
                  👨‍🔧 Technicien / Opérateur :{' '}
                  {selectedFiche.technicien_operateur || 'Non renseigné'}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || 'Aucune'}
                </p>

                {/* Tableau pour chaque poste */}
                {selectedFiche.postes.map((poste, pi) => (
                  <div key={pi} style={{ marginTop: '20px' }}>
                    <h4>{poste.titre}</h4>
                    {poste.equipements && poste.equipements.length > 0 ? (
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Équipement
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              État
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Interventions
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Observations
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {poste.equipements.map((equip, ei) => (
                            <tr key={ei}>
                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {equip.nom}
                              </td>
                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {equip.etat || '-'}
                              </td>
                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {equip.interventions || '-'}
                              </td>
                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {equip.observations || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Aucun équipement disponible</p>
                    )}
                  </div>
                ))}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.blocs ? (
              <>
                <h3>Fiche Annuelle Feux Séquentiels</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : 'Non renseignée'}
                </p>

                <p>
                  👨‍🔧 Technicien / Opérateur :{' '}
                  {selectedFiche.techniciens_operateurs || 'Non renseigné'}
                </p>

                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || 'Aucune'}
                </p>

                {/* Tableau pour chaque bloc */}
                {selectedFiche.blocs.map((bloc, bi) => (
                  <div key={bi} style={{ marginTop: '20px' }}>
                    <h4>Bloc {bloc.titre}</h4>

                    {bloc.elements && bloc.elements.length > 0 ? (
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Vérification
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              État
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Interventions
                            </th>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Observations
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {bloc.elements.map((elem, ei) => (
                            <tr key={ei}>
                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {elem.verification}
                              </td>

                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {elem.etat || '-'}
                              </td>

                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {elem.interventions || '-'}
                              </td>

                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {elem.observations || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Aucun élément disponible</p>
                    )}
                  </div>
                ))}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : // fiche 5 snin papi

            selectedFiche?.papi ? (
              <>
                <h3>Fiche d’Inspection Quinquennale PAPI</h3>

                {/* Informations générales */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : 'Non renseignée'}
                </p>

                <p>
                  👨‍🔧 Technicien / Opérateur :{' '}
                  {selectedFiche.techniciens_operateurs || 'Non renseigné'}
                </p>

                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observations_generales || 'Aucune'}
                </p>

                {/* Tableau pour chaque poste PAPI */}
                {selectedFiche.papi.map((p, pi) => (
                  <div key={pi} style={{ marginTop: '20px' }}>
                    <h4>Numéro {p.numero}</h4>

                    {p.elements && p.elements.length > 0 ? (
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th
                              style={{
                                border: '1px solid #000',
                                padding: '5px',
                              }}
                            >
                              Vérification
                            </th>
                            {[
                              '11',
                              '12',
                              '21',
                              '22',
                              '31',
                              '32',
                              '41',
                              '42',
                            ].map((champ) => (
                              <th
                                key={champ}
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {champ}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {p.elements.map((elem, ei) => (
                            <tr key={ei}>
                              <td
                                style={{
                                  border: '1px solid #000',
                                  padding: '5px',
                                }}
                              >
                                {elem.verification}
                              </td>

                              {[
                                '11',
                                '12',
                                '21',
                                '22',
                                '31',
                                '32',
                                '41',
                                '42',
                              ].map((champ) => (
                                <td
                                  key={champ}
                                  style={{
                                    border: '1px solid #000',
                                    padding: '5px',
                                  }}
                                >
                                  {elem[champ] || '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Aucun élément disponible</p>
                    )}
                  </div>
                ))}

                {/* Actions */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.ficheCorrective?.length > 0 ? (
              <>
                <h3>Fiche Corrective</h3>

                {selectedFiche.ficheCorrective.map((fiche, fi) => (
                  <div key={fi} style={{ marginBottom: '30px' }}>
                    {/* ================= INFOS GÉNÉRALES ================= */}
                    <p>
                      📅 Date :{' '}
                      {fiche.date
                        ? new Date(fiche.date).toLocaleDateString()
                        : 'Non renseignée'}
                    </p>

                    <p>
                      🛠️ Désignation : {fiche.designation || 'Non renseignée'}
                    </p>
                    <p>📍 Lieu : {fiche.lieuInstallation || 'Non renseigné'}</p>
                    <p>
                      📅 Date détection :{' '}
                      {fiche.dateDetection
                        ? new Date(fiche.dateDetection).toLocaleDateString()
                        : 'Non renseignée'}
                    </p>

                    <p>
                      📢 Réclamation par :{' '}
                      {fiche.reclamationPar || 'Non renseigné'}
                    </p>
                    <p>
                      👤 Personne contactée :{' '}
                      {fiche.personneContactee || 'Non renseignée'}
                    </p>

                    <p>⏱️ Début : {fiche.debutIntervention || '-'}</p>
                    <p>⏱️ Remise en service : {fiche.remiseEnService || '-'}</p>
                    <p>⌛ Temps alloué : {fiche.tempsAlloue || '-'}</p>
                    <p>
                      📝 Observations :{' '}
                      {fiche.observationsGenerales || 'Aucune'}
                    </p>

                    <p>
                      👨‍🔧 Technicien :{' '}
                      {fiche.techniciensOperateurs?.[0]?.nom || 'Non renseigné'}
                    </p>

                    {/* ================= DIAGNOSTIC ================= */}
                    <h4 style={{ marginTop: '20px' }}>Diagnostic</h4>
                    {fiche.diagnostic?.length > 0 ? (
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th style={th}>Panne</th>
                            <th style={th}>Effet</th>
                            <th style={th}>Gravité</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fiche.diagnostic.map((d, i) => (
                            <tr key={i}>
                              <td style={td}>{d.panneCause || '-'}</td>
                              <td style={td}>{d.effet || '-'}</td>
                              <td style={td}>{d.gravite || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Aucun diagnostic disponible</p>
                    )}

                    {/* ================= DEPANNAGE ================= */}
                    <h4 style={{ marginTop: '20px' }}>
                      Dépannage / Réparation
                    </h4>
                    {fiche.depannageReparation?.length > 0 ? (
                      <table
                        style={{
                          borderCollapse: 'collapse',
                          width: '100%',
                          marginTop: '10px',
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: '#eee' }}>
                            <th style={th}>Pièces de rechange</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fiche.depannageReparation.map((d, i) => (
                            <tr key={i}>
                              <td style={td}>{d.piecesDeRechange || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Aucun dépannage / réparation disponible</p>
                    )}

                    {/* ================= SIGNATURE ================= */}
                    {fiche.signature && (
                      <div style={{ marginTop: '20px' }}>
                        <h4>Signature</h4>
                        <img
                          src={fiche.signature}
                          alt="signature"
                          style={{ border: '1px solid #000', width: '200px' }}
                        />
                      </div>
                    )}

                    {/* ================= ACTIONS ================= */}
                    <div
                      style={{
                        marginTop: '20px',
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <button
                        onClick={() =>
                          validerFiche(selectedFiche._id, selectedFiche.notifId)
                        }
                      >
                        ✅ Valider
                      </button>
                      <button onClick={() => setSelectedFiche(null)}>
                        ❌ Fermer
                      </button>
                      <button onClick={() => exportPDF(selectedFiche)}>
                        📄 Exporter PDF
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : // fiche nobreak

            selectedFiche?.controles ? (
              <>
                <h3>Fiche No-Break</h3>

                {/* ================= INFOS GENERALES ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>📌 Désignation : {selectedFiche.designation}</p>
                <p>📍 Lieu : {selectedFiche.lieuInstallation}</p>

                {/* ================= TABLEAU CONTROLES ================= */}
                <h4>Contrôles</h4>

                <table
                  style={{
                    borderCollapse: 'collapse',
                    width: '100%',
                    marginTop: '10px',
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={th}>Spécification</th>
                      <th style={th}>Désignation</th>

                      <th colSpan="2" style={th}>
                        Matin
                      </th>
                      <th colSpan="2" style={th}>
                        Après-midi
                      </th>
                      <th colSpan="2" style={th}>
                        Nuit
                      </th>
                    </tr>

                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={th}></th>
                      <th style={th}></th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.controles.map((c, i) => (
                      <tr key={i}>
                        <td style={td}>{c.specification}</td>
                        <td style={td}>{c.designation}</td>

                        {/* MATIN */}
                        <td style={td}>{c.matin?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.matin?.anomalie ? '❌' : ''}</td>

                        {/* APRES MIDI */}
                        <td style={td}>{c.apresMidi?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.apresMidi?.anomalie ? '❌' : ''}</td>

                        {/* NUIT */}
                        <td style={td}>{c.nuit?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.nuit?.anomalie ? '❌' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ================= TEMPS ================= */}
                <h4 style={{ marginTop: '20px' }}>Temps Inspection</h4>

                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    ⏱ {p} : {selectedFiche.tempsInspection?.[p]?.debut} →{' '}
                    {selectedFiche.tempsInspection?.[p]?.fin} (
                    {selectedFiche.tempsInspection?.[p]?.tempsAlloue})
                  </p>
                ))}

                <p>🔢 Total : {selectedFiche.tempsInspection?.total}</p>

                {/* ================= OBSERVATIONS ================= */}
                <h4>Observations</h4>
                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    📝 {p} : {selectedFiche.observations?.[p]}
                  </p>
                ))}

                {/* ================= TECHNICIENS ================= */}
                <h4>Techniciens</h4>
                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    👨‍🔧 {p} : {(selectedFiche.techniciens?.[p] || []).join(', ')}
                  </p>
                ))}

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.pointsControle ? (
              <>
                <h3>Fiche 2250KVA</h3>

                {/* ================= INFOS GENERALES ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>📌 Désignation : {selectedFiche.designation}</p>
                <p>📍 Lieu : {selectedFiche.lieuInstallation}</p>

                {/* ================= TABLEAU ================= */}
                <h4>Points de contrôle</h4>

                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={th}>Spécification</th>
                      <th style={th}>Désignation</th>

                      <th colSpan="2" style={th}>
                        Matin
                      </th>
                      <th colSpan="2" style={th}>
                        Après-midi
                      </th>
                      <th colSpan="2" style={th}>
                        Nuit
                      </th>
                    </tr>

                    <tr style={{ backgroundColor: '#eee' }}>
                      <th></th>
                      <th></th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.pointsControle.map((c, i) => (
                      <tr key={i}>
                        <td style={td}>{c.specification}</td>
                        <td style={td}>{c.designation}</td>

                        {/* MATIN */}
                        <td style={td}>{c.matin?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.matin?.anomalie ? '❌' : ''}</td>

                        {/* APRES MIDI */}
                        <td style={td}>{c.apresMidi?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.apresMidi?.anomalie ? '❌' : ''}</td>

                        {/* NUIT */}
                        <td style={td}>{c.nuit?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.nuit?.anomalie ? '❌' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ================= TEMPS ================= */}
                <h4 style={{ marginTop: '20px' }}>Temps Inspection</h4>

                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    ⏱ {p} : {selectedFiche.tempsInspection?.[p]?.debut} →{' '}
                    {selectedFiche.tempsInspection?.[p]?.fin} (
                    {selectedFiche.tempsInspection?.[p]?.tempsAlloue})
                  </p>
                ))}

                <p>🔢 Total : {selectedFiche.tempsInspection?.total}</p>

                {/* ================= OBSERVATIONS ================= */}
                <h4>Observations</h4>
                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    📝 {p} : {selectedFiche.observations?.[p]}
                  </p>
                ))}

                {/* ================= TECHNICIENS ================= */}
                <h4>Techniciens</h4>
                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    👨‍🔧 {p} : {(selectedFiche.techniciens?.[p] || []).join(', ')}
                  </p>
                ))}

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : //fiche  olapion
            selectedFiche?.operations ? (
              <>
                <h3>Fiche Olapion</h3>

                {/* ================= INFOS ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>

                <p>📌 Désignation : {selectedFiche.designation}</p>
                <p>📍 Lieu : {selectedFiche.lieuInstallation}</p>

                {/* ================= TABLEAU ================= */}
                <h4>Points de contrôle</h4>

                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={th}>Spécification</th>
                      <th style={th}>Désignation</th>

                      <th colSpan="2" style={th}>
                        Matin
                      </th>
                      <th colSpan="2" style={th}>
                        Après-midi
                      </th>
                      <th colSpan="2" style={th}>
                        Nuit
                      </th>
                    </tr>

                    <tr style={{ backgroundColor: '#eee' }}>
                      <th></th>
                      <th></th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>

                      <th style={th}>Normal</th>
                      <th style={th}>Anomalie</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.operations.map((c, i) => (
                      <tr key={i}>
                        <td style={td}>{c.specification}</td>
                        <td style={td}>{c.designation}</td>

                        {/* MATIN */}
                        <td style={td}>{c.matin?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.matin?.anomalie ? '❌' : ''}</td>

                        {/* APRES MIDI */}
                        <td style={td}>{c.apresMidi?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.apresMidi?.anomalie ? '❌' : ''}</td>

                        {/* NUIT */}
                        <td style={td}>{c.nuit?.normal ? '✔' : ''}</td>
                        <td style={td}>{c.nuit?.anomalie ? '❌' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ================= TEMPS ================= */}
                <h4 style={{ marginTop: '20px' }}>Temps Inspection</h4>

                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    ⏱ {p} : {selectedFiche.tempsInspection?.[p]?.debut} →{' '}
                    {selectedFiche.tempsInspection?.[p]?.fin} (
                    {selectedFiche.tempsInspection?.[p]?.tempsAlloue})
                  </p>
                ))}

                <p>🔢 Total : {selectedFiche.tempsInspection?.total}</p>

                {/* ================= OBSERVATIONS ================= */}
                <h4>Observations</h4>
                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    📝 {p} : {selectedFiche.observations?.[p]}
                  </p>
                ))}

                {/* ================= TECHNICIENS ================= */}
                <h4>Techniciens</h4>
                {['matin', 'apresMidi', 'nuit'].map((p) => (
                  <p key={p}>
                    👨‍🔧 {p} : {(selectedFiche.techniciens?.[p] || []).join(', ')}
                  </p>
                ))}

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.groupes ? (
              <>
                <h3>📡 Fiche Balisage</h3>

                {/* ================= INFOS GENERALES ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>

                <p>👨‍🔧 Technicien : {selectedFiche.technicien}</p>

                <p>📌 Statut : {selectedFiche.statut}</p>

                {/* ================= TABLEAU ================= */}
                <h4>Inspection Balisage</h4>

                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={th}>Fonction</th>
                      <th style={th}>Désignation</th>

                      <th colSpan="4" style={th}>
                        Matin
                      </th>
                      <th colSpan="4" style={th}>
                        Nuit
                      </th>
                    </tr>

                    <tr style={{ backgroundColor: '#eee' }}>
                      <th></th>
                      <th></th>

                      <th style={th}>NF</th>
                      <th style={th}>Fonctionnement</th>
                      <th style={th}>Interventions</th>
                      <th style={th}>Obs</th>

                      <th style={th}>NF</th>
                      <th style={th}>Fonctionnement</th>
                      <th style={th}>Interventions</th>
                      <th style={th}>Obs</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.groupes.map((g, gi) => (
                      <React.Fragment key={gi}>
                        {g.lignes.map((l, li) => (
                          <tr key={li}>
                            {/* Groupe */}
                            {li === 0 && (
                              <td rowSpan={g.lignes.length}>
                                <b>{g.titre}</b>
                              </td>
                            )}

                            {/* Désignation */}
                            <td>{l.designation}</td>

                            {/* ================= MATIN ================= */}
                            <td>{l.matin?.nf}</td>
                            <td>{l.matin?.fonctionnement}</td>
                            <td>{l.matin?.interventions}</td>
                            <td>{l.matin?.observations}</td>

                            {/* ================= NUIT ================= */}
                            <td>{l.nuit?.nf}</td>
                            <td>{l.nuit?.fonctionnement}</td>
                            <td>{l.nuit?.interventions}</td>
                            <td>{l.nuit?.observations}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : //fiche pamaa
            selectedFiche?.groupes ? (
              <>
                <h3>📡 Fiche Balisage</h3>

                {/* ================= INFOS GENERALES ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>

                <p>👨‍🔧 Technicien : {selectedFiche.technicien}</p>

                <p>📌 Statut : {selectedFiche.statut}</p>

                {/* ================= TABLEAU ================= */}
                <h4>Inspection Balisage</h4>

                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#eee' }}>
                      <th style={th}>Fonction</th>
                      <th style={th}>Désignation</th>

                      <th colSpan="4" style={th}>
                        Matin
                      </th>
                      <th colSpan="4" style={th}>
                        Nuit
                      </th>
                    </tr>

                    <tr style={{ backgroundColor: '#eee' }}>
                      <th></th>
                      <th></th>

                      <th style={th}>NF</th>
                      <th style={th}>Fonctionnement</th>
                      <th style={th}>Interventions</th>
                      <th style={th}>Obs</th>

                      <th style={th}>NF</th>
                      <th style={th}>Fonctionnement</th>
                      <th style={th}>Interventions</th>
                      <th style={th}>Obs</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedFiche.groupes.map((g, gi) => (
                      <React.Fragment key={gi}>
                        {g.lignes.map((l, li) => (
                          <tr key={li}>
                            {/* Groupe */}
                            {li === 0 && (
                              <td rowSpan={g.lignes.length}>
                                <b>{g.titre}</b>
                              </td>
                            )}

                            {/* Désignation */}
                            <td>{l.designation}</td>

                            {/* ================= MATIN ================= */}
                            <td>{l.matin?.nf}</td>
                            <td>{l.matin?.fonctionnement}</td>
                            <td>{l.matin?.interventions}</td>
                            <td>{l.matin?.observations}</td>

                            {/* ================= NUIT ================= */}
                            <td>{l.nuit?.nf}</td>
                            <td>{l.nuit?.fonctionnement}</td>
                            <td>{l.nuit?.interventions}</td>
                            <td>{l.nuit?.observations}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.tableaux ? (
              <>
                <h3>📡 Fiche Annuelle PaMa</h3>

                {/* ================= INFOS ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>

                <p>
                  👨‍🔧 Techniciens :{' '}
                  {Array.isArray(selectedFiche.techniciens_operateurs)
                    ? selectedFiche.techniciens_operateurs.join(', ')
                    : ''}
                </p>

                <p>📌 Statut : {selectedFiche.statut}</p>

                {/* ================= TABLEAUX ================= */}
                {selectedFiche.tableaux.map((tableau, tIdx) => (
                  <div key={tIdx} style={{ marginBottom: '30px' }}>
                    <h4>Tableau {tableau.titre}</h4>

                    <table
                      style={{ borderCollapse: 'collapse', width: '100%' }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th style={th}>Ligne</th>

                          {tableau.verifications.map((v) => (
                            <th key={v} style={th}>
                              {v}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {Object.entries(tableau.lignes).map(
                          ([ligne, verifs], i) => (
                            <tr key={i}>
                              <td style={td}>
                                <b>{ligne}</b>
                              </td>

                              {tableau.verifications.map((v) => (
                                <td key={v} style={td}>
                                  {verifs[v]}
                                </td>
                              ))}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={() => exportPDF(selectedFiche)}>
                    📄 Exporter PDF
                  </button>
                </div>
              </>
            ) : selectedFiche?.blocsBrigade ? (
              <>
                <h3>🛠️ Fiche Brigade</h3>

                {/* ================= INFOS ================= */}
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>

                <p>📌 Statut : {selectedFiche.statut}</p>

                {/* ================= BLOCS ================= */}
                {['matin', 'apresMidi', 'nuit'].map((bloc, idx) => (
                  <div key={idx} style={{ marginTop: '20px' }}>
                    <h4>
                      {bloc === 'matin' && '🌅 Matin'}
                      {bloc === 'apresMidi' && '🌇 Après-midi'}
                      {bloc === 'nuit' && '🌙 Nuit'}
                    </h4>

                    {/* ===== TABLE CONSIGNES ===== */}
                    <table
                      style={{ borderCollapse: 'collapse', width: '100%' }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th style={th}>Consigne</th>
                          <th style={th}>Inspection</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(selectedFiche.blocsBrigade?.[bloc] || []).map(
                          (row, i) => (
                            <tr key={i}>
                              <td style={td}>{row.consigne || '-'}</td>
                              <td style={td}>{row.inspection || '-'}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    {/* ===== TECHNICIENS ===== */}
                    <h5 style={{ marginTop: '10px' }}>👨‍🔧 Techniciens</h5>

                    <table
                      style={{ borderCollapse: 'collapse', width: '100%' }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                          <th style={th}>Nom</th>
                          <th style={th}>Signature</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(selectedFiche.techniciens?.[bloc] || []).map(
                          (tech, i) => (
                            <tr key={i}>
                              <td style={td}>{tech.nom || '-'}</td>
                              <td style={td}>
                                {tech.signature ? (
                                  <img src={tech.signature} width="100" />
                                ) : (
                                  '—'
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}

                {/* ================= ACTIONS ================= */}
                <div
                  style={{ marginTop: '20px', display: 'flex', gap: '10px' }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                  >
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                </div>
              </>
            ) : selectedFiche.installations?.length > 0 ? (
              <>
                <h3>Fiche Feux Obstacles</h3>

                <p>
                  📅 Date : {new Date(selectedFiche.date).toLocaleDateString()}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicien || ''}</p>
                <p>
                  📝 Observation générale :{' '}
                  {selectedFiche.observationGenerale || ''}
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Lieu</th>
                      <th>Alimentation</th>
                      <th>Lampe</th>
                      <th>Observations</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(selectedFiche.installations || []).map((f, i) => (
                      <tr key={i}>
                        <td>{f.lieuInstallation}</td>
                        <td>{f.alimentation}</td>
                        <td>{f.lampe}</td>
                        <td>{f.observations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>

                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>

                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : selectedFiche.posteSST1 ||
              selectedFiche.posteSST2 ||
              selectedFiche.posteTC ? (
              <>
                <h3>Fiche Poste Mensuelle</h3>
                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>👨‍🔧 Technicien : {selectedFiche.technicien || ''}</p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observationsGenerales || ''}
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Poste</th>
                      <th>Élément</th>
                      <th>État</th>
                      <th>Interventions</th>
                      <th>Observations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiche.posteSST1 &&
                      selectedFiche.posteSST1.map((row, i) => (
                        <tr key={`SST1-${i}`}>
                          {i === 0 && (
                            <td rowSpan={selectedFiche.posteSST1.length}>
                              posteSST1
                            </td>
                          )}
                          <td>{row.element}</td>
                          <td>{row.etat}</td>
                          <td>{row.interventions}</td>
                          <td>{row.observations}</td>
                        </tr>
                      ))}

                    {selectedFiche.posteSST2 &&
                      selectedFiche.posteSST2.map((row, i) => (
                        <tr key={`SST2-${i}`}>
                          {i === 0 && (
                            <td rowSpan={selectedFiche.posteSST2.length}>
                              posteSST2
                            </td>
                          )}
                          <td>{row.element}</td>
                          <td>{row.etat}</td>
                          <td>{row.interventions}</td>
                          <td>{row.observations}</td>
                        </tr>
                      ))}

                    {selectedFiche.posteTC &&
                      selectedFiche.posteTC.map((row, i) => (
                        <tr key={`TC-${i}`}>
                          {i === 0 && (
                            <td rowSpan={selectedFiche.posteTC.length}>
                              posteTC
                            </td>
                          )}
                          <td>{row.element}</td>
                          <td>{row.etat}</td>
                          <td>{row.interventions}</td>
                          <td>{row.observations}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            ) : (
              <>
                <h3>Fiche Inspection journalière {selectedFiche.matricule}</h3>
                <p>📅 Date : {new Date(selectedFiche.date).toLocaleString()}</p>
                <p>📌 Période : {selectedFiche.periode || ''}</p>
                <table>
                  <thead>
                    <tr>
                      <th>Zone</th>
                      <th>Élément</th>
                      <th>État Matin</th>
                      <th>Nbr NF</th>
                      <th>Observation</th>
                      <th>Intervention</th>
                      <th>État Nuit</th>
                      <th>Nbr NF</th>
                      <th>Observation</th>
                      <th>Intervention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!(selectedFiche.inspections || []).length ? (
                      <tr>
                        <td colSpan="10" style={{ textAlign: 'center' }}>
                          Aucune inspection envoyée
                        </td>
                      </tr>
                    ) : (
                      (selectedFiche.inspections || []).map((item, i) => (
                        <tr key={i}>
                          <td>{item.zone}</td>
                          <td>{item.element}</td>
                          <td>{item.matin?.etat || ''}</td>
                          <td>{item.matin?.nbrNF || 0}</td>
                          <td>{item.matin?.observation || ''}</td>
                          <td>{item.matin?.intervention || ''}</td>
                          <td>{item.nuit?.etat || ''}</td>
                          <td>{item.nuit?.nbrNF || 0}</td>
                          <td>{item.nuit?.observation || ''}</td>
                          <td>{item.nuit?.intervention || ''}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="modal-actions">
                  <button onClick={() => validerFiche(selectedFiche._id)}>
                    ✅ Valider
                  </button>
                  <button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>
                  <button onClick={exportPDF}>📄 Exporter PDF</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
