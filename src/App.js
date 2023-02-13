import React from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokeInfo from "./pages/PokeInfo";
import TeamBuilder from "./pages/TeamBuilder";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/poke-info" element={<PokeInfo />} />
        <Route path="/team-builder" element={<TeamBuilder />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
