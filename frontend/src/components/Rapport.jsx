import React, { useEffect, useState } from 'react';
import { getFichesBrigade } from './apiservices/api';
import { FaSearch, FaCalendarAlt, FaClock, FaTools, FaUser, FaWrench, FaChartLine } from 'react-icons/fa';

export default function Rapport() {
  const [fiches, setFiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShift, setSelectedShift] = useState('all');
  const [selectedMaintenance, setSelectedMaintenance] = useState('all');

  useEffect(() => {
    async function fetchFiches() {
      try {
        setLoading(true);
        const data = await getFichesBrigade();

        const filtered = data.filter((f) => {
          const date = new Date(f.date);
          return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
        });

        setFiches(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiches();
  }, [selectedMonth, selectedYear]);

  // Grouper par date
  const groupByDate = () => {
    const grouped = {};

    fiches.forEach((fiche) => {
      const date = new Date(fiche.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      if (!grouped[date]) {
        grouped[date] = { jour: [], nuit: [] };
      }

      grouped[date].jour.push(...(fiche.blocsBrigade?.jour || []));
      grouped[date].nuit.push(...(fiche.blocsBrigade?.nuit || []));
    });

    return grouped;
  };

  const groupedData = groupByDate();

  // Filtres supplémentaires
  const getFilteredData = () => {
    const result = [];

    Object.entries(groupedData)
      .filter(([date]) => (selectedDay ? date.includes(selectedDay) : true))
      .forEach(([date, shifts]) => {
        const lignes = [
          ...shifts.jour.map((l) => ({ ...l, shift: 'Jour', shiftColor: '#f39c12' })),
          ...shifts.nuit.map((l) => ({ ...l, shift: 'Nuit', shiftColor: '#2c3e50' })),
        ];

        const filteredLignes = lignes.filter((ligne) => {
          const matchSearch =
            searchTerm === '' ||
            ligne.technicien?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ligne.typeIntervention?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ligne.lieu?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ligne.panne?.toLowerCase().includes(searchTerm.toLowerCase());

          const matchShift = selectedShift === 'all' || ligne.shift === selectedShift;
          const matchMaintenance =
            selectedMaintenance === 'all' || ligne.natureMaintenance === selectedMaintenance;

          return matchSearch && matchShift && matchMaintenance;
        });

        if (filteredLignes.length > 0) {
          result.push({ date, lignes: filteredLignes });
        }
      });

    return result;
  };

  const filteredData = getFilteredData();
  const totalInterventions = filteredData.reduce((acc, curr) => acc + curr.lignes.length, 0);
  const totalDuree = filteredData.reduce(
    (acc, curr) =>
      acc +
      curr.lignes.reduce((sum, ligne) => sum + (parseInt(ligne.DureeEnMinute) || 0), 0),
    0
  );

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '20px', color: '#666' }}>Chargement des données...</p>
        </div>
      </div>
    );

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* En-tête */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          color: 'white',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '32px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <FaChartLine /> 📊 Rapport complet des interventions
        </h1>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>GMAO - Gestion de la Maintenance Assistée par Ordinateur</p>
      </div>

      {/* Cartes statistiques */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #3498db',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaTools style={{ fontSize: '32px', color: '#3498db' }} />
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>{totalInterventions}</div>
              <div style={{ color: '#7f8c8d', fontSize: '14px' }}>Interventions totales</div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #e67e22',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaClock style={{ fontSize: '32px', color: '#e67e22' }} />
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>
                {Math.floor(totalDuree / 60)}h {totalDuree % 60}min
              </div>
              <div style={{ color: '#7f8c8d', fontSize: '14px' }}>Durée totale d'intervention</div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            borderLeft: '4px solid #27ae60',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaUser style={{ fontSize: '32px', color: '#27ae60' }} />
            <div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c3e50' }}>
                {new Date(selectedYear, selectedMonth).toLocaleString('fr-FR', { month: 'long' })}
              </div>
              <div style={{ color: '#7f8c8d', fontSize: '14px' }}>{selectedYear}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '18px' }}>🔍 Filtres de recherche</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>
              Année
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {[2024, 2025, 2026, 2027].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>
              Mois
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i} value={i}>
                  {new Date(2026, i).toLocaleString('fr-FR', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>
              Jour spécifique
            </label>
            <input
              type="text"
              placeholder="ex: 05/04/2026"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>
              Shift
            </label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <option value="all">Tous les shifts</option>
              <option value="Jour">Jour ☀️</option>
              <option value="Nuit">Nuit 🌙</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>
              Type maintenance
            </label>
            <select
              value={selectedMaintenance}
              onChange={(e) => setSelectedMaintenance(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <option value="all">Tous les types</option>
              <option value="preventif">Préventif</option>
              <option value="curatif">Curatif</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>
              Recherche texte
            </label>
            <input
              type="text"
              placeholder="Technicien, lieu, panne..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              setSelectedDay('');
              setSearchTerm('');
              setSelectedShift('all');
              setSelectedMaintenance('all');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {/* Tableau des interventions */}
      {filteredData.length === 0 ? (
        <div
          style={{
            backgroundColor: 'white',
            padding: '60px',
            textAlign: 'center',
            borderRadius: '12px',
            color: '#999',
          }}
        >
          <FaTools style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.3 }} />
          <h3>Aucune intervention trouvée</h3>
          <p>Essayez de modifier vos filtres de recherche</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Shift</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Technicien</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Type</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Travaux</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Lieu</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Maintenance</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Préventive</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Panne</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Cause</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Date détection</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Date réparation</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Durée</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Pièces</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Qté</th>
                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(({ date, lignes }) =>
                lignes.map((ligne, index) => (
                  <tr
                    key={`${date}-${index}`}
                    style={{
                      borderBottom: '1px solid #ecf0f1',
                      backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8f4f8')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f8f9fa')
                    }
                  >
                    {index === 0 && (
                      <td
                        rowSpan={lignes.length}
                        style={{
                          padding: '12px',
                          verticalAlign: 'top',
                          backgroundColor: '#f0f3f4',
                          fontWeight: 'bold',
                          borderRight: '2px solid #dee2e6',
                        }}
                      >
                        <FaCalendarAlt style={{ marginRight: '5px', color: '#3498db' }} />
                        {date}
                      </td>
                    )}

                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          backgroundColor: ligne.shift === 'Jour' ? '#f39c12' : '#2c3e50',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 'bold',
                        }}
                      >
                        {ligne.shift === 'Jour' ? '☀️ Jour' : '🌙 Nuit'}
                      </span>
                    </td>

                    <td style={{ padding: '12px' }}>
                      {ligne.technicien ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <FaUser style={{ color: '#3498db' }} /> {ligne.technicien}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>
                      {ligne.typeIntervention === 'balisage' ? (
                        <span style={{ color: '#e67e22', fontWeight: 'bold' }}>🚧 Balisage</span>
                      ) : ligne.typeIntervention === 'production' ? (
                        <span style={{ color: '#27ae60', fontWeight: 'bold' }}>⚙️ Production</span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>{ligne.natureTravaux || '-'}</td>
                    <td style={{ padding: '12px' }}>{ligne.lieu || '-'}</td>

                    <td style={{ padding: '12px' }}>
                      {ligne.natureMaintenance === 'preventif' ? (
                        <span style={{ color: '#3498db', fontWeight: 'bold' }}>🛡️ Préventif</span>
                      ) : ligne.natureMaintenance === 'curatif' ? (
                        <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>🔧 Curatif</span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>
                      {ligne.naturePreventive === 'journaliere' ? (
                        '📅 Journalière'
                      ) : ligne.naturePreventive === 'semestrielle' ? (
                        '📆 Semestrielle'
                      ) : ligne.naturePreventive === 'annuelle' ? (
                        '📅 Annuelle'
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>
                      {ligne.panne ? (
                        <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>⚠️ {ligne.panne}</span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>{ligne.cause || '-'}</td>

                    <td style={{ padding: '12px', fontSize: '11px' }}>
                      {ligne.dateDetection ? new Date(ligne.dateDetection).toLocaleString('fr-FR') : '-'}
                    </td>

                    <td style={{ padding: '12px', fontSize: '11px' }}>
                      {ligne.dateReparation ? new Date(ligne.dateReparation).toLocaleString('fr-FR') : '-'}
                    </td>

                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#27ae60' }}>
                      {ligne.DureeEnMinute ? (
                        <span style={{ backgroundColor: '#d5f4e6', padding: '4px 8px', borderRadius: '12px' }}>
                          ⏱️ {ligne.DureeEnMinute} min
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>{ligne.pieces || '-'}</td>
                    <td style={{ padding: '12px' }}>{ligne.quantite || '-'}</td>
                    <td style={{ padding: '12px' }}>
                      {ligne.action ? (
                        <span style={{ color: '#3498db', fontWeight: 'bold' }}>✅ {ligne.action}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}