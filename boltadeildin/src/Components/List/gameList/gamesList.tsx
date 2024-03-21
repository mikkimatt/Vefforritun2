import { useEffect, useState } from 'react';
import './games.css';
import { Link, useNavigate } from 'react-router-dom';

type Game = {
    id: number,
    date: string,
    home: number,
    away: number,
    home_score: number,
    away_score: number,
};

type Team = {
    id: number,
    name: string,
};


export function ListGames() {
    const navigate = useNavigate();
    const [games, setGames] = useState<Array<Game>>([]);
    const [teams, setTeams] = useState<Array<Team>>([]);

    useEffect(() => {
        async function fetchGames() {
            const response = await fetch('https://vefforritun2-production-c4fd.up.railway.app/games');
            const gamesJson = await response.json();
            setGames(gamesJson);
        }

        async function fetchTeams() {
            const response = await fetch('https://vefforritun2-production-c4fd.up.railway.app/teams');
            const teamsJson = await response.json();
            setTeams(teamsJson);
        }

        fetchGames();
        fetchTeams();
    }, []);

    function getTeamName(id: number): string {
        const team = teams.find((team) => team.id === id);
        return team ? team.name : '';
    }
    return (
        <div className="games-container">
            {games.map((game, index) => (
                <div key={game.id} className="games" onClick={() => navigate('/gamedetail', { state: game })}>
                    {index === 0 || new Date(game.date).toDateString() !== new Date(games[index - 1].date).toDateString() ? (
                        <h3>{new Date(game.date).toDateString()}</h3>
                    ) : null}
                    <Link to={`/games/${game.id}`}>
                        <div className="game">
                            <div className='team'>
                                <span className='team-name'>{getTeamName(game.home)}</span>
                            </div>
                            <span className="score">{game.home_score} - {game.away_score}</span>
                            <div className='team'>
                                <span className='team-name'>{getTeamName(game.away)}</span>
                            </div>    
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}