import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Notification.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { fetchNotifications, marquerNotifCommeLue, ajouterHistoriqueAction } from './apiservices/api';
export default function Notifications() {
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
  const FICHE_REGULATEURS_API ='http://localhost:5000/api/fiche-semes-regulateures';
  const FICHE_POSTESS_API = 'http://localhost:5000/api/fiche-semes-postes';
  const FICHE_DGSS_API = "http://localhost:5000/api/fiche-semes-dgs";
const FICHE_TGBT_API = "http://localhost:5000/api/fiche-ann-tgbt";
const FICHE_VOIE_API = "http://localhost:5000/api/fiche-ann-voie";
const FICHE_ANN_INFRASTRUCTURE_API =
    "http://localhost:5000/api/fiche-ann-infrastructure";

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
        'http://localhost:5000/api/fiche-ann-infrastructure'
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
    setSelectedFiche({ ...data, notifId,});
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
        console.error("Erreur récupération fiche Infrastructure");
        return;
      }

      const data = await res.json();

      // Stocker la fiche + l'ID de notification pour marquer comme lu
      setSelectedFiche({ ...data, notifId });
    } catch (err) {
      console.error("Erreur voir fiche Infrastructure :", err);
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

      if (selectedFiche?.verifications) {
        url = 'http://localhost:5000/api/fiche_papi/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.zonePrincipale) {
        url = 'http://localhost:5000/api/fiche-piste/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.dgs) {
        url = 'http://localhost:5000/api/fiche-dgs/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.feuxObstacles) {
        url = 'http://localhost:5000/api/feux-obstacles/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.lvp) {
        url = 'http://localhost:5000/api/fiche-lvp/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.regulateures) {
        url = 'http://localhost:5000/api/fiche-regulateures/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.postes) {
        url = 'http://localhost:5000/api/fiche-postes/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.aidesRadios) {
        url = 'http://localhost:5000/api/fiche-aides-radios/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.feuxEncastres) {
        url = 'http://localhost:5000/api/fiche_feux_encastres/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.regul) {
        url = 'http://localhost:5000/api/fiche-semes-regulateures/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.postess) {
        url = 'http://localhost:5000/api/fiche-semes-postes/valider';
        body = { ficheId: id };
      }else if (selectedFiche?.controle) {
        url = 'http://localhost:5000/api/fiche_semes_dgs/valider';
        body = { ficheId: id };
      } else if (selectedFiche?.tgbt) {
        url = 'http://localhost:5000/api/fiche-ann-tgbt/valider';
        body = { ficheId: id };
       } else if (selectedFiche?.voie) {
        url = 'http://localhost:5000/api/fiche-ann-voie/valider';
        body = { ficheId: id }; 
       } else if (selectedFiche?.piste) {
        url = 'http://localhost:5000/api/fiche-ann-infrastructure/valider';
        body = { ficheId: id };  
      }else {
        url = 'http://localhost:5000/api/inspections/valider';
        body = { inspectionId: id };
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

    // Ajouter dans historique
await ajouterHistoriqueAction({
    type: "fiche_ann_infrastructure",
    message: "Fiche annuelle Infrastructure validée",
    date: new Date(),
    dataId: selectedFiche._id,
});


    // 🔹 Feedback utilisateur
alert("Fiche validée et ajoutée à l'historique ✅");
    setSelectedFiche(null);
    fetchNotifications();
navigate("/historique-actions", {
  state: { alertMessage: "Nouvelle fiche validée et ajoutée à l'historique" },
});
 
  } catch (err) {
    console.error("Erreur validation fiche :", err);
    alert("Erreur lors de la validation");
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
    }else if (selectedFiche?.posteSST1) {
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

  const tableColumn = ["Element", "Etat", "Interventions", "Observations"];
  let startY = 40;

  // Fonction pour ajouter un poste au PDF
  const addPoste = (posteName, posteData) => {
    if (!posteData || !posteData.controles || posteData.controles.length === 0) return;

    doc.text(posteName, 14, startY);
    startY += 6;

    const tableRows = posteData.controles.map((c) => [
      c.element || "",
      c.etat || "",
      c.interventions || "",
      c.observations || "",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY,
      theme: "grid",
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 10 },
    });

    startY = doc.lastAutoTable.finalY + 10; // mettre à jour la position pour le poste suivant
  };

  addPoste("POSTE SST1", selectedFiche.posteSST1);
  addPoste("POSTE SST2", selectedFiche.posteSST2);
  addPoste("POSTE TC", selectedFiche.posteTC);

  // Ajouter la signature si elle existe
  if (selectedFiche.signature) {
    const imgProps = doc.getImageProperties(selectedFiche.signature);
    const imgWidth = 100;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    doc.text("Signature :", 14, startY + 6);
    doc.addImage(selectedFiche.signature, "PNG", 14, startY + 10, imgWidth, imgHeight);
  }

  doc.save(
    `Fiche_Semestrielle_Postes_${
      selectedFiche.date ? new Date(selectedFiche.date).toISOString() : "date_inconnue"
    }.pdf`
  );
  // ===================== EXPORT PDF semestrielle DGS =====================
}else if (selectedFiche?.Contrôle) {
  doc.text("Fiche d'inspection Semestrielle DGS", 14, 15);
  doc.setFontSize(11);
  doc.text(
    `📅 Date : ${selectedFiche.Date ? new Date(selectedFiche.Date).toLocaleDateString() : ''}`,
    14,
    22
  );
  doc.text(
    `👨‍🔧 Technicien : ${selectedFiche["Technicien Operateures"] || ''}`,
    14,
    28
  );
  doc.text(
    `📝 Observations générales : ${selectedFiche["Observations générales"] || ''}`,
    14,
    34
  );

  const tableColumn = ["Contrôle / Élément", "Normal", "Anomalie", "Observations"];
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
        sectionData.Normal ? "✅" : "",
        sectionData.Anomalie ? "⚠️" : "",
        sectionData.Observations || ""
      ]);

      // TGBT ANNUELE 
      
    } else {
      Object.keys(sectionData).forEach((element) => {
        const el = sectionData[element];
        tableRows.push([
          element,
          el.Normal ? "✅" : "",
          el.Anomalie ? "⚠️" : "",
          el.Observations || ""
        ]);
      });
    }

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY,
      theme: "grid",
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
    doc.text("Signature :", 14, startY + 6);
    doc.addImage(selectedFiche.Signature, "PNG", 14, startY + 10, imgWidth, imgHeight);
  }

  doc.save(
    `Fiche_Semestrielle_DGS_${
      selectedFiche.Date ? new Date(selectedFiche.Date).toISOString() : "date_inconnue"
    }.pdf`
  );
