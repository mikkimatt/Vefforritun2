import { Link, Outlet } from "react-router-dom";
import "./layout.css";

export function Layout() {
    return (
      <div className="layout">
        <nav>
          <ul>
            <li>
              <Link to="/">Boltadeildin</Link>
            </li>
            <li>
              <Link to="/games">Seinustu Leikir</Link>
            </li>
            <li>
              <Link to="/teams">Liðin</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    );
  }