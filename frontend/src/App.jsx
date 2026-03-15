
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Equipements from "./components/Equipements";
import InspectionTech from "./components/InspectionTech";
import Layout from "./components/Layout";
import Historiques from "./components/Historiques";
import HistoriqueActions from "./components/HistoriqueActions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/equipements" element={<Equipements />} />
              <Route path="/historiques" element={<Historiques />} />
              <Route path="/historique-actions" element={<HistoriqueActions />} />

        <Route path="/technicien" element={
          <Layout><InspectionTech />
          </Layout>
        }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
