import { ListGames } from "../../Components/List/gameList/gamesList";
import { ListTeams } from "../../Components/List/teamList/teamsList";
import "./boltadeildin.css"

export function Boltadeildin() {
    return (
        <div className="container">
            <h2>Boltadeildin</h2>
            <p>
                Velkominn í Boltadeildina!!.
            </p>
            <ListTeams />
            <ListGames />
        </div>
    );
}