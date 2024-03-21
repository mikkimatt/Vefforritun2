
import { Link } from 'react-router-dom';
import { ListGames } from '../../Components/List/gameList/gamesList';
import './games.css';



export function Games() {
    return (
        <div className='game-page'>
            <h2>Seinustu leikir</h2>
            <Link to='/creategame'>Stofna leik</Link>
            <ListGames />
        </div>
    )
}