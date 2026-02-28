import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Equipements from "./components/Equipements";
import InspectionTech from "./components/InspectionTech";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/equipements" element={<Equipements />} />
        <Route path="/technicien" element={<InspectionTech />}/>
      </Routes>
    </Router>
  );
}

export default App;