// ===================== EXPORT PDF TGBT =====================
}else if (selectedFiche?.postes) {
  doc.text("Fiche Annuelle TGBT", 14, 15);
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

  const tableColumn = ["Élément", "État", "Interventions", "Observations"];
  let startY = 40;

  selectedFiche.postes.forEach((poste) => {
    // Nom du poste en gras
    doc.setFont(undefined, "bold");
    doc.text(poste.nom, 14, startY);
    doc.setFont(undefined, "normal");
    startY += 6;

    const tableRows = poste.elements.map((el) => [
      el.nom || "",
      el.etat || "--",
      el.interventions || "",
      el.observations || ""
    ]);

    // Ajouter le tableau avec autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY,
      theme: "grid",
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
    doc.text("Signature :", 14, startY + 6);
    doc.addImage(selectedFiche.signature, "PNG", 14, startY + 10, imgWidth, imgHeight);
  }

  // Sauvegarder le PDF
  doc.save(
    `Fiche_Annuelle_TGBT_${
      selectedFiche.date ? new Date(selectedFiche.date).toISOString().slice(0,10) : "date_inconnue"
    }.pdf`
  );

  // ===================== EXPORT PDF annuelle voie=====================
// ===================== EXPORT PDF VOIE =====================
}else if (selectedFiche?.panneaux) {
  doc.text("Fiche Annuelle Voie", 14, 15);
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
  const panneauxColumn = ["Panneau", "Élément", "État", "Interventions", "Observations"];

  Object.entries(selectedFiche.panneaux).forEach(([panneauNom, elements]) => {
    // Nom du panneau en gras
    doc.setFont(undefined, "bold");
    doc.text(panneauNom, 14, startY);
    doc.setFont(undefined, "normal");
    startY += 6;

    const tableRows = Object.entries(elements).map(([elementNom, el]) => [
      "", // Le nom du panneau est déjà en titre
      elementNom || "",
      el.Etat || "--",
      el.Interventions || "",
      el.Observations || ""
    ]);

    autoTable(doc, {
      head: [panneauxColumn],
      body: tableRows,
      startY,
      theme: "grid",
      headStyles: { fillColor: [52, 152, 219], textColor: 255 },
      styles: { fontSize: 10 },
    });

    startY = doc.lastAutoTable.finalY + 10; // espace après le panneau
  });

  // ===================== ROTs =====================
  const rotColumn = ["ROT", "Élément", "État", "Interventions", "Observations"];

  Object.entries(selectedFiche.ROTs).forEach(([rotNom, elements]) => {
    // Nom du ROT en gras
    doc.setFont(undefined, "bold");
    doc.text(rotNom, 14, startY);
    doc.setFont(undefined, "normal");
    startY += 6;

    const tableRows = Object.entries(elements).map(([elementNom, el]) => [
      "", // Le nom du ROT est déjà en titre
      elementNom || "",
      el.Etat || "--",
      el.Interventions || "",
      el.Observations || ""
    ]);

    autoTable(doc, {
      head: [rotColumn],
      body: tableRows,
      startY,
      theme: "grid",
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
    doc.text("Signature :", 14, startY + 6);
    doc.addImage(selectedFiche.signature, "PNG", 14, startY + 10, imgWidth, imgHeight);
  }

  // Sauvegarder le PDF
  doc.save(
    `Fiche_Annuelle_Voie_${
      selectedFiche.date ? new Date(selectedFiche.date).toISOString().slice(0, 10) : "date_inconnue"
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
                  } else if (n.type?.toLowerCase() === 'fiche_ann_infrastructure') {
                     voirFicheAnnInfrastructure(ficheId, n._id);       
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
            selectedFiche.feuxEncastres ? (
              <>
                <h3>Fiche Feux Encastrés Semestrielle</h3>

                <p>
                  📅 Date :{' '}
                  {selectedFiche.date
                    ? new Date(selectedFiche.date).toLocaleDateString()
                    : ''}
                </p>
                <p>
                  👨‍🔧 Technicien : {selectedFiche.technicienOperateurs || ''}
                </p>
                <p>
                  📝 Observations générales :{' '}
                  {selectedFiche.observationsGenerales || ''}
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
                    {Object.keys(selectedFiche.feuxEncastres).map((emp, i) => {
                      const fields = selectedFiche.feuxEncastres[emp];
                      return Object.keys(fields).map((field, j) => {
                        const row = fields[field];
                        return (
                          <tr key={`${i}-${j}`}>
                            {j === 0 && (
                              <td rowSpan={Object.keys(fields).length}>
                                {emp}
                              </td>
                            )}
                            <td>{field}</td>
                            <td>{row.etat}</td>
                            <td>{row.intervention}</td>
                            <td>{row.observations}</td>
                          </tr>
                        );
                      });
                    })}
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
// ================= semestrielle DGS =================
                  ):selectedFiche?.Contrôle ? (
  <>
    <h3>Fiche d'inspection Semestrielle DGS</h3>

    {/* Informations générales */}
    <p>
      📅 Date : {selectedFiche.Date ? new Date(selectedFiche.Date).toLocaleDateString() : ''}
    </p>
    <p>
      👨‍🔧 Technicien : {selectedFiche["Technicien Operateures"] || ''}
    </p>
    <p>
      📝 Observations générales : {selectedFiche["Observations générales"] || ''}
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
                  <td colSpan={4} style={{ fontWeight: 'bold', backgroundColor: '#eee' }}>
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
          style={{ border: '1px solid #000', width: '400px', height: '150px' }}
        />
      </div>
    )}

    {/* Actions */}
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={() => validerFiche(selectedFiche._id, selectedFiche.notifId)}>
        ✅ Valider
      </button>
      <button onClick={() => setSelectedFiche(null)}>❌ Fermer</button>
      <button onClick={exportPDF}>📄 Exporter PDF</button>
    </div>
  </>
// ================= Anuelle tgbt =================

): selectedFiche?.postes ? (
  <>
    <h3>Fiche Annuelle TGBT</h3>

    {/* Informations générales */}
    <p>
      📅 Date : {selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}
    </p>
    <p>
      👨‍🔧 Technicien / Opérateurs : {selectedFiche.technicien_operateurs || ''}
    </p>
    <p>
      📝 Observations générales : {selectedFiche.observations_generales || ''}
    </p>

    {/* Tableau des postes */}
    <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '15px' }}>
      <thead>
        <tr style={{ backgroundColor: '#eee' }}>
          <th style={{ border: '1px solid #000', padding: '5px' }}>Élément</th>
          <th style={{ border: '1px solid #000', padding: '5px' }}>État</th>
          <th style={{ border: '1px solid #000', padding: '5px' }}>Interventions</th>
          <th style={{ border: '1px solid #000', padding: '5px' }}>Observations</th>
        </tr>
      </thead>
      <tbody>
        {selectedFiche.postes.map((poste) => (
          <React.Fragment key={poste.nom}>
            {/* Nom du poste */}
            <tr>
              <td colSpan={4} style={{ fontWeight: 'bold', backgroundColor: '#ddd', padding: '5px' }}>
                {poste.nom}
              </td>
            </tr>

            {/* Éléments du poste */}
            {poste.elements.map((el) => (
              <tr key={el.nom}>
                <td style={{ border: '1px solid #000', padding: '5px' }}>{el.nom}</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>{el.etat || '--'}</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>{el.interventions || ''}</td>
                <td style={{ border: '1px solid #000', padding: '5px' }}>{el.observations || ''}</td>
              </tr>
            ))}
          </React.Fragment>
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
          style={{ border: '1px solid #000', width: '400px', height: '150px' }}
        />
      </div>
    )}

    {/* Actions */}
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={() => validerFiche(selectedFiche._id, selectedFiche.notifId)}>
        ✅ Valider
      </button>
      <button onClick={() => setSelectedFiche(null)}>❌ Fermer</button>
      <button onClick={exportPDF}>📄 Exporter PDF</button>
    </div>
  </>
// ================= Anuelle voie =================
): selectedFiche?.panneaux ? (
  <>
    <h3>Fiche Annuelle Voie</h3>

    {/* Informations générales */}
    <p>
      📅 Date : {selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}
    </p>
    <p>
      👨‍🔧 Technicien / Opérateurs : {selectedFiche.techniciens_operateurs?.join(', ') || ''}
    </p>
    <p>
      📝 Observations générales : {selectedFiche.observations_generales || ''}
    </p>

    {/* Tableau Panneaux */}
    {selectedFiche.panneaux && (
      <>
        <h4>Panneaux indicateurs</h4>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Panneau</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Élément</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>État</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Interventions</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Observations</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedFiche.panneaux).map(([panneauNom, elements]) =>
              Object.entries(elements).map(([elementNom, el], idx) => (
                <tr key={panneauNom + elementNom}>
                  {idx === 0 && (
                    <td
                      rowSpan={Object.keys(elements).length}
                      style={{ fontWeight: 'bold', backgroundColor: '#ddd', padding: '5px' }}
                    >
                      {panneauNom}
                    </td>
                  )}
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{elementNom}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{el.Etat || '--'}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{el.Interventions || ''}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{el.Observations || ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </>
    )}

    {/* Tableau ROTs */}
    {selectedFiche.ROTs && (
      <>
        <h4>ROTs</h4>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ border: '1px solid #000', padding: '5px' }}>ROT</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Élément</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>État</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Interventions</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Observations</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedFiche.ROTs).map(([rotNom, elements]) =>
              Object.entries(elements).map(([elementNom, el], idx) => (
                <tr key={rotNom + elementNom}>
                  {idx === 0 && (
                    <td
                      rowSpan={Object.keys(elements).length}
                      style={{ fontWeight: 'bold', backgroundColor: '#ddd', padding: '5px' }}
                    >
                      {rotNom}
                    </td>
                  )}
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{elementNom}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{el.Etat || '--'}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{el.Interventions || ''}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{el.Observations || ''}</td>
                </tr>
              ))
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
          style={{ border: '1px solid #000', width: '400px', height: '150px' }}
        />
      </div>
    )}

    {/* Actions */}
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={() => validerFiche(selectedFiche._id, selectedFiche.notifId)}>✅ Valider</button>
<button onClick={() => setSelectedFiche(null)}>
                    ❌ Fermer
                  </button>      <button onClick={() => exportPDF(selectedFiche)}>📄 Exporter PDF</button>
    </div>
  </>
): selectedFiche?.PISTE ? (
  <>
    <h3>Fiche Annuelle Infrastructure</h3>

    {/* Informations générales */}
    <p>
      📅 Date : {selectedFiche.date ? new Date(selectedFiche.date).toLocaleDateString() : ''}
    </p>
    <p>
      👨‍🔧 Technicien / Opérateurs : {selectedFiche.techniciens_operateurs?.join(', ') || ''}
    </p>
    <p>
      📝 Observations générales : {selectedFiche.observationsGenerales || ''}
    </p>

    {/* Tableau PISTE */}
    {selectedFiche.PISTE && (
      <>
        <h4>Inspection PISTE</h4>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Zone</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Vérification</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>État</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Interventions</th>
              <th style={{ border: '1px solid #000', padding: '5px' }}>Observations</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedFiche.PISTE).map(([zone, verifs]) =>
              Object.entries(verifs).map(([verifNom, verif], idx) => (
                <tr key={zone + verifNom}>
                  {idx === 0 && (
                    <td
                      rowSpan={Object.keys(verifs).length}
                      style={{ fontWeight: 'bold', backgroundColor: '#ddd', padding: '5px' }}
                    >
                      {zone}
                    </td>
                  )}
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{verifNom}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{verif.etat || '--'}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{verif.intervention_a_faire || ''}</td>
                  <td style={{ border: '1px solid #000', padding: '5px' }}>{verif.observation || ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </>
    )}

    {/* Actions */}
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button onClick={() => validerFiche(selectedFiche._id, selectedFiche.notifId)}>✅ Valider</button>
      <button onClick={() => setSelectedFiche(null)}>❌ Fermer</button>
      <button onClick={() => exportPDF(selectedFiche)}>📄 Exporter PDF</button>
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
