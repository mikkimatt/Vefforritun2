import { useEffect, useState } from "react";
import "./teams.css";
import { Link, useNavigate } from "react-router-dom";
type Team = {
    id: "number",
    name: "string",
    slug: "string",
    description: "string",
};

export function ListTeams() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<Array<Team>>([]);
    useEffect(() => {
        async function fetchTeams() {
            const response = await fetch('https://vefforritun2-production-c4fd.up.railway.app/teams');
           
            const teamsJson = await response.json();
            setTeams(teamsJson);
        } 
        fetchTeams(); 
    }, []);

    return (
        <div className="teams-container">
            {teams.map((team: Team) => (
                <div key={team.id} className="team-card" onClick={() => navigate('/teamdetail', { state: team })}>
                    <Link to={`/teams/${team.slug}`}>
                        <h3>{team.name}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
}