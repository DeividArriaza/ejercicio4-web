import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Champions from './pages/Champions';
import ChampionDetail from './pages/ChampionDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/champions/:id" element={<ChampionDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>
          Datos cortesía de la{' '}
          <a
            href="https://developer.riotgames.com/docs/lol#data-dragon"
            target="_blank"
            rel="noreferrer"
          >
            Data Dragon API
          </a>
          . Este sitio no está afiliado a Riot Games.
        </p>
      </footer>
    </div>
  );
}
