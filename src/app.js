
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioPage from "./pages/Inicio.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<InicioPage />} />
        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </Router>
  );
}

export default App;
