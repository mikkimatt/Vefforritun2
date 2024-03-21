import { useLocation } from "react-router-dom";
import "./teamdetail.css";


type Team = {
    id: number,
    name: string,
    description: string,
};

export function TeamDetail() {
    const location = useLocation();
    const teams = location.state as Team;

    return (
        <div className="team-detail">
            <h1>{teams.name}</h1>
            <p>{teams.description}</p>
        </div>
    );
}