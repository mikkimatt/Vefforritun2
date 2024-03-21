import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Games } from "./pages/games/Games";
import { Layout } from "./Components/Layout/layout";
import { Boltadeildin } from "./pages/boltadeildin/Boltadeildin";
import { Teams } from "./pages/Teams";
import { NoMatch } from "./pages/NoMatch";
import { TeamDetail } from "./Components/Detail/teamdetails/teamdetail";
import { GameDetail } from "./Components/Detail/gamedetails/gamedetail";
import { CreateGame } from "./Components/Form/gameform";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Boltadeildin />} />
          <Route path="games" element={<Games />} />
          <Route path="gamedetail" element={<GameDetail />} />
          <Route path="creategame" element={<CreateGame />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teamdetail" element={<TeamDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
