import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./gamedetail.css";

type Game = {
  id: number;
  date: string;
  home: number;
  away: number;
  home_score: number;
  away_score: number;
};

type Team = {
  id: number;
  name: string;
};

export function GameDetail() {
  const location = useLocation();
  const game = location.state as Game;
  const [teams, setTeams] = useState<Array<Team>>([]);

  useEffect(() => {
    async function fetchTeams() {
      const response = await fetch(
        "https://vefforritun2-production-c4fd.up.railway.app/teams"
      );
      const teamsJson = await response.json();
      setTeams(teamsJson);
    }

    fetchTeams();
  }, []);

  function getTeamName(id: number): string {
    const team = teams.find((team) => team.id === id);
    return team ? team.name : "";
  }

  function deleteGame() {
    fetch(`https://vefforritun2-production-c4fd.up.railway.app/games/${game.id}`, {
      method: "DELETE",
    });
  }

  return (
    <div className="game-detail">
      <div>
        <h3>{new Date(game.date).toDateString()}</h3>
        <div>
          <span>{getTeamName(game.home)}</span>
        </div>
        <span>
          {game.home_score} - {game.away_score}
        </span>
        <div>
          <span>{getTeamName(game.away)}</span>
        </div>
        <button onClick={() => {
            if (window.confirm("Ertu viss um að þú viljir eyða leik?")) {
              deleteGame();
            }
            window.location.href = "/games";
            window.alert("Leik hefur verið eytt");
        }}>Eyða leik</button>
      </div>
    </div>
  );
}
