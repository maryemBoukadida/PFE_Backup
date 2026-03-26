import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Equipements from './components/Equipements';
import InspectionTech from './components/InspectionTech';
import Layout from './components/Layout';
import Historiques from './components/Historiques';
import HistoriqueActions from './components/HistoriqueActions';
import FicheCorrective from './components/FicheCorrective';
import GestionInventaireHm from './components/GestionInventaire';
import GestionEquipement from './components/Gestionequipement';
import GestionStock from './components/Gestionstock';
import BalisagePage from './components/BalisagePage';
import PGPage from './components/PGPage';
import AutrePage from './components/AutrePage';
import HistoriqueTechnicien from './components/HistoriqueTechnicien ';
//import TechNotifications from "./TechNotifications";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/equipements" element={<Equipements />} />
        <Route path="/historiques" element={<Historiques />} />
        <Route path="/historique-actions" element={<HistoriqueActions />} />
        <Route
          path="/historique-actions-tech"
          element={<HistoriqueTechnicien />}
        />

        <Route
          path="/technicien"
          element={
            <Layout technicien={localStorage.getItem('technicien')}>
              <InspectionTech />
            </Layout>
          }
        />
        <Route path="/fiche-corrective" element={<FicheCorrective />} />
        <Route path="/gestion-inventaire" element={<GestionInventaireHm />}>
          <Route index element={<GestionInventaireHm />} />
          <Route path="equipements" element={<GestionEquipement />} />
          <Route path="stocks" element={<GestionStock />} />
        </Route>
        <Route path="/gestion-equipement" element={<GestionEquipement />} />
        <Route path="/balisage" element={<BalisagePage />} />
        <Route path="/pg" element={<PGPage />} />
        <Route path="/autre" element={<AutrePage />} />
      </Routes>
    </Router>
  );
}

export default App;
