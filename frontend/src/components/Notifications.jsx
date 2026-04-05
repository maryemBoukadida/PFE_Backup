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
      // ===================== EXPORT PDF annuelle fiche correcctive // =====================
    } else if (selectedFiche?.ficheCorrective) {
      const fc = selectedFiche.ficheCorrective[0];
      const doc = new jsPDF();

      // ================= EN-TÊTE PROFESSIONNEL =================
      doc.setFillColor(231, 76, 60);
      doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHE CORRECTIVE - GMAO', 14, 18);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      // ================= INFORMATIONS GÉNÉRALES =================
      let startY = 32;

      doc.setFillColor(255, 245, 245);
      doc.rect(14, startY, 180, 45, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(231, 76, 60);
      doc.text('📋 INFORMATIONS GÉNÉRALES', 14, startY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      // Ligne 1
      doc.text(
        `📅 Date d'intervention : ${fc.date ? new Date(fc.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}`,
        14,
        startY + 14
      );

      doc.text(
        `🔖 N° Fiche : ${fc.numeroFiche || selectedFiche._id?.slice(-8) || 'FC-' + Math.random().toString(36).substr(2, 8)}`,
        110,
        startY + 14
      );

      // Ligne 2
      doc.text(
        `📍 Lieu d'installation : ${fc.lieuInstallation || 'Non spécifié'}`,
        14,
        startY + 21
      );

      doc.text(
        `🏭 Équipement : ${fc.equipement || 'Non spécifié'}`,
        110,
        startY + 21
      );

      // Ligne 3
      doc.text(
        `👨‍🔧 Technicien(s) : ${fc.techniciensOperateurs?.map((t) => t.nom).join(', ') || 'Non spécifié'}`,
        14,
        startY + 28
      );

      doc.text(`📊 Priorité : ${fc.priorite || 'Normale'}`, 110, startY + 28);

      // Ligne 4 - Observations générales
      doc.text(
        `📝 Observations générales : ${fc.observationsGenerales || 'Aucune observation'}`,
        14,
        startY + 35,
        { maxWidth: 180 }
      );

      startY = startY + 55;

      // ================= SECTION DIAGNOSTIC =================
      doc.setFillColor(231, 76, 60);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('🔍 DIAGNOSTIC DE PANNE', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 12;

      if (fc.diagnostic && fc.diagnostic.length > 0) {
        const diagColumns = [
          'N°',
          'Panne / Cause',
          'Effet constaté',
          'Gravité',
          'Statut',
        ];
        const diagRows = fc.diagnostic.map((d, idx) => [
          (idx + 1).toString(),
          d.panneCause || '',
          d.effet || '',
          d.gravite || '',
          d.resolu ? '✅ Résolu' : '⚠️ En cours',
        ]);

        autoTable(doc, {
          head: [diagColumns],
          body: diagRows,
          startY: startY,
          theme: 'striped',
          headStyles: {
            fillColor: [231, 76, 60],
            textColor: 255,
            fontSize: 10,
            fontStyle: 'bold',
          },
          styles: {
            fontSize: 9,
            cellPadding: 4,
            valign: 'middle',
          },
          columnStyles: {
            0: { cellWidth: 15, halign: 'center' },
            1: { cellWidth: 60 },
            2: { cellWidth: 55 },
            3: { cellWidth: 25, halign: 'center' },
            4: { cellWidth: 25, halign: 'center' },
          },
          alternateRowStyles: { fillColor: [255, 245, 245] },
        });

        startY = doc.lastAutoTable.finalY + 15;
      } else {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Aucun diagnostic enregistré', 14, startY);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        startY += 10;
      }

      // ================= SECTION DÉPANNAGE ET RÉPARATION =================
      if (startY > doc.internal.pageSize.height - 80) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(46, 204, 113);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('🛠️ DÉPANNAGE & RÉPARATION', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 12;

      if (fc.depannageReparation && fc.depannageReparation.length > 0) {
        const depColumns = [
          'N°',
          'Pièce de rechange',
          'Quantité',
          'Référence',
          'Coût unitaire',
          'Total',
        ];
        const depRows = fc.depannageReparation.map((d, idx) => [
          (idx + 1).toString(),
          d.piecesDeRechange || '',
          d.quantite || '0',
          d.reference || '',
          d.coutUnitaire ? `${d.coutUnitaire} €` : '',
          d.total ? `${d.total} €` : '',
        ]);

        autoTable(doc, {
          head: [depColumns],
          body: depRows,
          startY: startY,
          theme: 'striped',
          headStyles: {
            fillColor: [46, 204, 113],
            textColor: 255,
            fontSize: 10,
            fontStyle: 'bold',
          },
          styles: {
            fontSize: 9,
            cellPadding: 4,
          },
          columnStyles: {
            0: { cellWidth: 12, halign: 'center' },
            1: { cellWidth: 65 },
            2: { cellWidth: 15, halign: 'center' },
            3: { cellWidth: 35 },
            4: { cellWidth: 25, halign: 'right' },
            5: { cellWidth: 28, halign: 'right' },
          },
          alternateRowStyles: { fillColor: [245, 255, 245] },
        });

        startY = doc.lastAutoTable.finalY + 10;

        // Calcul du total général
        const totalGeneral = fc.depannageReparation.reduce(
          (sum, d) => sum + (parseFloat(d.total) || 0),
          0
        );
        if (totalGeneral > 0) {
          doc.setFont('helvetica', 'bold');
          doc.text(
            `💰 Total général : ${totalGeneral.toFixed(2)} €`,
            140,
            startY
          );
          doc.setFont('helvetica', 'normal');
          startY += 8;
        }
      } else {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Aucune pièce de rechange utilisée', 14, startY);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        startY += 10;
      }

      // ================= TEMPS D'INTERVENTION =================
      if (startY > doc.internal.pageSize.height - 70) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("⏱️ TEMPS D'INTERVENTION", 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      doc.setFillColor(240, 248, 255);
      doc.rect(14, startY, 180, 45, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      doc.text("🕐 Début d'intervention :", 20, startY + 8);
      doc.setFont('helvetica', 'bold');
      doc.text(fc.debutIntervention || 'Non spécifié', 80, startY + 8);

      doc.setFont('helvetica', 'normal');
      doc.text('🕒 Remise en service :', 20, startY + 16);
      doc.setFont('helvetica', 'bold');
      doc.text(fc.remiseEnService || 'Non spécifié', 80, startY + 16);

      doc.setFont('helvetica', 'normal');
      doc.text('⏳ Temps alloué :', 20, startY + 24);
      doc.setFont('helvetica', 'bold');
      doc.text(fc.tempsAlloue || 'Non spécifié', 80, startY + 24);

      // Calcul de la durée si les deux temps sont renseignés
      if (fc.debutIntervention && fc.remiseEnService) {
        doc.setFont('helvetica', 'normal');
        doc.text('⏱️ Durée totale :', 20, startY + 32);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(46, 204, 113);
        doc.text('Calcul automatique', 80, startY + 32);
        doc.setTextColor(0, 0, 0);
      }

      startY += 55;

      // ================= SIGNATURES =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(241, 196, 15);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('✍️ VALIDATIONS ET SIGNATURES', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 20;

      // Signature technicien
      if (fc.signature) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Signature du technicien :', 14, startY);

        try {
          const imgProps = doc.getImageProperties(fc.signature);
          const imgWidth = 80;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.5);
          doc.rect(14, startY + 4, imgWidth + 10, imgHeight + 8);

          doc.addImage(
            fc.signature,
            'PNG',
            18,
            startY + 8,
            imgWidth,
            imgHeight
          );

          doc.setFontSize(8);
          doc.setTextColor(0, 150, 0);
          doc.text('✓ Signature apposée', 18, startY + imgHeight + 12);
        } catch (err) {
          console.error('Erreur signature:', err);
          doc.setTextColor(255, 0, 0);
          doc.text('❌ Signature non valide', 14, startY + 8);
        }

        startY += 55;
      } else {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(150, 150, 150);
        doc.text('Signature du technicien :', 14, startY);
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(14, startY + 8, 100, startY + 8);
        doc.text('(Non signé)', 14, startY + 12);
        startY += 30;
      }

      // Signature responsable
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Validation du responsable :', 14, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(14, startY + 8, 100, startY + 8);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Date et signature', 45, startY + 12);

      startY += 25;

      // ================= COMMENTAIRES FINAUX =================
      if (fc.commentairesFinaux) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('📌 Commentaires finaux :', 14, startY);
        doc.setFont('helvetica', 'normal');
        doc.text(fc.commentairesFinaux, 14, startY + 6, { maxWidth: 180 });
      }

      // ================= PIED DE PAGE =================
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
          14,
          doc.internal.pageSize.height - 20,
          doc.internal.pageSize.width - 14,
          doc.internal.pageSize.height - 20
        );

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Document GMAO - Fiche Corrective - Page ${i} / ${pageCount}`,
          14,
          doc.internal.pageSize.height - 12
        );
        doc.text(
          new Date().toLocaleString('fr-FR'),
          doc.internal.pageSize.width - 45,
          doc.internal.pageSize.height - 12
        );
      }

      // ================= SAUVEGARDE =================
      const dateStr = fc.date
        ? new Date(fc.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      doc.save(`GMAO_Fiche_Corrective_${dateStr}.pdf`);

      // ===================== EXPORT PDF no break// =====================
    } else if (selectedFiche?.controles) {
      const doc = new jsPDF();

      // ================= EN-TÊTE PROFESSIONNEL =================
      doc.setFillColor(155, 89, 182);
      doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHE NO-BREAK - CONTRÔLE ONDULEUR', 14, 18);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      // ================= INFORMATIONS GÉNÉRALES =================
      let startY = 32;

      doc.setFillColor(250, 240, 255);
      doc.rect(14, startY, 180, 45, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(155, 89, 182);
      doc.text('📋 INFORMATIONS GÉNÉRALES', 14, startY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      doc.text(
        `📅 Date du contrôle : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}`,
        14,
        startY + 14
      );

      doc.text(
        `🔖 N° Fiche : ${selectedFiche.numeroFiche || selectedFiche._id?.slice(-8) || 'NB-' + Math.random().toString(36).substr(2, 8)}`,
        110,
        startY + 14
      );

      doc.text(
        `📍 Lieu d'installation : ${selectedFiche.lieuInstallation || 'Non spécifié'}`,
        14,
        startY + 21
      );

      doc.text(`🏭 Équipement : Onduleur No-Break`, 110, startY + 21);

      doc.text(
        `🏷️ Désignation : ${selectedFiche.designation || 'Non spécifiée'}`,
        14,
        startY + 28
      );

      doc.text(
        `📊 Type d'onduleur : ${selectedFiche.typeOnduleur || 'Non spécifié'}`,
        110,
        startY + 28
      );

      doc.text(
        `🔋 Capacité batteries : ${selectedFiche.capaciteBatteries || 'Non spécifiée'}`,
        14,
        startY + 35
      );

      doc.text(
        `👤 Contrôleur : ${selectedFiche.controleur || 'Non spécifié'}`,
        110,
        startY + 35
      );

      startY = startY + 55;

      // ================= TABLEAU DES CONTROLES =================
      doc.setFillColor(155, 89, 182);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(
        '🔍 POINTS DE CONTRÔLE - ÉTAT DE FONCTIONNEMENT',
        14,
        startY + 6
      );

      doc.setTextColor(0, 0, 0);
      startY += 12;

      const getStatusIcon = (period) => {
        if (period.normal) return { text: '✔ Normal', color: [46, 204, 113] };
        if (period.anomalie)
          return { text: '⚠ Anomalie', color: [231, 76, 60] };
        return { text: '⚪ Non contrôlé', color: [149, 165, 166] };
      };

      const tableColumn = [
        'N°',
        'Spécification',
        'Désignation',
        'Matin',
        'A-Midi',
        'Nuit',
        'Statut',
      ];

      const tableRows = selectedFiche.controles.map((c, idx) => {
        const matin = getStatusIcon(c.matin);
        const apresMidi = getStatusIcon(c.apresMidi);
        const nuit = getStatusIcon(c.nuit);

        const hasAnomalie =
          c.matin.anomalie || c.apresMidi.anomalie || c.nuit.anomalie;
        const hasNormal = c.matin.normal || c.apresMidi.normal || c.nuit.normal;

        let statut = '❌ Non contrôlé';
        if (hasAnomalie) statut = '⚠️ Anomalie';
        if (!hasAnomalie && hasNormal) statut = '✅ Conforme';

        return [
          (idx + 1).toString(),
          c.specification || '',
          c.designation || '',
          matin.text,
          apresMidi.text,
          nuit.text,
          statut,
        ];
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'striped',
        headStyles: {
          fillColor: [155, 89, 182],
          textColor: 255,
          fontSize: 9,
          fontStyle: 'bold',
        },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 20, halign: 'center' },
          4: { cellWidth: 20, halign: 'center' },
          5: { cellWidth: 20, halign: 'center' },
          6: { cellWidth: 20, halign: 'center' },
        },
        alternateRowStyles: { fillColor: [250, 245, 255] },
        rowStyles: (row, data) => {
          const rowData = tableRows[data.row.index];
          if (rowData && rowData[6] === '⚠️ Anomalie') {
            return { fillColor: [255, 240, 245] };
          }
          return {};
        },
      });

      startY = doc.lastAutoTable.finalY + 15;

      // ================= SYNTHÈSE DES ANOMALIES =================
      const anomalies = selectedFiche.controles.filter(
        (c) => c.matin.anomalie || c.apresMidi.anomalie || c.nuit.anomalie
      );

      if (anomalies.length > 0) {
        if (startY > doc.internal.pageSize.height - 80) {
          doc.addPage();
          startY = 20;
        }

        doc.setFillColor(231, 76, 60);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('⚠️ SYNTHÈSE DES ANOMALIES DÉTECTÉES', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        doc.setFillColor(255, 245, 245);
        doc.rect(14, startY, 180, anomalies.length * 12 + 10, 'F');

        anomalies.forEach((anomalie, idx) => {
          const periods = [];
          let description = '';

          if (anomalie.matin.anomalie) {
            periods.push('Matin');
            description =
              anomalie.matin.descriptionAnomalie ||
              anomalie.matin.anomalie ||
              '';
          }
          if (anomalie.apresMidi.anomalie) {
            periods.push('Après-midi');
            description =
              anomalie.apresMidi.descriptionAnomalie ||
              anomalie.apresMidi.anomalie ||
              '';
          }
          if (anomalie.nuit.anomalie) {
            periods.push('Nuit');
            description =
              anomalie.nuit.descriptionAnomalie || anomalie.nuit.anomalie || '';
          }

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(231, 76, 60);
          doc.text(
            `⚠️ ${anomalie.specification || 'Point de contrôle'}`,
            20,
            startY + 6 + idx * 12
          );

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text(
            `Période(s): ${periods.join(', ')}`,
            30,
            startY + 11 + idx * 12
          );
          if (description && description !== 'true') {
            doc.text(`Description: ${description}`, 30, startY + 16 + idx * 12);
          }
        });

        startY += anomalies.length * 12 + 25;
      }

      // ================= TEMPS D'INSPECTION =================
      if (startY > doc.internal.pageSize.height - 80) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("⏱️ TEMPS D'INSPECTION ET MESURES", 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      doc.setFillColor(240, 248, 255);
      doc.rect(14, startY, 180, 65, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      let tempStartY = startY + 8;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const t = selectedFiche.tempsInspection[p] || {};
        const periodeLabels = {
          matin: '🌅 Matin (8h-14h)',
          apresMidi: '☀️ Après-midi (14h-20h)',
          nuit: '🌙 Nuit (20h-8h)',
        };

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 20, tempStartY + idx * 14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Début: ${t.debut || '---'}`, 80, tempStartY + idx * 14);
        doc.text(`Fin: ${t.fin || '---'}`, 115, tempStartY + idx * 14);
        doc.text(
          `Durée: ${t.tempsAlloue || '0'} min`,
          150,
          tempStartY + idx * 14
        );
      });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(52, 152, 219);
      doc.text(
        `📊 Temps total d'inspection : ${selectedFiche.tempsInspection.total || '0'} minutes`,
        20,
        tempStartY + 48
      );
      doc.setTextColor(0, 0, 0);

      startY += 75;

      // ================= MESURES ÉLECTRIQUES =================
      if (selectedFiche.mesuresElectriques) {
        if (startY > doc.internal.pageSize.height - 80) {
          doc.addPage();
          startY = 20;
        }

        doc.setFillColor(52, 73, 94);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('⚡ MESURES ÉLECTRIQUES', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        const mesures = selectedFiche.mesuresElectriques;
        const mesuresColumns = [
          'Paramètre',
          'Matin',
          'Après-midi',
          'Nuit',
          'Norme',
          'Conforme',
        ];
        const mesuresRows = [
          [
            'Tension entrée (V)',
            mesures.tensionEntree?.matin || '---',
            mesures.tensionEntree?.apresMidi || '---',
            mesures.tensionEntree?.nuit || '---',
            '220V ± 10%',
            mesures.tensionEntree?.conforme ? '✅' : '⚠️',
          ],
          [
            'Tension sortie (V)',
            mesures.tensionSortie?.matin || '---',
            mesures.tensionSortie?.apresMidi || '---',
            mesures.tensionSortie?.nuit || '---',
            '220V ± 5%',
            mesures.tensionSortie?.conforme ? '✅' : '⚠️',
          ],
          [
            'Courant charge (A)',
            mesures.courantCharge?.matin || '---',
            mesures.courantCharge?.apresMidi || '---',
            mesures.courantCharge?.nuit || '---',
            'Selon charge',
            mesures.courantCharge?.conforme ? '✅' : '⚠️',
          ],
          [
            'Fréquence (Hz)',
            mesures.frequence?.matin || '---',
            mesures.frequence?.apresMidi || '---',
            mesures.frequence?.nuit || '---',
            '50Hz ± 1%',
            mesures.frequence?.conforme ? '✅' : '⚠️',
          ],
          [
            'Température (°C)',
            mesures.temperature?.matin || '---',
            mesures.temperature?.apresMidi || '---',
            mesures.temperature?.nuit || '---',
            '< 40°C',
            mesures.temperature?.conforme ? '✅' : '⚠️',
          ],
        ];

        autoTable(doc, {
          head: [mesuresColumns],
          body: mesuresRows,
          startY: startY,
          theme: 'striped',
          headStyles: {
            fillColor: [52, 73, 94],
            textColor: 255,
            fontSize: 8,
          },
          styles: { fontSize: 8, cellPadding: 3 },
          columnStyles: {
            0: { cellWidth: 35, fontStyle: 'bold' },
            1: { cellWidth: 25, halign: 'center' },
            2: { cellWidth: 25, halign: 'center' },
            3: { cellWidth: 25, halign: 'center' },
            4: { cellWidth: 35, halign: 'center' },
            5: { cellWidth: 15, halign: 'center' },
          },
        });

        startY = doc.lastAutoTable.finalY + 15;
      }

      // ================= OBSERVATIONS PAR PÉRIODE =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(241, 196, 15);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('📝 OBSERVATIONS ET COMMENTAIRES', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const periodeLabels = {
          matin: '🌅 Période Matin',
          apresMidi: '☀️ Période Après-midi',
          nuit: '🌙 Période Nuit',
        };

        const obs = selectedFiche.observations?.[p] || '';

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 14, startY + idx * 12);
        doc.setFont('helvetica', 'normal');
        doc.text(obs || 'Aucune observation', 65, startY + idx * 12, {
          maxWidth: 125,
        });
      });

      startY += 45;

      // ================= TECHNICIENS ET SIGNATURES =================
      if (startY > doc.internal.pageSize.height - 120) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(46, 204, 113);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("👨‍🔧 TECHNICIENS D'INTERVENTION", 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const periodeLabels = {
          matin: '🌅 Matin',
          apresMidi: '☀️ Après-midi',
          nuit: '🌙 Nuit',
        };

        const techs = selectedFiche.techniciens?.[p] || [];
        const techList = Array.isArray(techs) ? techs : [];

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 14, startY + idx * 10);
        doc.setFont('helvetica', 'normal');

        if (techList.length > 0) {
          doc.text(techList.join(', '), 50, startY + idx * 10, {
            maxWidth: 140,
          });
        } else {
          doc.text('Aucun technicien affecté', 50, startY + idx * 10);
        }
      });

      startY += 45;

      // ================= SIGNATURES FINALES =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(155, 89, 182);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('✍️ VALIDATIONS', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 20;

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);

      // Signature technicien
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('Signature du technicien :', 14, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(14, startY + 6, 90, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Nom et signature', 45, startY + 10);

      // Signature responsable
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Validation responsable technique :', 110, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(110, startY + 6, 190, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Nom et signature', 145, startY + 10);

      startY += 25;

      // Cachet entreprise
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(150, 150, 150);
      doc.text("Cachet de l'entreprise", 150, startY);
      doc.rect(145, startY - 8, 45, 20);

      // ================= PIED DE PAGE =================
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
          14,
          doc.internal.pageSize.height - 20,
          doc.internal.pageSize.width - 14,
          doc.internal.pageSize.height - 20
        );

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Document GMAO - Fiche No-Break - Page ${i} / ${pageCount}`,
          14,
          doc.internal.pageSize.height - 12
        );
        doc.text(
          new Date().toLocaleString('fr-FR'),
          doc.internal.pageSize.width - 45,
          doc.internal.pageSize.height - 12
        );
      }

      // ================= SAUVEGARDE =================
      const dateStr = selectedFiche.date
        ? new Date(selectedFiche.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      doc.save(`GMAO_Fiche_NoBreak_${dateStr}.pdf`);
      // ===================== EXPORT PDF brigade =====================
    } else if (selectedFiche?.blocsBrigade) {
      const doc = new jsPDF();

      // ================= EN-TÊTE PROFESSIONNEL =================
      // Logo et titre principal
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHE BRIGADE - GMAO', 14, 18);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      // ================= INFORMATIONS GÉNÉRALES =================
      let startY = 32;

      doc.setFillColor(240, 248, 255);
      doc.rect(14, startY, 180, 32, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('📋 INFORMATIONS GÉNÉRALES', 14, startY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(
        `📅 Date : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}`,
        14,
        startY + 14
      );

      doc.text(
        `⏰ Heure d'émission : ${selectedFiche.heure || new Date().toLocaleTimeString('fr-FR')}`,
        14,
        startY + 21
      );

      doc.text(
        `🔖 Identifiant : ${selectedFiche._id?.slice(-8) || 'FICHE-' + Math.random().toString(36).substr(2, 8)}`,
        110,
        startY + 14
      );

      doc.text(
        `👤 Opérateur : ${selectedFiche.operateur || 'Système GMAO'}`,
        110,
        startY + 21
      );

      startY = startY + 42;

      // ================= TABLEAU DES CONSIGNES ET INSPECTIONS =================
      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('CONSIGNES ET INSPECTIONS', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 12;

      const tableColumn = ['Période', 'Consignes', 'Inspection', 'Statut'];
      let tableRows = [];

      const periodeLabels = {
        matin: '🌅 Matin (8h-14h)',
        apresMidi: '☀️ Après-midi (14h-20h)',
        nuit: '🌙 Nuit (20h-8h)',
      };

      ['matin', 'apresMidi', 'nuit'].forEach((bloc) => {
        const lignes = selectedFiche.blocsBrigade[bloc] || [];

        if (lignes.length === 0) {
          tableRows.push([
            periodeLabels[bloc],
            'Aucune consigne',
            'Aucune inspection',
            '❌ Non renseigné',
          ]);
        } else {
          lignes.forEach((row, idx) => {
            const statut =
              row.consigne && row.inspection ? '✅ Complété' : '⚠️ Partiel';
            tableRows.push([
              idx === 0 ? periodeLabels[bloc] : '',
              row.consigne || '',
              row.inspection || '',
              statut,
            ]);
          });
        }
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'striped',
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: 255,
          fontSize: 10,
          fontStyle: 'bold',
        },
        styles: {
          fontSize: 9,
          cellPadding: 4,
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 45, fontStyle: 'bold' },
          1: { cellWidth: 55 },
          2: { cellWidth: 55 },
          3: { cellWidth: 25, halign: 'center' },
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });

      startY = doc.lastAutoTable.finalY + 15;

      // ================= SECTION TECHNICIENS ET SIGNATURES =================
      doc.setFillColor(46, 204, 113);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('TECHNICIENS ET SIGNATURES', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((bloc, blocIndex) => {
        const techs = selectedFiche.techniciens[bloc] || [];
        const blocLabel = periodeLabels[bloc];

        if (techs.length > 0 || blocIndex < 2) {
          // Titre du bloc avec fond coloré
          doc.setFillColor(240, 248, 255);
          doc.rect(14, startY, 180, 8, 'F');

          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(41, 128, 185);
          doc.text(blocLabel, 14, startY + 6);
          doc.setTextColor(0, 0, 0);

          startY += 12;

          if (techs.length === 0) {
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(150, 150, 150);
            doc.text('Aucun technicien affecté', 20, startY);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            startY += 8;
          } else {
            techs.forEach((tech, idx) => {
              // Vérifier si on doit créer une nouvelle page
              if (startY > doc.internal.pageSize.height - 60) {
                doc.addPage();
                startY = 20;
              }

              // Fond alterné pour chaque technicien
              if (idx % 2 === 0) {
                doc.setFillColor(250, 250, 250);
                doc.rect(14, startY - 4, 180, 24, 'F');
              }

              doc.setFont('helvetica', 'bold');
              doc.text(`👤 ${tech.nom || 'Technicien non nommé'}`, 16, startY);

              doc.setFont('helvetica', 'normal');
              doc.setFontSize(8);
              doc.setTextColor(100, 100, 100);
              doc.text(
                `Matricule: ${tech.matricule || 'Non spécifié'}`,
                16,
                startY + 4
              );
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(9);

              // Ajout de la signature
              if (tech.signature) {
                // Cadre pour la signature
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.5);
                doc.rect(120, startY - 2, 70, 20);

                try {
                  doc.addImage(tech.signature, 'PNG', 122, startY, 66, 16);
                  doc.setFontSize(7);
                  doc.setTextColor(0, 150, 0);
                  doc.text('✓ Signé', 155, startY + 18);
                } catch (err) {
                  console.error('Erreur signature:', err);
                  doc.setFontSize(8);
                  doc.setTextColor(255, 0, 0);
                  doc.text('❌ Signature non valide', 145, startY + 8);
                }
              } else {
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.5);
                doc.rect(120, startY - 2, 70, 20);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text('Non signé', 150, startY + 8);
                doc.text('_________________', 148, startY + 12);
              }

              doc.setTextColor(0, 0, 0);
              startY += 24;
            });
          }

          startY += 8;
        }
      });

      // ================= SECTION OBSERVATIONS =================
      if (startY > doc.internal.pageSize.height - 60) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(241, 196, 15);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('OBSERVATIONS ET COMMENTAIRES', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      const observations = selectedFiche.observations || {};
      ['matin', 'apresMidi', 'nuit'].forEach((bloc) => {
        const obs = observations[bloc];
        if (obs && obs.trim()) {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.text(`${periodeLabels[bloc]} :`, 14, startY);
          doc.setFont('helvetica', 'normal');
          doc.text(obs, 14, startY + 5, { maxWidth: 170 });
          startY += 20;
        }
      });

      if (
        !observations.matin &&
        !observations.apresMidi &&
        !observations.nuit
      ) {
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('Aucune observation enregistrée', 14, startY);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        startY += 10;
      }

      // ================= PIED DE PAGE AVEC SIGNATURES FINALES =================
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        // Ligne de séparation
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
          14,
          doc.internal.pageSize.height - 20,
          doc.internal.pageSize.width - 14,
          doc.internal.pageSize.height - 20
        );

        // Pied de page
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Document généré par GMAO - Page ${i} / ${pageCount}`,
          14,
          doc.internal.pageSize.height - 12
        );
        doc.text(
          new Date().toLocaleString('fr-FR'),
          doc.internal.pageSize.width - 45,
          doc.internal.pageSize.height - 12
        );

        // Signature responsable (seulement sur la dernière page)
        if (i === pageCount) {
          doc.setFontSize(9);
          doc.setTextColor(0, 0, 0);
          doc.text(
            'Validation responsable :',
            14,
            doc.internal.pageSize.height - 28
          );
          doc.setDrawColor(0, 0, 0);
          doc.line(
            70,
            doc.internal.pageSize.height - 29,
            140,
            doc.internal.pageSize.height - 29
          );
          doc.setFontSize(7);
          doc.setTextColor(100, 100, 100);
          doc.text('Signature', 100, doc.internal.pageSize.height - 24);
        }
      }

      // ================= SAUVEGARDE DU PDF =================
      const dateStr = selectedFiche.date
        ? new Date(selectedFiche.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      doc.save(`GMAO_Fiche_Brigade_${dateStr}.pdf`);

      // ===================== EXPORT PDF annuelle voie=====================
      // ===================== EXPORT PDF 2250 KVA =====================
    } else if (selectedFiche?.pointsControle) {
      const doc = new jsPDF();

      // ================= EN-TÊTE PROFESSIONNEL =================
      doc.setFillColor(52, 73, 94);
      doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHE 2250KVA - CONTRÔLE TECHNIQUE', 14, 18);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      // ================= INFORMATIONS GÉNÉRALES =================
      let startY = 32;

      doc.setFillColor(240, 248, 255);
      doc.rect(14, startY, 180, 40, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(52, 73, 94);
      doc.text('📋 INFORMATIONS GÉNÉRALES', 14, startY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      doc.text(
        `📅 Date du contrôle : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}`,
        14,
        startY + 14
      );

      doc.text(
        `🔖 N° Fiche : ${selectedFiche.numeroFiche || selectedFiche._id?.slice(-8) || 'CT-' + Math.random().toString(36).substr(2, 8)}`,
        110,
        startY + 14
      );

      doc.text(
        `📍 Lieu d'installation : ${selectedFiche.lieuInstallation || 'Non spécifié'}`,
        14,
        startY + 21
      );

      doc.text(`🏭 Équipement : Groupe électrogène 2250KVA`, 110, startY + 21);

      doc.text(
        `🏷️ Désignation : ${selectedFiche.designation || 'Non spécifiée'}`,
        14,
        startY + 28
      );

      doc.text(
        `📊 Type de contrôle : ${selectedFiche.typeControle || 'Contrôle périodique'}`,
        110,
        startY + 28
      );

      doc.text(
        `👤 Responsable : ${selectedFiche.responsable || 'Non spécifié'}`,
        14,
        startY + 35
      );

      startY = startY + 50;

      // ================= TABLEAU DES POINTS DE CONTRÔLE =================
      doc.setFillColor(52, 73, 94);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(
        '🔍 POINTS DE CONTRÔLE ET ÉTAT DE FONCTIONNEMENT',
        14,
        startY + 6
      );

      doc.setTextColor(0, 0, 0);
      startY += 12;

      const tableColumn = [
        'N°',
        'Spécification',
        'Désignation',
        'Matin',
        'A-Midi',
        'Nuit',
        'Statut',
      ];

      const getStatusIcon = (matin, apresMidi, nuit) => {
        const hasAnomalie =
          matin.anomalie || apresMidi.anomalie || nuit.anomalie;
        const hasNormal = matin.normal || apresMidi.normal || nuit.normal;

        if (hasAnomalie) return '⚠️ Anomalie détectée';
        if (hasNormal) return '✅ Conforme';
        return '❌ Non contrôlé';
      };

      const getPeriodStatus = (period) => {
        if (period.normal) return '✔ Normal';
        if (period.anomalie) return '⚠ Anomalie';
        return '⚪ Non renseigné';
      };

      const tableRows = selectedFiche.pointsControle.map((c, idx) => [
        (idx + 1).toString(),
        c.specification || '',
        c.designation || '',
        getPeriodStatus(c.matin),
        getPeriodStatus(c.apresMidi),
        getPeriodStatus(c.nuit),
        getStatusIcon(c.matin, c.apresMidi, c.nuit),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'striped',
        headStyles: {
          fillColor: [52, 73, 94],
          textColor: 255,
          fontSize: 9,
          fontStyle: 'bold',
        },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 45 },
          2: { cellWidth: 45 },
          3: { cellWidth: 20, halign: 'center' },
          4: { cellWidth: 20, halign: 'center' },
          5: { cellWidth: 20, halign: 'center' },
          6: { cellWidth: 20, halign: 'center' },
        },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        rowStyles: (row, data) => {
          const rowData = tableRows[data.row.index];
          if (rowData && rowData[6] === '⚠️ Anomalie détectée') {
            return { fillColor: [255, 240, 240] };
          }
          return {};
        },
      });

      startY = doc.lastAutoTable.finalY + 15;

      // ================= SYNTHÈSE DES ANOMALIES =================
      const anomalies = selectedFiche.pointsControle.filter(
        (c) => c.matin.anomalie || c.apresMidi.anomalie || c.nuit.anomalie
      );

      if (anomalies.length > 0) {
        if (startY > doc.internal.pageSize.height - 80) {
          doc.addPage();
          startY = 20;
        }

        doc.setFillColor(231, 76, 60);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('⚠️ SYNTHÈSE DES ANOMALIES DÉTECTÉES', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        doc.setFillColor(255, 245, 245);
        doc.rect(14, startY, 180, anomalies.length * 12 + 10, 'F');

        anomalies.forEach((anomalie, idx) => {
          const periods = [];
          if (anomalie.matin.anomalie) periods.push('Matin');
          if (anomalie.apresMidi.anomalie) periods.push('Après-midi');
          if (anomalie.nuit.anomalie) periods.push('Nuit');

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(231, 76, 60);
          doc.text(
            `⚠️ ${anomalie.specification || 'Anomalie'}`,
            20,
            startY + 6 + idx * 12
          );

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.text(
            `Période(s): ${periods.join(', ')} - ${anomalie.matin.anomalieDescription || anomalie.apresMidi.anomalieDescription || anomalie.nuit.anomalieDescription || 'Anomalie constatée'}`,
            30,
            startY + 11 + idx * 12
          );
        });

        startY += anomalies.length * 12 + 20;
      }

      // ================= TEMPS D'INSPECTION =================
      if (startY > doc.internal.pageSize.height - 80) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("⏱️ TEMPS D'INSPECTION", 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      doc.setFillColor(240, 248, 255);
      doc.rect(14, startY, 180, 55, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      let tempStartY = startY + 8;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const t = selectedFiche.tempsInspection[p] || {};
        const periodeLabels = {
          matin: '🌅 Matin (8h-14h)',
          apresMidi: '☀️ Après-midi (14h-20h)',
          nuit: '🌙 Nuit (20h-8h)',
        };

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 20, tempStartY + idx * 12);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `${t.debut || '---'} - ${t.fin || '---'} = ${t.tempsAlloue || '0'} min`,
          80,
          tempStartY + idx * 12
        );
      });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(52, 152, 219);
      doc.text(
        `Total : ${selectedFiche.tempsInspection.total || '0'} minutes`,
        20,
        tempStartY + 40
      );
      doc.setTextColor(0, 0, 0);

      startY += 65;

      // ================= OBSERVATIONS PAR PÉRIODE =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(241, 196, 15);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('📝 OBSERVATIONS PAR PÉRIODE', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const periodeLabels = {
          matin: '🌅 Matin',
          apresMidi: '☀️ Après-midi',
          nuit: '🌙 Nuit',
        };

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 14, startY + idx * 10);
        doc.setFont('helvetica', 'normal');
        doc.text(
          selectedFiche.observations?.[p] || 'Aucune observation',
          50,
          startY + idx * 10,
          { maxWidth: 130 }
        );
      });

      startY += 40;

      // ================= TECHNICIENS ET SIGNATURES =================
      if (startY > doc.internal.pageSize.height - 120) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(46, 204, 113);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('👨‍🔧 TECHNICIENS ET SIGNATURES', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const periodeLabels = {
          matin: '🌅 Matin',
          apresMidi: '☀️ Après-midi',
          nuit: '🌙 Nuit',
        };

        const techs = selectedFiche.techniciens?.[p] || [];
        const techList = Array.isArray(techs) ? techs : [];

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 14, startY + idx * 12);
        doc.setFont('helvetica', 'normal');

        if (techList.length > 0) {
          doc.text(techList.join(', '), 50, startY + idx * 12, {
            maxWidth: 130,
          });
        } else {
          doc.text('Aucun technicien affecté', 50, startY + idx * 12);
        }
      });

      startY += 50;

      // ================= SIGNATURES FINALES =================
      if (startY > doc.internal.pageSize.height - 80) {
        doc.addPage();
        startY = 20;
      }

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);

      // Signature technicien principal
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('✍️ Signature du technicien principal :', 14, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(14, startY + 6, 100, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Date et signature', 45, startY + 10);

      // Signature responsable
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('✍️ Validation du responsable qualité :', 120, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(120, startY + 6, 190, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Date et signature', 145, startY + 10);

      startY += 25;

      // ================= COMMENTAIRES ET RECOMMANDATIONS =================
      if (selectedFiche.commentaires || selectedFiche.recommandations) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);

        if (selectedFiche.commentaires) {
          doc.text('📌 Commentaires généraux :', 14, startY);
          doc.setFont('helvetica', 'normal');
          doc.text(selectedFiche.commentaires, 14, startY + 6, {
            maxWidth: 180,
          });
          startY += 20;
        }

        if (selectedFiche.recommandations) {
          doc.setFont('helvetica', 'bold');
          doc.text('🔧 Recommandations :', 14, startY);
          doc.setFont('helvetica', 'normal');
          doc.text(selectedFiche.recommandations, 14, startY + 6, {
            maxWidth: 180,
          });
        }
      }

      // ================= PIED DE PAGE =================
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
          14,
          doc.internal.pageSize.height - 20,
          doc.internal.pageSize.width - 14,
          doc.internal.pageSize.height - 20
        );

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Document GMAO - Fiche 2250KVA - Page ${i} / ${pageCount}`,
          14,
          doc.internal.pageSize.height - 12
        );
        doc.text(
          new Date().toLocaleString('fr-FR'),
          doc.internal.pageSize.width - 45,
          doc.internal.pageSize.height - 12
        );
      }

      // ================= SAUVEGARDE =================
      const dateStr = selectedFiche.date
        ? new Date(selectedFiche.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      doc.save(`GMAO_Fiche_2250KVA_${dateStr}.pdf`);

      // ================= export pdf fiche balisage =================
    } else if (selectedFiche?.groupes) {
      const doc = new jsPDF();

      // ================= EN-TÊTE PROFESSIONNEL =================
      doc.setFillColor(241, 196, 15);
      doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text("FICHE D'INSPECTION JOURNALIÈRE - BALISAGE", 14, 18);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      // ================= INFORMATIONS GÉNÉRALES =================
      let startY = 32;

      doc.setFillColor(255, 250, 225);
      doc.rect(14, startY, 180, 35, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(241, 196, 15);
      doc.text('📋 INFORMATIONS GÉNÉRALES', 14, startY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      doc.text(
        `📅 Date d'inspection : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}`,
        14,
        startY + 14
      );

      doc.text(
        `🔖 N° Fiche : ${selectedFiche.numeroFiche || selectedFiche._id?.slice(-8) || 'BAL-' + Math.random().toString(36).substr(2, 8)}`,
        110,
        startY + 14
      );

      doc.text(
        `📍 Site / Chantier : ${selectedFiche.site || 'Non spécifié'}`,
        14,
        startY + 21
      );

      doc.text(
        `🏗️ Type de balisage : ${selectedFiche.typeBalisage || 'Balisage de sécurité'}`,
        110,
        startY + 21
      );

      doc.text(
        `👤 Inspecteur : ${selectedFiche.inspecteur || 'Non spécifié'}`,
        14,
        startY + 28
      );

      startY = startY + 45;

      // ================= TABLEAU D'INSPECTION BALISAGE =================
      doc.setFillColor(241, 196, 15);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('🚧 POINTS DE CONTRÔLE - BALISAGE', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 12;

      // Construction dynamique des colonnes en fonction des périodes disponibles
      const hasMatin = selectedFiche.groupes.some((g) =>
        g.lignes.some((l) => l.matin)
      );
      const hasNuit = selectedFiche.groupes.some((g) =>
        g.lignes.some((l) => l.nuit)
      );

      const tableColumn = ['Famille', 'Désignation'];

      if (hasMatin) {
        tableColumn.push('Matin NF', 'Matin Fonc.', 'Matin Int.', 'Matin Obs');
      }

      if (hasNuit) {
        tableColumn.push('Nuit NF', 'Nuit Fonc.', 'Nuit Int.', 'Nuit Obs');
      }

      tableColumn.push('Statut');

      let tableRows = [];

      selectedFiche.groupes.forEach((g, groupeIdx) => {
        const lignes = g.lignes || [];

        lignes.forEach((l, ligneIdx) => {
          const row = [];

          // Famille (première ligne du groupe seulement)
          if (ligneIdx === 0) {
            row.push(g.titre || 'Groupe ' + (groupeIdx + 1));
          } else {
            row.push('');
          }

          // Désignation
          row.push(l.designation || '');

          // Période Matin
          if (hasMatin) {
            const matin = l.matin || {};
            row.push(matin.nf || '');
            row.push(matin.fonctionnement || '');
            row.push(matin.interventions || '');
            row.push(matin.observations || '');
          }

          // Période Nuit
          if (hasNuit) {
            const nuit = l.nuit || {};
            row.push(nuit.nf || '');
            row.push(nuit.fonctionnement || '');
            row.push(nuit.interventions || '');
            row.push(nuit.observations || '');
          }

          // Calcul du statut global
          let statut = '✅ Conforme';
          let hasAnomalie = false;

          if (hasMatin && l.matin) {
            if (
              l.matin.nf === 'HS' ||
              l.matin.fonctionnement === 'HS' ||
              l.matin.interventions === 'HS'
            ) {
              hasAnomalie = true;
            }
          }

          if (hasNuit && l.nuit) {
            if (
              l.nuit.nf === 'HS' ||
              l.nuit.fonctionnement === 'HS' ||
              l.nuit.interventions === 'HS'
            ) {
              hasAnomalie = true;
            }
          }

          if (hasAnomalie) {
            statut = '⚠️ Anomalie';
          }

          row.push(statut);
          tableRows.push(row);
        });
      });

      // Définition des largeurs de colonnes dynamiques
      const columnStyles = {
        0: { cellWidth: 35, fontStyle: 'bold' },
        1: { cellWidth: 40 },
      };

      let colIndex = 2;
      if (hasMatin) {
        columnStyles[colIndex] = { cellWidth: 15, halign: 'center' };
        columnStyles[colIndex + 1] = { cellWidth: 18, halign: 'center' };
        columnStyles[colIndex + 2] = { cellWidth: 18, halign: 'center' };
        columnStyles[colIndex + 3] = { cellWidth: 25 };
        colIndex += 4;
      }

      if (hasNuit) {
        columnStyles[colIndex] = { cellWidth: 15, halign: 'center' };
        columnStyles[colIndex + 1] = { cellWidth: 18, halign: 'center' };
        columnStyles[colIndex + 2] = { cellWidth: 18, halign: 'center' };
        columnStyles[colIndex + 3] = { cellWidth: 25 };
        colIndex += 4;
      }

      columnStyles[colIndex] = { cellWidth: 20, halign: 'center' };

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'striped',
        headStyles: {
          fillColor: [241, 196, 15],
          textColor: 0,
          fontSize: 7,
          fontStyle: 'bold',
          halign: 'center',
        },
        styles: {
          fontSize: 7,
          cellPadding: 2,
          valign: 'middle',
        },
        columnStyles: columnStyles,
        alternateRowStyles: { fillColor: [255, 250, 225] },
        rowStyles: (row, data) => {
          const rowData = tableRows[data.row.index];
          if (rowData && rowData[rowData.length - 1] === '⚠️ Anomalie') {
            return { fillColor: [255, 235, 235] };
          }
          return {};
        },
        didDrawCell: (data) => {
          // Mise en évidence des cellules "HS"
          if (
            data.cell.raw &&
            (data.cell.raw === 'HS' || data.cell.raw === 'hs')
          ) {
            doc.setFillColor(231, 76, 60);
            doc.rect(
              data.cell.x,
              data.cell.y,
              data.cell.width,
              data.cell.height,
              'F'
            );
            doc.setTextColor(255, 255, 255);
            doc.text(
              data.cell.raw,
              data.cell.x + data.cell.width / 2,
              data.cell.y + data.cell.height / 2,
              { align: 'center', baseline: 'middle' }
            );
            doc.setTextColor(0, 0, 0);
          }
        },
      });

      startY = doc.lastAutoTable.finalY + 15;

      // ================= SYNTHÈSE DES ANOMALIES =================
      const anomaliesList = [];

      selectedFiche.groupes.forEach((g) => {
        g.lignes.forEach((l) => {
          const designation = l.designation || 'Point de contrôle';
          const groupe = g.titre || 'Groupe';

          if (hasMatin && l.matin) {
            if (l.matin.nf === 'HS')
              anomaliesList.push({
                groupe,
                designation,
                periode: 'Matin',
                type: 'NF',
                observation: l.matin.observations,
              });
            if (l.matin.fonctionnement === 'HS')
              anomaliesList.push({
                groupe,
                designation,
                periode: 'Matin',
                type: 'Fonctionnement',
                observation: l.matin.observations,
              });
            if (l.matin.interventions === 'HS')
              anomaliesList.push({
                groupe,
                designation,
                periode: 'Matin',
                type: 'Interventions',
                observation: l.matin.observations,
              });
          }

          if (hasNuit && l.nuit) {
            if (l.nuit.nf === 'HS')
              anomaliesList.push({
                groupe,
                designation,
                periode: 'Nuit',
                type: 'NF',
                observation: l.nuit.observations,
              });
            if (l.nuit.fonctionnement === 'HS')
              anomaliesList.push({
                groupe,
                designation,
                periode: 'Nuit',
                type: 'Fonctionnement',
                observation: l.nuit.observations,
              });
            if (l.nuit.interventions === 'HS')
              anomaliesList.push({
                groupe,
                designation,
                periode: 'Nuit',
                type: 'Interventions',
                observation: l.nuit.observations,
              });
          }
        });
      });

      if (anomaliesList.length > 0) {
        if (startY > doc.internal.pageSize.height - 80) {
          doc.addPage();
          startY = 20;
        }

        doc.setFillColor(231, 76, 60);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('⚠️ SYNTHÈSE DES ANOMALIES DÉTECTÉES', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        doc.setFillColor(255, 245, 245);
        doc.rect(
          14,
          startY,
          180,
          Math.min(anomaliesList.length * 12 + 10, 150),
          'F'
        );

        anomaliesList.forEach((anomalie, idx) => {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(231, 76, 60);
          doc.text(
            `⚠️ ${anomalie.groupe} - ${anomalie.designation}`,
            20,
            startY + 6 + idx * 12
          );

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(7);
          doc.text(
            `Période: ${anomalie.periode} | Point: ${anomalie.type}`,
            30,
            startY + 11 + idx * 12
          );
          if (anomalie.observation) {
            doc.text(
              `Observation: ${anomalie.observation}`,
              30,
              startY + 16 + idx * 12
            );
          }
        });

        startY += anomaliesList.length * 12 + 25;
      }

      // ================= TECHNICIEN ET SIGNATURES =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(46, 204, 113);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('👨‍🔧 TECHNICIEN ET VALIDATION', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 20;

      doc.setFillColor(245, 245, 245);
      doc.rect(14, startY, 180, 50, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text("Technicien d'inspection :", 20, startY + 8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(selectedFiche.technicien || 'Non spécifié', 80, startY + 8);

      doc.setFont('helvetica', 'bold');
      doc.text('Matricule :', 20, startY + 18);
      doc.setFont('helvetica', 'normal');
      doc.text(selectedFiche.matricule || 'Non spécifié', 80, startY + 18);

      doc.setFont('helvetica', 'bold');
      doc.text('Équipe :', 20, startY + 28);
      doc.setFont('helvetica', 'normal');
      doc.text(selectedFiche.equipe || 'Non spécifiée', 80, startY + 28);

      startY += 60;

      // ================= SIGNATURES =================
      if (startY > doc.internal.pageSize.height - 80) {
        doc.addPage();
        startY = 20;
      }

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);

      // Signature technicien
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('✍️ Signature du technicien :', 14, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(14, startY + 6, 90, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Date et signature', 45, startY + 10);

      // Signature chef d'équipe
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text("✍️ Validation chef d'équipe :", 110, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(110, startY + 6, 190, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Nom et signature', 145, startY + 10);

      startY += 30;

      // ================= OBSERVATIONS GÉNÉRALES =================
      if (selectedFiche.observationsGenerales) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('📝 Observations générales :', 14, startY);
        doc.setFont('helvetica', 'normal');
        doc.text(selectedFiche.observationsGenerales, 14, startY + 6, {
          maxWidth: 180,
        });
        startY += 20;
      }

      // ================= ACTIONS CORRECTIVES =================
      if (
        selectedFiche.actionsCorrectives &&
        selectedFiche.actionsCorrectives.length > 0
      ) {
        if (startY > doc.internal.pageSize.height - 60) {
          doc.addPage();
          startY = 20;
        }

        doc.setFillColor(52, 152, 219);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('🔧 ACTIONS CORRECTIVES', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        const actionsColumns = [
          'N°',
          'Action',
          'Responsable',
          'Délai',
          'Statut',
        ];
        const actionsRows = selectedFiche.actionsCorrectives.map(
          (action, idx) => [
            (idx + 1).toString(),
            action.description || '',
            action.responsable || '',
            action.delai || '',
            action.realisee ? '✅ Réalisée' : '⏳ En cours',
          ]
        );

        autoTable(doc, {
          head: [actionsColumns],
          body: actionsRows,
          startY: startY,
          theme: 'striped',
          headStyles: {
            fillColor: [52, 152, 219],
            textColor: 255,
            fontSize: 8,
          },
          styles: { fontSize: 8, cellPadding: 3 },
          columnStyles: {
            0: { cellWidth: 12, halign: 'center' },
            1: { cellWidth: 85 },
            2: { cellWidth: 35 },
            3: { cellWidth: 25 },
            4: { cellWidth: 23, halign: 'center' },
          },
        });
      }

      // ================= PIED DE PAGE =================
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
          14,
          doc.internal.pageSize.height - 20,
          doc.internal.pageSize.width - 14,
          doc.internal.pageSize.height - 20
        );

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Document GMAO - Fiche Balisage - Page ${i} / ${pageCount}`,
          14,
          doc.internal.pageSize.height - 12
        );
        doc.text(
          new Date().toLocaleString('fr-FR'),
          doc.internal.pageSize.width - 45,
          doc.internal.pageSize.height - 12
        );
      }

      // ================= SAUVEGARDE =================
      const dateStr = selectedFiche.date
        ? new Date(selectedFiche.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      doc.save(`GMAO_Fiche_Balisage_${dateStr}.pdf`);
      // ===================== EXPORT PDF olapion =====================
    } else if (selectedFiche?.operations) {
      const doc = new jsPDF();

      // ================= EN-TÊTE PROFESSIONNEL =================
      doc.setFillColor(52, 152, 219);
      doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHE OLAPION - OPÉRATIONS DE CONTRÔLE', 14, 18);

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      // ================= INFORMATIONS GÉNÉRALES =================
      let startY = 32;

      doc.setFillColor(235, 245, 255);
      doc.rect(14, startY, 180, 45, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(52, 152, 219);
      doc.text('📋 INFORMATIONS GÉNÉRALES', 14, startY + 6);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);

      doc.text(
        `📅 Date du contrôle : ${selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString('fr-FR') : 'Non spécifiée'}`,
        14,
        startY + 14
      );

      doc.text(
        `🔖 N° Fiche : ${selectedFiche.numeroFiche || selectedFiche._id?.slice(-8) || 'OLA-' + Math.random().toString(36).substr(2, 8)}`,
        110,
        startY + 14
      );

      doc.text(
        `📍 Lieu d'installation : ${selectedFiche.lieuInstallation || 'Non spécifié'}`,
        14,
        startY + 21
      );

      doc.text(
        `🏭 Équipement : ${selectedFiche.equipement || 'Olapion'}`,
        110,
        startY + 21
      );

      doc.text(
        `🏷️ Désignation : ${selectedFiche.designation || 'Non spécifiée'}`,
        14,
        startY + 28
      );

      doc.text(
        `📊 Type d'opération : ${selectedFiche.typeOperation || 'Contrôle périodique'}`,
        110,
        startY + 28
      );

      doc.text(
        `👤 Responsable opération : ${selectedFiche.responsable || 'Non spécifié'}`,
        14,
        startY + 35
      );

      doc.text(
        `🔧 Référence : ${selectedFiche.reference || 'Non spécifiée'}`,
        110,
        startY + 35
      );

      startY = startY + 55;

      // ================= TABLEAU DES OPÉRATIONS =================
      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(
        '🔧 OPÉRATIONS DE CONTRÔLE - ÉTAT DE FONCTIONNEMENT',
        14,
        startY + 6
      );

      doc.setTextColor(0, 0, 0);
      startY += 12;

      const getOperationStatus = (period) => {
        if (!period)
          return {
            text: '⚪ Non renseigné',
            color: [149, 165, 166],
            icon: '⚪',
          };
        if (period.normal)
          return { text: '✔ Normal', color: [46, 204, 113], icon: '✅' };
        if (period.anomalie)
          return { text: '⚠ Anomalie', color: [231, 76, 60], icon: '⚠️' };
        if (period.enCours)
          return { text: '🔄 En cours', color: [241, 196, 15], icon: '🔄' };
        if (period.nonRealise)
          return { text: '❌ Non réalisé', color: [149, 165, 166], icon: '❌' };
        return { text: '⚪ Non renseigné', color: [149, 165, 166], icon: '⚪' };
      };

      const getPriorityIcon = (priority) => {
        switch (priority) {
          case 'urgent':
            return '🔴 Urgent';
          case 'eleve':
            return '🟠 Élevé';
          case 'moyen':
            return '🟡 Moyen';
          case 'faible':
            return '🟢 Faible';
          default:
            return '⚪ Normal';
        }
      };

      const tableColumn = [
        'N°',
        'Spécification',
        'Désignation',
        'Priorité',
        'Matin',
        'A-Midi',
        'Nuit',
        'Statut',
      ];

      const tableRows = selectedFiche.operations.map((c, idx) => {
        const matin = getOperationStatus(c.matin);
        const apresMidi = getOperationStatus(c.apresMidi);
        const nuit = getOperationStatus(c.nuit);

        const hasAnomalie =
          (c.matin && c.matin.anomalie) ||
          (c.apresMidi && c.apresMidi.anomalie) ||
          (c.nuit && c.nuit.anomalie);
        const hasNormal =
          (c.matin && c.matin.normal) ||
          (c.apresMidi && c.apresMidi.normal) ||
          (c.nuit && c.nuit.normal);
        const hasEnCours =
          (c.matin && c.matin.enCours) ||
          (c.apresMidi && c.apresMidi.enCours) ||
          (c.nuit && c.nuit.enCours);

        let statut = '❌ Non réalisé';
        if (hasAnomalie) statut = '⚠️ Anomalie détectée';
        else if (hasEnCours) statut = '🔄 En cours';
        else if (hasNormal) statut = '✅ Conforme';

        return [
          (idx + 1).toString(),
          c.specification || '',
          c.designation || '',
          getPriorityIcon(c.priorite),
          matin.text,
          apresMidi.text,
          nuit.text,
          statut,
        ];
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: startY,
        theme: 'striped',
        headStyles: {
          fillColor: [52, 152, 219],
          textColor: 255,
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'center',
        },
        styles: {
          fontSize: 8,
          cellPadding: 3,
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 18, halign: 'center' },
          4: { cellWidth: 18, halign: 'center' },
          5: { cellWidth: 18, halign: 'center' },
          6: { cellWidth: 18, halign: 'center' },
          7: { cellWidth: 22, halign: 'center' },
        },
        alternateRowStyles: { fillColor: [245, 250, 255] },
        rowStyles: (row, data) => {
          const rowData = tableRows[data.row.index];
          if (rowData && rowData[7] === '⚠️ Anomalie détectée') {
            return { fillColor: [255, 240, 240] };
          }
          if (rowData && rowData[7] === '🔄 En cours') {
            return { fillColor: [255, 250, 225] };
          }
          return {};
        },
      });

      startY = doc.lastAutoTable.finalY + 15;

      // ================= SYNTHÈSE DES ANOMALIES =================
      const anomalies = selectedFiche.operations.filter(
        (c) =>
          (c.matin && c.matin.anomalie) ||
          (c.apresMidi && c.apresMidi.anomalie) ||
          (c.nuit && c.nuit.anomalie)
      );

      if (anomalies.length > 0) {
        if (startY > doc.internal.pageSize.height - 80) {
          doc.addPage();
          startY = 20;
        }

        doc.setFillColor(231, 76, 60);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('⚠️ SYNTHÈSE DES ANOMALIES DÉTECTÉES', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        doc.setFillColor(255, 245, 245);
        const anomalyHeight = Math.min(anomalies.length * 14 + 10, 120);
        doc.rect(14, startY, 180, anomalyHeight, 'F');

        anomalies.forEach((anomalie, idx) => {
          const periods = [];
          let description = '';

          if (anomalie.matin && anomalie.matin.anomalie) {
            periods.push('Matin');
            // CORRECTION : Vérifier le type de descriptionAnomalie
            if (
              anomalie.matin.descriptionAnomalie &&
              typeof anomalie.matin.descriptionAnomalie === 'string'
            ) {
              description = anomalie.matin.descriptionAnomalie;
            } else if (
              anomalie.matin.anomalie &&
              typeof anomalie.matin.anomalie === 'string'
            ) {
              description = anomalie.matin.anomalie;
            }
          }
          if (anomalie.apresMidi && anomalie.apresMidi.anomalie) {
            periods.push('Après-midi');
            if (
              anomalie.apresMidi.descriptionAnomalie &&
              typeof anomalie.apresMidi.descriptionAnomalie === 'string'
            ) {
              description = anomalie.apresMidi.descriptionAnomalie;
            } else if (
              anomalie.apresMidi.anomalie &&
              typeof anomalie.apresMidi.anomalie === 'string'
            ) {
              description = anomalie.apresMidi.anomalie;
            }
          }
          if (anomalie.nuit && anomalie.nuit.anomalie) {
            periods.push('Nuit');
            if (
              anomalie.nuit.descriptionAnomalie &&
              typeof anomalie.nuit.descriptionAnomalie === 'string'
            ) {
              description = anomalie.nuit.descriptionAnomalie;
            } else if (
              anomalie.nuit.anomalie &&
              typeof anomalie.nuit.anomalie === 'string'
            ) {
              description = anomalie.nuit.anomalie;
            }
          }

          doc.setFont('helvetica', 'bold');
          doc.setTextColor(231, 76, 60);
          doc.setFontSize(8);
          doc.text(
            `⚠️ ${anomalie.specification || 'Opération'}`,
            20,
            startY + 6 + idx * 14
          );

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(7);
          doc.text(
            `Période(s): ${periods.join(', ')}`,
            30,
            startY + 11 + idx * 14
          );
          if (description && description.length > 0) {
            const truncatedDesc =
              description.length > 80
                ? description.substring(0, 80) + '...'
                : description;
            doc.text(
              `Description: ${truncatedDesc}`,
              30,
              startY + 16 + idx * 14
            );
          }
        });

        startY += anomalies.length * 14 + 25;
      }

      // ================= OPÉRATIONS EN COURS =================
      const enCours = selectedFiche.operations.filter(
        (c) =>
          (c.matin && c.matin.enCours) ||
          (c.apresMidi && c.apresMidi.enCours) ||
          (c.nuit && c.nuit.enCours)
      );

      if (enCours.length > 0 && startY < doc.internal.pageSize.height - 80) {
        doc.setFillColor(241, 196, 15);
        doc.rect(14, startY, 180, 8, 'F');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('🔄 OPÉRATIONS EN COURS', 14, startY + 6);

        doc.setTextColor(0, 0, 0);
        startY += 15;

        enCours.forEach((operation, idx) => {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.text(
            `🔄 ${operation.specification || 'Opération'}`,
            20,
            startY + idx * 8
          );
          doc.setFont('helvetica', 'normal');
          if (operation.designation) {
            doc.text(`- ${operation.designation}`, 35, startY + idx * 8);
          }
        });

        startY += enCours.length * 8 + 10;
      }

      // ================= TEMPS D'OPÉRATION =================
      if (startY > doc.internal.pageSize.height - 80) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("⏱️ TEMPS D'OPÉRATION", 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      doc.setFillColor(240, 248, 255);
      doc.rect(14, startY, 180, 55, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      let tempStartY = startY + 8;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const t = selectedFiche.tempsInspection?.[p] || {};
        const periodeLabels = {
          matin: '🌅 Matin (8h-14h)',
          apresMidi: '☀️ Après-midi (14h-20h)',
          nuit: '🌙 Nuit (20h-8h)',
        };

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 20, tempStartY + idx * 12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Début: ${t.debut || '---'}`, 80, tempStartY + idx * 12);
        doc.text(`Fin: ${t.fin || '---'}`, 115, tempStartY + idx * 12);
        doc.text(
          `Durée: ${t.tempsAlloue || '0'} min`,
          150,
          tempStartY + idx * 12
        );
      });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(52, 152, 219);
      doc.text(
        `📊 Temps total d'opération : ${selectedFiche.tempsInspection?.total || '0'} minutes`,
        20,
        tempStartY + 42
      );
      doc.setTextColor(0, 0, 0);

      startY += 70;

      // ================= OBSERVATIONS PAR PÉRIODE =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(241, 196, 15);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('📝 OBSERVATIONS ET COMMENTAIRES', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const periodeLabels = {
          matin: '🌅 Période Matin',
          apresMidi: '☀️ Période Après-midi',
          nuit: '🌙 Période Nuit',
        };

        const obs = selectedFiche.observations?.[p] || '';

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 14, startY + idx * 12);
        doc.setFont('helvetica', 'normal');
        const obsText = typeof obs === 'string' ? obs : String(obs || '');
        doc.text(obsText || 'Aucune observation', 65, startY + idx * 12, {
          maxWidth: 125,
        });
      });

      startY += 45;

      // ================= TECHNICIENS =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(46, 204, 113);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text("👨‍🔧 TECHNICIENS D'INTERVENTION", 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 15;

      ['matin', 'apresMidi', 'nuit'].forEach((p, idx) => {
        const periodeLabels = {
          matin: '🌅 Matin',
          apresMidi: '☀️ Après-midi',
          nuit: '🌙 Nuit',
        };

        const techs = selectedFiche.techniciens?.[p] || [];
        const techList = Array.isArray(techs) ? techs : [];

        doc.setFont('helvetica', 'bold');
        doc.text(`${periodeLabels[p]} :`, 14, startY + idx * 10);
        doc.setFont('helvetica', 'normal');

        if (techList.length > 0) {
          doc.text(techList.join(', '), 60, startY + idx * 10, {
            maxWidth: 130,
          });
        } else {
          doc.text('Aucun technicien affecté', 60, startY + idx * 10);
        }
      });

      startY += 45;

      // ================= SIGNATURES =================
      if (startY > doc.internal.pageSize.height - 100) {
        doc.addPage();
        startY = 20;
      }

      doc.setFillColor(52, 152, 219);
      doc.rect(14, startY, 180, 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('✍️ VALIDATIONS', 14, startY + 6);

      doc.setTextColor(0, 0, 0);
      startY += 20;

      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);

      // Signature technicien
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('Signature du technicien :', 14, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(14, startY + 6, 90, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Nom et signature', 45, startY + 10);

      // Signature responsable
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Validation responsable technique :', 110, startY);
      doc.setDrawColor(0, 0, 0);
      doc.line(110, startY + 6, 190, startY + 6);
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Nom et signature', 145, startY + 10);

      startY += 30;

      // ================= COMMENTAIRES TECHNIQUES =================
      if (selectedFiche.commentairesTechniques) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('💡 Commentaires techniques :', 14, startY);
        doc.setFont('helvetica', 'normal');
        const commentText =
          typeof selectedFiche.commentairesTechniques === 'string'
            ? selectedFiche.commentairesTechniques
            : String(selectedFiche.commentairesTechniques || '');
        doc.text(commentText, 14, startY + 6, { maxWidth: 180 });
        startY += 20;
      }

      // ================= RESSOURCES UTILISÉES =================
      if (selectedFiche.ressources && selectedFiche.ressources.length > 0) {
        if (startY > doc.internal.pageSize.height - 60) {
          doc.addPage();
          startY = 20;
        }

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('🛠️ Ressources utilisées :', 14, startY);
        doc.setFont('helvetica', 'normal');
        const ressourcesText = Array.isArray(selectedFiche.ressources)
          ? selectedFiche.ressources.join(', ')
          : String(selectedFiche.ressources || '');
        doc.text(ressourcesText, 14, startY + 6, { maxWidth: 180 });
      }

      // ================= PIED DE PAGE =================
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
          14,
          doc.internal.pageSize.height - 20,
          doc.internal.pageSize.width - 14,
          doc.internal.pageSize.height - 20
        );

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Document GMAO - Fiche Olapion - Page ${i} / ${pageCount}`,
          14,
          doc.internal.pageSize.height - 12
        );
        doc.text(
          new Date().toLocaleString('fr-FR'),
          doc.internal.pageSize.width - 45,
          doc.internal.pageSize.height - 12
        );
      }

      // ================= SAUVEGARDE =================
      const dateStr = selectedFiche.date
        ? new Date(selectedFiche.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      doc.save(`GMAO_Fiche_Olapion_${dateStr}.pdf`);

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
            ) : // fcieh corrective
            selectedFiche?.ficheCorrective?.length > 0 ? (
              <div className="fiche-detail-container">
                {/* ================= EN-TÊTE ================= */}
                <div
                  className="fiche-header"
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '20px',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: '20px' }}>
                    🔧 FICHE CORRECTIVE - GMAO
                  </h2>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      opacity: 0.9,
                      fontSize: '12px',
                    }}
                  >
                    Intervention corrective et dépannage
                  </p>
                </div>

                {selectedFiche.ficheCorrective.map((fiche, fi) => (
                  <div key={fi} style={{ marginBottom: '30px' }}>
                    {/* ================= INFORMATIONS GÉNÉRALES ================= */}
                    <div
                      className="fiche-info-section"
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid #e9ecef',
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 10px 0',
                          color: '#e74c3c',
                          fontSize: '16px',
                        }}
                      >
                        📋 INFORMATIONS GÉNÉRALES
                      </h3>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '10px',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            📅 Date :
                          </span>{' '}
                          <span>
                            {fiche.date
                              ? new Date(fiche.date).toLocaleDateString('fr-FR')
                              : 'Non renseignée'}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            🔖 N° Fiche :
                          </span>{' '}
                          <span>
                            {selectedFiche._id?.slice(-8) || 'Non spécifié'}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            🛠️ Désignation :
                          </span>{' '}
                          <span>{fiche.designation || 'Non renseignée'}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            📍 Lieu :
                          </span>{' '}
                          <span>
                            {fiche.lieuInstallation || 'Non renseigné'}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            📅 Date détection :
                          </span>{' '}
                          <span>
                            {fiche.dateDetection
                              ? new Date(
                                  fiche.dateDetection
                                ).toLocaleDateString('fr-FR')
                              : 'Non renseignée'}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            📊 Priorité :
                          </span>{' '}
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              backgroundColor:
                                fiche.priorite === 'urgent'
                                  ? '#f8d7da'
                                  : '#fff3cd',
                              color:
                                fiche.priorite === 'urgent'
                                  ? '#721c24'
                                  : '#856404',
                            }}
                          >
                            {fiche.priorite === 'urgent'
                              ? '🔴 Urgent'
                              : fiche.priorite === 'eleve'
                                ? '🟠 Élevé'
                                : fiche.priorite === 'moyen'
                                  ? '🟡 Moyen'
                                  : '🟢 Normal'}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            📢 Réclamation par :
                          </span>{' '}
                          <span>{fiche.reclamationPar || 'Non renseigné'}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold', color: '#555' }}>
                            👤 Personne contactée :
                          </span>{' '}
                          <span>
                            {fiche.personneContactee || 'Non renseignée'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ================= TEMPS D'INTERVENTION ================= */}
                    <div
                      style={{
                        backgroundColor: '#e8f4fd',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #3498db',
                      }}
                    >
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#2980b9',
                          fontSize: '14px',
                        }}
                      >
                        ⏱️ TEMPS D'INTERVENTION
                      </h4>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '10px',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 'bold' }}>🕐 Début :</span>{' '}
                          <span>{fiche.debutIntervention || '-'}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>
                            🕒 Remise en service :
                          </span>{' '}
                          <span>{fiche.remiseEnService || '-'}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>
                            ⌛ Temps alloué :
                          </span>{' '}
                          <span>{fiche.tempsAlloue || '-'}</span>
                        </div>
                      </div>
                    </div>

                    {/* ================= DIAGNOSTIC ================= */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#e74c3c',
                          fontSize: '14px',
                          borderBottom: '2px solid #e74c3c',
                          paddingBottom: '5px',
                          display: 'inline-block',
                        }}
                      >
                        🔍 DIAGNOSTIC
                      </h4>

                      {fiche.diagnostic?.length > 0 ? (
                        <table
                          style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            marginTop: '10px',
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderBottom: '2px solid #dee2e6',
                              }}
                            >
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'left',
                                  fontWeight: 'bold',
                                  width: '40%',
                                }}
                              >
                                Panne / Cause
                              </th>
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'left',
                                  fontWeight: 'bold',
                                  width: '40%',
                                }}
                              >
                                Effet constaté
                              </th>
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  width: '20%',
                                }}
                              >
                                Gravité
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {fiche.diagnostic.map((d, i) => (
                              <tr
                                key={i}
                                style={{ borderBottom: '1px solid #e9ecef' }}
                              >
                                <td
                                  style={{
                                    padding: '10px',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  {d.panneCause || '-'}
                                </td>
                                <td
                                  style={{
                                    padding: '10px',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  {d.effet || '-'}
                                </td>
                                <td
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      fontSize: '12px',
                                      backgroundColor:
                                        d.gravite === 'critique'
                                          ? '#f8d7da'
                                          : d.gravite === 'majeure'
                                            ? '#fff3cd'
                                            : '#d4edda',
                                      color:
                                        d.gravite === 'critique'
                                          ? '#721c24'
                                          : d.gravite === 'majeure'
                                            ? '#856404'
                                            : '#155724',
                                    }}
                                  >
                                    {d.gravite || '-'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div
                          style={{
                            padding: '20px',
                            textAlign: 'center',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            color: '#6c757d',
                            marginTop: '10px',
                          }}
                        >
                          Aucun diagnostic disponible
                        </div>
                      )}
                    </div>

                    {/* ================= DÉPANNAGE / RÉPARATION ================= */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#27ae60',
                          fontSize: '14px',
                          borderBottom: '2px solid #27ae60',
                          paddingBottom: '5px',
                          display: 'inline-block',
                        }}
                      >
                        🛠️ DÉPANNAGE & RÉPARATION
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
                            <tr
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderBottom: '2px solid #dee2e6',
                              }}
                            >
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'left',
                                  fontWeight: 'bold',
                                }}
                              >
                                Pièces de rechange
                              </th>
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                  width: '100px',
                                }}
                              >
                                Quantité
                              </th>
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'right',
                                  fontWeight: 'bold',
                                  width: '120px',
                                }}
                              >
                                Coût unitaire
                              </th>
                              <th
                                style={{
                                  padding: '10px',
                                  textAlign: 'right',
                                  fontWeight: 'bold',
                                  width: '120px',
                                }}
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {fiche.depannageReparation.map((d, i) => (
                              <tr
                                key={i}
                                style={{ borderBottom: '1px solid #e9ecef' }}
                              >
                                <td
                                  style={{
                                    padding: '10px',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  {d.piecesDeRechange || '-'}
                                </td>
                                <td
                                  style={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  {d.quantite || '1'}
                                </td>
                                <td
                                  style={{
                                    padding: '10px',
                                    textAlign: 'right',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  {d.coutUnitaire ? `${d.coutUnitaire} €` : '-'}
                                </td>
                                <td
                                  style={{
                                    padding: '10px',
                                    textAlign: 'right',
                                    backgroundColor:
                                      i % 2 === 0 ? '#fff' : '#fafafa',
                                  }}
                                >
                                  {d.total ? `${d.total} €` : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div
                          style={{
                            padding: '20px',
                            textAlign: 'center',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            color: '#6c757d',
                            marginTop: '10px',
                          }}
                        >
                          Aucun dépannage / réparation enregistré
                        </div>
                      )}
                    </div>

                    {/* ================= OBSERVATIONS ================= */}
                    {fiche.observationsGenerales && (
                      <div
                        style={{
                          backgroundColor: '#fff3cd',
                          borderLeft: '4px solid #ffc107',
                          padding: '15px',
                          borderRadius: '8px',
                          marginBottom: '20px',
                        }}
                      >
                        <h5
                          style={{
                            margin: '0 0 8px 0',
                            color: '#856404',
                            fontSize: '14px',
                          }}
                        >
                          📝 Observations générales
                        </h5>
                        <p style={{ margin: 0, color: '#856404' }}>
                          {fiche.observationsGenerales}
                        </p>
                      </div>
                    )}

                    {/* ================= TECHNICIEN ================= */}
                    <div
                      style={{
                        backgroundColor: '#e8f5e9',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        borderLeft: '4px solid #27ae60',
                      }}
                    >
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#27ae60',
                          fontSize: '14px',
                        }}
                      >
                        👨‍🔧 TECHNICIEN INTERVENANT
                      </h4>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Nom :</span>{' '}
                          <span>
                            {fiche.techniciensOperateurs?.[0]?.nom ||
                              'Non renseigné'}
                          </span>
                        </div>
                        {fiche.techniciensOperateurs?.[0]?.matricule && (
                          <div>
                            <span style={{ fontWeight: 'bold' }}>
                              Matricule :
                            </span>{' '}
                            <span>
                              {fiche.techniciensOperateurs[0].matricule}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ================= SIGNATURE ================= */}
                    {fiche.signature && (
                      <div
                        style={{
                          backgroundColor: '#f8f9fa',
                          padding: '15px',
                          borderRadius: '8px',
                          marginBottom: '20px',
                          textAlign: 'center',
                        }}
                      >
                        <h4
                          style={{
                            margin: '0 0 10px 0',
                            color: '#555',
                            fontSize: '14px',
                          }}
                        >
                          ✍️ SIGNATURE DU TECHNICIEN
                        </h4>
                        <img
                          src={fiche.signature}
                          alt="Signature"
                          style={{
                            border: '1px solid #dee2e6',
                            borderRadius: '8px',
                            maxWidth: '300px',
                            maxHeight: '100px',
                            padding: '10px',
                            backgroundColor: '#fff',
                          }}
                        />
                      </div>
                    )}

                    {/* ================= ACTIONS ================= */}
                    <div
                      className="fiche-actions"
                      style={{
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end',
                        paddingTop: '20px',
                        borderTop: '1px solid #e9ecef',
                        marginTop: '10px',
                      }}
                    >
                      <button
                        onClick={() =>
                          validerFiche(selectedFiche._id, selectedFiche.notifId)
                        }
                        disabled={selectedFiche.statut === 'validé'}
                        style={{
                          padding: '10px 20px',
                          backgroundColor:
                            selectedFiche.statut === 'validé'
                              ? '#6c757d'
                              : '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor:
                            selectedFiche.statut === 'validé'
                              ? 'not-allowed'
                              : 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        ✅{' '}
                        {selectedFiche.statut === 'validé'
                          ? 'Déjà validé'
                          : 'Valider la fiche'}
                      </button>
                      <button
                        onClick={() => exportPDF(selectedFiche)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        📄 Exporter PDF
                      </button>
                      <button
                        onClick={() => setSelectedFiche(null)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        ❌ Fermer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedFiche?.controles ? (
              <div className="fiche-detail-container">
                {/* ================= EN-TÊTE ================= */}
                <div
                  className="fiche-header"
                  style={{
                    backgroundColor: '#9b59b6',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '20px',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: '20px' }}>
                    ⚡ FICHE NO-BREAK - GMAO
                  </h2>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      opacity: 0.9,
                      fontSize: '12px',
                    }}
                  >
                    Contrôle onduleur et mesures électriques
                  </p>
                </div>

                {/* ================= INFORMATIONS GÉNÉRALES ================= */}
                <div
                  className="fiche-info-section"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 10px 0',
                      color: '#9b59b6',
                      fontSize: '16px',
                    }}
                  >
                    📋 INFORMATIONS GÉNÉRALES
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📅 Date :
                      </span>{' '}
                      <span>
                        {selectedFiche.date
                          ? new Date(selectedFiche.date).toLocaleDateString(
                              'fr-FR'
                            )
                          : 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🔖 N° Fiche :
                      </span>{' '}
                      <span>
                        {selectedFiche._id?.slice(-8) || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🏷️ Désignation :
                      </span>{' '}
                      <span>
                        {selectedFiche.designation || 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📍 Lieu :
                      </span>{' '}
                      <span>
                        {selectedFiche.lieuInstallation || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🔋 Type d'onduleur :
                      </span>{' '}
                      <span>
                        {selectedFiche.typeOnduleur || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📊 Statut :
                      </span>{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor:
                            selectedFiche.statut === 'validé'
                              ? '#d4edda'
                              : '#fff3cd',
                          color:
                            selectedFiche.statut === 'validé'
                              ? '#155724'
                              : '#856404',
                        }}
                      >
                        {selectedFiche.statut === 'validé'
                          ? '✅ Validé'
                          : '⏳ En attente'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= TABLEAU DES CONTRÔLES ================= */}
                <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#9b59b6',
                      fontSize: '14px',
                      borderBottom: '2px solid #9b59b6',
                      paddingBottom: '5px',
                      display: 'inline-block',
                    }}
                  >
                    🔍 POINTS DE CONTRÔLE
                  </h4>

                  <table
                    style={{
                      borderCollapse: 'collapse',
                      width: '100%',
                      marginTop: '10px',
                      fontSize: '12px',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderBottom: '2px solid #dee2e6',
                        }}
                      >
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                          }}
                        >
                          Spécification
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                          }}
                        >
                          Désignation
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#f39c12',
                          }}
                        >
                          Matin
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#f39c12',
                          }}
                        >
                          État
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#e67e22',
                          }}
                        >
                          A-Midi
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#e67e22',
                          }}
                        >
                          État
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#2c3e50',
                          }}
                        >
                          Nuit
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#2c3e50',
                          }}
                        >
                          État
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFiche.controles.map((c, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: '1px solid #e9ecef' }}
                        >
                          <td
                            style={{
                              padding: '8px',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            {c.specification || '-'}
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            {c.designation || '-'}
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            {c.matin?.normal
                              ? '✔'
                              : c.matin?.anomalie
                                ? '⚠'
                                : '⚪'}
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            <span
                              style={{
                                color: c.matin?.normal
                                  ? '#28a745'
                                  : c.matin?.anomalie
                                    ? '#dc3545'
                                    : '#6c757d',
                                fontWeight: 'bold',
                              }}
                            >
                              {c.matin?.normal
                                ? 'Normal'
                                : c.matin?.anomalie
                                  ? 'Anomalie'
                                  : '-'}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            {c.apresMidi?.normal
                              ? '✔'
                              : c.apresMidi?.anomalie
                                ? '⚠'
                                : '⚪'}
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            <span
                              style={{
                                color: c.apresMidi?.normal
                                  ? '#28a745'
                                  : c.apresMidi?.anomalie
                                    ? '#dc3545'
                                    : '#6c757d',
                                fontWeight: 'bold',
                              }}
                            >
                              {c.apresMidi?.normal
                                ? 'Normal'
                                : c.apresMidi?.anomalie
                                  ? 'Anomalie'
                                  : '-'}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            {c.nuit?.normal
                              ? '✔'
                              : c.nuit?.anomalie
                                ? '⚠'
                                : '⚪'}
                          </td>
                          <td
                            style={{
                              padding: '8px',
                              textAlign: 'center',
                              backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa',
                            }}
                          >
                            <span
                              style={{
                                color: c.nuit?.normal
                                  ? '#28a745'
                                  : c.nuit?.anomalie
                                    ? '#dc3545'
                                    : '#6c757d',
                                fontWeight: 'bold',
                              }}
                            >
                              {c.nuit?.normal
                                ? 'Normal'
                                : c.nuit?.anomalie
                                  ? 'Anomalie'
                                  : '-'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ================= TEMPS D'INSPECTION ================= */}
                <div
                  style={{
                    backgroundColor: '#e8f4fd',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#2980b9',
                      fontSize: '14px',
                    }}
                  >
                    ⏱️ TEMPS D'INSPECTION
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => (
                      <div
                        key={p}
                        style={{
                          backgroundColor: 'white',
                          padding: '10px',
                          borderRadius: '6px',
                          border: '1px solid #dee2e6',
                        }}
                      >
                        <strong style={{ textTransform: 'capitalize' }}>
                          {p === 'apresMidi' ? 'Après-midi' : p}
                        </strong>
                        <div style={{ fontSize: '12px', marginTop: '5px' }}>
                          {selectedFiche.tempsInspection?.[p]?.debut || '--'} →{' '}
                          {selectedFiche.tempsInspection?.[p]?.fin || '--'}
                          <br />
                          Durée:{' '}
                          {selectedFiche.tempsInspection?.[p]?.tempsAlloue ||
                            '0'}{' '}
                          min
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: '10px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                    }}
                  >
                    Total: {selectedFiche.tempsInspection?.total || '0'} minutes
                  </div>
                </div>

                {/* ================= OBSERVATIONS ================= */}
                <div style={{ marginBottom: '20px' }}>
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#f39c12',
                      fontSize: '14px',
                      borderBottom: '2px solid #f39c12',
                      paddingBottom: '5px',
                      display: 'inline-block',
                    }}
                  >
                    📝 OBSERVATIONS PAR PÉRIODE
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      marginTop: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => (
                      <div
                        key={p}
                        style={{
                          backgroundColor: '#fff3cd',
                          padding: '10px',
                          borderRadius: '6px',
                          border: '1px solid #ffc107',
                        }}
                      >
                        <strong style={{ textTransform: 'capitalize' }}>
                          {p === 'apresMidi' ? 'Après-midi' : p}
                        </strong>
                        <div
                          style={{
                            fontSize: '12px',
                            marginTop: '5px',
                            color: '#856404',
                          }}
                        >
                          {selectedFiche.observations?.[p] ||
                            'Aucune observation'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ================= TECHNICIENS ================= */}
                <div
                  style={{
                    backgroundColor: '#e8f5e9',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#27ae60',
                      fontSize: '14px',
                    }}
                  >
                    👨‍🔧 TECHNICIENS D'INTERVENTION
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => (
                      <div key={p}>
                        <strong style={{ textTransform: 'capitalize' }}>
                          {p === 'apresMidi' ? 'Après-midi' : p}
                        </strong>
                        <div style={{ fontSize: '12px' }}>
                          {(selectedFiche.techniciens?.[p] || []).join(', ') ||
                            'Aucun technicien'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}
                <div
                  className="fiche-actions"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    paddingTop: '20px',
                    borderTop: '1px solid #e9ecef',
                  }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                    disabled={selectedFiche.statut === 'validé'}
                    style={{
                      padding: '10px 20px',
                      backgroundColor:
                        selectedFiche.statut === 'validé'
                          ? '#6c757d'
                          : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor:
                        selectedFiche.statut === 'validé'
                          ? 'not-allowed'
                          : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    ✅{' '}
                    {selectedFiche.statut === 'validé'
                      ? 'Déjà validé'
                      : 'Valider la fiche'}
                  </button>
                  <button
                    onClick={() => exportPDF(selectedFiche)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#9b59b6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    📄 Exporter PDF
                  </button>
                  <button
                    onClick={() => setSelectedFiche(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    ❌ Fermer
                  </button>
                </div>
              </div>
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
            ) : // fiche 2250KVA
            selectedFiche?.pointsControle ? (
              <div className="fiche-detail-container">
                {/* ================= EN-TÊTE ================= */}
                <div
                  className="fiche-header"
                  style={{
                    backgroundColor: '#34495e',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '20px',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: '20px' }}>
                    ⚡ FICHE 2250KVA - GROUPE ÉLECTROGÈNE
                  </h2>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      opacity: 0.9,
                      fontSize: '12px',
                    }}
                  >
                    Contrôle technique et surveillance
                  </p>
                </div>

                {/* ================= INFORMATIONS GÉNÉRALES ================= */}
                <div
                  className="fiche-info-section"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 10px 0',
                      color: '#34495e',
                      fontSize: '16px',
                    }}
                  >
                    📋 INFORMATIONS GÉNÉRALES
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📅 Date :
                      </span>{' '}
                      <span>
                        {selectedFiche.date
                          ? new Date(selectedFiche.date).toLocaleDateString(
                              'fr-FR'
                            )
                          : 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🔖 N° Fiche :
                      </span>{' '}
                      <span>
                        {selectedFiche._id?.slice(-8) || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🏷️ Désignation :
                      </span>{' '}
                      <span>
                        {selectedFiche.designation || 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📍 Lieu :
                      </span>{' '}
                      <span>
                        {selectedFiche.lieuInstallation || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🔋 Puissance :
                      </span>{' '}
                      <span>{selectedFiche.puissance || '2250 KVA'}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📊 Statut :
                      </span>{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor:
                            selectedFiche.statut === 'validé'
                              ? '#d4edda'
                              : '#fff3cd',
                          color:
                            selectedFiche.statut === 'validé'
                              ? '#155724'
                              : '#856404',
                        }}
                      >
                        {selectedFiche.statut === 'validé'
                          ? '✅ Validé'
                          : '⏳ En attente'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= TABLEAU DES POINTS DE CONTRÔLE ================= */}
                <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#34495e',
                      fontSize: '14px',
                      borderBottom: '2px solid #34495e',
                      paddingBottom: '5px',
                      display: 'inline-block',
                    }}
                  >
                    🔍 POINTS DE CONTRÔLE TECHNIQUE
                  </h4>

                  <table
                    style={{
                      borderCollapse: 'collapse',
                      width: '100%',
                      marginTop: '10px',
                      fontSize: '12px',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderBottom: '2px solid #dee2e6',
                        }}
                      >
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                            width: '25%',
                          }}
                        >
                          Spécification
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                            width: '25%',
                          }}
                        >
                          Désignation
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#f39c12',
                            color: 'white',
                          }}
                          colSpan="2"
                        >
                          🌅 Matin
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#e67e22',
                            color: 'white',
                          }}
                          colSpan="2"
                        >
                          🌇 Après-midi
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#2c3e50',
                            color: 'white',
                          }}
                          colSpan="2"
                        >
                          🌙 Nuit
                        </th>
                      </tr>
                      <tr
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderBottom: '2px solid #dee2e6',
                        }}
                      >
                        <th style={{ padding: '8px' }}></th>
                        <th style={{ padding: '8px' }}></th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Normal
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Anomalie
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Normal
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Anomalie
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Normal
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Anomalie
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFiche.pointsControle.map((c, i) => {
                        const hasAnomalie =
                          c.matin?.anomalie ||
                          c.apresMidi?.anomalie ||
                          c.nuit?.anomalie;
                        return (
                          <tr
                            key={i}
                            style={{
                              borderBottom: '1px solid #e9ecef',
                              backgroundColor: hasAnomalie
                                ? '#fff5f5'
                                : i % 2 === 0
                                  ? '#fff'
                                  : '#fafafa',
                            }}
                          >
                            <td
                              style={{
                                padding: '10px',
                                fontWeight: c.specification ? 'bold' : 'normal',
                              }}
                            >
                              {c.specification || '-'}
                            </td>
                            <td style={{ padding: '10px' }}>
                              {c.designation || '-'}
                            </td>
                            {/* MATIN */}
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.matin?.normal ? (
                                <span
                                  style={{ color: '#28a745', fontSize: '18px' }}
                                >
                                  ✔
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.matin?.anomalie ? (
                                <span
                                  style={{ color: '#dc3545', fontSize: '18px' }}
                                >
                                  ⚠
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            {/* APRÈS-MIDI */}
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.apresMidi?.normal ? (
                                <span
                                  style={{ color: '#28a745', fontSize: '18px' }}
                                >
                                  ✔
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.apresMidi?.anomalie ? (
                                <span
                                  style={{ color: '#dc3545', fontSize: '18px' }}
                                >
                                  ⚠
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            {/* NUIT */}
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.nuit?.normal ? (
                                <span
                                  style={{ color: '#28a745', fontSize: '18px' }}
                                >
                                  ✔
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.nuit?.anomalie ? (
                                <span
                                  style={{ color: '#dc3545', fontSize: '18px' }}
                                >
                                  ⚠
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* ================= SYNTHÈSE DES ANOMALIES ================= */}
                {(() => {
                  const anomalies = selectedFiche.pointsControle.filter(
                    (c) =>
                      c.matin?.anomalie ||
                      c.apresMidi?.anomalie ||
                      c.nuit?.anomalie
                  );

                  if (anomalies.length === 0) return null;

                  return (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        borderLeft: '4px solid #dc3545',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                      }}
                    >
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#721c24',
                          fontSize: '14px',
                        }}
                      >
                        ⚠️ SYNTHÈSE DES ANOMALIES DÉTECTÉES ({anomalies.length})
                      </h4>
                      {anomalies.map((anomalie, idx) => {
                        const periods = [];
                        if (anomalie.matin?.anomalie) periods.push('Matin');
                        if (anomalie.apresMidi?.anomalie)
                          periods.push('Après-midi');
                        if (anomalie.nuit?.anomalie) periods.push('Nuit');

                        return (
                          <div
                            key={idx}
                            style={{
                              marginBottom: '8px',
                              padding: '8px',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                            }}
                          >
                            <strong style={{ color: '#dc3545' }}>
                              ⚠️ {anomalie.specification || 'Point de contrôle'}
                            </strong>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#555',
                                marginTop: '4px',
                              }}
                            >
                              Période(s): {periods.join(', ')}
                              {anomalie.matin?.descriptionAnomalie && (
                                <div>
                                  Description:{' '}
                                  {anomalie.matin.descriptionAnomalie}
                                </div>
                              )}
                              {anomalie.apresMidi?.descriptionAnomalie && (
                                <div>
                                  Description:{' '}
                                  {anomalie.apresMidi.descriptionAnomalie}
                                </div>
                              )}
                              {anomalie.nuit?.descriptionAnomalie && (
                                <div>
                                  Description:{' '}
                                  {anomalie.nuit.descriptionAnomalie}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* ================= TEMPS D'INSPECTION ================= */}
                <div
                  style={{
                    backgroundColor: '#e8f4fd',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#2980b9',
                      fontSize: '14px',
                    }}
                  >
                    ⏱️ TEMPS D'INSPECTION
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => {
                      const periodeLabels = {
                        matin: '🌅 Matin',
                        apresMidi: '🌇 Après-midi',
                        nuit: '🌙 Nuit',
                      };
                      const t = selectedFiche.tempsInspection?.[p] || {};
                      return (
                        <div
                          key={p}
                          style={{
                            backgroundColor: 'white',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid #dee2e6',
                          }}
                        >
                          <strong>{periodeLabels[p]}</strong>
                          <div style={{ fontSize: '12px', marginTop: '5px' }}>
                            {t.debut || '--'} → {t.fin || '--'}
                            <br />
                            Durée: {t.tempsAlloue || '0'} min
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      marginTop: '10px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                    }}
                  >
                    📊 Temps total:{' '}
                    {selectedFiche.tempsInspection?.total || '0'} minutes
                  </div>
                </div>

                {/* ================= OBSERVATIONS ================= */}
                <div style={{ marginBottom: '20px' }}>
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#f39c12',
                      fontSize: '14px',
                      borderBottom: '2px solid #f39c12',
                      paddingBottom: '5px',
                      display: 'inline-block',
                    }}
                  >
                    📝 OBSERVATIONS PAR PÉRIODE
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      marginTop: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => {
                      const periodeLabels = {
                        matin: '🌅 Matin',
                        apresMidi: '🌇 Après-midi',
                        nuit: '🌙 Nuit',
                      };
                      return (
                        <div
                          key={p}
                          style={{
                            backgroundColor: '#fff3cd',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid #ffc107',
                          }}
                        >
                          <strong>{periodeLabels[p]}</strong>
                          <div
                            style={{
                              fontSize: '12px',
                              marginTop: '5px',
                              color: '#856404',
                            }}
                          >
                            {selectedFiche.observations?.[p] ||
                              'Aucune observation'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ================= TECHNICIENS ================= */}
                <div
                  style={{
                    backgroundColor: '#e8f5e9',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#27ae60',
                      fontSize: '14px',
                    }}
                  >
                    👨‍🔧 TECHNICIENS D'INTERVENTION
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => {
                      const periodeLabels = {
                        matin: '🌅 Matin',
                        apresMidi: '🌇 Après-midi',
                        nuit: '🌙 Nuit',
                      };
                      const techs = selectedFiche.techniciens?.[p] || [];
                      const techList = Array.isArray(techs) ? techs : [];
                      return (
                        <div key={p}>
                          <strong>{periodeLabels[p]}</strong>
                          <div style={{ fontSize: '12px', marginTop: '5px' }}>
                            {techList.length > 0
                              ? techList.join(', ')
                              : 'Aucun technicien'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ================= SIGNATURES ================= */}
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 15px 0',
                      color: '#34495e',
                      fontSize: '14px',
                    }}
                  >
                    ✍️ VALIDATIONS
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '20px',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Signature du technicien
                      </div>
                      <div
                        style={{
                          borderBottom: '1px solid #000',
                          padding: '10px 0',
                          minHeight: '40px',
                        }}
                      >
                        {selectedFiche.signatureTechnicien ? (
                          <img
                            src={selectedFiche.signatureTechnicien}
                            alt="Signature technicien"
                            style={{ maxWidth: '150px', maxHeight: '50px' }}
                          />
                        ) : (
                          <span
                            style={{ color: '#6c757d', fontStyle: 'italic' }}
                          >
                            Non signé
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Validation responsable
                      </div>
                      <div
                        style={{
                          borderBottom: '1px solid #000',
                          padding: '10px 0',
                          minHeight: '40px',
                        }}
                      >
                        <span style={{ color: '#6c757d', fontStyle: 'italic' }}>
                          Espace réservé
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}
                <div
                  className="fiche-actions"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    paddingTop: '20px',
                    borderTop: '1px solid #e9ecef',
                  }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                    disabled={selectedFiche.statut === 'validé'}
                    style={{
                      padding: '10px 20px',
                      backgroundColor:
                        selectedFiche.statut === 'validé'
                          ? '#6c757d'
                          : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor:
                        selectedFiche.statut === 'validé'
                          ? 'not-allowed'
                          : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFiche.statut !== 'validé') {
                        e.target.style.backgroundColor = '#218838';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFiche.statut !== 'validé') {
                        e.target.style.backgroundColor = '#28a745';
                      }
                    }}
                  >
                    ✅{' '}
                    {selectedFiche.statut === 'validé'
                      ? 'Déjà validé'
                      : 'Valider la fiche'}
                  </button>
                  <button
                    onClick={() => exportPDF(selectedFiche)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#34495e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#2c3e50')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#34495e')
                    }
                  >
                    📄 Exporter PDF
                  </button>
                  <button
                    onClick={() => setSelectedFiche(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#c82333')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#dc3545')
                    }
                  >
                    ❌ Fermer
                  </button>
                </div>
              </div>
            ) : selectedFiche?.operations ? (
              <div className="fiche-detail-container">
                {/* ================= EN-TÊTE ================= */}
                <div
                  className="fiche-header"
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '20px',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: '20px' }}>
                    🔧 FICHE OLAPION - OPÉRATIONS DE CONTRÔLE
                  </h2>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      opacity: 0.9,
                      fontSize: '12px',
                    }}
                  >
                    Contrôle technique et maintenance préventive
                  </p>
                </div>

                {/* ================= INFORMATIONS GÉNÉRALES ================= */}
                <div
                  className="fiche-info-section"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 10px 0',
                      color: '#3498db',
                      fontSize: '16px',
                    }}
                  >
                    📋 INFORMATIONS GÉNÉRALES
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📅 Date :
                      </span>{' '}
                      <span>
                        {selectedFiche.date
                          ? new Date(selectedFiche.date).toLocaleDateString(
                              'fr-FR'
                            )
                          : 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🔖 N° Fiche :
                      </span>{' '}
                      <span>
                        {selectedFiche._id?.slice(-8) || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🏷️ Désignation :
                      </span>{' '}
                      <span>
                        {selectedFiche.designation || 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📍 Lieu :
                      </span>{' '}
                      <span>
                        {selectedFiche.lieuInstallation || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📊 Type d'opération :
                      </span>{' '}
                      <span>
                        {selectedFiche.typeOperation || 'Contrôle périodique'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📊 Statut :
                      </span>{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor:
                            selectedFiche.statut === 'validé'
                              ? '#d4edda'
                              : '#fff3cd',
                          color:
                            selectedFiche.statut === 'validé'
                              ? '#155724'
                              : '#856404',
                        }}
                      >
                        {selectedFiche.statut === 'validé'
                          ? '✅ Validé'
                          : '⏳ En attente'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= TABLEAU DES OPÉRATIONS ================= */}
                <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#3498db',
                      fontSize: '14px',
                      borderBottom: '2px solid #3498db',
                      paddingBottom: '5px',
                      display: 'inline-block',
                    }}
                  >
                    🔧 OPÉRATIONS DE CONTRÔLE
                  </h4>

                  <table
                    style={{
                      borderCollapse: 'collapse',
                      width: '100%',
                      marginTop: '10px',
                      fontSize: '12px',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderBottom: '2px solid #dee2e6',
                        }}
                      >
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                            width: '25%',
                          }}
                        >
                          Spécification
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                            width: '25%',
                          }}
                        >
                          Désignation
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#f39c12',
                            color: 'white',
                          }}
                          colSpan="2"
                        >
                          🌅 Matin
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#e67e22',
                            color: 'white',
                          }}
                          colSpan="2"
                        >
                          🌇 Après-midi
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#2c3e50',
                            color: 'white',
                          }}
                          colSpan="2"
                        >
                          🌙 Nuit
                        </th>
                        <th
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            backgroundColor: '#6c757d',
                            color: 'white',
                          }}
                        >
                          Statut
                        </th>
                      </tr>
                      <tr
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderBottom: '2px solid #dee2e6',
                        }}
                      >
                        <th style={{ padding: '8px' }}></th>
                        <th style={{ padding: '8px' }}></th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Normal
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Anomalie
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Normal
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Anomalie
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Normal
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '30px',
                          }}
                        >
                          Anomalie
                        </th>
                        <th
                          style={{
                            padding: '8px',
                            textAlign: 'center',
                            width: '50px',
                          }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFiche.operations.map((c, i) => {
                        const hasAnomalie =
                          c.matin?.anomalie ||
                          c.apresMidi?.anomalie ||
                          c.nuit?.anomalie;
                        const hasEnCours =
                          c.matin?.enCours ||
                          c.apresMidi?.enCours ||
                          c.nuit?.enCours;
                        const hasNormal =
                          c.matin?.normal ||
                          c.apresMidi?.normal ||
                          c.nuit?.normal;

                        let statut = '';
                        let statutColor = '';
                        if (hasAnomalie) {
                          statut = '⚠️ Anomalie';
                          statutColor = '#dc3545';
                        } else if (hasEnCours) {
                          statut = '🔄 En cours';
                          statutColor = '#f39c12';
                        } else if (hasNormal) {
                          statut = '✅ Conforme';
                          statutColor = '#28a745';
                        } else {
                          statut = '❌ Non réalisé';
                          statutColor = '#6c757d';
                        }

                        return (
                          <tr
                            key={i}
                            style={{
                              borderBottom: '1px solid #e9ecef',
                              backgroundColor: hasAnomalie
                                ? '#fff5f5'
                                : i % 2 === 0
                                  ? '#fff'
                                  : '#fafafa',
                            }}
                          >
                            <td
                              style={{
                                padding: '10px',
                                fontWeight: c.specification ? 'bold' : 'normal',
                              }}
                            >
                              {c.specification || '-'}
                            </td>
                            <td style={{ padding: '10px' }}>
                              {c.designation || '-'}
                            </td>
                            {/* MATIN */}
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.matin?.normal ? (
                                <span
                                  style={{ color: '#28a745', fontSize: '18px' }}
                                >
                                  ✔
                                </span>
                              ) : c.matin?.enCours ? (
                                <span
                                  style={{ color: '#f39c12', fontSize: '18px' }}
                                >
                                  🔄
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.matin?.anomalie ? (
                                <span
                                  style={{ color: '#dc3545', fontSize: '18px' }}
                                >
                                  ⚠
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            {/* APRÈS-MIDI */}
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.apresMidi?.normal ? (
                                <span
                                  style={{ color: '#28a745', fontSize: '18px' }}
                                >
                                  ✔
                                </span>
                              ) : c.apresMidi?.enCours ? (
                                <span
                                  style={{ color: '#f39c12', fontSize: '18px' }}
                                >
                                  🔄
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.apresMidi?.anomalie ? (
                                <span
                                  style={{ color: '#dc3545', fontSize: '18px' }}
                                >
                                  ⚠
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            {/* NUIT */}
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.nuit?.normal ? (
                                <span
                                  style={{ color: '#28a745', fontSize: '18px' }}
                                >
                                  ✔
                                </span>
                              ) : c.nuit?.enCours ? (
                                <span
                                  style={{ color: '#f39c12', fontSize: '18px' }}
                                >
                                  🔄
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              {c.nuit?.anomalie ? (
                                <span
                                  style={{ color: '#dc3545', fontSize: '18px' }}
                                >
                                  ⚠
                                </span>
                              ) : (
                                <span style={{ color: '#adb5bd' }}>—</span>
                              )}
                            </td>
                            <td
                              style={{ padding: '10px', textAlign: 'center' }}
                            >
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '2px 6px',
                                  borderRadius: '12px',
                                  fontSize: '10px',
                                  fontWeight: 'bold',
                                  backgroundColor: statutColor + '20',
                                  color: statutColor,
                                }}
                              >
                                {statut}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* ================= SYNTHÈSE DES ANOMALIES ================= */}
                {(() => {
                  const anomalies = selectedFiche.operations.filter(
                    (c) =>
                      c.matin?.anomalie ||
                      c.apresMidi?.anomalie ||
                      c.nuit?.anomalie
                  );

                  if (anomalies.length === 0) return null;

                  return (
                    <div
                      style={{
                        backgroundColor: '#f8d7da',
                        borderLeft: '4px solid #dc3545',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                      }}
                    >
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#721c24',
                          fontSize: '14px',
                        }}
                      >
                        ⚠️ SYNTHÈSE DES ANOMALIES DÉTECTÉES ({anomalies.length})
                      </h4>
                      {anomalies.map((anomalie, idx) => {
                        const periods = [];
                        let description = '';

                        if (anomalie.matin?.anomalie) {
                          periods.push('Matin');
                          description =
                            anomalie.matin.descriptionAnomalie ||
                            anomalie.matin.anomalie ||
                            '';
                        }
                        if (anomalie.apresMidi?.anomalie) {
                          periods.push('Après-midi');
                          description =
                            anomalie.apresMidi.descriptionAnomalie ||
                            anomalie.apresMidi.anomalie ||
                            '';
                        }
                        if (anomalie.nuit?.anomalie) {
                          periods.push('Nuit');
                          description =
                            anomalie.nuit.descriptionAnomalie ||
                            anomalie.nuit.anomalie ||
                            '';
                        }

                        return (
                          <div
                            key={idx}
                            style={{
                              marginBottom: '8px',
                              padding: '8px',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                            }}
                          >
                            <strong style={{ color: '#dc3545' }}>
                              ⚠️ {anomalie.specification || 'Opération'}
                            </strong>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#555',
                                marginTop: '4px',
                              }}
                            >
                              <div>Période(s): {periods.join(', ')}</div>
                              {description && description !== 'true' && (
                                <div>Description: {description}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* ================= OPÉRATIONS EN COURS ================= */}
                {(() => {
                  const enCours = selectedFiche.operations.filter(
                    (c) =>
                      c.matin?.enCours ||
                      c.apresMidi?.enCours ||
                      c.nuit?.enCours
                  );

                  if (enCours.length === 0) return null;

                  return (
                    <div
                      style={{
                        backgroundColor: '#fff3cd',
                        borderLeft: '4px solid #ffc107',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                      }}
                    >
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#856404',
                          fontSize: '14px',
                        }}
                      >
                        🔄 OPÉRATIONS EN COURS ({enCours.length})
                      </h4>
                      {enCours.map((operation, idx) => {
                        const periods = [];
                        if (operation.matin?.enCours) periods.push('Matin');
                        if (operation.apresMidi?.enCours)
                          periods.push('Après-midi');
                        if (operation.nuit?.enCours) periods.push('Nuit');

                        return (
                          <div
                            key={idx}
                            style={{
                              marginBottom: '8px',
                              padding: '8px',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                            }}
                          >
                            <strong style={{ color: '#856404' }}>
                              🔄 {operation.specification || 'Opération'}
                            </strong>
                            <div
                              style={{
                                fontSize: '12px',
                                color: '#555',
                                marginTop: '4px',
                              }}
                            >
                              Période(s): {periods.join(', ')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* ================= TEMPS D'OPÉRATION ================= */}
                <div
                  style={{
                    backgroundColor: '#e8f4fd',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#2980b9',
                      fontSize: '14px',
                    }}
                  >
                    ⏱️ TEMPS D'OPÉRATION
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => {
                      const periodeLabels = {
                        matin: '🌅 Matin',
                        apresMidi: '🌇 Après-midi',
                        nuit: '🌙 Nuit',
                      };
                      const t = selectedFiche.tempsInspection?.[p] || {};
                      return (
                        <div
                          key={p}
                          style={{
                            backgroundColor: 'white',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid #dee2e6',
                          }}
                        >
                          <strong>{periodeLabels[p]}</strong>
                          <div style={{ fontSize: '12px', marginTop: '5px' }}>
                            {t.debut || '--'} → {t.fin || '--'}
                            <br />
                            Durée: {t.tempsAlloue || '0'} min
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      marginTop: '10px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                    }}
                  >
                    📊 Temps total:{' '}
                    {selectedFiche.tempsInspection?.total || '0'} minutes
                  </div>
                </div>

                {/* ================= OBSERVATIONS ================= */}
                <div style={{ marginBottom: '20px' }}>
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#f39c12',
                      fontSize: '14px',
                      borderBottom: '2px solid #f39c12',
                      paddingBottom: '5px',
                      display: 'inline-block',
                    }}
                  >
                    📝 OBSERVATIONS PAR PÉRIODE
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      marginTop: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => {
                      const periodeLabels = {
                        matin: '🌅 Matin',
                        apresMidi: '🌇 Après-midi',
                        nuit: '🌙 Nuit',
                      };
                      return (
                        <div
                          key={p}
                          style={{
                            backgroundColor: '#fff3cd',
                            padding: '10px',
                            borderRadius: '6px',
                            border: '1px solid #ffc107',
                          }}
                        >
                          <strong>{periodeLabels[p]}</strong>
                          <div
                            style={{
                              fontSize: '12px',
                              marginTop: '5px',
                              color: '#856404',
                            }}
                          >
                            {selectedFiche.observations?.[p] ||
                              'Aucune observation'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ================= TECHNICIENS ================= */}
                <div
                  style={{
                    backgroundColor: '#e8f5e9',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 10px 0',
                      color: '#27ae60',
                      fontSize: '14px',
                    }}
                  >
                    👨‍🔧 TECHNICIENS D'INTERVENTION
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                    }}
                  >
                    {['matin', 'apresMidi', 'nuit'].map((p) => {
                      const periodeLabels = {
                        matin: '🌅 Matin',
                        apresMidi: '🌇 Après-midi',
                        nuit: '🌙 Nuit',
                      };
                      const techs = selectedFiche.techniciens?.[p] || [];
                      const techList = Array.isArray(techs) ? techs : [];
                      return (
                        <div key={p}>
                          <strong>{periodeLabels[p]}</strong>
                          <div style={{ fontSize: '12px', marginTop: '5px' }}>
                            {techList.length > 0
                              ? techList.join(', ')
                              : 'Aucun technicien'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ================= RESSOURCES UTILISÉES ================= */}
                {selectedFiche.ressources &&
                  selectedFiche.ressources.length > 0 && (
                    <div
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                      }}
                    >
                      <h4
                        style={{
                          margin: '0 0 10px 0',
                          color: '#6c757d',
                          fontSize: '14px',
                        }}
                      >
                        🛠️ RESSOURCES UTILISÉES
                      </h4>
                      <div style={{ fontSize: '12px' }}>
                        {Array.isArray(selectedFiche.ressources)
                          ? selectedFiche.ressources.join(', ')
                          : selectedFiche.ressources}
                      </div>
                    </div>
                  )}

                {/* ================= COMMENTAIRES TECHNIQUES ================= */}
                {selectedFiche.commentairesTechniques && (
                  <div
                    style={{
                      backgroundColor: '#e8f4fd',
                      padding: '15px',
                      borderRadius: '8px',
                      marginBottom: '20px',
                      borderLeft: '4px solid #3498db',
                    }}
                  >
                    <h4
                      style={{
                        margin: '0 0 8px 0',
                        color: '#2980b9',
                        fontSize: '14px',
                      }}
                    >
                      💡 COMMENTAIRES TECHNIQUES
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>
                      {selectedFiche.commentairesTechniques}
                    </p>
                  </div>
                )}

                {/* ================= SIGNATURES ================= */}
                <div
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 15px 0',
                      color: '#3498db',
                      fontSize: '14px',
                    }}
                  >
                    ✍️ VALIDATIONS
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '20px',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Signature du technicien
                      </div>
                      <div
                        style={{
                          borderBottom: '1px solid #000',
                          padding: '10px 0',
                          minHeight: '40px',
                        }}
                      >
                        {selectedFiche.signatureTechnicien ? (
                          <img
                            src={selectedFiche.signatureTechnicien}
                            alt="Signature technicien"
                            style={{ maxWidth: '150px', maxHeight: '50px' }}
                          />
                        ) : (
                          <span
                            style={{ color: '#6c757d', fontStyle: 'italic' }}
                          >
                            Non signé
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Validation responsable
                      </div>
                      <div
                        style={{
                          borderBottom: '1px solid #000',
                          padding: '10px 0',
                          minHeight: '40px',
                        }}
                      >
                        <span style={{ color: '#6c757d', fontStyle: 'italic' }}>
                          Espace réservé
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}
                <div
                  className="fiche-actions"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    paddingTop: '20px',
                    borderTop: '1px solid #e9ecef',
                  }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                    disabled={selectedFiche.statut === 'validé'}
                    style={{
                      padding: '10px 20px',
                      backgroundColor:
                        selectedFiche.statut === 'validé'
                          ? '#6c757d'
                          : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor:
                        selectedFiche.statut === 'validé'
                          ? 'not-allowed'
                          : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFiche.statut !== 'validé') {
                        e.target.style.backgroundColor = '#218838';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFiche.statut !== 'validé') {
                        e.target.style.backgroundColor = '#28a745';
                      }
                    }}
                  >
                    ✅{' '}
                    {selectedFiche.statut === 'validé'
                      ? 'Déjà validé'
                      : 'Valider la fiche'}
                  </button>
                  <button
                    onClick={() => exportPDF(selectedFiche)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#2980b9')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#3498db')
                    }
                  >
                    📄 Exporter PDF
                  </button>
                  <button
                    onClick={() => setSelectedFiche(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#c82333')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#dc3545')
                    }
                  >
                    ❌ Fermer
                  </button>
                </div>
              </div>
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
              <div className="fiche-detail-container">
                {/* ================= EN-TÊTE ================= */}
                <div
                  className="fiche-header"
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px 8px 0 0',
                    marginBottom: '20px',
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: '20px' }}>
                    🛠️ FICHE BRIGADE - GMAO
                  </h2>
                  <p
                    style={{
                      margin: '5px 0 0 0',
                      opacity: 0.9,
                      fontSize: '12px',
                    }}
                  >
                    Document d'intervention journalière
                  </p>
                </div>

                {/* ================= INFORMATIONS GÉNÉRALES ================= */}
                <div
                  className="fiche-info-section"
                  style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 10px 0',
                      color: '#3498db',
                      fontSize: '16px',
                    }}
                  >
                    📋 INFORMATIONS GÉNÉRALES
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📅 Date :
                      </span>{' '}
                      <span>
                        {selectedFiche.date
                          ? new Date(selectedFiche.date).toLocaleDateString(
                              'fr-FR'
                            )
                          : 'Non spécifiée'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        🔖 N° Fiche :
                      </span>{' '}
                      <span>
                        {selectedFiche._id?.slice(-8) || 'Non spécifié'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        📌 Statut :
                      </span>{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor:
                            selectedFiche.statut === 'validé'
                              ? '#d4edda'
                              : '#fff3cd',
                          color:
                            selectedFiche.statut === 'validé'
                              ? '#155724'
                              : '#856404',
                        }}
                      >
                        {selectedFiche.statut === 'validé'
                          ? '✅ Validé'
                          : '⏳ En attente'}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 'bold', color: '#555' }}>
                        👤 Opérateur :
                      </span>{' '}
                      <span>{selectedFiche.operateur || 'Système GMAO'}</span>
                    </div>
                  </div>
                </div>

                {/* ================= BLOCS ================= */}
                {['jour', 'nuit'].map((bloc, idx) => {
                  const blocLabels = {
                    jour: {
                      name: '☀️ Shift Jour',
                      hours: '08h - 20h',
                      color: '#f39c12',
                    },
                    nuit: {
                      name: '🌙 Shift Nuit',
                      hours: '20h - 08h',
                      color: '#2c3e50',
                    },
                  };

                  const blocData = selectedFiche.blocsBrigade?.[bloc] || [];
                  const techsData = selectedFiche.techniciens?.[bloc] || [];

                  return (
                    <div
                      key={idx}
                      className="fiche-bloc"
                      style={{
                        marginBottom: '25px',
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Entête du bloc */}
                      <div
                        style={{
                          backgroundColor: blocLabels[bloc].color,
                          color: 'white',
                          padding: '10px 15px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <h4 style={{ margin: 0, fontSize: '16px' }}>
                          {blocLabels[bloc].name}
                        </h4>
                        <span style={{ fontSize: '12px', opacity: 0.9 }}>
                          {blocLabels[bloc].hours}
                        </span>
                      </div>

                      <div style={{ padding: '15px' }}>
                        {/* ===== TABLE CONSIGNES ET INSPECTIONS ===== */}
                        <h5
                          style={{
                            margin: '0 0 10px 0',
                            color: '#555',
                            fontSize: '14px',
                          }}
                        >
                          📝 Consignes et Inspections
                        </h5>

                        {blocData.length > 0 ? (
                          <div style={{ overflowX: 'auto' }}>
                            <table
                              style={{
                                borderCollapse: 'collapse',
                                width: '100%',
                                marginBottom: '20px',
                                fontSize: '13px',
                              }}
                            >
                              <thead>
                                <tr
                                  style={{
                                    backgroundColor: '#f8f9fa',
                                    borderBottom: '2px solid #dee2e6',
                                  }}
                                >
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Type intervention
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Nature travaux
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Lieu
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Nature maintenance
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Maintenance préventive
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Action effectuée
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Technicien
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Panne
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Cause
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Date détection
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Date réparation
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Durée (min)
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Pièces remplacées
                                  </th>
                                  <th
                                    style={{
                                      padding: '8px',
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      color: '#495057',
                                    }}
                                  >
                                    Quantité
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {blocData.map((row, i) => (
                                  <tr
                                    key={i}
                                    style={{
                                      borderBottom: '1px solid #e9ecef',
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.typeIntervention || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.natureTravaux || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.lieu || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.natureMaintenance || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.naturePreventive || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.action || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.technicien || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.panne || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.cause || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.dateDetection ? (
                                        new Date(
                                          row.dateDetection
                                        ).toLocaleDateString('fr-FR')
                                      ) : (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.dateReparation ? (
                                        new Date(
                                          row.dateReparation
                                        ).toLocaleDateString('fr-FR')
                                      ) : (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                        fontWeight: 'bold',
                                        color: row.DureeEnMinute
                                          ? '#2c3e50'
                                          : '#adb5bd',
                                      }}
                                    >
                                      {row.DureeEnMinute ? (
                                        <span
                                          style={{
                                            backgroundColor: '#e8f4f8',
                                            padding: '2px 6px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                          }}
                                        >
                                          ⏱️ {row.DureeEnMinute} min
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.pieces || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: '8px',
                                        verticalAlign: 'top',
                                        backgroundColor:
                                          i % 2 === 0 ? '#fff' : '#fafafa',
                                      }}
                                    >
                                      {row.quantite || (
                                        <span
                                          style={{
                                            color: '#adb5bd',
                                            fontStyle: 'italic',
                                          }}
                                        >
                                          —
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div
                            style={{
                              padding: '20px',
                              textAlign: 'center',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '8px',
                              marginBottom: '20px',
                              color: '#6c757d',
                            }}
                          ></div>
                        )}

                        {/* ===== TECHNICIENS ET SIGNATURES ===== */}
                        <h5
                          style={{
                            margin: '20px 0 10px 0',
                            color: '#555',
                            fontSize: '14px',
                          }}
                        ></h5>

                        {techsData.length > 0 ? (
                          <table
                            style={{
                              borderCollapse: 'collapse',
                              width: '100%',
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: '#f8f9fa',
                                  borderBottom: '2px solid #dee2e6',
                                }}
                              >
                                <th
                                  style={{
                                    padding: '10px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    color: '#495057',
                                    width: '30%',
                                  }}
                                >
                                  Nom du technicien
                                </th>
                                <th
                                  style={{
                                    padding: '10px',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    color: '#495057',
                                    width: '70%',
                                  }}
                                >
                                  Signature
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {techsData.map((tech, i) => (
                                <tr
                                  key={i}
                                  style={{ borderBottom: '1px solid #e9ecef' }}
                                >
                                  <td
                                    style={{
                                      padding: '10px',
                                      verticalAlign: 'middle',
                                      backgroundColor:
                                        i % 2 === 0 ? '#fff' : '#fafafa',
                                    }}
                                  >
                                    {tech.nom && tech.nom.trim() ? (
                                      tech.nom
                                    ) : (
                                      <span
                                        style={{
                                          color: '#adb5bd',
                                          fontStyle: 'italic',
                                        }}
                                      >
                                        Technicien non nommé
                                      </span>
                                    )}
                                  </td>
                                  <td
                                    style={{
                                      padding: '10px',
                                      verticalAlign: 'middle',
                                      backgroundColor:
                                        i % 2 === 0 ? '#fff' : '#fafafa',
                                    }}
                                  >
                                    {tech.signature ? (
                                      <div>
                                        <img
                                          src={tech.signature}
                                          alt="Signature"
                                          style={{
                                            maxWidth: '150px',
                                            maxHeight: '50px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '4px',
                                            padding: '5px',
                                            backgroundColor: '#fff',
                                          }}
                                        />
                                        <span
                                          style={{
                                            marginLeft: '10px',
                                            fontSize: '12px',
                                            color: '#28a745',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          ✓ Signé
                                        </span>
                                      </div>
                                    ) : (
                                      <span
                                        style={{
                                          color: '#dc3545',
                                          fontStyle: 'italic',
                                        }}
                                      >
                                        ❌ Non signé
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div
                            style={{
                              padding: '20px',
                              textAlign: 'center',
                              backgroundColor: '#f8f9fa',
                              borderRadius: '8px',
                              color: '#6c757d',
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* ================= OBSERVATIONS GÉNÉRALES ================= */}
                {selectedFiche.observationsGenerales && (
                  <div
                    className="fiche-observations"
                    style={{
                      backgroundColor: '#fff3cd',
                      borderLeft: '4px solid #ffc107',
                      padding: '15px',
                      borderRadius: '8px',
                      marginBottom: '20px',
                    }}
                  >
                    <h5
                      style={{
                        margin: '0 0 8px 0',
                        color: '#856404',
                        fontSize: '14px',
                      }}
                    >
                      📝 Observations générales
                    </h5>
                    <p
                      style={{
                        margin: 0,
                        color: '#856404',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {selectedFiche.observationsGenerales}
                    </p>
                  </div>
                )}

                {/* ================= ACTIONS ================= */}
                <div
                  className="fiche-actions"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    paddingTop: '20px',
                    borderTop: '1px solid #e9ecef',
                    marginTop: '10px',
                  }}
                >
                  <button
                    onClick={() =>
                      validerFiche(selectedFiche._id, selectedFiche.notifId)
                    }
                    disabled={selectedFiche.statut === 'validé'}
                    style={{
                      padding: '10px 20px',
                      backgroundColor:
                        selectedFiche.statut === 'validé'
                          ? '#6c757d'
                          : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor:
                        selectedFiche.statut === 'validé'
                          ? 'not-allowed'
                          : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFiche.statut !== 'validé') {
                        e.target.style.backgroundColor = '#218838';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFiche.statut !== 'validé') {
                        e.target.style.backgroundColor = '#28a745';
                      }
                    }}
                  >
                    ✅{' '}
                    {selectedFiche.statut === 'validé'
                      ? 'Déjà validé'
                      : 'Valider la fiche'}
                  </button>

                  <button
                    onClick={() => exportPDF(selectedFiche)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#2980b9')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#3498db')
                    }
                  >
                    📄 Exporter en PDF
                  </button>

                  <button
                    onClick={() => setSelectedFiche(null)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = '#c82333')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = '#dc3545')
                    }
                  >
                    ❌ Fermer
                  </button>
                </div>
              </div>
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
