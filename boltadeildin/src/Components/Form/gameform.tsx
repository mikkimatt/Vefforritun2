import { useState, useEffect } from "react";
import React from "react";

import "./gameform.css";

type Team = {
    id: number;
    name: string;
};


export function CreateGame() {
  const [selectedHomeTeam, setSelectedHomeTeam] = useState("");
  const [selectedAwayTeam, setSelectedAwayTeam] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [teams, setTeams] = useState<Array<Team>>([]);
    useEffect(() => {
        async function fetchTeams() {
            const response = await fetch('https://vefforritun2-production-c4fd.up.railway.app/teams');
           
            const teamsJson = await response.json();
            setTeams(teamsJson);
        } 
        fetchTeams(); 
    }, []);

  

  const handleHomeTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHomeTeam(event.target.value);
  };

  const handleAwayTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAwayTeam(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

const handleHomeScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHomeScore(Number(event.target.value));
};

const handleAwayScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwayScore(Number(event.target.value));
};

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const gameData = {
        home: selectedHomeTeam,
        away: selectedAwayTeam,
        date: selectedDate,
        home_score: homeScore,
        away_score: awayScore
    };
    console.log(gameData);

    try {
        const response = await fetch('https://vefforritun2-production-c4fd.up.railway.app/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });

        if (response.ok) {
            
            console.log('Game created!');
        } else {
            
            console.error('Failed to create game');
        }
    } catch (error) {
        console.error('Failed to create game', error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Heimalið:
        <select value={selectedHomeTeam} onChange={handleHomeTeamChange}>
          <option value="">Veldu heimalið</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Útilið:
        <select value={selectedAwayTeam} onChange={handleAwayTeamChange}>
          <option value="">Veldu útilið</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Dagsetning:
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
      </label>
      <br />
      <label>
        Mörk heimaliðs:
        <input
          type="number"
          value={homeScore}
          onChange={handleHomeScoreChange}
        />
      </label>
      <br />
      <label>
        Mörk útiliðs:
        <input
          type="number"
          value={awayScore}
          onChange={handleAwayScoreChange}
        />
      </label>
      <br />
      <button type="submit">Stofna leik</button>
    </form>
  );
}
