import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChampions, getLatestVersion } from '../data/api';
import Loader from '../components/Loader';
import ChampionCard from '../components/ChampionCard';

export default function Home() {
  const [version, setVersion] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [v, champs] = await Promise.all([getLatestVersion(), getChampions()]);
        if (!active) return;
        setVersion(v);
        setTotal(champs.length);
        const shuffled = [...champs].sort(() => Math.random() - 0.5).slice(0, 4);
        setFeatured(shuffled);
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleRandom = async () => {
    const champs = await getChampions();
    const random = champs[Math.floor(Math.random() * champs.length)];
    navigate(`/champions/${random.id}`);
  };

  if (loading) return <Loader message="Invocando datos del Rift..." />;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="home">
      <header className="hero">
        <h1 className="hero-title">
          <span className="hero-gradient">League of Legends</span>
          <br />
          Codex de Campeones
        </h1>
        <p className="hero-subtitle">
          Explora los <strong>{total}</strong> campeones del parche{' '}
          <code>{version}</code>. Datos en tiempo real desde la Data Dragon API de Riot Games.
        </p>
        <div className="hero-actions">
          <Link to="/champions" className="btn btn-primary">
            Ver todos los campeones
          </Link>
          <button type="button" onClick={handleRandom} className="btn btn-secondary">
            🎲 Campeón aleatorio
          </button>
        </div>
      </header>

      <section className="featured">
        <h2>Destacados de hoy</h2>
        <div className="champion-grid champion-grid-sm">
          {featured.map((c) => (
            <ChampionCard key={c.id} champion={c} />
          ))}
        </div>
      </section>

      <section className="info-blocks">
        <div className="info-block">
          <h3>🔍 Búsqueda y filtros</h3>
          <p>Encuentra a tu campeón por nombre o filtra por rol (asesino, mago, tirador, etc.).</p>
        </div>
        <div className="info-block">
          <h3>★ Favoritos persistentes</h3>
          <p>Marca tus campeones favoritos y se guardan en tu navegador con localStorage.</p>
        </div>
        <div className="info-block">
          <h3>☾ Tema oscuro / claro</h3>
          <p>Alterna entre modo oscuro y claro con un click. Tu preferencia se recuerda.</p>
        </div>
      </section>
    </section>
  );
}
