import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Equipements from "./components/Equipements";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/equipements" element={<Equipements />} />
      </Routes>
    </Router>
  );
}

export default App;